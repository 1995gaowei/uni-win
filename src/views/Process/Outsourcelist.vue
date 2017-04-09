<template>
<div>
     <el-form v-model="outsourceForm" ref="outsourceForm" class="demo-ruleForm" :rules="rules" :inline="true">
         <el-form-item label="外发单号" prop="outsourceForm">
            <el-input v-model="outsourceForm.outsourceCode" @change="handlesearchOutSource"></el-input>
         </el-form-item>
         <el-form-item label="款式编号" prop="outsourceForm">
            <el-input v-model="outsourceForm.designCode" @change="handlesearchOutSource"></el-input>
         </el-form-item>
         <br>
         <el-form-item label="外发时间" prop="outsourceForm">
            <el-date-picker v-model="outsourceForm.osDate" ></el-date-picker>
         </el-form-item>
         <el-form-item label="预交日期" prop="outsourceForm">
            <el-date-picker v-model="outsourceForm.finishDate"></el-date-picker>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="searchOut('outsourceForm')">查询</el-button>
         </el-form-item>
     </el-form>
     <span>外发单详情>></span>
     <el-table v-model="outsourceDetails">
         <el-table-column label="图片">
          <template scope="scope">
          <img src="../../assets/logo.png" class="image">
          </template>
        </el-table-column>
         <el-table-column label="外发单号"> 
           <template  scope="scope">
              <table>
                 <tr>
                   <td>单号:</td>
                   <td>{{scope.row.osCode}}</td>
                 </tr>
                 <tr>
                   <td>数量:</td>
                   <td>{{scope.row.sum}}</td>
                 </tr>
                 <tr>
                   <td>优先级:</td>
                   <td>{{scope.row.osPriority}}</td>
                 </tr>
              </table>
           </template>                
         </el-table-column>
         <el-table-column label="款式信息"> 
          <template  scope="scope">
              <table>
                 <tr>
                   <td>款号:</td>
                   <td>{{scope.row.designCode}}</td>
                 </tr>
                 <tr>
                   <td>名称:</td>
                   <td>{{scope.row.designName}}</td>
                 </tr>
              </table>
           </template>              
         </el-table-column>
         <el-table-column label="外发信息">  
         <template  scope="scope">
              <table>
                 <tr>
                   <td>外发时间:</td>
                   <td>{{scope.row.osDate}}</td>
                 </tr>
                 <tr>
                   <td>预约时间:</td>
                   <td>{{scope.row.finishDate}}</td>
                 </tr>
              </table>
           </template>          
         </el-table-column>
         <el-table-column label="加工方">   
         <template  scope="scope">
              <table>
                 <tr>
                   <td>名称:</td>
                   <td>{{scope.row.processorName}}</td>
                 </tr>
                 <tr>
                   <td>电话:</td>
                   <td>{{scope.row.processorMobile}}</td>
                 </tr>
              </table>
           </template>       
         </el-table-column>
         <el-table-column prop="outsourceState" label="状态"></el-table-column>
         <el-table-column label="操作">
              
              <template scope="scope">
                 <el-button-group>
                   <el-tooltip content="修改" placement="top">
                    <el-button type="primary" size="small" @click="handleUpdate(scope.row.outsourceCode)" icon="edit"></el-button>
                   </el-tooltip>
                   <el-tooltip content="废弃" placement="top">
                    <el-button type="primary" size="small" @click="handleAbandon(scope.row.outsourceCode)" icon="delete"></el-button>
                   </el-tooltip>
                   <el-tooltip content="收货" placement="top">
                    <el-button type="primary" size="small" @click="handleReceive(scope.row.outsourceCode,scope.row.outsourceState)" icon="check"></el-button>
                   </el-tooltip>
                   <el-tooltip content="打印" placement="top">
                    <el-button type="primary" size="small" @click="handlePrint(scope.row.outsourceCode)" icon="document"></el-button>
                   </el-tooltip>
                 </el-button-group>
              </template>
         </el-table-column>
     </el-table>
     <!--外发单收货-->
    <el-dialog v-model="ReceiveVisible" title="外发单收货">
      <el-form v-model="ReceiveOutSourceForm"  :rules="rules" ref="ReceiveOutSourceForm" class="demo-ruleForm">
         <el-form-item label="外发单号" prop="outsourceCode">
            <el-input v-model="ReceiveOutSourceForm.outsourceCode" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="状态" prop="outsourceState">
           <el-select v-model="ReceiveOutSourceForm.outsourceState">
               <el-option>待收货</el-option>
               <el-option>部分收货</el-option>
               <el-option>已完结</el-option>
           </el-select>
         </el-form-item>
         <el-form-item>
               <el-button type="primary" @click="addReceiveOutSource('ReceiveOutSourceForm')">保存</el-button>
               
         </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="ReceiveVisible = false " >关闭</el-button>
     </div>
   </el-dialog>
   <!--废弃外发单-->
   <el-dialog v-model="abandonVisible" title="废弃外发单">
      <el-form v-model="outsourceCode">
            <el-form-item label="外发单号">
                <el-input  v-model="outsourceCode"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="abandonOutSource('outsourceCode')">废弃</el-button>
               
            </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="abandonVisible = false">关闭</el-button>
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
            outsourceForm:{
                outsourceCode: '',
                designCode: '',
                osDate: '',
                finishDate: ''
            },
            outsourceDetails: [],
            _outsourceDetails: [],
            ReceiveVisible: false,
            abandonVisible: false,
            ReceiveOutSourceForm:{
                outsourceCode:'',
                outsourceState:''
            },
            outsourceCode:'',
            rules:{
                osDate:[
                    {type:'date' ,message:'请输入日期类型'}
                ],
                finishDate:[
                    {type:'date' ,message:'请输入日期类型'}
                ]
            }
        };
    },
      created: function() {
          this.fetchData();
      },
    methods:{
        fetchData() {
              Vue.http.get(Api.backend_url + '/Process/outsourcelist').then(response => {
                    this.outsourceDetails = response.body.data;
                    this._outsourceDetails = this.outsourceDetails;
                }, response => {
                    console.log(response);
                });
          },
          handlesearchOutSource(){
            this.outsourceDetails = this._outsourceDetails.filter((el, idx, arr) => {
              return el.outsourceCode.indexOf(this.outsourceForm.outsourceCode) >= 0 || el.designCode.indexOf(this.outsourceForm.designCode) >= 0
            });
          },
        
         addReceiveOutSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Process/changeState', this.ReceiveOutSourceForm).then(response => {
                 this.$message('收货单提交成功');
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
         searchOut(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/queryOutSource', this.outSourceForm).then(response => {
                 this.outsourceDetails = response.body.data;
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
         abandonOutSource(outsourceCode){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Process/cancelOutSource', outsourceCode).then(response => {
                //此处需要跳转到cancleoutsource*************************************************
                 console.log(response);
            }, response => {
              console.log(response);
            });
         },
          handleAbandon(outsourceCode){
               abandonVisible=true;
               this.outsourceCode = outsourceCode ;

          },
          handleReceive(outsourceCode,outsourceState){
               ReceiveVisible = true ;
               this.ReceiveOutSourceForm.outsourceCode = outsourceCode ;
               this.ReceiveOutSourceForm.outsourceState = outsourceState;
          },
         handleUpdate(outsourceCode){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/getOutSource',outsourceCode).then(response => {
                 let newOS=response.body.data;
                 router.push('/Process/outsource_modify/'+newOS);
                 console.log(response);
            })
          },
         handlePrint(outsourceCode){
           Vue.http.options.emulateJSON = true;
           Vue.http.post(Api.backend_url + '/Processor/printOutSource',outsourceCode).then(response => {
                 let newOS=response.body.data;
                 router.push('/Process/outsource_print/'+newOS);
                 console.log(response);
            })
         }

    }
}
</script>