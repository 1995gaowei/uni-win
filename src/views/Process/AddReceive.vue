<template>
   <div>
       <el-form v-model="addReceiveForm" ref="addReceiveForm" :rules="rules" class="demo-ruleForm">
          <el-form-item label="外发单号">
              <el-input v-model="addReceiveForm.outsourceCode" :disabled="true">
              </el-input>
          </el-form-item>
          <el-form-item label="加工方编号">
              <el-input v-model="addReceiveForm.processorCode" :disabled="true">
              </el-input>
          </el-form-item>
          <el-form-item label="日期">
              <el-date-picker v-model="addReceiveForm.receiveDate">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="收货人">
              <el-input v-model="addReceiveForm.userName" >
              </el-input>
          </el-form-item>
       <el-form>

        
       <el-table :data="addReceiveForm.ReceiveDetail">
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveColor" label="颜色">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveXS" label="X">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveS" label="S">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveM" label="M">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveL" label="L">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveXL" label="XL">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveXXL" label="XXL">
           </el-table-column>
           <el-table-column prop="addReceiveForm.ReceiveDetail.receiveTotal" label="合计">
           </el-table-column>
           <el-table-column  label="操作">
               <template scope="scope">
               <el-button type="primary" icon="delete" @click="deleteDetail(scope.$index)">                 
               </el-button>
               </template>
           </el-table-column>
           </el-table>
          <el-form v-model="addReceiveDetailForm" ref="addReceiveDetailForm" :rules="rules" class="demo-dynamic demo-ruleForm">
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveColor"></el-input>
                </el-form-item>        
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveXS"></el-input>
                </el-form-item> 
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveS"></el-input>
                </el-form-item> 
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveM"></el-input>
                </el-form-item> 
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveL"></el-input>
                </el-form-item> 
                 <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveXL"></el-input>
                </el-form-item>                 
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.receiveXXL"></el-input>
                </el-form-item> 
                <el-form-item style="width:12%">
                    <el-input v-model.number="addReceiveDetailForm.Total" :disabled="true">
                </el-form-item> 
                <el-form-item style="width:4%" >
                    <el-button type="primary" icon="plus" @click="addDetail('addReceiveDetailForm')">
                    </el-button>
                </el-form-item>
          </el-form>
          <el-button type="primary" @click="addNewReceiveDetail('addReceiveForm')">保存
          </el-button>
          <el-button type="primary" @click="exitAdd">退出
          </el-button>

   </div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default{
    data(){
        return{
            addReceiveForm:{
                outsourceCode: '',
                processorCode: '',
                receiveDate: '',
                userName: '',
                ReceiveDetail:[]
            },
                  addReceiveDetailForm:{
                  receiveColor: 0 ,
                  receiveXS: 0 ,
                  receiveS: 0 ,
                  receiveM: 0 ,
                  receiveL: 0 ,
                  receiveXL: 0 ,
                  receiveXXL: 0 ,
                  receiveTotal: 0
                },
            rules:{
                receiveDate:[
                    {required:true , message: '请输入收货日期'},
                    {type:'date',message: '输入必须为日期类型' }

                ],
                userName:[
                    {required:true, message: '请输入收货人'}
                ]
            }
        };


    },
    methods:{
        deleteDetail(index){
            this.addReceiveForm.ReceiveDetail.splice(index,1);
        },
        addDetail(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
             this.addReceiveForm.ReceiveDetail.push(this.addReceiveDetailForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });       
        },
        addNewReceiveDetail(formName){
         this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Processor/updateReceiveDetail', this.addReceiveForm).then(response => {
              this.$message('修改收货单信息成功!');
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
        exitAdd(){
            ///////不知道/////////////*************************************************//////////
        }

    }
}
</script>