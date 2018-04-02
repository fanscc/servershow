module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '北京丽兹行豪宅网',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress bar color
   */
  // loading: {color: '#3B8070'},
  // Global CSS
  css: ['~assets/css/base.css', '~assets/css/public.css', 'swiper/dist/css/swiper.css'],
  plugins: [
    { src: '~/plugins/swiper', ssr: false },
    { src: '~/plugins/components' },
    { src: '~/plugins/map', ssr: false },
    { src: '~/plugins/tdk' },
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/vueqr', ssr: false }
  ],
  env: {
    url: 'http://www.lizihang.com:80' /* 全局asyncData({env})的配置，比如请求头URL常量 */
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: true,
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // 跨域处理
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',
      {
        target: 'http://www.lizihang.com', // api主机
        pathRewrite: { '/api': '' }
      }
    ]
  ],
  filenames: {
    vendor: 'vendor.[hash].js',
    app: 'app.[chunkhash].js'
  }

}
