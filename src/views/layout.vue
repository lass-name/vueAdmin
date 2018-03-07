<template>
  <div class="layout-box">
    <el-container>
      <el-header height="70px">
        <v-header></v-header>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <v-sidebar></v-sidebar>
        </el-aside>
        <el-container>
          <el-main>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view />
          </el-main>
          <el-footer height="50px;"><strong>Copyright &copy; 2018 <a href="#">Admin后台管理系统</a>.</strong> All rights reserved. <span><a href="#">版本:0.1.0</a></span></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import vHeader from '../components/common/Header'
import vSidebar from '../components/common/Sidebar'
export default {
  name: 'layout',
  data () {
    return {}
  },
  components: {
    vHeader,
    vSidebar
  }
}
</script>

<style lang="less">
.layout-box {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-footer{
    background-color: #FFF999;
    padding: 14px 20px;
    font-size: 14px;
    a{
      text-decoration: none;
      font-weight: normal;
      color:#999;
    }
  }
  .el-main{
    background-color: #F2F2F2;
    padding: 20px 10px;
  }
  .el-breadcrumb{
    margin-bottom: 15px;
  }
}
</style>
