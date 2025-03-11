// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    'vue-yandex-maps/nuxt'
  ],
  yandexMaps: {
    apikey: process.env.YANDEX_TOKEN
  },
})
