<template>
    <el-select  placeholder="请选择仓库" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="location">
        <el-option :label="warehouse.location" :value="warehouse.location" v-for="warehouse in warehouses" :key="warehouse.warehouseid"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            warehouses: [],
            location: this.value
        }
    },
    watch: {
        value: function() {
            this.location = this.value;
        }
    },
    props: ['value'],
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/Material/getWarehouseList').then(response => {
                    this.warehouses = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.location;
              this.$emit('input', this.location);
          }
    }
}
</script>