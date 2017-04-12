<template>
    <el-select  placeholder="请选择款式" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="designCode">
        <el-option :label="design.designCode" :value="design.designCode" v-for="design in designs" :key="design.designCode"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            designs: [],
            designCode: this.value
        }
    },
    watch: {
        value: function() {
            this.designCode = this.value;
        }
    },
    props: ['value'],
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/Bom/getAllDesign').then(response => {
                    this.designs = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.designCode;
              this.$emit('input', this.designCode);
          }
    }
}
</script>