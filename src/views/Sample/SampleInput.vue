<template>
<div>
    <el-input
      placeholder="请输入查询信息（编号/名称）"
      icon="search"
      v-model="designSearchInfo"
      :style="{ 'margin-bottom': '20px', 'width': '350px', 'min-width': '150px' }"
      @change="handleSearchDesign">
    </el-input>

    <el-table :data="designList" style="width:100%" border  max-height="500">
      <el-table-column type="index" width="70"></el-table-column>
      <el-table-column label="图片" width="200">
        <template scope="scope">
          <img src="../../assets/1.jpg" class="image">
        </template>
      </el-table-column>
        <el-table-column prop="designCode" label="款式编码"></el-table-column>
        <el-table-column prop="designName" label="款式名称"></el-table-column>
        <el-table-column prop="designProcessPrice" label="价格" sortable></el-table-column>
        <el-table-column label="操作"  width="105">
            <template scope="scope">
                <el-button @click="showSampleInputDialog(scope.$index, scope.row)" type="primary" size="small">样衣入库</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog title="样衣入库" v-model="sampleInputDialogVisible" size="tiny">
      <el-form :model="sampleInputForm" :rules="sampleInputRules" ref="sampleInputForm" label-width="100px">
        <el-form-item label="款式编号">
          <span>{{sampleInputForm.designCode}}</span>
        </el-form-item>
        <el-form-item label="入库位置" prop="samplePlace">
            <el-input v-model="sampleInputForm.samplePlace"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="comment">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2 }"
            v-model="sampleInputForm.comment">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sampleInput">确认入库</el-button>
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
        designSearchInfo: '',
        designList: [],
        backupDesignList: [],
        inputIndex: '',

        sampleInputDialogVisible: false,
        sampleInputForm: {
          account: 'Messi',
          designCode: '',
          samplePlace: '',
          comment: ''
        },
        sampleInputRules: {
          samplePlace: [
              { required: true, message: '请输入入库位置' }
        ],
          comment: []
        }
    };
  },
  created: function () {
    this.fetchData();
  },
  methods:{
    fetchData () {
        Vue.http.get(Api.backend_url + '/Bom/getAllDesign').then(response => {
            this.designList = response.body.data;
            this.backupDesignList = response.body.data;
        }, response => {
            console.log(response);
        });
    },
    handleSearchDesign () {
        this.designList = this.backupDesignList.filter((el, idx, arr) => {
            return el.designName.indexOf(this.designSearchInfo) >=0 || el.designCode.indexOf(this.designSearchInfo) >= 0
        })
    },
    showSampleInputDialog(index, store) {
      this.inputIndex = index;
      this.sampleInputForm.designCode = store.designCode;
      this.sampleInputDialogVisible = true;
    },
    sampleInput() {
        this.$refs['sampleInputForm'].validate((valid) => {
            if (valid) {
                Vue.http.post(Api.addSampleInput, this.sampleInputForm).then(response => {
                    console.log(response);
                    this.sampleInputDialogVisible = false;
                    this.resetForm('sampleInputForm');
                    this.$message({
                    message: '样衣入库成功',
                    type: 'success'
                    });
                }, response => {
                    console.log(response);
                });
            } else {
                console.log('error submit');
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