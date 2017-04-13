<template>
   <div>
   
       <el-form :model="newOutSourceForm" ref="newOutSourceForm" inline class="half-form-l" :rules="rules" label-position="left" label-width="130px">
           <el-form-item  label="生产单号" prop="productionCode">
               <el-input v-model="newOutSourceForm.productionCode"  placeholder="生产单号"></el-input>
           </el-form-item>
           <el-form-item  label="款号" prop="designCode">
               <design-select v-model="newOutSourceForm.designCode"></design-select>
            </el-form-item>
            <el-form-item prop="processorCode" label="加工方" >
                <processor-select v-model="newOutSourceForm.processorCode"></processor-select>
            </el-form-item>
            <el-form-item prop="userAccount"  label="外发负责人">
                <user-select v-model="newOutSourceForm.userAccount"></user-select>
            </el-form-item>
            <el-form-item prop="labourCost" label="实际工价">
                <el-input v-model.number="newOutSourceForm.labourCost"></el-input>
           </el-form-item>
           <el-form-item  label="订单状态" prop="outSourceState">
              <el-select v-model="newOutSourceForm.outSourceState" placeholder="请选择订单状态">
                  <el-option label="待收货" value="待收货"></el-option>
                  <el-option label="部分收货" value="部分收货"></el-option>
                  <el-option label="已收货" value="已收货"></el-option>
              </el-select>
           </el-form-item>
           <el-form-item  label="约定完成日期" prop="finishDate">
               <el-date-picker v-model="newOutSourceForm.finishDate"  placeholder="请选择日期"></el-date-picker>
           </el-form-item>
           <el-form-item  label="实际外发日期" prop="actualOutDate">
               <el-date-picker v-model="newOutSourceForm.actualOutDate"  placeholder="请选择日期"></el-date-picker>
           </el-form-item>
       </el-form>
       
        <h4 style="font-weight: normal; display: inline-block;">详情</h4>

        <el-row type="flex" justify="space-around">
            <el-col :span="7">
                <label class="detailLabel"> XS </label><el-input-number v-model="newOutSourceForm.xs" :min="0"></el-input-number>
            </el-col>
            <el-col :span="7">
                <label class="detailLabel"> S </label><el-input-number v-model="newOutSourceForm.s" :min="0"></el-input-number>
            </el-col>
            <el-col :span="7">
                <label class="detailLabel"> M </label><el-input-number v-model="newOutSourceForm.m" :min="0"></el-input-number>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" style="margin-top: 20px;">
            <el-col :span="7">
                <label class="detailLabel"> L </label><el-input-number v-model="newOutSourceForm.l" :min="0"></el-input-number>
            </el-col>
            <el-col :span="7">
                <label class="detailLabel"> XL </label><el-input-number v-model="newOutSourceForm.xl" :min="0"></el-input-number>
            </el-col>
            <el-col :span="7">
                <label class="detailLabel"> XXL </label><el-input-number v-model="newOutSourceForm.xxl" :min="0"></el-input-number>
            </el-col>
        </el-row>

        <h4 style="font-weight: normal; display: inline-block;">合计 <span style="font-weight: bold; margin-left: 40px; font-size: 1.2rem;">{{this.total}}</span></h4>
         
       <div style="text-align: right;">   
            <el-button @click="reset('newOutSourceForm')"> 重置 </el-button>
            <el-button type="success" @click="addNewSource('newOutSourceForm')"> 确认新增 </el-button>
       </div>
   </div>
</template>


<script>
import Vue from 'vue'
import Api from '@/config/api'
import DesignSelect from '@/components/DesignSelect'
import ProcessorSelect from '@/components/ProcessorSelect'
import UserSelect from '@/components/UserSelect'

export default{
    components:{
        DesignSelect, ProcessorSelect, UserSelect
    },
    computed: {
        total: function () {
            return this.newOutSourceForm.xs+this.newOutSourceForm.s+this.newOutSourceForm.m+this.newOutSourceForm.l+this.newOutSourceForm.xl+this.newOutSourceForm.xxl;
        }
    },
    data(){
        return{
            newOutSourceForm:{
                outSourceCode:'',
                productionCode:'',
                designCode:'',
                finishDate:'',
                osScheduleDate:'',
                outSourceState:'',
                labourCost:'',
                processorCode:'',
                actualOutDate:'',
                userAccount:'',
                xs: 0,
                s: 0,
                m: 0,
                l: 0,
                xl: 0,
                xxl: 0,
                total: 0
            },
                rules:{
                    productionCode:[
                         {required:true , message: '请输入生产单号'}
                    ],
                    designCode:[
                        {required:true , message: '请选择款号'}
                    ],
                    finishDate:[
                        {required:true , message: '请输入约定完成日期'}
                    ],
                    actualOutDate:[
                        {required:true , message: '请输入实际外发日期'}
                    ],
                    outSourceState:[
                        {required:true , message: '请选择订单状态'}
                    ],
                    labourCost:[
                        {required:true , message: '请输入实际工价'},
                        { type: 'number', message: '实际工价必须为数字值' }
                    ],
                    processorCode:[
                        {required:true , message: '请选择加工方'}
                    ],
                    actualOutDate:[
                         {required:true , message: '请输入实际外发时间'}
                    ],
                    userAccount: [
                        {required: true, message: '请选择外发负责人'}
                    ]
                }
        };
    },
    methods:{
        addNewSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
              this.newOutSourceForm.outSourceCode = 'WFD' + new Date().getTime();
              this.newOutSourceForm.finishDate = this.newOutSourceForm.finishDate.toJSON();
              this.newOutSourceForm.actualOutDate = this.newOutSourceForm.actualOutDate.toJSON();
              this.newOutSourceForm.total = this.total;
            Vue.http.post(Api.backend_url + '/Process/addOutSource', this.newOutSourceForm).then(response => {
                console.log(response);
                this.reset('newOutSourceForm');
                this.$message({
                    message: '新增外发单成功',
                    type: 'success'
                });
            }, response => {
              console.log(response);
            });
          
          } else {
            console.log('error submit!!');
            return false;
          }
        });  
        },
        reset(formName){
             this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.detailLabel {
    display: inline-flex;
    width: 40px;
}

.el-input-number {
    display: inline-flex;
}

</style>