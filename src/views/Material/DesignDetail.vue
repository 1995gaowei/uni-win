<template>
    <div>
        <el-row type="flex" justify="space-around">
            <el-col :span="6">
                <img src="../../assets/logo.png" class="image">
            </el-col>
            <el-col :span="6">
                <el-form label-width="80px" label-position="left">
                    <el-form-item label="款式编号"><span>{{design.designCode}}</span></el-form-item>
                    <el-form-item label="款式名称"><span>{{design.designName}}</span></el-form-item>
                    <el-form-item label="价格"><span>{{design.designProcessPrice}}</span></el-form-item>
                    <el-form-item label="款式类型"><span>{{design.designType}}</span></el-form-item>
                    <el-form-item label="颜色说明"><span>{{design.designColorDescription}}</span></el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6">
                <el-form label-position="left" label-width="80px">
                    <el-form-item label="吊牌编号"><span>{{design.designHangTagCode}}</span></el-form-item>
                    <el-form-item label="主标编号"><span>{{design.designMainLabelCode}}</span></el-form-item>
                    <el-form-item label="水洗编号"><span>{{design.designsewninCode}}</span></el-form-item>
                    <el-form-item label="工序"><span>{{design.designTechProcedure}}</span></el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <hr>
        <h3 style="font-weight: normal; display: inline-block;">Bom列表</h3>
        <el-button type="success" style="float: right; margin-top: 15px;" @click="addBomDialogVisible = true"><i class="el-icon-plus"></i> 新增Bom</el-button>
        <el-table :data="bomList" border max-height="400" style="margin-top: 5px;margin-bottom: 20px; width: 100%;">
            <el-table-column type="index" width="70"></el-table-column>
            <el-table-column prop="materialCode" label="物料编号"></el-table-column>
            <el-table-column prop="materialName" label="物料名称"></el-table-column>
            <el-table-column prop="materialPosition" label="物料位置"></el-table-column>
            <el-table-column prop="volPerDesign" label="用量"></el-table-column>
            <el-table-column  label="操作"  width="75">
            <template scope="scope">
                    <el-button @click.native.prevent="deleteBom(scope.row.materialCode, scope.$index)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增Bom" v-model="addBomDialogVisible" size="tiny">
            <el-form :model="addBomForm" :rules="addBomRules" ref="addBomForm" label-width="60px">
                <el-form-item label="物料" prop="materialCode">
                    <el-select v-model="addBomForm.materialCode" filterable placeholder="请选择物料" style="width: 100%;">
                        <el-option :label="material.materialCode+'--'+material.materialName" :value="material.materialCode" v-for="material in materials" :key="materials.materialCode"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="位置" prop="materialPosition">
                    <el-input v-model="addBomForm.materialPosition"></el-input>
                </el-form-item>
                <el-form-item label="用量" prop="volPerDesign">
                    <el-input v-model.number="addBomForm.volPerDesign"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addBom('addBomForm')">确认新增</el-button>
            </div>
        </el-dialog>

        <el-button @click="toDesignList" type="primary">返回</el-button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Api from '@/config/api'

    export default {
        data () {
            return {
                design: {},
                bomList: [],

                addBomDialogVisible: false,
                addBomForm: {
                    designCode: '',
                    materialCode: '',
                    materialPosition: '',
                    volPerDesign: ''
                },
                addBomRules: {
                    materialCode: [
                        { required: true, message: '请选择物料' }
                    ],
                    materialPosition: [
                        { required: true, message: '请输入位置' }
                    ],
                    volPerDesign: [
                        { required: true, message: '请输入用量' },
                        { type: 'number', message: '用量必须为数字值' }
                    ]
                },

                materials: []
            }
        },
        created: function () {
            this.fetchData();
        },
        methods: {
            fetchData () {
                Vue.http.get(Api.backend_url + '/Bom/getBom?designId=' + this.$route.params.designID).then(response => {
                    this.design = response.body.data.design;
                    this.bomList = response.body.data.bom;
                    Vue.http.get(Api.backend_url + '/Material/getMaterialList').then(response => {
                        this.materials = response.body.data;
                    }, response => {
                        console.log(response);
                    });
                }, response => {
                    console.log(response);
                })
            },
            addBom (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addBomForm.designCode = this.design.designCode;
                        Vue.http.post(Api.backend_url + '/Bom/addBom', this.addBomForm).then(response => {
                        console.log(response);
                        let newBom ={};
                        for (let k in this.addBomForm) {
                            newBom[k] = this.addBomForm[k]
                        }
                        this.bomList.unshift(newBom);
                        this.addBomDialogVisible = false;
                        this.resetForm('addBomForm');
                        this.$notify({
                            title: '成功',
                            message: 'Bom新增成功',
                            type: 'success'
                        });
                        }, response => {
                        console.log(response);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            deleteBom (materialCode, index) {
                console.log('delete');
                let deleteBom = {};
                deleteBom.materialCode = materialCode;
                deleteBom.designCode = this.design.designCode;
                Vue.http.post(Api.backend_url + '/Bom/deleteBom', deleteBom).then(response => {
                    console.log(response);
                    this.bomList.splice(index, 1);
                    this.$notify({
                        title: '成功',
                        message: 'Bom删除成功',
                        type: 'success'
                    });
                }, response => {

                });
            },
            toDesignList () {
                this.$router.push('/Material/DesignList');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped>
    .image{
      width: 100%;
    }
</style>