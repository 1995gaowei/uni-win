<template>
<div>
    <el-form :inline="true"  class="demo-form-inline" :rules="rules" ref="MaterialInputDateForm" label-width="100px"> 
        <el-form-item label="入库时间">
            <el-input v-model="MaterialInputDateForm"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="search('MaterialInputDateForm')">查询</el-button>
    </el-form-item>
    </el-form>
    <el-table style="width:100%">
    <el-table :data="result" style="width:50%">
        <el-table-column prop="materialInputDate" label="入库时间" >
        </el-table-column>
        <el-table-column prop="header" label="负责人" >
        </el-table-column>
        <el-table-column prop="materialInputNumber" label="入库数量" >
        </el-table-column>
    </el-table>
    <el-table :data="result" style="width:50%">
        <el-table-column prop="materialName" label="面料名称" v-onclick="materialDetail('materialCode')">
        </el-table-column>
        <el-table-column prop="header" label="负责人" >
        </el-table-column>
        <el-table-column prop="materialInputNumber" label="入库数量" >
        </el-table-column>
        <el-table-column prop="storeNumber" label="库存数" >
        </el-table-column>
    </el-table>
    </el-table>
</div>
</template>
<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
       return{
       MaterialInputDateForm: '',
       result: [],
       material: []
   };
  },
  rules:{
       materialInputDateForm: [
            { required: true, message: '请输入入库时间' }
          ]
  },
  methods:{
          search(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/MaterialIn/MaterialInputSearch', this.MaterialInputDateForm).then(response => {
               this.result = response.body.data;
               console.log(response);
            }, response => {
              console.log(response);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        materialDetail(materialCode){                                //此处应弹出物料详情的悬浮框,还不会写
            Vue.http.post(Api.backend_url + '/Material/MaterialList',this.materialCode).then(response => {
                console.log(response);
            }, response => {
                console.log(response);
            });     
        }
  }
}
</script>