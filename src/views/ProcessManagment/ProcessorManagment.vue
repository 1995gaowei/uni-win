<template>
<div>
    <el-form ref="processorForm" :rules="rules">
       <el-form-item label="加工方名称">
           <el-input v-model="processorName"></el-input>
       </el-form-item>  
       <el-form-item>
       <el-button type="primary" @click="searchProcessor('processorForm')">查询</el-button>
       <el-button type="primary" @click="dialogAddProcessor = true">新增</el-button>
       </el-form-item>
    </el-form>
    <el-table :data="prcessor" stripe style="width:100%" >
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
    <el-dialog title="新增加工方" v-model="dialogAddProcessor">
        <el-form :model="newProcessor" ref="newProcessorForm">
            <el-form-item label="加工方编号" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="加工方名称" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorName" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="加工方状态" :label-width="formLabelWidth">
                 <el-select v-model="newProcessor.processorState" placeholder="请选择状态">
                      <el-option label="启用" value="启用"></el-option>
                      <el-option label="停用" value="停用"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="初始密码" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorInitialPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="加工方手机" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorMobileNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="加工方等级" :label-width="formLabelWidth">
                 <el-select v-model="newProcessor.processorRank" placeholder="请选择等级">
                      <el-option label="A" value="A"></el-option>
                      <el-option label="B" value="B"></el-option>
                      <el-option label="C" value="C"></el-option>
                      <el-option label="D" value="D"></el-option>
                      <el-option label="E" value="E"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="加工方地址" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorAddr" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="加工人数" :label-width="formLabelWidth">
                 <el-input v-model.number="newProcessor.processorWorkerNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="加工方区域" :label-width="formLabelWidth">
                 <el-input v-model="newProcessor.processorDistrict" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="送货类型" :label-width="formLabelWidth">
                 <el-select v-model="newProcessor.DeliveryType" placeholder="请选择送货类型">
                      <el-option label="送货" value="送货"></el-option>
                      <el-option label="自提" value="自提"></el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="起始时间" :label-width="formLabelWidth">
                <el-date-picker  type="date" placeholder="选择日期" v-model="newProcessor.startingDate" style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item  label="备注" :label-width="formLabelWidth">
                <el-input v-model="newProcessor.processorComment"  auto-complete="off"> </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addProcessorTo('newProcessorForm')">添加</el-button>
                 <el-button type="primary" @click="dialogAddProcessor = false">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!--收货-->
    <el-dialog title="加工方收货">
        <el-form v-model="takeDeliveryInfo" ref="takeDeliveryInfoForm" :rules="rules">
            <el-form-item label="加工方编号" v-model="takeDeliveryInfo.processorCode">  </el-form-item>
            <el-form-item label="外发单号" v-model="takeDeliveryInfo.puttingOut">  </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="takeDeliverying('takeDeliveryInfoForm')">收货</el-button>
                <el-button type="primary" @click="dialogtakeDelivery = false">关闭</el-button>
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
          processorName: '',
          processor: [],
          newProcessor: [],
          takeDeliveryInfo:{
              processorCode: '',
              puttingOut: ''
          },
          dialogAddProcessor: false,
          dialogtakeDelivery: false,
          formLabelWidth: '120px'
       };
    },
    rules:{
       processorCode:[
           {required: true , message: '请输入加工方编号' }
       ],
       processorName:[
           {required: true , message: '请输入加工方名称' }
       ],
       processorState:[
           {required: true , message: '请输入加工方状态' }
       ],
       processorInitialPassword:[
           {required: true , message: '请输入初始密码' }
       ],
       processorMobileNum:[
           {required: true , message: '请输入加工方手机' }
       ],
       processorRank:[
           {required: true , message: '请输入加工方等级' }
       ],
       processorAddr:[
           {required: true , message: '请输入加工方地址' }
       ],
       processorWorkerNum:[
           {required: true , message: '请输入加工人数'},
           {type: 'number', message: '人数必须为整数' }
       ],
       processorDistrict:[
           {required: true , message: '请输入加工方区域' }
       ],
       DeliveryType:[
           {required: true , message: '请输入送货类型' }
       ],
       startingDate:[
           {required: true , message: '请输入起始时间' },
           {type: 'date' , message: '输入必须为日期类型'}
       ],
       puttingOut:[
           {required: true , message: '请输入外发单号' }
       ]
  },
    methods:{
        searchProcessor(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/GetProcessor', this.processorName).then(response => {
               this.processor = response.body.data;
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
        showTakeDelivery(processorCode){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/GetProcessor', this.processorName).then(response => {
               this.takeDeliveryInfo = response.body.data;
               dialogtakeDelivery = true;
               console.log(response);
            }, response => {
              console.log(response);
            });
        },
        addProcessorTo(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addProcessor', this.newProcessor).then(response => {
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
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addDelivery', this.takeDeliveryInfo).then(response => {
              console.log(response);
            }, response => {
              console.log(response);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
     }
}
</script>
