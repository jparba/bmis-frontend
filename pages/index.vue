<template>
  <div>
    <navigation />
    <VueSlickCarousel v-bind="slickOptions" :arrows="true" :dots="true">
      <img src="~/assets/img/banner1.jpg" />
      <img src="~/assets/img/banner2.jpg" />
      <img src="~/assets/img/banner3.jpg" />
      <img src="~/assets/img/banner4.jpg" />
    </VueSlickCarousel>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  layout: 'clean',
  components: {
    Navigation,
    VueSlickCarousel
  },
  data() {
    return {
      slickOptions: {
        arrows: true,
        autoplay: true,
        speed: 1000,
        fade: true,
        autoplaySpeed: 2000,
      },
    }
  }
}
</script>

<style lang="scss">
  .slick-slider{
    .slick-slide{
      div{
        height: 500px;
        img{
          object-fit: cover;
        }
      }
    }
  }
</style>
