import { useState, useEffect, useCallback, useRef } from 'react';
import {
  getProductByHandle,
  getProducts,
  getCollectionByHandle,
  createCart,
  addToCart as apiAddToCart,
  updateCartLines,
  removeCartLines,
} from '../api/shopify';

// ── Product hook ────────────────────────────────────────────────────────────

export function useProduct(handle) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    getProductByHandle(handle)
      .then((p) => {
        if (!cancelled) {
          setProduct(p);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [handle]);

  return { product, loading, error };
}

// ── Products list hook ──────────────────────────────────────────────────────

export function useProducts(count = 20) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getProducts(count)
      .then((p) => {
        if (!cancelled) {
          setProducts(p);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [count]);

  return { products, loading, error };
}

// ── Collection hook ─────────────────────────────────────────────────────────

export function useCollection(handle) {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    setLoading(true);

    getCollectionByHandle(handle)
      .then((c) => {
        if (!cancelled) {
          setCollection(c);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [handle]);

  return { collection, loading, error };
}

// ── Cart hook ───────────────────────────────────────────────────────────────

export function useCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cartIdRef = useRef(null);

  const ensureCart = useCallback(async () => {
    if (cartIdRef.current) return cartIdRef.current;
    setLoading(true);
    try {
      const newCart = await createCart();
      cartIdRef.current = newCart.id;
      setCart(newCart);
      return newCart.id;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(async (variantId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const id = await ensureCart();
      const updated = await apiAddToCart(id, [{ merchandiseId: variantId, quantity }]);
      setCart(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ensureCart]);

  const updateItem = useCallback(async (lineId, quantity) => {
    if (!cartIdRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await updateCartLines(cartIdRef.current, [{ id: lineId, quantity }]);
      setCart(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId) => {
    if (!cartIdRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const updated = await removeCartLines(cartIdRef.current, [lineId]);
      setCart(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cart,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    checkoutUrl: cart?.checkoutUrl || null,
    totalQuantity: cart?.totalQuantity || 0,
    lines: cart?.lines || [],
    subtotal: cart?.subtotal || 0,
  };
}
