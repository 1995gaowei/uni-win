<template>
<div>
    <el-input
      placeholder="请输入查询信息（日期/物料/操作人）"
      icon="search"
      v-model="materialOutputSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '350px', 'min-width': '150px' }"
      @change="handleSearchMaterialOutput">
    </el-input>

    <el-table :data="materialOutputList" style="width:100%" border  max-height="500">
        <el-table-column prop="materialOutputDate" sortable label="出库日期" width="120" :formatter="dateFormatter"></el-table-column>
        <el-table-column prop="material.materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="material.materialName" label="物料名称"></el-table-column>
        <el-table-column prop="materialOutputVol" label="出库数量" ></el-table-column>
        <el-table-column prop="user.userName" label="操作人" ></el-table-column>
        <el-table-column prop="warehouse.location" label="仓储位置" width="180"></el-table-column>
        <el-table-column prop="materialOutputComment" label="备注"></el-table-column>
    </el-table>

</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
    return{
    materialOutputSearchInfo: '',
    materialOutputList: [],
    backupMaterialOutputList: []
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.backend_url + '/Warehouse/materialOut_showMaterialOutputs').then(response => {
            this.materialOutputList = response.body.data;
            this.backupMaterialOutputList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchMaterialOutput () {
        this.materialOutputList = this.backupMaterialOutputList.filter((el, idx, arr) => {
            return el.material.materialName.indexOf(this.materialOutputSearchInfo) >=0 || el.material.materialCode.indexOf(this.materialOutputSearchInfo) >= 0 ||
            el.materialOutputDate.indexOf(this.materialOutputSearchInfo) >= 0 || el.user.userName.indexOf(this.materialOutputSearchInfo) >= 0
        })
    },
    dateFormatter(row, column) {
        return row.materialOutputDate.substring(0, 10);
    }
  }
}
</script>