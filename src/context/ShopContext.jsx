import { createContext, useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { useProduct, useProducts } from '../hooks/useShopify';
import { useCart } from '../hooks/useShopify';
import { FALLBACK_PRODUCT } from '../data/static';

export const ShopCtx = createContext(null);

export function useShop() {
  return useContext(ShopCtx);
}

const round2 = (v) => Math.round(v * 100) / 100;

export function fmt(v, currencyCode = 'GBP') {
  if (currencyCode === 'EUR') return '€' + round2(v).toFixed(2).replace('.', ',');
  return '£' + round2(v).toFixed(2);
}

export function ShopProvider({ children }) {
  const handle = import.meta.env.VITE_SHOPIFY_PRODUCT_HANDLE || 'self-tanning-drops';
  const { product: shopifyProduct, loading: productLoading, error: productError } = useProduct(handle);
  const { products: allProducts, loading: productsLoading } = useProducts(1);
  const {
    cart: shopifyCart, loading: cartLoading, error: cartError,
    addItem: shopifyAddItem, updateItem: shopifyUpdateItem, removeItem: shopifyRemoveItem,
    checkoutUrl, totalQuantity: shopifyTotalQuantity, lines: shopifyLines, subtotal: shopifySubtotal,
  } = useCart();

  const shopifyConnected = !!import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

  // Use product by handle, fall back to first product in store, then static data
  const product = shopifyProduct
    || (allProducts.length > 0 ? allProducts[0] : null)
    || (productLoading || productsLoading ? null : FALLBACK_PRODUCT);

  const [localCart, setLocalCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [modal, setModal] = useState(null);
  const [flash, setFlash] = useState(null);
  const [adding, setAdding] = useState(false);

  // Log connection status on mount
  useEffect(() => {
    if (shopifyConnected) {
      console.log('[Tandrop] Shopify connected:', import.meta.env.VITE_SHOPIFY_STORE_DOMAIN);
    } else {
      console.log('[Tandrop] Running in offline mode (no Shopify token)');
    }
  }, [shopifyConnected]);

  useEffect(() => {
    if (product && product.id !== 'fallback') {
      console.log('[Tandrop] Product loaded from Shopify:', product.title, '| Handle:', product.handle);
      console.log('[Tandrop] Variants:', product.variants?.length, '| Images:', product.images?.length);
      console.log('[Tandrop] Price:', product.price, '| Compare at:', product.compareAtPrice);
    } else if (product?.id === 'fallback') {
      console.log('[Tandrop] Using fallback product data (Shopify product not found)');
    }
  }, [product]);

  useEffect(() => {
    if (productError) {
      console.warn('[Tandrop] Product fetch error:', productError);
    }
  }, [productError]);

  // ── Product-derived data ──
  const productData = useMemo(() => {
    if (!product) return null;

    const images = product.images || [];
    const variants = product.variants || [];
    const price = product.price || 26;
    const compareAtPrice = product.compareAtPrice || 44;
    const title = product.title || 'Tandrop™ Tanning Drops';
    const description = product.description || '';

    return { images, variants, price, compareAtPrice, title, description };
  }, [product]);

  // ── Bundle model (derived from product price) ──
  const bundles = useMemo(() => {
    const listPrice = productData?.compareAtPrice || 44;
    const salePrice = productData?.price || 26;

    const mk = (units, getQty, ribbon, freeN, freeShip) => {
      const total = round2(salePrice * units);
      const list = round2(listPrice * getQty);
      return {
        units, getQty, free: freeN, ribbon, freeShip,
        label: `Buy ${units}`,
        total, list, each: round2(total / getQty),
        disc: Math.round((1 - total / list) * 100),
        qty: getQty, flag: ribbon, best: units === 2,
        months: getQty === 1 ? '1-month' : `${getQty}-month`,
      };
    };
    return [
      mk(1, 1, null, 0, false),
      mk(2, 3, 'Most Popular', 1, true),
      mk(3, 5, 'Best Value', 2, true),
    ];
  }, [productData]);

  // ── Cart operations ──
  const addItemLocal = useCallback((item) => {
    setLocalCart((c) => {
      const ex = c.find((x) => x.id === item.id);
      if (ex) return c.map((x) => (x.id === item.id ? { ...x, qty: x.qty + item.qty } : x));
      return [...c, item];
    });
  }, []);

  const addToCart = useCallback(async (bundleIndex, openDrawer) => {
    const b = bundles[bundleIndex];
    setAdding(true);

    try {
      if (shopifyConnected && productData?.variants?.length) {
        const variant = productData.variants.find((v) => v.available) || productData.variants[0];
        if (variant) {
          console.log('[Tandrop] Adding to Shopify cart:', variant.id, 'qty:', b.units);
          await shopifyAddItem(variant.id, b.units);
          console.log('[Tandrop] Added to cart successfully');
          if (openDrawer) setCartOpen(true);
          return;
        }
      }

      // Fallback to local cart
      const sub = b.free > 0 ? `${b.getQty} bottles · ${b.free} free` : '1 bottle';
      const title = productData?.title || 'Tandrop™ Tanning Drops';
      addItemLocal({ id: `tandrop-${b.units}`, t: title, sub, price: b.total, list: b.list, qty: 1 });
      if (openDrawer) setCartOpen(true);
    } catch (err) {
      console.error('[Tandrop] Add to cart failed:', err);
      // Fall back to local cart on error
      const sub = b.free > 0 ? `${b.getQty} bottles · ${b.free} free` : '1 bottle';
      addItemLocal({ id: `tandrop-${b.units}`, t: productData?.title || 'Tandrop™ Tanning Drops', sub, price: b.total, list: b.list, qty: 1 });
      if (openDrawer) setCartOpen(true);
    } finally {
      setAdding(false);
    }
  }, [bundles, shopifyConnected, productData, shopifyAddItem, addItemLocal]);

  const setQty = useCallback((id, q) => {
    if (shopifyConnected && shopifyCart) {
      const line = shopifyLines.find((l) => l.id === id || l.variantId === id);
      if (line) {
        if (q <= 0) shopifyRemoveItem(line.id);
        else shopifyUpdateItem(line.id, q);
        return;
      }
    }
    setLocalCart((c) => (q <= 0 ? c.filter((x) => x.id !== id) : c.map((x) => (x.id === id ? { ...x, qty: q } : x))));
  }, [shopifyConnected, shopifyCart, shopifyLines, shopifyRemoveItem, shopifyUpdateItem]);

  // Merge cart data
  const cartLines = shopifyConnected && shopifyCart
    ? shopifyLines.map((l) => ({
        id: l.id,
        t: l.title,
        sub: l.variantTitle !== 'Default Title' ? l.variantTitle : '',
        price: l.price,
        list: l.compareAtPrice || l.price,
        qty: l.quantity,
        image: l.image,
      }))
    : localCart;

  const cartCount = shopifyConnected && shopifyCart ? shopifyTotalQuantity : localCart.reduce((s, it) => s + it.qty, 0);
  const cartSubtotal = shopifyConnected && shopifyCart ? shopifySubtotal : localCart.reduce((s, it) => s + it.price * it.qty, 0);
  const cartListTotal = shopifyConnected && shopifyCart
    ? shopifyLines.reduce((s, l) => s + (l.compareAtPrice || l.price) * l.quantity, 0)
    : localCart.reduce((s, it) => s + it.list * it.qty, 0);

  const checkout = useCallback(() => {
    if (shopifyConnected && checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      setCartOpen(false);
      setFlash('✓ Order confirmed, your glow is on its way!');
      setTimeout(() => setFlash(null), 3200);
    }
  }, [shopifyConnected, checkoutUrl]);

  // ── Popups ──
  useEffect(() => {
    let shown = sessionStorage.getItem('td_pop');
    const timer = setTimeout(() => {
      if (!shown && !cartOpen) {
        setModal('email');
        sessionStorage.setItem('td_pop', '1');
        shown = '1';
      }
    }, 20000);
    const onLeave = (e) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('td_exit')) {
        setModal('exit');
        sessionStorage.setItem('td_exit', '1');
        sessionStorage.setItem('td_pop', '1');
      }
    };
    document.addEventListener('mouseleave', onLeave);
    return () => { clearTimeout(timer); document.removeEventListener('mouseleave', onLeave); };
  }, [cartOpen]);

  // ── Scroll reveal ──
  useEffect(() => {
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [product]);

  const ctx = {
    // Product
    product,
    productData,
    productLoading: productLoading || productsLoading,
    productError,
    shopifyConnected,

    // Cart
    cart: cartLines,
    cartCount,
    cartSubtotal,
    cartListTotal,
    cartOpen,
    cartLoading,
    cartError,
    adding,

    // Bundles
    selectedBundle,
    setSelectedBundle,
    bundles,

    // Modals
    modal,
    flash,

    // Actions
    addItem: shopifyConnected ? shopifyAddItem : addItemLocal,
    addItemLocal,
    addToCart,
    setQty,
    checkout,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    closeModal: () => setModal(null),
    checkoutUrl,

    // Formatting
    fmt: (v) => fmt(v, productData?.variants?.[0]?.currencyCode),
  };

  return <ShopCtx.Provider value={ctx}>{children}</ShopCtx.Provider>;
}
