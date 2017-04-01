<template>
<div>
     <el-form :inline="true"  v-model="getmaterial"  class="demo-form-inline" :rules="rules" ref="MaterialInputForm" label-width="100px">
      <el-form-item label="物料编码">
      <el-input v-model="getmaterial.materialCode" ></el-input>
     </el-form-item>
     <el-form-item label="款号">
      <el-input v-model="getmaterial.designId"></el-input>
     </el-form-item>
     <el-form-item label="入库类型">
      <el-select v-model="getmaterial.materialInput" >
      <el-option label="面料" value="面料"></el-option>
      <el-option label="辅料" value="辅料"></el-option>
      </el-select>
     </el-form-item>
     <el-form-item label="采购单号">
      <el-input v-model="getmaterial.buyId"></el-input>
     </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search('getmaterial')">查询</el-button>
    </el-form-item>
     </el-form>

     <el-table :data="result" style="width:100%">
        <el-table-column prop="materialCode" label="物料编码" >
        </el-table-column>
        <el-table-column prop="materialName" label="物料名称" >
        </el-table-column>
        <el-table-column prop="materialType" label="物料类型" >
        </el-table-column>
        <el-table-column prop="vendor" label="供应商" >
        </el-table-column>
        <el-table-column prop="color" label="颜色">
        </el-table-column>
     </el-table>    
</div>     
</template>

<script>
  import Vue from 'vue'
  import Api from '@/config/api'

export default {
  data () {
       return{
       getmaterial:{
          materialCode:'',
          designId:'',
          materialInput:'',
          buyId:''
       },
       result:[]
   };
  },
  //GetMaterial.vue还没写
  methods:{
       search(getmaterial){
           if(getmaterial.materialCode||getmaterial.designId||getmaterial.materialInput||getmaterial.buyId)   {//不能全部为空
              Vue.http.post(Api.backend_url + '/MaterialIn/GetMaterial', this.getmaterial).then(response => {
                  this.result=response.body.data;
                   console.log(response);
            }, response => {
              console.log(response);
            });   
           } 
           else{
            console.log('error submit!!');
            return false;
           } 
       }
  }
}
</script>