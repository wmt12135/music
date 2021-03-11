import axios from "axios"

//获取广告promise
export const getBannerPromise = async() => {
  return await new Promise((resolve, reject) => {
    axios.get('/api/banner?type=0')
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
  
}

//获取推荐歌单promise
export const getPersonalizedPromise = async() => {
  return await new Promise((resolve, reject) => {
    axios.get('/api/personalized?limit=12')
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

//获取歌单详情
export const getSongListDetailPromise = async(id) => {
  return await new Promise((resolve, reject) => {
    axios.get(`/api/playlist/detail?id=${id}`)
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

//获取音乐url
export const getSongUrlPromise = async(id) => {
  return await new Promise((resolve, reject) => {
    axios.get(`/api/song/url?id=${id}`)
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}