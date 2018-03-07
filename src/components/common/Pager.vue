<template>
  <div class="c-pager" v-if="total>0">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page.sync="currentPage" :page-sizes="[10,15,20,25,30,50]" :page-size="pageSize" layout="total,sizes,prev,pager,next,jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'customer-pager',
  props: {
    total: 0
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.invokeParentMethod()
    },
    handleCurrentPageChange (val) {
      this.invokeParentMethod()
    },
    invokeParentMethod () {
      let item = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$emit('pageFun', item)
    }
  }
}
</script>

<style lang="less">
.c-pager{
  text-align: right;
  background-color: #FFFFFF;
}
</style>
