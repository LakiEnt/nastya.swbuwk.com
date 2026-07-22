// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxtjs/google-fonts"],
  css: ["~/assets/css/tailwind/index.css"],

  googleFonts: {
    families: {
      Onest: ["400", "700"],
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  routeRules: {
    "/admin/**": { prerender: false },
    "/api/admin/**": { prerender: false },
  },
});
