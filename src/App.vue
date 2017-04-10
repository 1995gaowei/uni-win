<template>
  <div id="app">
    <header-wrapper></header-wrapper>
    <div class="main-content">
        <side-nav></side-nav>
        <div class="content">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item class="nav1">{{$store.state.title1}}</el-breadcrumb-item>
          <el-breadcrumb-item class="nav2">{{$store.state.title2}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="main-view">
          <router-view></router-view>
        </el-card>
        </div>
    </div>
  </div>
</template>

<script>
import HeaderWrapper from './components/HeaderWrapper'
import SideNav from './components/SideNav'

export default {
  name: 'app',
  components: {
    HeaderWrapper, SideNav
  }
}
</script>

<style scoped>
.content {
  margin:75px 20px 20px 320px;
}
.el-breadcrumb {
  line-height: 1.5rem;
}
.nav1 {
  font-size: 1.5rem;
}
.nav2 {
  font-size:1rem;
}
.main-view {
  margin-top: 15px;
  min-height:500px;
}
</style>