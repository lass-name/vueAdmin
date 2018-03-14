<template>
  <div class="ssyer-box">
    <div class="downing" v-for="(item,index) in downing" :key="index">{{item.desc}}</div>
    <el-row>
      <el-button type="primary" @click="startdown">下载图片</el-button>
      <el-button >重置</el-button>
    </el-row>
  </div>
</template>

<script>
import mixins from '@/mixins'
import {users} from '@/server/services'
export default {
  name: 'download-ssyer-images',
  mixins: [mixins],
  data () {
    return {
      sitemap: [{path: '', label: 'SSYER Images'}],
      images: [],
      downing: [],
      pageCount: 0,
      pageIndex: 1,
      pageSize: 20
    }
  },
  created () {
    this.getImageUrls()
  },
  methods: {
    getImageUrls () {
      let obj = users('/orderAndVodie/approveOrderAndVodieList', 'post', {
        classificationId: '',
        headline: '',
        labelId: '',
        limit: this.pageSize,
        start: (this.pageIndex - 1) * this.pageSize
      }, false, 50000, '/ssyer')
      this.$store.dispatch('add', obj).then(({data}) => {
        console.log(data)
        this.downing.push({desc: `正在下载第${data.data.pageIndex}页的图片数据...`})
        this.pageCount = data.data.pageCount
        this.pageIndex = data.data.pageIndex
        let _images = data.data.datas.map(c => {
          return {headline: c.headline, pic: c.pictureUrl}
        })
        this.images = [...this.images, ..._images]
        console.log(this.images.length)
      })
    },
    download (imgs) {
      // const superagent = require('superagent')
      // const fs = require('fs-extra')
      // const path = require('path')
      // this.downing.push({desc: `正在下载${imgs.headline}`})
      // let filename = `${imgs.headline}.${imgs.pic.split('.').pop()}`
      // const req = superagent.get(imgs.pic)
      // req.pipe(fs.createWriteStream(path.join(__dirname, 'images', filename)))
    },
    startdown () {
      // this.images.map(c => {
      //   this.download(c)
      // })
      console.log('start downing...')
      for (let i = 2; i <= this.pageCount; i++) {
        // this.sleep(200, 1000)
        // (setTimeout(function () {
        this.pageIndex = i
        this.getImageUrls()
        // }, this.sleep(200, 400)))(i)
      }
    },
    sleep (time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },
    random (min, max) {
      let range = max - min
      let rand = Math.random()
      return min + Math.round(rand * range)
    }
  }
}
</script>

<style lang="less">
.ssyer-box{
  background-color: #FFFFFF;
  min-height:500px;
  padding: 10px;
  text-align:center;
}
</style>
