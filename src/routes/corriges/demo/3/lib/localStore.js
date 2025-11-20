import { writable } from "svelte/store";

/**
 * @param {string} key
 * @param {any} initial
 */
export const localStore = (key, initial) => {
    /** @param {any} value */
    const toString = (value) => JSON.stringify(value, null, 2);

    const hasLocalStorage = typeof localStorage !== 'undefined';

    let saved = initial;
    if (hasLocalStorage) {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            localStorage.setItem(key, toString(initial));
            saved = initial;
        } else {
            try {
                saved = JSON.parse(raw);
            } catch (err) {
                void err;
                saved = initial;
            }
        }
    }

    const { subscribe, set, update } = writable(saved);

    return {
        subscribe,
        /** @param {any} value */
        set(value) {
            if (hasLocalStorage) {
                try { localStorage.setItem(key, toString(value)); } catch (err) { void err; }
            }
            return set(value);
        },
        /** @param {(v:any)=>any} fn */
        update(fn) {
            if (hasLocalStorage) {
                try {
                    const raw = localStorage.getItem(key);
                    const currentValue = raw ? JSON.parse(raw) : initial;
                    const newValue = fn(currentValue);
                    localStorage.setItem(key, toString(newValue));
                } catch (err) { void err; }
            }
            return update(fn);
        }
    };
};
