<template>
    <div>
    <el-input
      placeholder="请输入查询信息（编号，名称）"
      icon="search"
      v-model="materialSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '30%', 'min-width': '150px' }"
      @change="handleSearchMaterial">
    </el-input>
    <el-button type="success" :style="{ 'float': 'right' }" @click="addMaterialDialogVisible = true"><i class="el-icon-plus"></i> 新增物料</el-button>
    <el-table
      :data="materialList"
      style="width: 100%"
      border
      max-height="500">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="色号">
              <span>{{ props.row.colorCode }}</span>
            </el-form-item>
            <el-form-item label="颜色说明">
              <span>{{ props.row.colorDescription }}</span>
            </el-form-item>
            <el-form-item label="成分">
              <span>{{ props.row.materialIngredient }}</span>
            </el-form-item>
            <el-form-item label="单位">
              <span>{{ props.row.unit }}</span>
            </el-form-item>
            <el-form-item label="门幅">
              <span>{{ props.row.width }}</span>
            </el-form-item>
            <el-form-item label="出量">
              <span>{{ props.row.outputVol }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="materialCode"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="materialName"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="materialType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="145">
            <template scope="scope">
                <el-button @click="showApplyMaterialDialog(scope.row)" type="primary" size="small">申请</el-button>
                <el-button @click.native.prevent="deleteMaterial(scope.row.materialCode)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="新增物料" v-model="addMaterialDialogVisible">
    <el-form :model="addMaterialForm" :rules="addMaterialRules" ref="addMaterialForm" label-width="100px" inline>
    <el-form-item label="物料名称" prop="materialName">
        <el-input v-model="addMaterialForm.materialName"></el-input>
    </el-form-item>
    <el-form-item label="物料类型" prop="materialType">
        <el-select v-model="addMaterialForm.materialType" placeholder="请选择物料类型">
            <el-option label="面料" value="面料"></el-option>
            <el-option label="辅料" value="辅料"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="色号" prop="colorCode">
        <el-input v-model="addMaterialForm.colorCode"></el-input>
    </el-form-item>
    <el-form-item label="颜色说明" prop="colorDescription">
        <el-input v-model="addMaterialForm.colorDescription"></el-input>
    </el-form-item>
    <el-form-item label="物料成分" prop="materialIngredient">
        <el-input v-model="addMaterialForm.materialIngredient"></el-input>
    </el-form-item>
    <el-form-item label="单价" prop="unitPrice">
        <el-input v-model.number="addMaterialForm.unitPrice"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="unit">
        <el-input v-model="addMaterialForm.unit"></el-input>
    </el-form-item>
    <el-form-item label="门幅" prop="width">
        <el-input v-model.number="addMaterialForm.width"></el-input>
    </el-form-item>
    <el-form-item label="出量" prop="outputVol">
        <el-input v-model.number="addMaterialForm.outputVol"></el-input>
    </el-form-item>
    <el-form-item label="供应商" prop="vendorId">
        <el-select v-model="addMaterialForm.vendorId" placeholder="请选择供应商">
            <el-option :label="vendor.vendorName" :value="vendor.vendorId" v-for="vendor in vendors" :key="vendor.vendorId"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="仓储位置" prop="warehouse">
        <el-select v-model="addMaterialForm.warehouse" placeholder="请选择仓储位置">
            <el-option :label="warehouse.location" :value="warehouse.location" v-for="warehouse in warehouses" :key="warehouses.warehouseid"></el-option>
        </el-select>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMaterial('addMaterialForm')">确认新增</el-button>
      </div>
    </el-dialog>

    <el-dialog title="申请物料" v-model="applyMaterialDialogVisible" size="tiny">
      <el-form :model="applyMaterialForm" :rules="applyMaterialRules" ref="applyMaterialForm" label-width="100px">
        <el-form-item label="物料编号">
          <span>{{applyMaterialForm.materialCode}}</span>
        </el-form-item>
        <el-form-item label="申请数量" prop="materialApplyVol">
            <el-input v-model.number="applyMaterialForm.materialApplyVol"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="applyComment">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            v-model="applyMaterialForm.applyComment">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyMaterial('applyMaterialForm')">确认申请</el-button>
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
          materialList: [],
          backupMaterialList: [],
          materialSearchInfo: '',

          applyMaterialDialogVisible: false,
          applyMaterialForm: {
            account: 'Messi',
            materialCode: '',
            materialApplyVol: '',
            applyComment: ''
          },
          applyMaterialRules: {
            materialApplyVol: [
              { required: true, message:'请输入申请数量' },
              { type: 'number', message: '申请数量必须为数字值' }
            ],
            applyComment:[]
          },

          addMaterialDialogVisible: false,
          addMaterialForm: {
            materialCode: '',
            materialName: '',
            materialType: '',
            colorCode: '',
            colorDescription: '',
            materialIngredient: '',
            unitPrice: '',
            unit: '',
            width: '',
            outputVol: '',
            vendorId: '',
            warehouse: ''
          },
          addMaterialRules: {
            materialName: [
              { required: true, message: '请输入物料名称' }
            ],
            materialType: [
              { required: true, message: '请选择物料类型' }
            ],
            colorCode: [
              { required: true, message: '请输入色号' }
            ],
            colorDescription: [
              { required: true, message: '请输入颜色描述' }
            ],
            materialIngredient: [
              { required: true, message: '请输入物料成分' }
            ],
            unitPrice: [
              { required: true, message: '请输入单价' },
              { type: 'number', message: '单价必须为数字值' }
            ],
            unit: [
              { required: true, message: '请输入单位' }
            ],
            width: [
              { required: true, message: '请输入门幅' },
              { type: 'number', message: '门幅必须为数字值' }
            ],
            outputVol: [
              { required: true, message: '请输入出量' },
              { type: 'number', message: '出量必须为数字值' }
            ],
            vendorId: [
              { required: true, message: '请输入供应商' }
            ],
            warehouse: [
              { required: true, message: '请输入仓储位置' }
            ]
          },
          vendors: [],
          warehouses: []
        }
      },
      created: function() {
          this.fetchData();
      },
      methods: {
          fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getMaterialList').then(response => {
                    this.backupMaterialList = response.body.data;
                    this.materialList = response.body.data;
                    Vue.http.get(Api.backend_url + '/Material/getVendorList').then(response => {
                        this.vendors = response.body.data;
                        Vue.http.get(Api.backend_url + '/Material/getWarehouseList').then(response => {
                            this.warehouses = response.body.data;
                        }, response => {
                            console.log(response);
                        });
                    }, response => {
                        console.log(response);
                    });
                }, response => {
                    console.log(response);
                });
          },
          deleteMaterial(materialCode) {
            let idx;
            for (idx in this.backupMaterialList) {
              if (this.backupMaterialList[idx].materialCode == materialCode) {
                this.backupMaterialList.splice(idx, 1);
                break;
              }
            }
            this.handleSearchMaterial();
            this.$notify({
              title: '成功',
              message: '物料删除成功',
              type: 'success'
            });
          },
          handleSearchMaterial() {
            this.materialList = this.backupMaterialList.filter((el, idx, arr) => {
              return el.materialCode.indexOf(this.materialSearchInfo) >= 0 || el.materialName.indexOf(this.materialSearchInfo) >= 0
            });
          },
          showApplyMaterialDialog(row) {
            this.applyMaterialForm.materialCode = row.materialCode;
            this.applyMaterialDialogVisible = true;
          },
          applyMaterial(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                Vue.http.post(Api.backend_url + '/Material/addMaterialApply', this.applyMaterialForm).then(response => {
                  console.log(response);
                  this.applyMaterialDialogVisible = false;
                  this.resetForm('applyMaterialForm');
                  this.$notify({
                    title: '成功',
                    message: '申请物料成功',
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
          addMaterial(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.addMaterialForm.materialCode = 'WL' + new Date().getTime();
                Vue.http.post(Api.backend_url + '/Material/addMaterial', this.addMaterialForm).then(response => {
                  console.log(response);
                  let newMaterial = {};
                  for (let k in this.addMaterialForm) {
                    newMaterial[k] = this.addMaterialForm[k];
                  }
                  this.backupMaterialList.unshift(newMaterial);
                  this.handleSearchMaterial();
                  this.addMaterialDialogVisible = false;
                  this.resetForm('addMaterialForm');
                  this.$notify({
                    title: '成功',
                    message: '新增物料成功',
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

<style>
  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>