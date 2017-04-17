<template>
    <div>
    <el-input
      placeholder="请输入查询信息（名称/地址/联系方式）"
      icon="search"
      v-model="vendorSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '350px', 'min-width': '150px' }"
      @change="handleSearchVendor">
    </el-input>
    <el-button type="success" :style="{ 'float': 'right' }" @click="addVendorDialogVisible = true"><i class="el-icon-plus"></i> 新增供应商</el-button>
    <el-table
      :data="vendorList"
      style="width: 100%"
      border
      max-height="500">
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="vendorName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="vendorPhoneNum"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="vendorAddr"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作"
        width="75">
            <template scope="scope">
                <el-button @click.native.prevent="deleteVendor(scope.row.vendorName)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="新增供应商" v-model="addVendorDialogVisible">
    <el-form :model="addVendorForm" :rules="addVendorRules" ref="addVendorForm" label-width="100px" inline class="half-form-s">
    <el-form-item label="名称" prop="vendorName">
        <el-input v-model="addVendorForm.vendorName"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="vendorPhoneNum">
        <el-input v-model="addVendorForm.vendorPhoneNum"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="vendorAddr" style="width: 100%;">
        <el-input v-model="addVendorForm.vendorAddr"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addVendor('addVendorForm')">确认新增</el-button>
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
          vendorList: [],
          backupVendorList: [],
          vendorSearchInfo: '',

          addVendorDialogVisible: false,
          addVendorForm: {
            vendorName: '',
            vendorName: '',
            vendorPhoneNum:'',
            vendorAddr: ''
          },
          addVendorRules: {
            vendorName: [
              { required: true, message: '请输入供应商名称' }
            ],
            vendorPhoneNum: [
              { required: true, message: '请输入联系方式' }
            ],
            vendorAddr: [
              { required: true, message: '请输入地址' }
            ]
          },
        }
      },
      created: function() {
          this.fetchData();
      },
      methods: {
          fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getVendorList').then(response => {
                    this.backupVendorList = response.body.data;
                    this.vendorList = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          deleteVendor(vendorName) {
              let idx;
              for (idx in this.backupVendorList) {
                if (this.backupVendorList[idx].vendorName == vendorName) {
                  this.backupVendorList.splice(idx, 1);
                  break;
                }
              }
              this.handleSearchVendor();
              this.$message({
                message: '供应商删除成功',
                type: 'success'
              });
          },
          handleSearchVendor() {
            this.vendorList = this.backupVendorList.filter((el, idx, arr) => {
              return el.vendorName.indexOf(this.vendorSearchInfo) >= 0 || el.vendorAddr.indexOf(this.vendorSearchInfo) >= 0 || el.vendorPhoneNum.indexOf(this.vendorSearchInfo) >= 0
            });
          },
          addVendor(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                Vue.http.post(Api.addVendor, this.addVendorForm).then(response => {
                  console.log(response);
                  let newVendor = {};
                  for (let k in this.addVendorForm) {
                    newVendor[k] = this.addVendorForm[k];
                  }
                  this.backupVendorList.unshift(newVendor);
                  this.handleSearchVendor();
                  this.addVendorDialogVisible = false;
                  this.resetForm('addVendorForm');
                  this.$message({
                    message: '供应商新增成功',
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
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
      }
    }
  </script>