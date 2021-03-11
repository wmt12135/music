<template>
  <div
    class="max-w-4xl flex items-center h-auto lg:h-auto flex-wrap mx-auto mt-20 mb-6 lg:my-6"
  >
    <!--Main Col-->
    <div
      class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-gray-400 mx-6 lg:mx-0"
    >
      <div class="p-4 md:p-12 text-center lg:text-left">
        <div
          class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 md:-mt-28 h-48 w-48 md:h-60 md:w-60 bg-cover bg-center"
          :style="{
            backgroundImage: 'url(' + songListDetailObj['coverImgUrl'] + ')',
          }"
        ></div>

        <h1 class="text-3xl font-bold pt-8 lg:pt-0">
          {{ songListDetailObj["name"] }}
        </h1>
        <div
          class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"
        ></div>
        <p class="pt-8 text-sm">
          {{ songListDetailObj["description"] }}
        </p>

        <div class="pt-10">
          <button
            class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
          >
            播放全部
          </button>
          <button
            @click="onBackHome"
            class="ml-5 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>

    <!--Img Col-->
    <div class="w-full lg:w-2/5">
      <!-- Big profile image for side bar (desktop) -->
      <img
        :src="songListDetailObj['coverImgUrl']"
        class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
      />
      <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->
    </div>
  </div>

  <div class="w-full lg:w-5/6 m-auto p-6 cursor-pointer">
    <h1 class="text-3xl font-bold pt-8 lg:pt-0 text-green-500">歌单列表</h1>
    <div class="mx-auto pt-3 border-b-2 border-green-500 opacity-25"></div>
    <div class="w-full rounded-lg shadow-2xl m-auto mt-6">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="w-full flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      歌名
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      歌手
                    </th>
                    <!-- <th
                      scope="col"
                      class="hidden sm:inline-block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      时长
                    </th> -->
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    class="hover:bg-gray-200"
                    v-for="(item, index) of songListDetailObj['tracks']"
                    :key="index"
                    @click="onPlaySongs([item['id']])"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="text-sm text-gray-900">
                          {{ index + 1 }}
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ item["name"] }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {{ item["ar"][0]["name"] }}
                      </span>
                    </td>
                    <!-- <td
                      class="hidden sm:inline-block px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      Admin
                    </td> -->
                  </tr>

                  <!-- More items... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getSongListDetailPromise } from "../api";

export default defineComponent({
  name: "SongListDetail",
  emits: ["playSongs"],
  data() {
    return {
      songListDetailObj: {},
    };
  },
  methods: {
    setSongListDetailArr(data) {
      this.songListDetailObj.coverImgUrl = data["playlist"]["coverImgUrl"];
      this.songListDetailObj.name = data["playlist"]["name"];
      this.songListDetailObj.description = data["playlist"]["description"];
      this.songListDetailObj.tracks = data["playlist"]["tracks"];
    },
    onPlaySongs(idArr) {
      this.$emit("playSongs", idArr);
    },
    onBackHome() {
      this.$router.push({path: "/"});
    },
  },
  created() {
    if (!this.$route.query.id) {
      this.$router.push({ path: "/" });
    } else {
      getSongListDetailPromise(this.$route.query.id).then(
        (data) => {
          this.setSongListDetailArr(data);
        },
        (err) => {
          console.warn(`获取songListDetail失败,err:${err}`);
        }
      );
    }
  },
});
</script>
