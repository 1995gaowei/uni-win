<template>
    <el-select  placeholder="请选择用户" v-bind:value="value" ref="select" v-on:change="update" filterable v-model="userAccount">
        <el-option :label="user.userAccount" :value="user.userAccount" v-for="user in users" :key="user.userAccount"></el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
import Api from '@/config/api'

export default {
    data () {
        return {
            users: [],
            userAccount: this.value
        }
    },
    watch: {
        value: function() {
            this.userAccount = this.value;
        }
    },
    props: ['value'],
    created: function () {
        this.fetchData();
    },
    methods: {
        fetchData() {
              Vue.http.get(Api.backend_url + '/System/getAllUser').then(response => {
                    this.users = response.body.data;
                }, response => {
                    console.log(response);
                });
          },
          update() {
              this.$refs.select.value = this.userAccount;
              this.$emit('input', this.userAccount);
          }
    }
}
</script>