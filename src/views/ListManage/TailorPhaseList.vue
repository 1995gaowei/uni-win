<template>
    <div> 
      <el-form v-model="searchTailorManageForm" ref="searchTailorManageForm" class="demo-ruleForm" :inline="true" :rules="rules">
         <el-form-item prop="designCode" label="款式编号">
            <el-input v-model="searchTailorManageForm.designCode" @change="handlesearchT"></el-input>
         </el-form-item>
         <el-form-item prop="outSourceCode" label="订单编号">
            <el-input v-model="searchTailorManageForm.outSourceCode"  @change="handlesearchT"></el-input>
         </el-form-item>
         <el-form-item prop="tailModel" label="排版">
            <el-select v-model="searchTailorManageForm.tailModel" placeholder="请选择"  @change="handlesearchT">
               <el-option value="已排版" label="已排版"></el-option>
               <el-option value="未排版" label="未排版"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item prop="isInStore" label="面料进度">
             <el-select v-model="searchTailorManageForm.isInStore" placeholder="请选择"  @change="handlesearchT">
               <el-option value="已到货" label="已到货"></el-option>
               <el-option  value="部分到货" label="部分到货"></el-option>
               <el-option  value="未到货" label="未到货"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item prop="outSource_date" label="截至外发时间">
            <el-date-picker v-model="searchTailorManageForm.outSource_date"></el-date-picker>
         </el-form-item>
         <el-form-item prop="inquiryProgress" label="状态">
             <el-select v-model="searchTailorManageForm.inquiryProgress" placeholder="请选择"  @change="handlesearchT">
               <el-option value="普通" label="普通"></el-option>
               <el-option value="第一时间" label="第一时间"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item prop="tailor" label="裁剪">
            <el-select v-model="searchTailorManageForm.tailor" placeholder="请选择"  @change="handlesearchT"> 
               <el-option value="已裁剪" label="已裁剪"></el-option>
               <el-option value="未裁剪" label="未裁剪"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="searchTailor('searchTailorManageForm')">查询</el-button>
         </el-form-item>
      </el-form> 
      <el-table v-model="TailorManageVOList">
         <el-table-column label="图片">
             <template>
                <img src="../../assets/logo.png" class="image">
             </template>
         </el-table-column>
         <el-table-column  label="外发订单编号">
             <template scope="scope">
                <table>
                   <tr>
                   <td>外发单编号：</td><td>{{scope.row.outSourceCode}}</td>
                   </tr>
                   <tr>
                   <td>工序：</td><td><font color="red">{{scope.row.designTechProcedure_finished}}</font></td><td><font color="black">{{scope.row.designTechProcedure_unfinished}}</font></td>
                   </tr>
                   <tr v-if="scope.row.tailorStartingTime">
                   <td>开始时间：</td><td>{{scope.row.tailorStartingTime}}</td>
                   </tr>
                </table>
             </template>
         </el-table-column>
         <el-table-column  label="款式信息">
             <template scope="scope">
                <table>
                  <tr>
                     <td>款号:</td><td>{{scope.row.designCode}}</td>
                  </tr>
                  <tr>
                     <td>款名:</td><td>{{scope.row.designName}}</td>
                  </tr>
                </table>
             </template>
         </el-table-column>
         <el-table-column prop="source" label="来源">
         </el-table-column>
         <el-table-column  label="预约外发时间">
             <template scope="scope">
                <table>
                  <tr>
                     <td>状态:</td><td>{{scope.row.orderPriority}}</td>
                  </tr>
                  <tr>
                     <td>预约外发时间:</td><td>{{scope.row.referenceOutDate}}</td>
                  </tr>
                </table>
             </template>
         </el-table-column>
         <el-table-column label="进度">
         <template scope="scope">
                <table>
                  <tr>
                     <td>排版人:</td><td>{{scope.row.tailorTailorName}}</td>
                  </tr>
                  <tr>
                     <td>裁剪人:</td><td>{{scope.row.tailorModelName}}</td>
                  </tr>
                </table>
             </template>
         </el-table-column>
         <el-table-column prop="isInWarehouse" label="面料进度">
         </el-table-column>
         <!--此处数据获取tailState不一定对********************************************-->
         <el-table-column label="操作">
             <template scope="scope">
                <el-button type="primary" size="small" @click="showOutSourceDetail(scope.row.outSourceID)">详情</el-button>
                <el-button type="primary" size="small" @click="changeSelected(scope.row.outSourceID,scope.row.tailState)">操作</el-button>
             </template>
         </el-table-column>
      </el-table> 
      <!--修改裁剪进度-->
      <el-dialog v-model="changeTailStateVisible" title="裁剪进度">
         <el-form v-model="changeTailorState">
               <el-form-item label="外发单号">
                   <el-input v-model="changeTailorState.outSourceID"></el-input>
               </el-form-item>
               <el-form-item label="裁剪进度">
                   <el-input v-model="changeTailorState.tailState"></el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="handleChange" :disabled="flagS">开始</el-button>
                  <el-button type="danger" @click="handleChange" :disabled="flagE">完成</el-button>
               </el-form-item>
               <el-button type="primary" @click=" changeTailStateVisible = false ">关闭</el-button>
         </el-form>
      </el-dialog> 
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
         <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="outSourceDetailVisible = false"></el-button>
         </div>
      </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default{
    data(){
       return{
           searchTailorManageForm:{
               designCode:'',
               outSourceCode:'',
               tailModel:'',
               isInStore:'',
               outSource_date: '',
               inquiryProgress:'',
               tailor:''
           },
           TailorManageVOList:[],
           _TailorManageVOList: [],
           changeTailorState :{
               outSourceID:'',
               tailState:''
           },
           changeTailStateVisible: false,
           flagS : false ,
           flagE : false ,
           outSourceDetail: {},
           outSourceDetailVisible:false,
           rules:{
               outSource_date:[
                   {type:'date' , message: '请输入日期类型'}
               ]
           }
       }
    },
    created:function(){
        this.fetchData();
    },
    methods:{
        fetchData(){
                Vue.http.get(Api.backend_url + '/listManage/showAllTailorOutSource').then(response => {
                    this.TailorManageVOList = response.body.data;
                    this._TailorManageVOList = this.TailorManageVOList;
                }, response => {
                    console.log(response);
                });
          },
          handlesearchT(){
             this.TailorManageVOList = this._TailorManageVOList.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.searchTailorManageForm.designCode) >= 0 || el.outSourceCode.indexOf(this.searchTailorManageForm.outSourceCode) >= 0
                     || el.tailModel.indexOf(this.searchTailorManageForm.tailModel) >= 0 || el.isInStore.indexOf(this.searchTailorManageForm.isInStore) >= 0
                     || el.inquiryProgress.indexOf(this.searchTailorManageForm.inquiryProgress) >= 0 || el.tailor.indexOf(this.searchTailorManageForm.tailor) >= 0 
            });
          },
        searchTailor(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/InquireTaiorPhase', this.searchTailorManageForm).then(response => {
              this.TailorManageVOList = response.body.data;
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
        changeSelected(outSourceID,tailState){
             this.changeTailorState.outSourceID = outSourceID ;
             this.changeTailorState.tailState = tailState ;
             changeTailStateVisible  = true;
              if(tailState === '进行中'){
                  flagS = false ;
            }
            else if(tailState === '未开始'){
                  flagE = false ;
            }
        },
        showOutSourceDetail(outSourceID){
            Vue.http.post(Api.backend_url + '/ListManage/InquireTaiorPhase', this.outSourceID).then(response => {
              this.outSourceDetail = response.body.data;
              outSourceDetailVisible =true;
              console.log(response);
            }, response => {
              console.log(response);
            });
          
        },
        handleChange(){
           Vue.http.post(Api.backend_url + '/listManage/changeTailorState', this.changeTailorState).then(response => {
              outSourceDetailVisible =true;
              console.log(response);
            }, response => {
              console.log(response);
            });
        }

    }
}
</script>