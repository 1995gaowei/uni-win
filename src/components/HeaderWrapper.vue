<template>
        <el-row>
            <el-col :span="6"><h2 class="logo">UniWin</h2></el-col>
            <el-col :span="4" :offset="14">
                <div>
                    <el-menu theme="dark" :default-active="activeIndex" class="nav" mode="horizontal" @select="handleSelect">
                        <el-submenu index="1">
                            <template slot="title">员工1</template>
                            <el-menu-item index="1-1"><i class="el-icon-setting"></i> 设置</el-menu-item>
                            <el-menu-item index="1-2"><i class="el-icon-time"></i> 注销</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>
        </el-row>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-row {
    background-color:  #324157;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
}

.logo {
    color: #bfcbd9;
    margin: 0;
    line-height: 60px;
    text-align: center;
}
</style>