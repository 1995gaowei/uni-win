<template>
<div>
    <el-input
      placeholder="请输入查询信息（日期/物料/操作人）"
      icon="search"
      v-model="materialInputSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '30%', 'min-width': '150px' }"
      @change="handleSearchMaterialInput">
    </el-input>

    <el-table :data="materialInputList" style="width:100%" border  max-height="500">
        <el-table-column prop="materialInputDate" sortable label="入库日期" width="120" :formatter="dateFormatter"></el-table-column>
        <el-table-column prop="material.materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="material.materialName" label="物料名称"></el-table-column>
        <el-table-column prop="materialInputVol" label="入库数量" ></el-table-column>
        <el-table-column prop="user.userName" label="操作人" ></el-table-column>
        <el-table-column prop="warehouse.location" label="仓储位置" width="180"></el-table-column>
        <el-table-column prop="materialInputComment" label="备注"></el-table-column>
    </el-table>

</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
    return{
    materialInputSearchInfo: '',
    materialInputList: [],
    _materialInputList: []
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.backend_url + '/Warehouse/materialInManage').then(response => {
            this.materialInputList = response.body.data;
            this._materialInputList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchMaterialInput () {
        this.materialInputList = this._materialInputList.filter((el, idx, arr) => {
            return el.material.materialName.indexOf(this.materialInputSearchInfo) >=0 || el.material.materialCode.indexOf(this.materialInputSearchInfo) >= 0 ||
            el.materialInputDate.indexOf(this.materialInputSearchInfo) >= 0 || el.user.userName.indexOf(this.materialInputSearchInfo) >= 0
        })
    },
    dateFormatter(row, column) {
        return row.materialInputDate.substring(0, 10);
    }
  }
}
</script>