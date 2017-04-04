<template>
<div>
    <el-form :inline="true" v-model="MaterialInputDateForm" class="demo-ruleForm" :rules="rules" ref="MaterialInputDateForm" label-width="100px"> 
        <el-form-item label="入库时间" prop="materialInputDate">
            <el-date-picker type="date" v-model="MaterialInputDateForm.materialInputDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="search('MaterialInputDateForm')">查询</el-button>
        </el-form-item>
    </el-form>
    <!--此处分页还没写-->
    <el-table style="width:100%">
    <el-table :data="result" style="width:50%">
        <el-table-column prop="materialInputDate" label="入库时间" v-click="showMaterialInDetail('materialinputID')">
        </el-table-column>
        <el-table-column prop="header" label="负责人" >
        </el-table-column>
        <el-table-column prop="materialInputNumber" label="入库数量" >
        </el-table-column>
    </el-table>
     <!--这个地方点击弹出物料详细框不知道对不对-->
    <el-table :data="materials" style="width:50%">         
        <el-table-column prop="materialName" label="面料名称" v-click="materialDetail('result.materialCode')">
        </el-table-column>
        <el-table-column prop="header" label="负责人" >
        </el-table-column>
        <el-table-column prop="materialInputNumber" label="入库数量" >
        </el-table-column>
        <el-table-column prop="storeNumber" label="库存数" >
        </el-table-column>
    </el-table>
    </el-table>
<!--show material Detail-->
     <el-dialog ref="MaterialDetailDialog" title="物料详情" v-model="dialogMaterialVisible">
         <el-form  :disabled="true">
             <el-form-item label="物料编码" :label-width="formLabelWidth">
             <el-input v-model="material.materialCode"></el-input>
             </el-form-item>
             <el-form-item label="物料名称" :label-width="formLabelWidth">
             <el-input v-model="material.materialName"></el-input>
             </el-form-item>
             <el-form-item label="物料类型" :label-width="formLabelWidth">
             <el-input v-model="material.materialType"></el-input>
             </el-form-item>
             <el-form-item label="色号" :label-width="formLabelWidth">
             <el-input v-model="material.colorCode"></el-input>
             </el-form-item>
             <el-form-item label="颜色说明" :label-width="formLabelWidth">
             <el-input v-model="material.colorDescription"></el-input>
             </el-form-item>
             <el-form-item label="成分" :label-width="formLabelWidth">
             <el-input v-model="material.materialIngredient"></el-input>
             </el-form-item>
             <el-form-item label="单价" :label-width="formLabelWidth">
             <el-input v-model="material.unitPrice"></el-input>
             </el-form-item>
             <el-form-item label="单位" :label-width="formLabelWidth">
             <el-input v-model="material.unit"></el-input>
             </el-form-item>
             <el-form-item label="门幅" :label-width="formLabelWidth">
             <el-input v-model="material.width"></el-input>
             </el-form-item>
             <el-form-item label="出量" :label-width="formLabelWidth">
             <el-input v-model="material.outputVol"></el-input>
             </el-form-item>
             <el-form-item label="供应商" :label-width="formLabelWidth">
              <el-input v-for="vendor in material.vendors"></el-input>
             </el-form-item>
             <el-form-item label="仓储位置" :label-width="formLabelWidth">
              <el-input v-for="warehouse in material.warehouses"></el-input>
             </el-form-item>
             <el-button type="primary" @click="dialogMaterialVisible = false">确 定</el-button>
        </el-form>
     </el-dialog>
<!--show material Detail-->
</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
       return{
       MaterialInputDateForm: {
           materialInputDate:''
       },
       result: [],
       material: [],
       materials: [],
       dialogMaterialVisible: false,
       formLabelWidth: '120px',
       rules:{
       materialInputDate: [
            { required: true, message: '请输入入库时间'},
            { type: 'date' ,  message: '输入必须为日期'}
          ]
      }
   };
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
        showMaterialInDetail(materialInputID){
               Vue.http.post(Api.backend_url + '/Material/GetmaterialInputDetail',this.materialInputID).then(response => {
               this.materials= response.body.data;
                console.log(response);
            }, response => {
                console.log(response);
            });   
        },
        materialDetail(materialCode){                              
            Vue.http.post(Api.backend_url + '/Material/GetmaterialDetail',this.materialCode).then(response => {
               this.material= response.body.data;
               dialogMaterialVisible = true;
                console.log(response);
            }, response => {
                console.log(response);
            });     
        }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>