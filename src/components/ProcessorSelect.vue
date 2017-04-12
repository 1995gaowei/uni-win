<template>
    <el-select  placeholder="请选择加工方" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="processorCode">
        <el-option :label="processor.processorCode" :value="processor.processorCode" v-for="processor in processors" :key="processor.processorCode"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            processors: [],
            processorCode: this.value
        }
    },
    watch: {
        value: function() {
            this.processorCode = this.value;
        }
    },
    props: ['value'],
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/Process/getAllProcessor').then(response => {
                    this.processors = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.processorCode;
              this.$emit('input', this.processorCode);
          }
    }
}
</script>