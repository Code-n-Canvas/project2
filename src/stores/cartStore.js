// src/stores/cartStore.js
import { writable } from 'svelte/store';

// Check if running in the browser
const isBrowser = typeof window !== 'undefined';

// Load cart from localStorage or initialize as an empty array
const storedCart = isBrowser ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
export const cart = writable(storedCart);

// Subscribe to cart changes and update localStorage
if (isBrowser) {
    cart.subscribe(value => {
        localStorage.setItem('cart', JSON.stringify(value));
    });
}

export const showCart = writable(false);