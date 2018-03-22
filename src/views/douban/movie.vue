<template>
  <div class="douban-movie-box">
    <div class="buttons">
      <el-button type="primary" size="small" @click="top250">Top250</el-button>
      <el-button type="primary" size="small" @click="usBox">北美票房榜</el-button>
      <el-button type="primary" size="small" @click="weekly">口碑榜</el-button>
      <el-button type="primary" size="small" @click="newMoive">新片榜</el-button>
      <el-button type="primary" size="small" @click="inTheaters">正在上映电影</el-button>
      <el-button type="primary" size="small" @click="comingSoon">即将上映电影</el-button>
    </div>
    <el-table :data="list" border style="width:100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="中文名" sortable width="200" align="center"></el-table-column>
      <el-table-column prop="original_title" label="原名" align="center" width="120"></el-table-column>
      <el-table-column label="电影海报图" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.images.small" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="rating.average" label="评分" sortable align="center"></el-table-column>
      <el-table-column prop="pubdates" label="上映日期" align="center"></el-table-column>
      <el-table-column prop="year" label="年代" align="center"></el-table-column>
      <!-- <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <v-pager :total="total" @pageFun="getMovie"></v-pager>
  </div>
</template>

<script>
import mixins from '@/mixins'
import {users} from '@/server/services'
import vPager from '@/components/common/Pager'
export default {
  name: 'douban-movie',
  mixins: [mixins],
  data () {
    return {
      sitemap: [{path: '', label: '豆瓣电影'}],
      list: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10
    }
  },
  components: {
    vPager
  },
  methods: {
    getMovie (url, data = {}) {
      let obj = users(url, 'get', data, false, 5000, '/douban')
      this.$store.dispatch('add', obj).then(({data}) => {
        console.log(data)
        this.total = data.total
        this.list = data.subjects
      })
    },
    top250 () {
      this.getMovie('/v2/movie/top250', {start: this.pageIndex, count: this.pageSize})
    },
    usBox () {
      this.getMovie('/v2/movie/us_box', {})
    },
    weekly () {
      this.getMovie('/v2/movie/weekly', {})
    },
    newMoive () {
      this.getMovie('/v2/movie/new_movies', {})
    },
    inTheaters () {
      this.getMovie('/v2/movie/in_theaters', {city: '北京'})
    },
    comingSoon () {
      this.getMovie('/v2/movie/coming_soon', {})
    }
  }
}
</script>

<style lang="less">
img{
  width: 100px/2;
}
</style>
