<template>
<div>
    <el-input
      placeholder="请输入查询信息（款式，状态，位置）"
      icon="search"
      v-model="sampleSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '30%', 'min-width': '150px' }"
      @change="handleSearchSample">
    </el-input>

    <el-table :data="sampleList" style="width:100%" border  max-height="500">
        <el-table-column type="expand">
            <template scope="props">
            <el-form label-position="left" inline class="table-expand">
                <el-form-item label="详情" style="width: 100%;"></el-form-item>
                <el-table :data="props.row.sampledetail">
                    <el-table-column prop="sampleOPTime":formatter="dateFormatter" label="操作日期"></el-table-column>
                    <el-table-column prop="sampleOPType" label="操作类型"></el-table-column>
                    <el-table-column prop="sampleOPComment" label="备注"></el-table-column>
                </el-table>
            </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="design.designCode" label="款式编号"></el-table-column>
        <el-table-column prop="design.designName" label="款式名称"></el-table-column>
        <el-table-column prop="samplePlace" label="位置" ></el-table-column>
        <el-table-column prop="sampleState" label="状态" ></el-table-column>
    </el-table>

</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
    return{
    sampleSearchInfo: '',
    sampleList: [],
    backupsampleList: [],
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.getAllSample).then(response => {
            this.sampleList = response.body.data;
            this.backupsampleList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchSample () {
        this.sampleList = this.backupsampleList.filter((el, idx, arr) => {
            return el.design.designCode.indexOf(this.sampleSearchInfo) >=0 || el.design.designName.indexOf(this.sampleSearchInfo) >= 0 || el.sampleState.indexOf(this.sampleSearchInfo) >= 0 || el.samplePlace.indexOf(this.sampleSearchInfo) >= 0
        })
    },
    dateFormatter(row, column) {
        return row.sampleOPTime.substring(0, 10);
    }
  }
}
</script>