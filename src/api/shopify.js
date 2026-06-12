const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

async function shopifyFetch(query, variables = {}) {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      'Missing Shopify credentials. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN in .env'
    );
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }
  return json.data;
}

// ── Product queries ─────────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    images(first: 20) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`;

export async function getProductByHandle(handle) {
  const data = await shopifyFetch(
    `query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { handle }
  );
  return data?.product ? normalizeProduct(data.product) : null;
}

export async function getProducts(first = 20) {
  const data = await shopifyFetch(
    `query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { first }
  );
  return (data?.products?.edges || []).map((e) => normalizeProduct(e.node));
}

export async function getCollectionByHandle(handle) {
  const data = await shopifyFetch(
    `query GetCollection($handle: String!) {
      collection(handle: $handle) {
        id
        handle
        title
        description
        products(first: 50) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}`,
    { handle }
  );
  if (!data?.collection) return null;
  return {
    ...data.collection,
    products: (data.collection.products?.edges || []).map((e) =>
      normalizeProduct(e.node)
    ),
  };
}

// ── Cart mutations ──────────────────────────────────────────────────────────

export async function createCart(lines = []) {
  const data = await shopifyFetch(
    `mutation CreateCart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart {
          ...CartFields
        }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`
  , { lines });
  const result = data?.cartCreate;
  if (result?.userErrors?.length) {
    throw new Error(result.userErrors.map((e) => e.message).join(', '));
  }
  return normalizeCart(result.cart);
}

export async function addToCart(cartId, lines) {
  const data = await shopifyFetch(
    `mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines }
  );
  const result = data?.cartLinesAdd;
  if (result?.userErrors?.length) {
    throw new Error(result.userErrors.map((e) => e.message).join(', '));
  }
  return normalizeCart(result.cart);
}

export async function updateCartLines(cartId, lines) {
  const data = await shopifyFetch(
    `mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lines }
  );
  const result = data?.cartLinesUpdate;
  if (result?.userErrors?.length) {
    throw new Error(result.userErrors.map((e) => e.message).join(', '));
  }
  return normalizeCart(result.cart);
}

export async function removeCartLines(cartId, lineIds) {
  const data = await shopifyFetch(
    `mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}`,
    { cartId, lineIds }
  );
  const result = data?.cartLinesRemove;
  if (result?.userErrors?.length) {
    throw new Error(result.userErrors.map((e) => e.message).join(', '));
  }
  return normalizeCart(result.cart);
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              compareAtPrice { amount currencyCode }
              image { url altText }
              product { title handle }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            compareAtAmountPerQuantity { amount currencyCode }
          }
        }
      }
    }
  }
`;

// ── Normalization helpers ───────────────────────────────────────────────────

function normalizeProduct(raw) {
  const images = (raw.images?.edges || []).map((e) => e.node);
  const variants = (raw.variants?.edges || []).map((e) => ({
    id: e.node.id,
    title: e.node.title,
    available: e.node.availableForSale,
    price: parseFloat(e.node.price.amount),
    compareAtPrice: e.node.compareAtPrice
      ? parseFloat(e.node.compareAtPrice.amount)
      : null,
    currencyCode: e.node.price.currencyCode,
    image: e.node.image,
    options: e.node.selectedOptions,
  }));

  const minPrice = parseFloat(raw.priceRange?.minVariantPrice?.amount || '0');
  const maxCompare = raw.compareAtPriceRange?.maxVariantPrice?.amount
    ? parseFloat(raw.compareAtPriceRange.maxVariantPrice.amount)
    : null;

  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    descriptionHtml: raw.descriptionHtml,
    vendor: raw.vendor,
    productType: raw.productType,
    tags: raw.tags || [],
    images,
    variants,
    price: minPrice,
    compareAtPrice: maxCompare,
    currencyCode: variants[0]?.currencyCode || 'GBP',
  };
}

function normalizeCart(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    subtotal: parseFloat(raw.cost?.subtotalAmount?.amount || '0'),
    total: parseFloat(raw.cost?.totalAmount?.amount || '0'),
    currencyCode: raw.cost?.subtotalAmount?.currencyCode || 'GBP',
    lines: (raw.lines?.edges || []).map((e) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      variantId: e.node.merchandise.id,
      title: e.node.merchandise.product?.title,
      variantTitle: e.node.merchandise.title,
      price: parseFloat(e.node.merchandise.price.amount),
      compareAtPrice: e.node.merchandise.compareAtPrice
        ? parseFloat(e.node.merchandise.compareAtPrice.amount)
        : null,
      image: e.node.merchandise.image,
      lineTotal: parseFloat(e.node.cost?.totalAmount?.amount || '0'),
    })),
  };
}
