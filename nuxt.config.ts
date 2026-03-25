import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'nuxt/',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@200;300;400;500;600;700&display=swap' },
      ],
    },
  },
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
    telegramToken: process.env.VITE_TELEGRAM_TOKEN,
    telegramChatId: process.env.VITE_TELEGRAM_CHAT_ID,
  },
});

