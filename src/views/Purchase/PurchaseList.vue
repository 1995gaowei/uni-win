<template>
   <div>
      <el-form v-model="searchPurchaseForm" ref="searchPurchaseForm" :rules="rules" class="demo-ruleForm" :inline="true">
          <el-form-item prop="designInfo" label="款式编号" @change="handleSearchPurchase">
              <el-input v-model="searchPurchaseForm.designInfo" ></el-input>
          </el-form-item>
          <el-form-item prop="scheduledPurchaseDate" label="计划采购时间">
              <el-date-picker v-model="searchPurchaseForm.scheduledPurchaseDate" ></el-date-picker>
          </el-form-item>
          <el-form-item prop="purchaseState" label="待操作状态"  @change="handleSearchPurchase">
              <el-select v-model="searchPurchaseForm.designInfo" >
                 <el-option label="待审核"    value="待审核"></el-option>
		         <el-option label="待库存审核" value="待库存审核"></el-option>
		         <el-option label="待电话订购" value="待电话订购"></el-option>
		         <el-option label="待传码单"   value="待传码单"></el-option>
		         <el-option label="待财务核对" value="待财务核对"></el-option>
		         <el-option label="待核对面料" value="待核对面料"></el-option>
		         <el-option label="采购完成（自有）" value="采购完成（自有）"></el-option>
		         <el-option label="审核不通过" value="审核不通过"></el-option>
              </el-select>
          </el-form-item>
           <el-form-item prop="vendorName" label="供应商名"  @change="handleSearchPurchase">
              <el-input v-model="searchPurchaseForm.vendorName" ></el-input>
          </el-form-item>
          <el-form-item prop="eta" label="预计到货时间">
              <el-date-picker v-model="searchPurchaseForm.ets" ></el-date-picker>
          </el-form-item>
           <el-form-item prop="oldOrNew" label="新款或老款"  @change="handleSearchPurchase">
              <el-select v-model="searchPurchaseForm.oldOrNew" >
		         <el-option label="新款" value="新款"></el-option>
		         <el-option label="老款" value="老款"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchPurchase(searchPurchaseForm)">查询</el-button>
          </el-form-item>
      </el-form>
      <el-table v-model="purchaseList">
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
          <el-table-column prop="" label=""></el-table-column>
      </el-table>
   </div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'
import router from '@/router'

export default{
    data(){
        return{
            searchPurchaseForm:{
                designInfo : '',
                scheduledPurchaseDate : '',
                purchaseState : '',
                vendorName : '',
                eta : '',
                oldOrNew : '',
            },
            purchaseList : [],
            _purchaseList : [],
            rules:{
                scheduledPurchaseDate:[
                    {type:'date',message:'请输入日期类型'}
                ],
                eta:[
                     {type:'date',message:'请输入日期类型'}
                ]
            }
        };
    },
    created:function(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            Vue.http.get(Api.backend_url + '/Purchase/purchaseList').then(response => {
                    this.purchaseList= response.body.data;
                    this._purchaseList = this.purchaseList;
                     console.log(response);
                }, response => {
                    console.log(response);
                });
        },
        handleSearchPurchase() {
            this.purchaseList = this._purchaseList.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.searchPurchaseForm.designInfo) >= 0 ||  el.vendorName.indexOf(this.searchPurchaseForm.vendorName) >= 0
                     || el.purchaseState.indexOf(this.searchPurchaseForm.purchaseState) >= 0 ||   el.oldOrNew.indexOf(this.searchPurchaseForm.oldOrNew) >= 0
            });
          },
        searchPurchase(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
            Vue.http.options.emulateJSON = true;
            Vue.http.post(Api.backend_url + '/Purchase/searchPurchaseList', this.searchPurchaseForm).then(response => {
              this.purchaseList = response.body.data;
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
    }
}
</script>