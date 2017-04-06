<template>
  <div>
    <el-form v-model="searchOutSourceForm" ref="searchOutSourceForm" class="demo-ruleForm" :inline="true" >
        <el-form-item prop="designCode" label="款式编号">
            <el-input v-model="searchOutSourceForm.designCode"></el-input>
        </el-form-item>
        <el-form-item prop="designName" label="款式名称">
            <el-input v-model="searchOutSourceForm.designName"></el-input>
        </el-form-item>
        <el-form-item prop="outSource_date" label="截至参考外发时间">
            <el-date-picker v-model="searchOutSourceForm.outSource_date"></el-date-picker>
        </el-form-item>
         <el-form-item prop="outSourceCode" label="订单编号">
            <el-input v-model="searchOutSourceForm.outSourceCode"></el-input>
        </el-form-item>
        <el-form-item prop="inquiryProgress" label="状态">
            <el-select v-model="searchOutSourceForm.inquiryProgress" placeholder="请选择">
               <el-option value="普通" label="普通"></el-option>
               <el-option value="第一时间" label="第一时间"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="searchOutSource('searchOutSourceForm')">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table v-model="OutSourceManageVO">
       <el-table-column prop="picture" label="图片"></el-table-column>
       <el-table-column prop="outSource" label="订单编号"></el-table-column>
       <el-table-column prop="designInfo" label="款式信息"></el-table-column>
       <el-table-column prop="" label="外发时间"></el-table-column>
       <el-table-column prop="" label="外发信息"></el-table-column>
       <el-table-column  label="操作">
            <el-button type="primary" size="small" @click="showOutSourceDetail('OutSourceManageVO.outSourceID')">详情</el-button>
       </el-table-column>
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

export default{
    data(){
        return{
            searchOutSourceForm:{
                designCode:'',
                designName:'',
                outSource_date:'',
                outSourceCode:'',
                inquiryProgress:''
            },
            OutSourceManageVO:[],
            outSourceDetail:{},
            outSourceDetailVisible: false
        };
    },
    methods:{
        searchOutSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/InquireOutSource', this.searchOutSourceForm).then(response => {
              this.OutSourceManageVO = response.body.data;
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
        showOutSourceDetail(outSourceID){
            Vue.http.post(Api.backend_url + '/ListManage/InquireTaiorPhase', this.outSourceID).then(response => {
              this.outSourceDetail = response.body.data;
              outSourceDetailVisible =true;
              console.log(response);
            }, response => {
              console.log(response);
            });
          
        }
    }
}
</script>