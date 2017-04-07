<template>
   <div>
      <el-form v-model="searchTPForm" ref="searchTPForm" class="demo-ruleForm" :inline="true" :rules="rules">
         <el-form-item label="款式" prop="designInfo">
            <el-input v-model="searchTPForm.designInfo" placeholder="请输入款号/款名/工艺" @click="handlesearchTH"></el-input>
         </el-form-item>
         <el-form-item label="订单编号" prop="outsourceCode" @click="handlesearchTH">
            <el-input v-model="searchTPForm.outsourceCode"></el-input>
         </el-form-item>
         <el-form-item label="截至外发时间" prop="outsource_date">
            <el-date-picker v-model="searchTPForm.outsource_date"></el-date-picker>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="searchTP('searchTPForm')">查询</el-button>
         </el-form-item>
      </el-form>
      <!--工艺排单列表-->
      <el-table v-model="TechniquePhaseVO">
         <el-table-column prop="TechniquePhaseVO.picture" label="图片"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.outSourceInfo" label="订单编号"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.designInfo" label="款式信息"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.TechniqueList" label="工艺单"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.userName" label="工艺负责人"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.finishDate" label="外发交期"></el-table-column>
         <el-table-column prop="TechniquePhaseVO.inInWarehouse" label="面料进度"></el-table-column>
         <el-table-column label="操作">
            <template scope="scope">
                 <el-button type="primary" size="small" @click="showOutSourceDetail('scope.row.outSourceID')">详情</el-button>
                 <el-button type="primary" size="small" @click="changeSelected('scope.row.outSourceCode','scope.row.techniqueState')">进度修改</el-button>
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
         <el-button type="primary" @click="outSourceDetailVisible = false">关闭</el-button>
         </div>
      </el-dialog>
      <!--工艺进度-->
      <el-dialog v-model="changeTechniqueStateVisible" title="工艺进度">
         <el-form v-model="changeTechniqueStateForm" :rules="rules" ref="changeTechniqueStateForm" class="demo-ruleForm" :inline="true">
            <el-form-item prop="outsourceCode" label="外发单号">
                <el-input v-model="changeTechniqueStateForm.outSourceCode"></el-input>
            </el-form-item>
            <el-form-item prop="outsourceCode" label="工艺阶段">
                <el-input v-model="changeTechniqueStateForm.techniqueState"></el-input>
            </el-form-item>
             <el-form-item >
                <el-button type="primary" @click="finishChangeState" :disabled="flagS">开始</el-button>
                <el-button type="primary" @click="finishChangeState" :disabled="flagE">完成</el-button>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
         <el-button type="primary" @click="changeTechniqueStateVisible = false">关闭</el-button>
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
            searchTPForm:{
            designInfo:''          
            outsourceCode:'',      
            outsource_date: ''
            },
            TechniquePhaseVO:[],
            _TechniquePhaseVO: [],
            outSourceDetailVisible: false,
            outSourceDetail:{},
            changeTechniqueStateForm:{
                outsourceCode:'',
                techniqueState:''
            },
            flagS : false ,
            flagE : false ,
            rules:{
                outSource_date:[
                    {type:'date' , message : '请输入日期类型'}
                ]
            }
           };
    },
    created:function(){
           this.fetchData();
    },
    methods:{
        fectchData(){
            Vue.http.options.emulateJSON = true;
            Vue.http.get(Api.backend_url + '/listManage/showAllTechniqueOutSource').then(response => {
              this.TechniquePhaseVO = response.body.data;
              this._TechniquePhaseVO =  this.TechniquePhaseVO;
              console.log(response);
            }, response => {
              console.log(response);
            });
          
        },
        handlesearchTH(){
              this.TechniquePhaseVO = this._TechniquePhaseVO.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.searchTPForm.designInfo) >= 0 || el.designName.indexOf(this.searchTPForm.designInfo) >= 0|| el.outsourceCode.indexOf(this.searchTPForm.outsourceCode) >= 0
                    
            });
        },
        searchTP(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/listManage/InquireTechniquePhase', this.searchOutSourceForm).then(response => {
              this.TechniquePhaseVO = response.body.data;
              let newTH={};
              for(let k in this.searchOutSourceForm){
                newTH[k] = this.searchOutSourceForm[k];
              }
              this._TechniquePhaseVO.unshift(newTH);
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
        showOutSourceDetail(outSourceCode){
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/showOutSourceDetail', outSourceID).then(response => {
              this.outSourceDetail = response.body.data;
              this.outSourceDetailVisible = true ;
              console.log(response);
            }, response => {
              console.log(response);
            });

        },
        changeSelected(outSourceCode,techniqueState){
            changeTechniqueStateVisible = true;
            if(techniqueState === '进行中'){
                  flagS = false ;
            }
            else if(techniqueState === '未开始'){
                  flagE = false ;
            }
        },
        finishChangeState(){         
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/ListManage/changeTechniqueState', this.changeTechniqueStateForm).then(response => {
              console.log(response);
            }, response => {
              console.log(response);
            });
        }
    }

}
</script>