<template>
  <div>
    <el-form v-model="searchOutSourceForm" ref="searchOutSourceForm" class="demo-ruleForm" :inline="true" >
        <el-form-item prop="designInfo" label="款式信息">
            <el-input v-model="searchOutSourceForm.designInfo" @change="handleSearchS" placeholder="请输入款式/款号"></el-input>
        </el-form-item> 
        <el-form-item prop="outSource_date" label="截至参考外发时间">
            <el-date-picker v-model="searchOutSourceForm.outSource_date"></el-date-picker>
        </el-form-item>
        <br>
         <el-form-item prop="outSourceCode" label="订单编号" @change="handleSearchS">
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
       <el-table-column  label="图片">
             <template>
                <img src="../../assets/logo.png" class="image">
             </template>
       </el-table-column>
       <el-table-column label="订单编号">
        <template scope="scope">
                <table>
                   <tr>
                   <td>订单编号：</td><td>{{scope.row.outSourceCode}}</td>
                   </tr>
                   <tr>
                   <td>工序：</td><td><font color="red">{{scope.row.designTechProcedure_finished}}</font></td><td><font color="black">{{scope.row.designTechProcedure_unfinished}}</font></td>
                   </tr>
                   <tr>
                   <td>状态：</td><td>{{scope.row.orderPriority}}</td>
                   </tr>
                </table>
             </template>
       
       </el-table-column>
       <el-table-column label="款式信息">
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
       <el-table-column  label="外发时间">
             <template scope="scope">
                <table>
                  <tr>
                     <td>实际时间:</td><td>{{scope.row.referenceOutDate}}</td>
                  </tr>
                  <tr>
                     <td>参考时间:</td><td>{{scope.row.referenceOutDate}}</td>
                  </tr>
                </table>
             </template>
       </el-table-column>
       <el-table-column  label="外发信息">
              <template scope="scope">
                <table>
                  <tr>
                     <td>已外发<td>
                  </tr>
                  <tr>
                     <td>负责人:</td><td>{{scope.row.userName}}</td>
                  </tr>
                </table>
             </template>
       </el-table-column>
       <el-table-column  label="操作">
            <template scope="scope">
            <el-button type="primary" size="small" @click="showOutSourceDetail('scope.row.outSourceID')">详情</el-button>
            </template>
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
            searchOutSourceForm:{
                designInfo:'',
                outSource_date:'',
                outSourceCode:'',
                inquiryProgress:''
            },
            OutSourceManageVO:[],
            _OutSourceManageVO: [],
            outSourceDetail:{},
            outSourceDetailVisible: false
        };
    },
    created:function(){
      this.fetchData();
    },
    methods:{
       fetchData(){
         Vue.http.get(Api.backend_url + '/listManage/outSourceManage').then(response => {
                    this.OutSourceManageVO = response.body.data;
                    this._OutSourceManageVO = this.OutSourceManageVO;
                }, response => {
                    console.log(response);
                });
       },
       handleSearchS(){
            this.OutSourceManageVO = this._OutSourceManageVO.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.searchOutSourceForm.designInfo) >= 0 || el.designName.indexOf(this.searchOutSourceForm.designInfo) >= 0 || el.outSourceCode.indexOf(this.searchOutSourceForm.outSourceCode) >= 0               
            });
       },
        searchOutSource(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/InquireOutSource', this.searchOutSourceForm).then(response => {
              this.OutSourceManageVO = response.body.data;
              let newOS = {};
              for(let k in this.searchOutSourceForm){
                newOS[k] = this.searchOutSourceForm[k];
              }
              this._OutSourceManageVO.unshift(newOS);
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