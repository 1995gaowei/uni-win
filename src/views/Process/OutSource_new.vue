<template>
   <div>
   
       <el-form :model="newOutSourceForm" ref="newOutSourceForm" :inline="true" class="demo-ruleForm" :rules="rules">
           <el-form-item  label="外发单号" prop="outsourceCode">
               <el-input v-model="newOutSourceForm.outsourceCode"  placeholder="外发单号"></el-input>
           </el-form-item> 
           <el-form-item  label="生产单号" prop="productionCode">
               <el-input v-model="newOutSourceForm.productionCode"  placeholder="生产单号"></el-input>
           </el-form-item>
           <el-form-item  label="款号" prop="designCode">
               <el-input v-model="newOutSourceForm.designCode"  placeholder="款号"></el-input>
           </el-form-item>
           <el-form-item  label="款式名称" prop="designName">
               <el-input v-model="newOutSourceForm.designName"  placeholder="款式名称"></el-input>
           </el-form-item>
           <el-form-item  label="约定完成日期" prop="finishDate">
               <el-date-picker v-model="newOutSourceForm.finishDate"  placeholder="请选择日期" :editable="false"></el-date-picker>
           </el-form-item>
           <el-form-item  label="排单时间" prop="osScheduledate">
               <el-date-picker v-model="newOutSourceForm.osScheduledate"  placeholder="请选择日期" :editable="false"></el-date-picker>
           </el-form-item>
           <el-form-item  label="订单优先级" prop="outsourceRank">
               <el-input v-model="newOutSourceForm.outsourceRank"   ></el-input>
           </el-form-item>
           <el-form-item  label="订单状态" prop="outsourceState">
              <el-select v-model="newOutSourceForm.outsourceState" placeholder="请选择订单状态">
                  <el-option label="待收货" value="待收货"></el-option>
                  <el-option label="部分收货" value="部分收货"></el-option>
                  <el-option label="已收货" value="已收货"></el-option>
              </el-select>
           </el-form-item>
       </el-form>
       <!--外发单详情-->
       <span>外发单详情>></span>
       <!--此处添加新行之后数据不能显示,未找到原因*************************************************-->
        <el-table  :data="newOutSourceForm.details" >
           <el-table-column prop="receiveColor" label="颜色">
           </el-table-column>
           <el-table-column prop="receiveXS" label="X">
           </el-table-column>
           <el-table-column prop="receiveS" label="S">
           </el-table-column>
           <el-table-column prop="receiveM" label="M">
           </el-table-column>
           <el-table-column prop="receiveL" label="L">
           </el-table-column>
           <el-table-column prop="receiveXL" label="XL">
           </el-table-column>
           <el-table-column prop="receiveXXL" label="XXL">
           </el-table-column>
           <el-table-column prop="receiveTotal" label="合计">
           </el-table-column>
           <el-table-column  label="操作">
               <template scope="scope">
               <el-button type="primary" size="small" icon="delete" @click="deleteDetail(scope.$index)">                 
               </el-button>
               </template>
           </el-table-column>
        </el-table>
          <el-form v-model="newDetailForm" ref="newDetailForm" :rules="rules" class="demo-dynamic demo-ruleForm" :inline="true">
                <el-form-item style="width:8%" prop="outsourceColor">
                    <el-input v-model="newDetailForm.outsourceColor"></el-input>
                </el-form-item>        
                <el-form-item style="width:8%" prop="outsourceXS">
                    <el-input v-model.number="newDetailForm.outsourceXS"></el-input>
                </el-form-item> 
                <el-form-item style="width:8%" prop="outsourceS">
                    <el-input v-model.number="newDetailForm.outsourceS"></el-input>
                </el-form-item> 
                <el-form-item style="width:8%" prop="outsourceM">
                    <el-input v-model.number="newDetailForm.outsourceM"></el-input>
                </el-form-item> 
                <el-form-item style="width:8%" prop="outsourceL">
                    <el-input v-model.number="newDetailForm.outsourceL"></el-input>
                </el-form-item> 
                 <el-form-item style="width:8%" prop="outsourceXL">
                    <el-input v-model.number="newDetailForm.outsourceXL"></el-input>
                </el-form-item>                 
                <el-form-item style="width:8%" prop="outsourceXXL">
                    <el-input v-model.number="newDetailForm.outsourceXXL"></el-input>
                </el-form-item> 
                <el-form-item style="width:8%" prop="outsourceTotal">
                    <el-input v-model.number="newDetailForm.outsource" :disabled="true"></el-input>
                </el-form-item> 
                <el-form-item style="width:4%" >
                    <el-button type="primary"  size="small" icon="plus" @click="addDetail('newDetailForm')">
                    </el-button>
                </el-form-item>
          </el-form>
         
          <el-form v-model="newOutSourceForm" ref="newOutSourceForm2" :rules="rules" class="demo-ruleForm" :inline="true">
              <el-form-item prop="labourCost" label="实际工价">
                   <el-input v-model="newOutSourceForm.labourCost"></el-input>
              </el-form-item>
               <el-form-item prop="processorID" label="加工方" >
                   <el-input v-model="newOutSourceForm.processorID" placeholder="加工方ID"></el-input>
              </el-form-item>
               <el-form-item prop="actualOutDate" label="实际外发时间">
                   <el-date-picker v-model="newOutSourceForm.actualOutDate" ></el-date-picker>
              </el-form-item>
               <el-form-item prop="actualNumber" label="实际外发时间">
                   <el-input v-model.number="newOutSourceForm.actualNumber" :disabled="true"  ></el-input>
              </el-form-item>
              <el-form-item prop="mobile" label="联系方式">
                   <el-input v-model.number="newOutSourceForm.mobile" :disabled="true"  ></el-input>
              </el-form-item>
               <el-form-item prop="userID"  label="外发负责人">
                   <el-input v-model="newOutSourceForm.userID" label="负责人" placeholder="负责人ID"></el-input>
              </el-form-item>
          </el-form>
       <el-button type="primary" @click="addNewSource('newOutSourceForm')">
        保存
       </el-button>
       <el-button type="primary" @click="reset('newOutSourceForm')">
        重置
       </el-button>
   </div>
</template>


<script>
import Vue from 'vue'
import Api from '@/config/api'

export default{
    data(){
        return{
            newOutSourceForm:{
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
    methods:{
        deleteDetail(index){
            this.newOutSourceForm.details.splice(index,1);
        },
        addDetail(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
             this.newOutSourceForm.details.push(this.newDetailForm);
             this.newDetailForm=this.newDetailForm2;
          } else {
            console.log('error submit!!');
            return false;
          }
        });       
        },
        addNewSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/addOutSource', this.newOutSourceForm).then(response => {
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