<template>
    <div>
    <!--查询表单-->
       <el-form v-model="searchDeliveryForm" ref="searchDeliveryForm" :rules="rules" class="demo-ruleForm" :inline="true">
           <el-form-item label="加工方名称" prop="processorName">
                <el-input v-model="searchDeliveryForm.processorName" @change=" handleSearchReceive"></el-input>
           </el-form-item>
            <el-form-item label="收货时间" prop="DeliveryDate">
                <el-date-picker v-model="searchDeliveryForm.receiveDate" :editable="false"  placeholder="请选择日期" ></el-date-picker>
           </el-form-item>
           <el-form-item label="款号" prop="designId">
                <el-input v-model="searchDeliveryForm.designCode"  @change=" handleSearchReceive"></el-input>
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
           <el-table-column label="图片"> 
             <template>
                <img src="../../assets/1.jpg" class="image">
            </template>
           </el-table-column>
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
                   </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                   <el-button type="danger" @click="deleteReceiveVisiable = false">关闭</el-button>
              </div>
       </el-dialog>
    </div> 
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'
import router from '@/router'

export default{
      data(){
          return{
             searchDeliveryForm:{
                 processorName: '',
                 receiveDate: '',
                 designCode: ''
             },
             receiveInfo:[],
             _receiveInfo:[],
             deleteReceiveVisiable: false ,
             receiveID:'',
             rules:{
                 DeliveryDate:[
                     {type:'date',message: '请选择日期类型'}
                 ]
             }
          };
      },
      created: function() {
          this.fetchData();
      },
      methods:{
           fetchData() {
              Vue.http.get(Api.backend_url + '/Process/receivelist').then(response => {
                    this.receiveInfo= response.body.data;
                    this._receiveInfo = this.receiveInfo;
                     console.log(response);
                }, response => {
                    console.log(response);
                });
          },
          //这个地方不知道_receiverInfo会不会有designCode******************************8
          handleSearchReceive() {
            this.receiveInfo = this._receiveInfo.filter((el, idx, arr) => {
              return el.processorName.indexOf(this.searchDeliveryForm.processorName) >= 0 ||  el.designCode.indexOf(this.searchDeliveryForm.designCode) >= 0
            });
          },
          searchDelivery(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Process/queryReceive', this.searchDeliveryForm).then(response => {
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
            this.receiveID = receiveID;
        },
        deleteReceiveTo(receiveID){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Process/cancelReceive', this.receiveID).then(response => {
             deleteReceiveVisiable = false;
              this.$message('废弃成功!');
              console.log(response);
            }, response => {
              console.log(response);
            });

        },
        handleEdit(receiveID){
             Vue.http.options.emulateJSON = true;
             Vue.http.post(Api.backend_url + '/Process/getReceive', this.receiveID).then(response => {
               let receiveInfo = response.body.data;
               router.push('/Receive_Modify/'+receiveInfo);
              console.log(response);
            }, response => {
              console.log(response);
            });
             
        },
        handlePrint(receiveID){
             Vue.http.options.emulateJSON = true;
             Vue.http.post(Api.backend_url + '/Process/printReceive', this.receiveID).then(response => {
               let receiveInfo = response.body.data;
               router.push('/Receive_print/'+receiveInfo);
              console.log(response);
            }, response => {
              console.log(response);
            });
        }

      }

}

</script>