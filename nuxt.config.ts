// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/global.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { hid: 'title', name: 'title', content: 'WorkoutsGPT' },
        { hid: 'description', name: 'description', content: 'Create a workout in seconds with chatGPT.' },
        { hid: 'og:title', property: 'og:title', content: 'WorkoutsGPT.' },
        { hid: 'og:description', property: 'og:title', content: 'Create a workout in seconds with chatGPT.' },
        { hid: 'og:site_name', property: 'og:site_name', content: 'WorkoutsGPT' },
        { hid: 'twitter:description', property: 'og:site_name', content: 'Create a workout in seconds with chatGPT.' },
      ],
      script: [
        // plausible
        //{ src: 'https://plausible.io/js/plausible.js', defer: true, 'data-domain': 'workoutsgpt.com' },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-SXBT5PD8V5', async: true },
        { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7040466421713161', async: true, crossorigin: 'anonymous' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>💪</text></svg>',
        },
      ],
    },
  },
})
