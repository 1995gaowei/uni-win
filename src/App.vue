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

<style>
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
.image {
  width: 100%;
}

.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.half-form-l {
    font-size: 0;
}

.half-form-l .el-form-item {
    width: 50%;
    margin-right: 0;
}

.half-form-l .el-form-item__label {
    float: left;
}

.half-form-l .el-form-item__content {
    margin-left: 130px;
    margin-right: 50px;
    display: block;
}

.half-form-l .el-form-item__content div {
    width: 100%;
}

.half-form-s {
    font-size: 0;
}

.half-form-s .el-form-item {
    width: 50%;
    margin-right: 0;
}

.half-form-s .el-form-item__label {
    float: left;
}

.half-form-s .el-form-item__content {
    margin-left: 100px;
    margin-right: 10px;
    display: block;
}

.half-form-s .el-form-item__content div {
    width: 100%;
}
</style>