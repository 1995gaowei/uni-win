<template>
   <div>
   
       <el-form :model="OutSourceForm" ref="OutSourceForm" :inline="true" class="demo-ruleForm" :rules="rules">
           <el-form-item  label="外发单号" prop="outsourceCode">
               <el-input v-model="OutSourceForm.outsourceCode"  placeholder="外发单号" :disabled="true"></el-input>
           </el-form-item> 
           <el-form-item  label="生产单号" prop="productionCode">
               <el-input v-model="OutSourceForm.productionCode"  placeholder="生产单号"></el-input>
           </el-form-item>
           <el-form-item  label="款号" prop="designCode">
               <el-input v-model="OutSourceForm.designCode"  placeholder="款号"></el-input>
           </el-form-item>
           <el-form-item  label="款式名称" prop="designName">
               <el-input v-model="OutSourceForm.designName"  placeholder="款式名称"></el-input>
           </el-form-item>
           <el-form-item  label="约定完成日期" prop="finishDate">
               <el-date-picker v-model="OutSourceForm.finishDate"  placeholder="请选择日期" :editable="false"></el-date-picker>
           </el-form-item>
           <el-form-item  label="排单时间" prop="osScheduledate">
               <el-date-picker v-model="OutSourceForm.osScheduledate"  placeholder="请选择日期" :editable="false"></el-date-picker>
           </el-form-item>
           <el-form-item  label="订单优先级" prop="outsourceRank">
               <el-input v-model="OutSourceForm.outsourceRank"   ></el-input>
           </el-form-item>
           <el-form-item  label="订单状态" prop="outsourceState">
              <el-select v-model="OutSourceForm.outsourceState" placeholder="请选择订单状态">
                  <el-option label="待收货" value="待收货"></el-option>
                  <el-option label="部分收货" value="部分收货"></el-option>
                  <el-option label="已收货" value="已收货"></el-option>
              </el-select>
           </el-form-item>
       </el-form>
       <!--外发单详情-->
      <span>外发单详情>></span>
      <table class="table table-striped" id="tab-detail">
            <tr>
                <th>颜色</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>XL</th>
                <th>XXL</th>
                <th>合计</th>
                <th>操作</th>
           </tr>
           <template  v-for="k in OutSourceForm.details">
           <tr>
                <td>{{k.outsourceColor}}</td>
                <td>{{k.outsourceXS}}</td>
                <td>{{k.outsourceS}}</td>
                <td>{{k.outsourceM}}</td>
                <td>{{k.outsourceL}}</td>
                <td>{{k.outsourceXL}}</td>
                <td>{{k.outsourceXXL}}</td>
                <td>{{k.outsourceTotal}}</td>
                <td>
                 <template>
                   <el-button type="primary" icon="delete" @click="deleteDetail(k.$index)">                 
                 </el-button>
               </template>
                </td>
           </tr>
           </template>
           <tr>
                <td><el-input     v-model="newDetailForm.outsourceColor" ></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceXS"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceS"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceM"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceL"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceXL"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceXXL"></el-input></td>
                <td><el-input     v-model.number="newDetailForm.outsourceTotal" :disabled="true"></el-input></td>
                <td>
                   <template>
                     <el-button type="primary" icon="plus" @click="addDetail"></el-button>
                   </template>
                </td>
            </tr>
        </table>    
        
        <br>
         


          <el-form v-model="OutSourceForm" ref="OutSourceForm2" :rules="rules" class="demo-ruleForm" :inline="true">
              <el-form-item prop="labourCost" label="实际工价">
                   <el-input v-model="OutSourceForm.labourCost"></el-input>
              </el-form-item>
               <el-form-item prop="processorID" label="加工方" >
                   <el-input v-model="OutSourceForm.processorID" placeholder="加工方ID"></el-input>
              </el-form-item>
               <el-form-item prop="actualOutDate" label="实际外发时间">
                   <el-date-picker v-model="OutSourceForm.actualOutDate" ></el-date-picker>
              </el-form-item>
               <el-form-item prop="actualNumber" label="实际外发时间">
                   <el-input v-model.number="OutSourceForm.actualNumber" :disabled="true"  ></el-input>
              </el-form-item>
              <el-form-item prop="mobile" label="联系方式">
                   <el-input v-model.number="OutSourceForm.mobile" :disabled="true"  ></el-input>
              </el-form-item>
               <el-form-item prop="userID"  label="外发负责人">
                   <el-input v-model="OutSourceForm.userID" label="负责人" placeholder="负责人ID"></el-input>
              </el-form-item>
          </el-form>
       <el-button type="primary" @click="addNewSource('OutSourceForm')">
        保存
       </el-button>
       <el-button type="primary" @click="reset('OutSourceForm')">
        重置
       </el-button>
   </div>
</template>


<script>
import Vue from 'vue'
import Api from '@/config/api'
import router from '@/router'

export default{
    data(){
        return{
            OutSourceForm:{
                outsourceCode:'',
                productionCode:'',
                designCode:'',
                designName:'',
                finishDate:'',
                osScheduledate:'',
                outsourceRank:'',
                outsourceState:'',
                labourCost:'',
                processorID:'',
                actualOutDate:'',
                actualNumber:'',
                mobile:'',
                userID:'',
                details:[]
            },
            newDetailForm:{
                    outsourceColor:'',
                    outsourceXS: 0,
                    outsourceS: 0,
                    outsourceM: 0,
                    outsourceL: 0,
                    outsourceXL: 0,
                    outsourceXXL: 0,
                    outsourceTotal:0                    
            },
            newDetailForm2:{
                    outsourceColor:'',
                    outsourceXS: 0,
                    outsourceS: 0,
                    outsourceM: 0,
                    outsourceL: 0,
                    outsourceXL: 0,
                    outsourceXXL: 0,
                    outsourceTotal: 0                   
            },
                rules:{
                    outsourceCode:[
                        {required:true , message: '请输入外发单号'}
                    ],
                    productionCode:[
                         {required:true , message: '请输入生产单号'}
                    ],
                    designCode:[
                        {required:true , message: '请输入款号'}
                    ],
                    designName:[
                        {required:true , message: '请输入款式名称'}
                    ],
                    finishDate:[
                        {required:true , message: '请输入约定完成时间'},
                        {type:'date' , message: '输入必须为日期！'}
                    ],
                    osScheduledate:[
                        {required:true , message: '请输入排单日期'},
                        {type:'date' , message: '输入必须为日期！'}
                    ],
                    outsourceRank:[
                        {required:true , message: '请输入订单优先级'}
                    ],
                    outsourceState:[
                        {required:true , message: '请输入订单状态'}
                    ],
                    labourCost:[
                        {required:true , message: '请输入实际工价'}
                    ],
                    processorID:[
                        {required:true , message: '请输入加工方编码'}
                    ],
                    userID:[
                         {required:true , message: '请输入负责人ID'}
                    ],
                    actualOutDate:[
                         {required:true , message: '请输入实际外发时间'},
                         {type:'date' , message: '请输入日期类型'}
                    ]
    
                }
        };
    },
    created: function()  {
              this.OutSourceForm = router.params.newOS;              
      },
    methods:{
        deleteDetail(index){
            this.newOutSourceForm.details.splice(index,1);
        },
        addDetail(){
             this.newDetailForm.outoutsourceTotal=this.newDetailForm.outoutsourceL+
                                                  this.newDetailForm.outoutsourceM+
                                                  this.newDetailForm.outoutsourceS+
                                                  this.newDetailForm.outoutsourceXL+
                                                  this.newDetailForm.outoutsourceXXL+
                                                  this.newDetailForm.outoutsourceXS;
             this.newOutSourceForm.details.push(this.newDetailForm);
             this.newDetailForm = this.newDetailForm2 ;
        
        },
        addNewSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addOutSource', this.OutSourceForm).then(response => {
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
        reset(formName){
             this.$refs[formName].resetFields();
        }
    }
}
</script>