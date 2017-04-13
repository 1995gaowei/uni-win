<template>
   <div>
   
       <el-form :model="newTechniqueForm" ref="newTechniqueForm" inline class="half-form-l" :rules="rules" label-position="left" label-width="130px">
           <el-form-item  label="款号" prop="designCode">
               <design-select v-model="newTechniqueForm.designCode"></design-select>
            </el-form-item>
            <el-form-item prop="processorCode" label="加工方" >
                <processor-select v-model="newTechniqueForm.processorCode"></processor-select>
            </el-form-item>
            <el-form-item prop="technique"  label="工艺技术">
                <el-input v-model="newTechniqueForm.technique"></el-input>
            </el-form-item>
            <el-form-item prop="techShellType" label="面料">
                <el-input v-model="newTechniqueForm.techShellType"></el-input>
           </el-form-item>
           <el-form-item prop="techSampleSize" label="样板尺寸">
                <el-input v-model="newTechniqueForm.techSampleSize"></el-input>
           </el-form-item>
           <el-form-item prop="techJointSize" label="作缝大小">
                <el-input v-model="newTechniqueForm.techJointSize"></el-input>
           </el-form-item>
           <el-form-item prop="techLineDistance" label="线距">
                <el-input v-model="newTechniqueForm.techLineDistance"></el-input>
           </el-form-item>
           <el-form-item prop="techPressingReq" label="整烫要求">
                <el-input v-model="newTechniqueForm.techPressingReq"></el-input>
           </el-form-item>
           <el-form-item prop="techComment" label="备注">
                <el-input  type="textarea" :autosize="{ minRows: 2 }" v-model="newTechniqueForm.techComment"></el-input>
           </el-form-item>
       </el-form>
       
        <h4 style="font-weight: normal; display: inline-block;">详情</h4>

        <el-table :data="newTechniqueForm.inventoryList" border max-height="400" style="width: 100%;">
            <el-table-column label="部位名称">
                <template scope="scope">
                    <el-input v-model="scope.row.techInPartName"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="码数">
                <template scope="scope">
                    <el-select v-model="scope.row.techInMCode" placeholder="请选择码数" style="width: 100%;">
                    <el-option label="XS" value="XS"></el-option>
                        <el-option label="S" value="S"></el-option>
                        <el-option label="M" value="M"></el-option>
                        <el-option label="L" value="L"></el-option>
                        <el-option label="XL" value="XL"></el-option>
                        <el-option label="XXL" value="XXL"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="公差（cm）">
                <template scope="scope">
                    <el-input v-model.number="scope.row.techInTolerance"></el-input>
                </template>
            </el-table-column>
            <el-table-column  label="操作"  width="75">
            <template scope="scope">
                    <el-button @click.native.prevent="deleteInventory(scope.$index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="success" @click="addInventory" icon="plus"></el-button>
         
       <div style="text-align: right; margin-top: 20px;">   
            <el-button @click="reset"> 重置 </el-button>
            <el-button type="success" @click="addTechnique('newTechniqueForm')"> 确认新增 </el-button>
       </div>
   </div>
</template>


<script>
import Vue from 'vue'
import Api from '@/config/api'
import DesignSelect from '@/components/DesignSelect'
import ProcessorSelect from '@/components/ProcessorSelect'

export default{
    components:{
        DesignSelect, ProcessorSelect
    },
    data(){
        return{
            newTechniqueForm:{
                techCode: '',
                designCode: '',
                processorCode: '',
                technique: '',
                techShellType: '',
                techSampleSize: '',
                techJointSize: '',
                techLineDistance: '',
                techPressingReq: '',
                techComment: '',
                inventoryList: []
            },
            rules:{
                designCode:[
                    {required:true , message: '请选择款号'}
                ],
                processorCode:[
                    {required:true , message: '请选择加工方'}
                ],
                technique:[
                    {required:true , message: '请输入工艺技术'}
                ],
                techShellType: [
                    {required: true, message: '请输入面料'}
                ],
                techSampleSize: [
                    {required: true, message: '请输入样板尺寸'}
                ],
                techJointSize: [
                    {required: true, message: '请输入作缝大小'}
                ],
                techLineDistance: [
                    {required: true, message: '请输入线距'}
                ],
                techPressingReq: [],
                techComment: [],
            }
        };
    },
    methods:{
        addTechnique(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
              this.newTechniqueForm.techCode = 'GYD' + new Date().getTime();
                Vue.http.post(Api.addTechnique, this.newTechniqueForm).then(response => {
                    console.log(response);
                    this.reset();
                    this.$message({
                        message: '新增工艺单成功',
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
        addInventory() {
            let inventory = {
                techInPartName: '',
                techInMCode: '',
                techInTolerance:''
            };
            this.newTechniqueForm.inventoryList.push(inventory);
        },
        deleteInventory(index) {
            this.newTechniqueForm.inventoryList.splice(index, 1);
        },
        reset(){
             this.$refs['newTechniqueForm'].resetFields();
             this.newTechniqueForm.inventoryList = [];
        }
    }
}
</script>

<style scoped>
.cell {
    padding-top: 10px;
    padding-bottom: 5px;
}

</style>