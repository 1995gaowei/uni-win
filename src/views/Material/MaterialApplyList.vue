<template>
    <div>
    <el-input
      placeholder="请输入查询信息（日期/申请人/物料）"
      icon="search"
      v-model="materialApplySearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '350px', 'min-width': '150px' }"
      @change="handleSearchMaterialApply">
    </el-input>

    <el-table
      :data="materialApplyList"
      style="width: 100%"
      border
      max-height="500">
      <el-table-column
        type="index"
        width="70">
      </el-table-column>
      <el-table-column
        prop="matrialApplyDate"
        label="申请日期"
        :formatter="dateFormatter">
      </el-table-column>
      <el-table-column
        prop="user.userAccount"
        label="申请人">
      </el-table-column>
      <el-table-column
        prop="material.materialCode"
        label="物料编号">
      </el-table-column>
      <el-table-column
        prop="materialApplyVol"
        label="申请数量">
      </el-table-column>
      <el-table-column
        prop="applyComment"
        label="备注">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Api from '@/config/api'

    export default {
        data() {
            return {
                materialApplyList: [],
                _materialApplyList: [],
                materialApplySearchInfo: ''
            }
        }, 
        created: function() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                Vue.http.get(Api.backend_url + '/Material/showApplyList').then(response => {
                    console.log(response);
                    this.materialApplyList = response.body.data;
                    this._materialApplyList = response.body.data;
                }, response => {
                    console.log(response);
                });
            },
            handleSearchMaterialApply() {
                 this.materialApplyList = this._materialApplyList.filter((el, idx, arr) => {
                    return el.user.userAccount.indexOf(this.materialApplySearchInfo) >= 0 || el.material.materialCode.indexOf(this.materialApplySearchInfo) >= 0 || el.matrialApplyDate.indexOf(this.materialApplySearchInfo) >= 0
                });
            },
            dateFormatter(row, column) {
                return row.matrialApplyDate.substring(0, 10);
            }
        }
    }
</script>