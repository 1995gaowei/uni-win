<template>
    <el-table
      :data="materialList"
      style="width: 100%"
      border
      max-height="500">
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="materialCode"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="materialName"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="materialType"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="colorCode"
        label="色号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="colorDescription"
        label="颜色说明"
        width="120">
      </el-table-column>
      <el-table-column
        prop="materialIngredient"
        label="成分"
        width="150">
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="单价"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="width"
        label="门幅">
      </el-table-column>
      <el-table-column
        prop="outputVol"
        label="出量"
        sortable
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
            <template scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, materialList)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </template>

  <script>
   import Vue from 'vue'
   import Api from '@/config/api'

    export default {
      data() {
        return {
          materialList: []
        }
      },
      created: function() {
          this.fetchData();
      },
      methods: {
          fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getMaterialList').then(response => {
                    this.materialList = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          deleteRow(index, rows) {
              rows.splice(index, 1);
          }
      }
    }
  </script>