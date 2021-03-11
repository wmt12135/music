<template>
  <section class="bg-white max-w-7xl m-auto">
    <div class="container mx-auto flex items-center flex-wrap pt-6">
      <nav id="store" class="w-full z-30 top-0 px-6 py-1">
        <div
          class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2"
        >
          <a
            class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            href="#"
          >
            推荐歌单
          </a>

          <div class="flex items-center" id="store-nav-content">
            <a class="pl-3 inline-block no-underline hover:text-black" href="#">
              更多>>
            </a>
          </div>
        </div>
      </nav>

      <div
        v-for="item of personalizedArr"
        :key="item"
        class="w-1/2 sm:w-1/2 md:w-1/3 xl:w-1/4 p-6 flex flex-col"
      >
        <a @click="onSongListDetail(item['id'])">
          <img class="hover:grow hover:shadow-lg" :src="item['picUrl']" />
          <div class="pt-3 flex items-center justify-between">
            <p class="w-8/12 truncate">{{ item["name"] }}</p>
            <svg
              class="h-6 w-6 fill-current text-gray-500 hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { getPersonalizedPromise } from "../../api";

export default defineComponent({
  name: "RecommendItem",
  data() {
    return {
      personalizedArr: [],
    };
  },
  methods: {
    setPersonalizedArr(data) {
      let itemArr = data.result;
      for (let i = 0; i < itemArr.length; i++) {
        let item = itemArr[i];
        let obj = {};
        obj["picUrl"] = item["picUrl"];
        obj["name"] = item["name"];
        obj["id"] = item["id"]
        this.personalizedArr.push(obj);
      }
    },
    onSongListDetail(id){
      this.$router.push({ path: '/songListDetail', query: {id: id} })
    }
  },
  created() {
    getPersonalizedPromise().then(
      (data) => {
        this.setPersonalizedArr(data);
      },
      (err) => {
        console.warn(`获取personalized失败,err:${err}`);
      }
    );
  },
});
</script>

<style scoped>
.hover\:grow {
  transition: all 0.3s;
  transform: scale(1);
}

.hover\:grow:hover {
  transform: scale(1.02);
}
</style>