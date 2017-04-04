<template>
    <div>
    <el-input
      placeholder="请输入查询信息"
      icon="search"
      v-model="designSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '30%', 'min-width': '150px' }"
      @change="handleSearchDesign">
    </el-input>
    <el-button type="success" :style="{ 'float': 'right' }" @click="addDesignDialogVisible = true"><i class="el-icon-plus"></i> 新增款式</el-button>
    <el-table
      :data="designList"
      style="width: 100%"
      border
      max-height="500">
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="designCode"
        label="编号"
        width="230">
      </el-table-column>
      <el-table-column
        prop="designName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="designProcessPrice"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="designType"
        label="款式类型">
      </el-table-column>
      <el-table-column
        prop="designColorDescription"
        label="颜色说明">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="145">
            <template scope="scope">
                <el-button @click="showApplyDesignDialog(scope.row)" type="primary" size="small">详情</el-button>
                <el-button @click.native.prevent="deleteDesign(scope.$index, designList)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="新增款式" v-model="addDesignDialogVisible">
    <el-form :model="addDesignForm" :rules="addDesignRules" ref="addDesignForm" label-width="100px">
    <el-form-item label="款式编号" prop="designCode">
        <el-input v-model="addDesignForm.designCode"></el-input>
    </el-form-item>
    <el-form-item label="款式名称" prop="designName">
        <el-input v-model="addDesignForm.designName"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="designProcessPrice">
        <el-input v-model.number="addDesignForm.designProcessPrice"></el-input>
    </el-form-item>
    <el-form-item label="款式类型" prop="designType">
        <el-input v-model="addDesignForm.designType"></el-input>
    </el-form-item>
    <el-form-item label="上架时间" prop="designPutawayDate">
        <el-date-picker v-model="addDesignForm.designPutawayDate"></el-date-picker placeholder="选择日期">
    </el-form-item>
    <el-form-item label="吊牌编号" prop="designHangTagCode">
        <el-input v-model="addDesignForm.designHangTagCode"></el-input>
    </el-form-item>
    <el-form-item label="水洗编号" prop="designsewninCode">
        <el-input v-model="addDesignForm.designsewninCode"></el-input>
    </el-form-item>
    <el-form-item label="主标编号" prop="designMainLabelCode">
        <el-input v-model="addDesignForm.designMainLabelCode"></el-input>
    </el-form-item>
    <el-form-item label="工序" prop="designTechProcedure">
        <el-select v-model="addDesignForm.designType" placeholder="请选择工序">
            <el-option label="裁剪-工艺-外发" value="裁剪-工艺-外发"></el-option>
            <el-option label="工艺-裁剪-外发" value="工艺-裁剪-外发"></el-option>
            <el-option label="裁剪-外发" value="裁剪-外发"></el-option>
            <el-option label="外发" value="外发"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="颜色说明" prop="designColorDescription">
        <el-input v-model="addDesignForm.designColorDescription"></el-input>
    </el-form-item>
    <el-form-item label="旗舰地址" prop="designFlagShipURL">
        <el-input v-model="addDesignForm.designFlagShipURL"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="designComment">
        <el-input v-model="addDesignForm.designComment"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDesign('addDesignForm')">确认新增</el-button>
      </div>
    </el-dialog>

    </div>
  </template>

  <script>
   import Vue from 'vue'
   import Api from '@/config/api'

    export default {
      data() {
        return {
          designList: [],
          _designList: [],
          designSearchInfo: '',

          addDesignDialogVisible: false,
          addDesignForm: {
            designCode: '',
            designName: '',
            designProcessPrice:'',
            designType: '',
            designPutawayDate: '', 
            designHangTagCode: '',
            designsewninCode: '',
            designMainLabelCode: '',
            designColorDescription: '',

          },
          addDesignRules: {
            designCode: [
              { required: true, message: '请输入款式编号' }
            ],
            designName: [
              { required: true, message: '请输入款式名称' }
            ],
            designProcessPrice: [
              { required: true, message: '请输入单价' },
              { type: 'number', message: '单价必须为数字值' }
            ],
            designType: [
              { required: true, message: '请输入款式类型' }
            ],
            designPutawayDate: [
              { required: true, message: '请选择上架时间' }
            ],
            designHangTagCode: [
              { required: true, message: '请输入吊牌编号' }
            ],
            designsewninCode: [
              { required: true, message: '请输入水洗编号' }
            ],
            designMainLabelCode: [
              { required: true, message: '请输入主标编号' }
            ],
            designTechProcedure: [
              { required: true, message: '请选择工序' }
            ],
            designColorDescription: [
              { required: true, message: '请输入颜色描述' }
            ],
            designFlagShipURL: [
              { required: true, message: '请输入旗舰店地址' }
            ]
          },
        }
      },
      created: function() {
          this.fetchData();
      },
      methods: {
          fetchData() {
              Vue.http.get(Api.backend_url + '/Bom/showDesignList').then(response => {
                    this.designList = response.body.data;
                    this._designList = this.designList;
                }, response => {
                    console.log(response);
                });
          },
          deleteDesign(index, rows) {
              rows.splice(index, 1);
          },
          handleSearchDesign() {
            this.designList = this._designList.filter((el, idx, arr) => {
              return el.designCode.indexOf(this.designSearchInfo) >= 0 || el.designName.indexOf(this.designSearchInfo) >= 0
            });
          },
          showApplyDesignDialog(row) {

          },
          addDesign(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                // Vue.http.post(Api.backend_url + '/Design/addDesign', this.addDesignForm).then(response => {
                //   console.log(response);
                  let newDesign = {};
                  for (let k in this.addDesignForm) {
                    newDesign[k] = this.addDesignForm[k];
                  }
                  this._designList.unshift(newDesign);
                  this.addDesignDialogVisible = false;
                  this.resetForm('addDesignForm');
                  this.$notify({
                    title: '成功',
                    message: '新增款式成功',
                    type: 'success'
                  });
                // }, response => {
                //   console.log(response);
                // });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
      }
    }
  </script>