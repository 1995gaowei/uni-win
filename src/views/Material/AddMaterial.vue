<template>
    <div>
    <el-form :model="addMaterialForm" :rules="rules" ref="addMaterialForm" label-width="100px">
    <el-form-item label="物料编号" prop="materialCode">
        <el-input v-model="addMaterialForm.materialCode"></el-input>
    </el-form-item>
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
        <el-input v-model="addMaterialForm.width"></el-input>
    </el-form-item>
    <el-form-item label="出量" prop="outputVol">
        <el-input v-model="addMaterialForm.outputVol"></el-input>
    </el-form-item>
    <el-form-item label="供应商" prop="vendorName">
        <el-select v-model="addMaterialForm.vendorName" placeholder="请选择供应商">
            <el-option :value="vendor.vendorId" v-for="vendor in vendors" :key="vendor.vendorId">{{vendor.vendorName}}</el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="仓储位置" prop="warehouse">
        <el-select v-model="addMaterialForm.warehouse" placeholder="请选择仓储位置">
            <el-option :value="warehouse.warehouseid" v-for="warehouse in warehouses" :key="warehouses.warehouseid">{{warehouse.location}}</el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('addMaterialForm')">确认新增</el-button>
        <el-button @click="resetForm('addMaterialForm')">取消</el-button>
    </el-form-item>
    </el-form>
    </div>
</template>
<script>
  import Vue from 'vue'
  import Api from '@/config/api'

  export default {
    data() {
      return {
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
          vendorName: '',
          warehouse: ''
        },
        rules: {
          materialCode: [
            { required: true, message: '请输入物料编号' }
          ],
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
            { required: true, message: '请输入门幅' }
          ],
          outputVol: [
            { required: true, message: '请输入出量' }
          ],
          vendorName: [
            { required: true, message: '请输入供应商' }
          ],
          warehouse: [
            { required: true, message: '请输入仓储位置' }
          ]
        },
        vendors: '',
        warehouses: ''
      };
    },
    created: function () {
        this.fetchData()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      fetchData () {
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

      }
    }
  }
</script>