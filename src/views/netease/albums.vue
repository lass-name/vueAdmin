<template>
  <div class="netease-albums-box">
    <el-table :data="list" border style="width:100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="中文名" sortable width="200" align="center"></el-table-column>
      <el-table-column prop="alg" label="原名" align="center" width="120"></el-table-column>
      <el-table-column label="专辑封面" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="playCount" label="播放次数" sortable align="center"></el-table-column>
      <el-table-column prop="trackCount" label="上映日期" align="center"></el-table-column>
      <el-table-column prop="id" label="年代" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import mixins from '@/mixins'
import {users} from '@/server/services'
export default {
  name: 'netease-albums',
  mixins: [mixins],
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getNetEaseAlbums('/personalized')
  },
  methods: {
    getNetEaseAlbums (url, data = {}) {
      let obj = users(url, 'get', data, false, 5000, '/netease')
      this.$store.dispatch('add', obj).then(({data}) => {
        console.log(data)
        // this.total = data.total
        this.list = data.result
      })
    }
  }
}
</script>

<style lang="less">
.netease-albums-box{
  img{
    height: 100px;
  }
}
</style>
