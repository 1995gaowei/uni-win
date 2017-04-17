<template>
  <div>
      <el-form v-model="searchOutSourceForm" ref="searchOutSourceForm" :rules="rules" class="demo-ruleForm" :inline="true">
           <el-form-item prop="designInfo" label="款式" @change="handlesearchOS">
               <el-input v-model="searchOutSourceForm.designCode" placeholder="款号/款名"></el-input>
           </el-form-item>
           
           <el-form-item prop="outSourceCode" label="订单编号"  @change="handlesearchOS">
               <el-input v-model="searchOutSourceForm.outSourceCode"></el-input>
           </el-form-item>
           <el-form-item prop="byOutDate" label="截至外发时间" >
               <el-date-picker v-model="searchOutSourceForm.outSource_date"></el-date-picker>
           </el-form-item>
           <el-form-item> 
               <el-button type="primary" @click="searchOutSourceList('searchOutSourceForm')">查询</el-button>
           </el-form-item>
      </el-form> 
      <span>外发单详情>></span>
      <el-table v-model="outSourceList">
         <el-table-item label="图片"> 
          <template scope="scope">
          <img src="../../assets/1.jpg" class="image">
        </template>
        </el-table-item>
         <el-table-item label="订单编号">
         <template scope="scope">
            <table>
            <tr><td>订单编号:</td><td>{{scope.row.outSourceCode}}</td></tr>
            <tr><td>工序:</td><td><font color="red">{{scope.row.designTechProcedure_finished}}</font></td><td><font color="black">{{scope.row.designTechProcedure_unfinished}}</font></td></tr>
            <tr><td>状态:</td><td>{{scope.row.orderPriority}}</td></tr>
            </table>
         </template>
         </el-table-item>
         <el-table-item label="款式信息">
           <template scope="scope">
            <table>
            <tr><td>款号:</td><td>{{scope.row.designCode}}</td></tr>
            <tr><td>款名:</td><td>{{scope.row.designName}}</td></tr>
          
            </table>
           </template>
         </el-table-item>
         <el-table-item prop="outDate" label="外发时间"></el-table-item>
         <el-table-item prop="outSourceManangState" label="排单状态"></el-table-item>
         <el-table-item label="操作">
              <template scope="scope">
                 <el-button type="primary" size="small" @click="showOutSourceDetail('scope.row.outSourceCode')">详情</el-button>
                 <el-button type="primary" size="small" @click="startOutSource('scope.row.outSourceCode')">排单</el-button>
              </template>
         </el-table-item>
      </el-table>
      <!--外发单详情会话框-->
      <el-dialog v-model="outSourceDetailVisible" title="排单详情">
         <table  cellSpacing="80px">
            <tr>
              <td style="width:50%;">
                 <table>
                    <tr>
                       <td>外发单编号:</td>
                       <td>{{outSourceDetail.outSourceCode}}</td>
                    </tr>
                    <tr>
                       <td>款号:</td>
                       <td>{{outSourceDetail.designCode}}</td>
                    </tr>
                    <tr>
                       <td>排单时间:</td>
                       <td>{{outSourceDetail.osScheduleDate}}</td>
                    </tr>
                 </table>
              </td>
              <td style="width:50%;">
                 <table>
                    <tr>
                       <td>工序:</td>
                       <td>{{outSourceDetail.designTechProcedure}}</td>
                    </tr>
                    <tr>
                       <td>款式名称:</td>
                       <td>{{outSourceDetail.designName}}</td>
                    </tr>
                    <tr>
                       <td>参考工价:</td>
                       <td>{{outSourceDetail.labourCost}}</td>
                    </tr>
                 </table>
              </td>
            </tr>
         </table>
         <span>加工信息>></span>
         <el-table v-model="outSourceDetail.processDetails">
           <el-table-item prop="outsourceColor" label="颜色"></el-table-item>
           <el-table-item prop="outsourceXS" label="XS"></el-table-item>
           <el-table-item prop="outsourceS" label="S"></el-table-item>
           <el-table-item prop="outsourceM" label="M"></el-table-item>
           <el-table-item prop="outsourceL" label="L"></el-table-item>
           <el-table-item prop="outsourceXL" label="XL"></el-table-item>
           <el-table-item prop="outsourceXXL" label="XXL"></el-table-item>
           <el-table-item prop="outsourceTotal" label="合计"></el-table-item>
         </el-table>
         <table cellSpacing="80px">
            <tr>
              <td>
                <table>
                  <tr>
                    <td>加工方</td>
                    <td>{{outSourceDetail.processorCode}}</td>
                  </tr>
                   <tr>
                    <td>发货人</td>
                    <td>{{outSourceDetail.DeliveryName}}</td>
                  </tr>
                </table>
              </td>
               <td>
                <table>
                  <tr>
                    <td>联系电话</td>
                    <td>{{outSourceDetail.processorMobileNum}}</td>
                  </tr>
                   <tr>
                    <td>预约外发时间</td>
                    <td>{{outSourceDetail.referenceOutDate}}</td>
                  </tr>
                </table>
              </td>
               <td>
                <table>
                  <tr>
                    <td>订单状态</td>
                    <td>{{outSourceDetail.order_state}}</td>
                  </tr>
                   <tr>
                    <td>参考收货时间</td>
                    <td>{{outSourceDetail.finishDate}}</td>
                  </tr>
                </table>
              </td>
            </tr>
         </table>
         <el-button type="primary" @click="outSourceDetailVisible = false"></el-button>


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
            searchOutSourceForm:{
                designInfo:'',
                outSourceCode:'',
                outSource_date:''
            },
            outSourceList:[],
            _outSourceList: [],
            outSourceDetailVisible:false,
            outSourceDetail:{},
            rules:{
                byOutDate:[
                    {type:'date',message:'请输入日期类型！'}
                ]
            }
        };
    },
    created:function(){
        this.fetchData();
    },
    methods:{
        fetchData() {
              Vue.http.get(Api.backend_url + '/listManage/StartOutSourceManage').then(response => {
                    this.outSourceList = response.body.data;
                    this._outSourceList = this.outSourceList;
                }, response => {
                    console.log(response);
                });
          },
          handlesearchOS(){
            this.outSourceList = this._outSourceList.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.searchOutSourceForm.designInfo) >= 0 || el.designName.indexOf(this.searchOutSourceForm.designInfo) >= 0|| el.outSourceCode.indexOf(this.searchOutSourceForm.outSourceCode) >= 0
                    
            });
          },
        searchOutSourceForm(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/InquireOutSourceUnsolved', this.searchOutSourceForm).then(response => {
              this.outSourceList = response.body.data;
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
      
        showOutSourceDetail(outSourceCode){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/showOutSourceDetail', this.outSourceCode).then(response => {
              this.outSourceDetail = response.body.data;
              this.outSourceDetailVisible = true ;
              console.log(response);
            }, response => {
              console.log(response);
            });

        },
        startOutSource(outSourceCode){
           this.$confirm('确认排单？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            } ).then(() => {
              Vue.http.post(Api.backend_url + '/ListManage/ChangeState', this.outSourceCode).then(response => {
              console.log(response);
            }, response => {
              console.log(response);
            });
            }).catch(()=>{
              this.$message({
                 type:'info',
                 message: '已取消排单'
              });
            })
         
        }
    }
}
</script>>