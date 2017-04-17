<template>
    <el-select  placeholder="请选择物料" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="materialCode">
        <el-option :label="material.materialCode+'--'+material.materialName" :value="material.materialCode" v-for="material in materials" :key="material.materialCode"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            materials: [],
            materialCode: this.value
        }
    },
    watch: {
        value: function() {
            this.materialCode = this.value;
        }
    },
    props: ['value'],
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getMaterialList').then(response => {
                    this.materials = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.materialCode;
              this.$emit('input', this.materialCode);
          }
    }
}
</script>

<style scoped>
    .el-select {
        width: 100%;
    }
</style>