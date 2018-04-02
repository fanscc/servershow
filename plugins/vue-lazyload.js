import Vue from 'vue'
import VueLazyload from 'vue-lazyload' // 懒加载
import VueQriously from 'vue-qriously' // qrcode
Vue.use(VueQriously)
Vue.use(VueLazyload, {
  // preLoad: 1.3, // 预加载高度比例
  // attempt: 3, // 尝试加载图片数量
  // error: '/default1.png',
  loading: '/timg.jpg'
})
