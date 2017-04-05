import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import MaterialList from '@/views/Material/MaterialList'
import MaterialApplyList from '@/views/Material/MaterialApplyList'
import DesignList from '@/views/Material/DesignList'
import DesignDetail from '@/views/Material/DesignDetail'

import MaterialInput from '@/views/MaterialIn/MaterialInput'
import MaterialInputManagment from '@/views/MaterialIn/MaterialInputManagment'

import ProcessorManagment from '@/views/Process/ProcessorManagment'
import Receive from '@/views/Process/Receive'
import OutSource_new from  '@/views/Process/OutSource_new'
import Outsourcelist from '@/views/Process/Outsourcelist'

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
      path: '/Material/DesignList',
      name: 'DesignList',
      component: DesignList
    },
    {
      path: '/DesignDetail/:designID',
      component: DesignDetail
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
      path: '/Process/ProcessorManagment',
      name: 'ProcessorManagment',
      component: ProcessorManagment
    },
    {
      path: '/Process/Receive',
      name: 'Receive',
      component: Receive
    },
    {
      path: '/Process/OutSource_new',
      name: 'OutSource_new',
      component: OutSource_new
    },
    {
      path: '/Process/Outsourcelist',
      name: 'Outsourcelist',
      component: Outsourcelist
    }

  ]
})
