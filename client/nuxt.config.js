import colors from "vuetify/es5/util/colors"
import webpack from "webpack"
require("dotenv").config()
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Фарш Мажор Миколаїв",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "height=device-height, width=device-width, initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi",
      },
      { hid: "description", name: "description", 
      content: "Фарш Мажор Миколаїв Николаев — магазин мяса и полуфабрикатов. Свежее домашее мясо. Мясо, вареники, пельмени, котлеты, голубцы, перец фаршированный " },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "@/theme/index.scss" }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/axiosport", ssr: true },
    { src: "@/plugins/vuelidate", ssr: true },
    { src: "@/plugins/modal", ssr: false },
    { src: "@/plugins/quill-editor", ssr: false },
    { src: "@/plugins/vue-draggable", ssr: false },
    { src: "@/plugins/vue-scrollactive", ssr: false },
    { src: "@/plugins/lazy-load", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/google-fonts",
    "@nuxtjs/fontawesome",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
  ],

  googleFonts: {
    families: {
      Charm: [700],
      Montserrat: [400, 500, 600],
    },
  },

  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  auth: {
    redirect: {
      login: "/sign-in/",
      home: "/manager/categories",
    },
    rewriteRedirects: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "access_token",
          },
          user: false,
          logout: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: "/api/v1",
  },
  proxy: {
    "/api/": process.env.BASE_URL,
  },

  env: {
    ...process.env,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
    defaultAssets: {
      font: {
        // family: "Montserrat",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
      }),
    ],
    transpile: ["gsap"],
  },
}
