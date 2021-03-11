<template>
  <main-top></main-top>
  <carousel-map></carousel-map>
  <recommend-item></recommend-item>
</template>

<script>
import { defineComponent } from "vue";
import MainTop from '../components/commonCom/MainTop.vue'
import CarouselMap from "../components/homeCom/CarouselMap.vue";
import RecommendItem from "../components/homeCom/RecommendItem.vue"

export default defineComponent({
  name: 'Home',
  emits: ['playSongs'],
  components: {
    MainTop,
    CarouselMap,
    RecommendItem
  }
})
</script> 

<style scoped>
</style>