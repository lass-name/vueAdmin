<template>
  <div class="ssyer-box">
    <div class="downing" v-for="(item,index) in downing" :key="index">{{item.desc}}</div>
    <el-row>
      <el-button type="primary" @click="startdown">下载图片</el-button>
      <el-button @click="startDownAuth">获取作者信息</el-button>
      <el-button @click="mergeAuth">合并作者信息</el-button>
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
      authImages: [],
      downing: [],
      pageCount: 2,
      pageIndex: 1,
      pageSize: 20,
      authPageCount: 2,
      mIndex: 0
    }
  },
  created () {
    // this.getImageUrls()
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
        // this.pageCount = data.data.pageCount
        this.pageIndex = data.data.pageIndex
        let _images = data.data.datas.map(c => {
          return {headline: c.headline, pic: c.pictureUrl}
        })
        this.images = [...this.images, ..._images]
        console.log(this.images.length)
        console.log(JSON.stringify(this.images))
      })
    },
    getImageAuth (pIndex) {
      let obj = users('/attention/orderList', 'post', {
        start: (pIndex - 1) * this.pageSize,
        limit: this.pageSize
      }, false, 5000, '/ssyer')
      this.$store.dispatch('add', obj).then(({data}) => {
        this.downing.push({desc: `正在下载第${data.data.pageIndex}页的图片数据...`})
        this.pageCount = data.data.pageCount
        let _pageIndex = data.data.pageIndex
        let _images = data.data.datas.map(c => (
          {userId: c.userId, nickname: c.nickname, orderCount: c.orderCount}
        ))
        this.images = [...this.images, ..._images]
        if (_pageIndex < this.pageCount) {
          this.getImageAuth(_pageIndex + 1)
        } else {
          console.log(this.images)
          // this.exportData(this.images)
          // return pImages
        }
      })
    },
    startDownAuth () {
      this.getImageAuth(1)
    },
    getAuthImages (pIndex, uId) {
      let obj = users('/order/otherOrder', 'post', {
        start: (pIndex - 1) * this.pageSize,
        limit: this.pageSize,
        userId: uId
      }, false, 5000, '/ssyer')
      return this.$store.dispatch('add', obj).then(({data}) => {
        this.authPageCount = data.data.pageCount
        let _index = data.data.pageIndex
        let _images = data.data.datas.map(c => {
          return {userId: c.userId, pic: c.pictureUrl}
        })
        this.authImages = [...this.authImages, ..._images]
        if (_index < this.authPageCount) {
          this.getAuthImages(_index + 1, uId)
        } else {
          // return pImages
          let that = this
          return new Promise((resolve, reject) => {
            resolve(that.authImages)
          })
        }
      })
    },
    getMergeAuthImages (auths, index) {
      console.log(auths.length, index)
      this.getAuthImages(1, auths[index].userId).then(data => {
        if (++index < auths.length) {
          this.getMergeAuthImages(auths, index)
        } else {
          console.log(data)
          console.log(this.authImages)
          this.exportData(this.authImages)
          // this.exportData(data)
        }
        console.log(index)
        // console.log(data)
      })
    },
    mergeAuth () {
      console.log(this.images)
      this.getMergeAuthImages(this.images, 0)
    },
    getAllImages (pIndex, pImages) {
      let obj = users('/orderAndVodie/approveOrderAndVodieList', 'post', {
        classificationId: '',
        headline: '',
        labelId: '',
        limit: this.pageSize,
        start: (pIndex - 1) * this.pageSize
      }, false, 50000, '/ssyer')
      this.$store.dispatch('add', obj).then(({data}) => {
        this.downing.push({desc: `正在下载第${data.data.pageIndex}页的图片数据...`})
        // this.pageCount = data.data.pageCount
        let _pageIndex = data.data.pageIndex
        let _images = data.data.datas.map(c => {
          return {headline: c.headline, pic: c.pictureUrl}
        })
        pImages = [...pImages, ..._images]
        if (_pageIndex < this.pageCount) {
          this.getImages(_pageIndex + 1, pImages)
        } else {
          console.log(pImages)
          // this.exportData(pImages)
        }
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
      // for (let i = 2; i <= this.pageCount; i++) {
      //   // this.sleep(200, 1000)
      //   // (setTimeout(function () {
      //   this.pageIndex = i
      //   this.getImageUrls()
      //   // }, this.sleep(200, 400)))(i)
      //   this.sleep(this.random(500, 1000))
      // }
      let images = []
      this.getAllImages(1, images)
      console.log(images.length)
    },
    exportData (data) {
      // 定义文件内容，类型必须为Blob 否则createObjectURL会报错
      let content = new Blob([JSON.stringify(data)])
      // 生成url对象
      let urlObject = window.URL || window.webkitURL || window
      let url = urlObject.createObjectURL(content)

      // 生成<a></a>DOM元素
      let el = document.createElement('a')
      // 链接赋值
      el.href = url
      el.download = 'ssyer_img.json'
      // 必须点击否则不会下载
      el.click()
      // 移除链接释放资源
      urlObject.revokeObjectURL(url)
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
