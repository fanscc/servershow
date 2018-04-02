<!-- You can custom the "mySwiper" name used to find the swiper instance in current component -->
<template>
  <div v-swiper:mySwiper1="swiperOption"  class="swiper-container gallery-top">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in banners">
        <img :src="banner">
      </div>
    </div>
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>
<!-- <div class="swiper-container gallery-top">
  <div class="swiper-wrapper">

  </div>

  <div class="swiper-button-next swiper-button-white"></div>
  <div class="swiper-button-prev swiper-button-white"></div>
</div>
<div class="swiper-container gallery-thumbs">
  <div class="swiper-wrapper">

  </div>
</div> -->
<script>
export default {
  data () {
    return {
      banners: [ 'http://image.lizihang.com/group1/M00/07/77/rBAOKFdRcOuEBxdnAAAAAKsr5ZQ663.jpg.300x200.jpg', 'http://image.lizihang.com/group1/M00/07/77/rBAOKFdRcOuEBxdnAAAAAKsr5ZQ663.jpg.300x200.jpg', 'http://image.lizihang.com/group1/M00/07/77/rBAOKFdRcOuEBxdnAAAAAKsr5ZQ663.jpg.300x200.jpg' ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // some swiper options...
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.banners.push('http://image.lizihang.com/group1/M00/07/77/rBAOKFdRcOuEBxdnAAAAAKsr5ZQ663.jpg.300x200.jpg')
      console.log('banners update')
    }, 3000)
    console.log(
      'This is current swiper instance object', this.mySwiper1,
      'It will slideTo banners 3')
    // this.mySwiper1.slideTo(3, 1000, false)
  }
}
</script>
