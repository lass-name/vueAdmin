<template>
  <div class="table_box">
    <el-table :data="list" border style="width:100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="date" label="日期" sortable width="200" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{scope.row.address}}
        </template>
      </el-table-column>
      <el-table-column prop="zip" label="邮编" align="center"></el-table-column>
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
import tableData from '../data/table-data'
import vPager from '../components/common/Pager'
export default {
  name: 'table-demo',
  data () {
    return {
      list: [],
      total: 0
    }
  },
  created () {
    // console.log(tableData['/zh-CN'])
    // this.list = tableData[`/zh-CN`]
    this.getList()
    this.total = tableData[`/zh-CN`].length
  },
  components: {
    vPager
  },
  methods: {
    handleEdit (index, row) {},
    handleDelete (index, row) {},
    getList (item) {
      let {currentPage, pageSize} = item || {currentPage: 1, pageSize: 10}
      this.list = tableData['/zh-CN'].filter((item, index) => {
        // if (index >= (+currentPage - 1) * pageSize && index < +currentPage * +pageSize) {
        //   return item
        // }
        return (index >= (+currentPage - 1) * pageSize && index < +currentPage * +pageSize)
      })
    }
  }
}
</script>

<style>

</style>
