import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Hello from '@/components/Hello'

import AddMaterial from '@/views/Material/AddMaterial'
import MaterialList from '@/views/Material/MaterialList'

import MaterialInput from '@/views/MaterialIn/MaterialInput'
import MaterialInputManagment from '@/views/MaterialIn/MaterialInputManagment'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, 
    {
      path: '/Material/AddMaterial',
      name: 'AddMaterial',
      component: AddMaterial
    },
    {
      path: '/Material/MaterialList',
      name: 'MaterialList',
      component: MaterialList
    },
    {
      path: 'MaterialIn/MaterialInput',
      name: 'MaterialInput',
      component: MaterialInput
    },
    {
      path: 'MaterialIn/MaterialInputManagment',
      name: 'MaterialInputManagment',
      component: MaterialInputManagment
    }

  ]
})
