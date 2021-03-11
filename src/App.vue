<template>
  <router-view @playSongs="onPlaySongs"></router-view>
  <main-down  ref="mainDown"></main-down>
</template>

<script>
import { defineComponent} from "vue";

import MainDown from './components/commonCom/MainDown.vue'
export default defineComponent({
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    MainDown,
  },
  methods: {
    onPlaySongs(idArr){
      this.$refs.mainDown.initPlaySongs(idArr)
    },
  }
})
</script>
