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
        <el-table-column prop="materialCode" label="物料编码"></el-table-column>
        <el-table-column prop="materialName" label="物料名称"></el-table-column>
        <el-table-column prop="location" label="仓储位置"></el-table-column>
        <el-table-column prop="remainVol" label="库存数"></el-table-column>
        <el-table-column label="操作"  width="75">
            <template scope="scope">
                <el-button @click="showMaterialInputDialog(scope.$index, scope.row)" type="primary" size="small">入库</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="物料入库" v-model="materialInputDialogVisible" size="tiny">
      <el-form :model="materialInputForm" :rules="materialInputRules" ref="materialInputForm" label-width="100px">
        <el-form-item label="物料编号">
          <span>{{materialInputForm.materialCode}}</span>
        </el-form-item>
        <el-form-item label="入库数量" prop="materialInputVol">
            <el-input-number v-model="materialInputForm.materialInputVol" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            v-model="materialInputForm.comment">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="materialInput">确认入库</el-button>
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
        inputIndex: '',

        materialInputDialogVisible: false,
        materialInputForm: {
          account: 'Messi',
          location: '',
          materialCode: '',
          materialInputVol: '',
          comment: ''
        },
        materialInputRules: {
          materialInputVol: [],
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
            return el.materialName.indexOf(this.materialSearchInfo) >=0 || el.materialCode.indexOf(this.materialSearchInfo) >= 0
        })
    },
    showMaterialInputDialog(index, store) {
      this.inputIndex = index;
      this.materialInputForm.materialCode = store.materialCode;
      this.materialInputForm.location = store.location;
      this.materialInputDialogVisible = true;
    },
    materialInput() {
      Vue.http.post(Api.backend_url + '/Warehouse/addInMaterial', this.materialInputForm).then(response => {
        console.log(response);
        this.materialInputDialogVisible = false;
        this.storeList[this.inputIndex].remainVol += this.materialInputForm.materialInputVol;
        this.resetForm('materialInputForm');
        this.$notify({
          title: '成功',
          message: '物料入库成功',
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