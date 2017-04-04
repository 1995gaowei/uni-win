<template>
<div>
     <el-form v-model="outsourceForm" ref="outsourceForm" class="demo-ruleForm" :rules="rules" :inline="true">
         <el-form-item label="外发单号" prop="outsourceForm">
            <el-input v-model="outsourceForm.outsourceCode"></el-input>
         </el-form-item>
         <el-form-item label="款号" prop="outsourceForm">
            <el-input v-model="outsourceForm.designCode"></el-input>
         </el-form-item>
         <el-form-item label="外发时间" prop="outsourceForm">
            <el-date-picker v-model="outsourceForm.outDate"></el-date-picker>
         </el-form-item>
         <el-form-item label="预交日期" prop="outsourceForm">
            <el-date-picker v-model="outsourceForm.finishDate"></el-date-picker>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="searchOut('outsourceForm')">查询</el-button>
         </el-form-item>
     </el-form>
     <!--外发单详情列表，此处分页没有写,每行中的详情也没写****************************************-->
     <span>外发单详情>></span>
     <el-table v-model="outsourceDetails">
         <el-table-column prop="picture" label="图片"></el-table-column>
         <el-table-column prop="outsourceCodeInfo" label="外发单号">                 
         </el-table-column>
         <el-table-column prop="designInfo" label="款式信息">             
         </el-table-column>
         <el-table-column prop="outsourceInfo" label="外发信息">           
         </el-table-column>
         <el-table-column prop="processorInfo" label="加工方">         
         </el-table-column>
         <el-table-column prop="outsourceState" label="状态"></el-table-column>
         <el-table-column label="操作">
              <!--此处添加几个操作按钮，还没想好怎么排版好看-->        
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
               <el-button type="primary" @click="ReceiveVisible = false " >关闭</el-button>
         </el-form-item>
     </el-form>
   </el-dialog>
   <!--废弃外发单-->
   <el-dialog v-model="abandonVisible" title="废弃外发单">
      <el-form v-model="outsourceCode">
            <el-form-item label="外发单号">
                <el-input  v-model="outsourceCode"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" @click="abandonOutSource('outsourceCode')">废弃</el-button>
                <el-button type="primary" @click="abandonVisible = false">关闭</el-button>
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
            outsourceForm:{
                outsourceCode: '',
                designCode: '',
                outDate: '',
                finishDate: ''
            },
            outsourceDetails: [],
            ReceiveVisible: false,
            abandonVisible: false,
            ReceiveOutSourceForm:{
                outsourceCode:'',
                outsourceState:''
            },
            outsourceCode:'',
            rules:{
                outDate:[
                    {type:'date' ,message:'请输入日期类型'}
                ],
                finishDate:[
                    {type:'date' ,message:'请输入日期类型'}
                ]
            }
        };
    },
    methods:{
         addReceiveOutSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addReceiveOutSource', this.ReceiveOutSourceForm).then(response => {
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
            Vue.http.post(Api.backend_url + '/Processor/abandonOutSource', outsourceCode).then(response => {
                 console.log(response);
            }, response => {
              console.log(response);
            });
         },
         updateOutSource(outsourceCode){
             //转到修改页面-->
         },
         printOutSource(outsourceCode){
             //转到打印页面-->
         }

    }
}
</script>