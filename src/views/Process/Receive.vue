<template>
    <div>
    <!--查询表单-->
       <el-form v-model="searchDeliveryForm" ref="searchDeliveryForm" :rules="rules" class="demo-ruleForm" :inline="true">
           <el-form-item label="加工方名称" prop="processorName">
                <el-input v-model="searchDeliveryForm.processorName"></el-input>
           </el-form-item>
            <el-form-item label="收货时间" prop="DeliveryDate">
                <el-date-picker v-model="searchDeliveryForm.DeliveryDate" :editable="false"  placeholder="请选择日期"></el-date-picker>
           </el-form-item>
           <el-form-item label="款号" prop="designId">
                <el-input v-model="searchDeliveryForm.designId"></el-input>
           </el-form-item>
           <el-form-item>
                <el-button type="primary" @click="searchDelivery('searchDeliveryForm')">查询</el-button>
           </el-form-item>
       </el-form>

       <!--收货单列表-->
         <el-table :data="receiveInfo" stripe style="width:100%;"> 
           <el-table-column prop="processorCode" label="加工方编码"></el-table-column>
           <el-table-column prop="receiveDate"   label="收货时间"></el-table-column>
           <el-table-column prop="receiverName"  label="收货人"> </el-table-column>
           <el-table-column prop="receiveNumber" label="数量"></el-table-column>
           <el-table-column prop="picture"       label="图片"> </el-table-column>
           <el-table-column prop="processorDistrict" label="加工方区域"></el-table-column>
           <el-table-column prop="receiveType"   label="收货类型"></el-table-column>
           <el-table-column                      label="操作">
               <template scope="scope">
                     <el-button   size="small" @click="handleEdit(scope.row.receiveID)">修改</el-button>
                     <el-button   size="small"  type="danger" @click="handleDelete(scope.row.receiveID)">废弃</el-button>
                     <el-button   size="small"  type="info" @click="handlePrint(scope.row.receiveID)">打印</el-button>
              </template>
           </el-table-column>
       </el-table>
       <!--废弃收货单对话框-->
       <el-dialog title="废弃收货单" v-model="deleteReceiveVisiable">
              <el-form   :disabled="true">
                   <el-form-item label="收货单号">
                      <el-input  v-model="receiveID">
                      </el-input>
                   </el-form-item>
                   <el-form-item>
                      <el-button type="danger" @click="deleteReceiveTo('receiveID')">废弃</el-button>
                      <el-button type="danger" @click="deleteReceiveVisiable = false">关闭</el-button>
                   </el-form-item>
              </el-form>
       </el-dialog>
    </div> 
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default{
      data(){
          return{
             searchDeliveryForm:{
                 processorName: '',
                 DeliveryDate: '',
                 designId: ''
             },
             receiveInfo:[],
             deleteReceiveVisiable: false ,
             receiveID:'',
             rules:{
                 DeliveryDate:[
                     {type:'date',message: '请选择日期类型'}
                 ]
             }
          };
      },
      methods:{
          searchDelivery(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/receive/getReceive', this.searchDeliveryForm).then(response => {
              this.receiveInfo = response.body.data;
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
        handleDelete(receiveID){
            deleteReceive = true;
            this.receiveID=receiveID;
        },
        deleteReceiveTo(receiveID){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/receive/deleteReceive', this.receiveID).then(response => {
             deleteReceiveVisiable = false;
              this.$message('废弃成功!');
              console.log(response);
            }, response => {
              console.log(response);
            });

        },
        handleEdit(receiveID){
              //此处为跳转至新增收货单界面AddReceive
        },
        handlePrint(receiveID){
            //此处为跳转至打印界面
        }

      }

}

</script>