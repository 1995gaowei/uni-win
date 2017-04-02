import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import MaterialList from '@/views/Material/MaterialList'
import MaterialApplyList from '@/views/Material/MaterialApplyList'

import MaterialInput from '@/views/MaterialIn/MaterialInput'
import MaterialInputManagment from '@/views/MaterialIn/MaterialInputManagment'

import ProcessorManagment from '@/views/ProcessManagment/ProcessorManagment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, 
    {
      path: '/Material/MaterialList',
      name: 'MaterialList',
      component: MaterialList
    },
    {
      path: '/Material/MaterialApplyList',
      name: 'MateraiApplyList', 
      component: MaterialApplyList
    },
    {
      path: '/MaterialIn/MaterialInput',
      name: 'MaterialInput',
      component: MaterialInput
    },
    {
      path: '/MaterialIn/MaterialInputManagment',
      name: 'MaterialInputManagment',
      component: MaterialInputManagment
    },
    {
      path: '/ProcessManagment/ProcessorManagment',
      name: 'ProcessorManagment',
      component: ProcessorManagment
    }

  ]
})
