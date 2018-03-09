<template>
  <div class="table_box">
    <el-table :data="list" border style="width:100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="publishedAt" label="发布日期" sortable width="200" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="120"></el-table-column>
      <el-table-column label="描述信息" align="center">
        <template slot-scope="scope">
          {{scope.row.desc}}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建日期" align="center"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-pager :total="total" @pageFun="getList"></v-pager>
  </div>
</template>

<script>
import vPager from '@/components/common/Pager'
import mixins from '@/mixins'
import {users} from '@/server/services'
import {mapGetters} from 'vuex'
export default {
  name: 'gank-list',
  mixins: [mixins],
  data () {
    return {
      sitemap: [{path: '', label: 'Gank数据列表'}],
      list: [],
      total: 0
    }
  },
  created () {
    this.getList()
  },
  computed: {
    ...mapGetters([
      'ganks'
    ])
  },
  components: {
    vPager
  },
  methods: {
    handleEdit (index, row) {},
    handleDelete (index, row) {},
    getList (item) {
      // let {currentPage, pageSize} = item || {currentPage: 1, pageSize: 10}
      let obj = users('/data/all/20/10', 'get', {}, false, 5000, '/gank')
      this.$store.dispatch('getGanks', obj).then(({data}) => {
        console.log(data)
        // this.list = data.data.results
        this.list = this.ganks
      })
    }
  }
}
</script>

<style>

</style>
