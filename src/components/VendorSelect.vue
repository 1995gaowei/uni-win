<template>
    <el-select  placeholder="请选择供应商" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="selectedVendor" :multiple="multiple">
        <el-option :label="vendor.vendorName" :value="vendor.vendorId" v-for="vendor in vendors" :key="vendor.vendorId"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            vendors: [],
            selectedVendor: this.value
        }
    },
    watch: {
        value: function() {
            this.selectedVendor = this.value;
        }
    },
    props: {
        value: [Array, String, Number],
        multiple: Boolean
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getVendorList').then(response => {
                    this.vendors = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.selectedVendor;
              this.$emit('input', this.selectedVendor);
          }
    }
}
</script>