import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  srcDir: 'nuxt/',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'Anton & Lesya — 09.09.2026',
      meta: [
        { name: 'description', content: 'Запрошуємо вас розділити з нами найважливіший день — наше весілля 9 вересня 2026 року.' },
        { property: 'og:title', content: 'Антон & Леся — 09.09.2026' },
        { property: 'og:description', content: 'Запрошуємо вас розділити з нами найважливіший день — наше весілля 9 вересня 2026 року.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Антон & Леся — 09.09.2026' },
        { name: 'twitter:description', content: 'Запрошуємо вас розділити з нами найважливіший день — наше весілля 9 вересня 2026 року.' },
        { name: 'twitter:image', content: '/og-image.jpg' },
      ],
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
  devServer: {
    host: '0.0.0.0',
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

