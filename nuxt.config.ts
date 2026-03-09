import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'nuxt/',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/main.css'],
  compatibilityDate: '2026-03-02',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  vite: {
    server: {
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**', '**/.cursor/**'],
      },
    },
  },
  runtimeConfig: {
    public: {
      telegramToken: process.env.VITE_TELEGRAM_TOKEN,
      telegramChatId: process.env.VITE_TELEGRAM_CHAT_ID,
    },
  },
});

