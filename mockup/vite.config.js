import { defineConfig } from 'vite';

export default defineConfig({
    base: process.env.VITE_BASE_PATH || '/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                menu: 'menu.html',
                cart: 'cart.html',
                checkout: 'checkout.html',
                thank_you: 'thank_you.html',
            }
        }
    }
});