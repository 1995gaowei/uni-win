<template>
<div>
    <el-input
      placeholder="请输入查询信息"
      icon="search"
      v-model="materialSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '30%', 'min-width': '150px' }"
      @change="handleSearchMaterial">
    </el-input>

    <el-table :data="storeList" style="width:100%" border  max-height="500">
      <el-table-column type="index" width="70"></el-table-column>
        <el-table-column prop="material.materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="material.materialName" label="物料名称"></el-table-column>
        <el-table-column prop="warehouse.location" label="仓储位置"></el-table-column>
        <el-table-column prop="remainVol" label="库存数"></el-table-column>
        <el-table-column label="操作"  width="75">
            <template scope="scope">
                <el-button @click="showMaterialOutputDialog(scope.$index, scope.row)" type="primary" size="small">出库</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="物料出库" v-model="materialOutputDialogVisible" size="tiny">
      <el-form :model="materialOutputForm" :rules="materialOutputRules" ref="materialOutputForm" label-width="100px">
        <el-form-item label="物料编号">
          <span>{{materialOutputForm.materialCode}}</span>
        </el-form-item>
        <el-form-item label="出库数量" prop="materialOutputVol">
            <el-input-number v-model="materialOutputForm.materialOutputVol" :min="0" :max="maxVol"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            v-model="materialOutputForm.comment">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="materialOutput">确认出库</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
  data () {
    return{
        materialSearchInfo: '',
        storeList: [],
        _storeList: [],
        outputIndex: '',
        maxVol: 1000,

        materialOutputDialogVisible: false,
        materialOutputForm: {
          account: 'Messi',
          warehouseId: '',
          materialCode: '',
          materialOutputVol: '',
          comment: ''
        },
        materialOutputRules: {
          materialOutputVol: [],
          comment: []
        }
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.backend_url + '/Warehouse/materialOut_showAllStores').then(response => {
            this.storeList = response.body.data;
            this._storeList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchMaterial () {
        this.storeList = this._storeList.filter((el, idx, arr) => {
            return el.material.materialName.indexOf(this.materialSearchInfo) >=0 || el.material.materialCode.indexOf(this.materialSearchInfo) >= 0
        })
    },
    showMaterialOutputDialog(index, store) {
      this.outputIndex = index;
      this.maxVol = store.remainVol;
      this.materialOutputForm.materialCode = store.material.materialCode;
      this.materialOutputForm.warehouseId = store.warehouse.warehouseid;
      this.materialOutputDialogVisible = true;
    },
    materialOutput() {
      Vue.http.post(Api.backend_url + '/Warehouse/doMaterialOut', this.materialOutputForm).then(response => {
        console.log(response);
        this.materialOutputDialogVisible = false;
        this.storeList[this.outputIndex].remainVol -= this.materialOutputForm.materialOutputVol;
        this.resetForm('materialOutputForm');
        this.$notify({
          title: '成功',
          message: '物料出库成功',
          type: 'success'
        });
      }, response => {
        console.log(response);
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>