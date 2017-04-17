<template>
<div>
    <el-input
      placeholder="请输入查询信息（日期/款式/加工方/操作人）"
      icon="search"
      v-model="techniqueSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '350px', 'min-width': '150px' }"
      @change="handleSearchTechnique">
    </el-input>

    <el-table :data="techniqueList" style="width:100%" border  max-height="500">
        <el-table-column type="expand">
            <template scope="props">
            <el-form label-position="left" inline class="table-expand">
                <el-form-item label="工艺技术"><span>{{ props.row.technique }}</span></el-form-item>
                <el-form-item label="面料"><span>{{ props.row.techShellType }}</span></el-form-item>
                <el-form-item label="样板尺寸"><span>{{ props.row.techSampleSize }}</span></el-form-item>
                <el-form-item label="作缝大小"><span>{{ props.row.techJointSize }}</span></el-form-item>
                <el-form-item label="线距"><span>{{ props.row.techLineDistance }}</span></el-form-item>
                <el-form-item label="整烫要求"><span>{{ props.row.techPressingReq }}</span></el-form-item>
                <el-form-item label="备注" style="width: 100%;"><span>{{ props.row.techComment }}</span></el-form-item>
                <el-form-item label="详情" style="width: 100%;"></el-form-item>
                <el-table :data="props.row.inventoryList">
                    <el-table-column prop="techInPartName" label="部位名称"></el-table-column>
                    <el-table-column prop="techInMCode" label="码数"></el-table-column>
                    <el-table-column prop="techInTolerance" label="公差（cm）"></el-table-column>
                </el-table>
            </el-form>
            </template>
        </el-table-column>
        <el-table-column
            label="图片"
            width="150">
            <template scope="scope">
                <img src="../../assets/1.jpg" class="image">
            </template>
        </el-table-column>
        <el-table-column prop="techDate" sortable label="日期" width="120" :formatter="dateFormatter"></el-table-column>
        <el-table-column prop="design.designCode" label="款式编号"></el-table-column>
        <el-table-column prop="design.designName" label="款式名称"></el-table-column>
        <el-table-column prop="processor.processorName" label="加工方" ></el-table-column>
        <el-table-column prop="user.userAccount" label="操作人" ></el-table-column>
    </el-table>

</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
    return{
    techniqueSearchInfo: '',
    techniqueList: [],
    backupTechniqueList: [],
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.getAllTechnique).then(response => {
            this.techniqueList = response.body.data;
            this.backupTechniqueList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchTechnique () {
        this.techniqueList = this.backupTechniqueList.filter((el, idx, arr) => {
            return el.design.designCode.indexOf(this.techniqueSearchInfo) >=0 || el.design.designName.indexOf(this.techniqueSearchInfo) >= 0 || el.techDate.indexOf(this.techniqueSearchInfo) >= 0 || el.user.userAccount.indexOf(this.techniqueSearchInfo) >= 0 || el.processor.processorName.indexOf(this.techniqueSearchInfo) >= 0
        })
    },
    dateFormatter(row, column) {
        return row.techDate.substring(0, 10);
    }
  }
}
</script>