import { writable } from 'svelte/store';
import type { Product } from '../types';

const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

const storedCart = isBrowser ? localStorage.getItem('cart') : null;
const initial: Product[] = storedCart ? JSON.parse(storedCart) : [];

export const cartStore = writable<Product[]>(initial);

export function getOneProductFromCart(productId: string): Product | undefined {
  let product: Product | undefined;
  cartStore.subscribe((products) => {
    product = products.find(item => item.id === productId);
  })();
  return product;
}

export function addToCartStore(product: Product): void {
  cartStore.update((products) => {
    const existingProduct = products.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      products.push({ ...product, quantity: 1 });
    }
    if (isBrowser)localStorage.setItem('cart', JSON.stringify(products));
    return products;
  });
}

export function deleteOneProductFromCart(productId: string): void {
  cartStore.update((products) => {
    products = products.filter(product => product.id !== productId);

    if (isBrowser) localStorage.setItem('cart', JSON.stringify(products));
    return products;
  });
}

export function resetCartStore(): void {
  cartStore.set([]);
}
