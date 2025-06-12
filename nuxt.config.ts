// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
      script: [],
      link: [],
      style: [],
      noscript: [],
    },
  },
  // Directory of your source files
  srcDir: 'src-nuxt',
  // Mettre a false pour SSR : desktop (tauri) et mobile (capacitor)
  ssr: process.env.NUXT_SSR === 'true',
  devtools: { enabled: true },
  telemetry: false,
  components: true,
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-seo-utils',
    '@flapi/cms-designsystem',
  ],
  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: {
    host: process.env.TAURI_DEV_HOST || 'localhost',
  },
  vite: {
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,

    // Enable environment variables
    // Additional environment variables can be found at
    // https://tauri.app/2/reference/environment-variables/
    envPrefix: ['VITE_', 'TAURI_', 'NUXT_'],

    // tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1460,
      // Tauri requires a consistent port
      strictPort: true,
      // Enables the development server to be discoverable by other devices for mobile development
      host: '0.0.0.0',
      hmr: {
        // Use websocket for mobile hot reloading
        protocol: 'ws',
        // Make sure it's available on the network
        host: '0.0.0.0',
        // Use a specific port for hmr
        port: 5200,
      },
      watch: {
        // tell vite to ignore watching `src-tauri`
        ignored: ['**/src-tauri/**'],
      },
    } as any,
  },
  pinia: {
    storesDirs: ['./src-nuxt/stores/**'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // Chemin vers le fichier CSS de Tailwind
    cssPath: 'src-nuxt/assets/css/tailwind.css',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Poppins: true,
    },
  },
  image: {
    // Options
  },
})
