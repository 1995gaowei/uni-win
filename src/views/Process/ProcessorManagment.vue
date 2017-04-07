<template>
<div>
    <el-form v-model="processorInfo"   :inline="true">
       <el-form-item label="加工方" style="width:40%">
           <el-input v-model="processorInfo" @change="handleSearchProcessor"></el-input>
       </el-form-item>  
       <el-form-item>
       <el-button type="primary" @click="searchProcessor">查询</el-button>
       <el-button type="primary" @click="dialogAddProcessor = true">新增</el-button>
       </el-form-item>
    </el-form>
    <el-table :data="prcessor" stripe style="width:100%;" >
        <el-table-column prop="processorName" label="加工方名称"> </el-table-column>
        <el-table-column prop="processorCode" label="加工方编号"> </el-table-column>
        <el-table-column prop="processorRank" label="等级"> </el-table-column>
        <el-table-column prop="processorState" label="状态"> </el-table-column>
        <el-table-column prop="processorMobileNum" label="手机"> </el-table-column>
        <el-table-column prop="processorAddr" label="加工方地址"> </el-table-column>
        <el-table-column prop="processorDistrict" label="加工方区域"> </el-table-column>
        <el-table-column prop="DeliveryType" label="送货类型"> </el-table-column>
        <el-table-column label="操作">
             <template scope="scope">
             <el-button  size="small" type="primary"  @click="showTakeDelivery(scope.row.processorCode)"> 收货 </el-button>
             </template>
        </el-table-column>
    </el-table>
    <!--新增加工方-->
    <el-dialog title="新增加工方" v-model="dialogAddProcessor" >
        <el-form :model="newProcessorForm" ref="newProcessorForm"  :rules="rules" class="demo-ruleForm">
            <el-form-item label="加工方编号" :label-width="formLabelWidth" prop="processorCode">
                 <el-input v-model="newProcessorForm.processorCode"></el-input>
            </el-form-item>
            <el-form-item label="加工方名称" :label-width="formLabelWidth" prop="processorName">
                 <el-input v-model="newProcessorForm.processorName" ></el-input>
            </el-form-item>
             <el-form-item label="加工方状态" :label-width="formLabelWidth" prop="processorState">
                 <el-select v-model="newProcessorForm.processorState" placeholder="请选择状态">
                      <el-option label="启用" value="启用"></el-option>
                      <el-option label="停用" value="停用"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="初始密码" :label-width="formLabelWidth" prop="processorInitialPassword">
                 <el-input v-model="newProcessorForm.processorInitialPassword" ></el-input>
            </el-form-item>
            <el-form-item label="加工方手机" :label-width="formLabelWidth" prop="processorMobileNum">
                 <el-input v-model="newProcessorForm.processorMobileNum" ></el-input>
            </el-form-item>
            <el-form-item label="加工方等级" :label-width="formLabelWidth" prop="processorRank">
                 <el-select v-model="newProcessorForm.processorRank" placeholder="请选择等级">
                      <el-option label="A" value="A"></el-option>
                      <el-option label="B" value="B"></el-option>
                      <el-option label="C" value="C"></el-option>
                      <el-option label="D" value="D"></el-option>
                      <el-option label="E" value="E"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="加工方地址" :label-width="formLabelWidth" prop="processorAddr">
                 <el-input v-model="newProcessorForm.processorAddr" ></el-input>
            </el-form-item>
            <el-form-item label="加工人数" :label-width="formLabelWidth" prop="processorWorkerNum">
                 <el-input v-model.number="newProcessorForm.processorWorkerNum" ></el-input>
            </el-form-item>
            <el-form-item label="加工方区域" :label-width="formLabelWidth" prop="processorDistrict">
                 <el-input v-model="newProcessorForm.processorDistrict" ></el-input>
            </el-form-item>
            <el-form-item label="送货类型" :label-width="formLabelWidth" prop="DeliveryType">
                 <el-select v-model="newProcessorForm.DeliveryType" placeholder="请选择送货类型">
                      <el-option label="送货" value="送货"></el-option>
                      <el-option label="自提" value="自提"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="起始时间" :label-width="formLabelWidth" prop="startingDate">
                <el-date-picker  type="date" placeholder="选择日期" v-model="newProcessorForm.startingDate" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item  label="备注" :label-width="formLabelWidth" prop="processorComment">
                <el-input v-model="newProcessorForm.processorComment" > </el-input>
            </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addProcessorTo('newProcessorForm')">添加</el-button>
                 <el-button type="primary" @click="dialogAddProcessor = false">关闭</el-button>
                 <el-button type="primary" @click="resetForm('newProcessorForm')">重置</el-button>
          </div>
    </el-dialog>
    <!--收货-->
    <el-dialog title="加工方收货" v-model="dialogtakeDelivery">
        <el-form v-model="takeDeliveryInfoForm" ref="takeDeliveryInfoForm" :rules="rules"  class="demo-ruleForm">
            <el-form-item label="加工方编号" v-model="takeDeliveryInfoForm.processorCode"> 
            </el-form-item>
            <el-form-item label="外发单号" v-model="takeDeliveryInfoForm.outsource_Code">  </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="takeDeliverying('takeDeliveryInfoForm')">收货</el-button>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogtakeDelivery = false">关闭</el-button>
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
        
          processorInfo: '',
       
          processor: [],
          _processor: [],
          newProcessorForm: {
             processorCode: '',
             processorName: '',
             processorAddr: '',
             processorComment: '',
             processorDistrict: '',
             processorInitialPassword: '',
             processorMobileNum: '',
             processorRank: '',
             processorState: '',
             processorWorkerNum: '',
             startingDate: '',
             DeliveryType: ''
          },
          takeDeliveryInfoForm:{
              processorCode: '',
              outsource_Code: ''
          },
          dialogAddProcessor: false,
          dialogtakeDelivery: false,
          formLabelWidth: '120px',
    rules:{
       processorCode:[
          { required: true, message: '请输入加工方编号', trigger: 'blur' }
       ],
       processorName:[
           {required: true , message: '请输入加工方名称' ,trigger: 'blur'}
       ],
       processorState:[
           {required: true , message: '请输入加工方状态' ,trigger: 'change'}
       ],
       processorInitialPassword:[
           {required: true , message: '请输入初始密码' ,trigger: 'blur'}
       ],
       processorMobileNum:[
           {required: true , message: '请输入加工方手机' ,trigger: 'blur'}
       ],
       processorRank:[
           {required: true , message: '请输入加工方等级' ,trigger: 'change'}
       ],
       processorAddr:[
           {required: true , message: '请输入加工方地址' ,trigger: 'blur'}
       ],
       processorWorkerNum:[
           {required: true , message: '请输入加工人数',trigger: 'blur'},
           {type: 'number', message: '人数必须为整数' }
       ],
       processorDistrict:[
           {required: true , message: '请输入加工方区域' ,trigger: 'change'}
       ],
       DeliveryType:[
           {required: true , message: '请输入送货类型' ,trigger: 'change'}
       ],
       startingDate:[
           {required: true , message: '请输入起始时间' ,trigger: 'change'},
           {type: 'date' , message: '输入必须为日期类型'}
       ],
       puttingOut:[
           {required: true , message: '请输入外发单号' ,trigger: 'blur'}
       ]
  }
   };
    },
       created: function() {
          this.fetchData();
      },
    methods:{
         fetchData() {
              Vue.http.get(Api.backend_url + '/Process/processorlist').then(response => {
                    this.processor = response.body.data;
                    this._processor = this.processor;
                }, response => {
                    console.log(response);
                });
          },
        searchProcessor(){ 
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/queryProcessor', this.processorInfo).then(response => {
               this.processor = response.body.data;
                   let newProcessor={};
                   for(let k in this.processor ){
                     newProcessor[k] = this.processor[k];
                   }
                  this._processor.unshift(newProcessor);
               console.log(response);
            }, response => {
              console.log(response);
            });      
        },
        handleSearchProcessor() {
            this.processor = this._processor.filter((el, idx, arr) => {
              return el.processorName.indexOf(this.processorInfo) >= 0 || el.processorCode.indexOf(this.processorInfo) >= 0
            });
          },
        showTakeDelivery(processorCode){
               this.takeDeliveryInfo.processorCode=processor;
               this.takeDeliveryInfo.outsource_Code='outcode001';
               dialogtakeDelivery = true;
        
        },
        addProcessorTo(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addProcessor', this.newProcessorForm).then(response => {
              let newProcessor={};
              for(let k in this.newProcessorForm ){
                  newProcessor[k] = this.newProcessorForm[k];
              }
              this._processor.unshift(newProcessor);
              this.$message('添加成功！');
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
        takeDeliverying(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
           let _outsourceCode = this.takeDeliveryInfoForm.outsource_Code;
           let _processorCode = this.takeDeliveryInfoForm.processorCode;            
           router.push('/Receive_new/'+_outsourceCode+_processorCode);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     }
}
</script>
