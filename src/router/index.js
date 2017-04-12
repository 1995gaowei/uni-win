import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'

import Hello from '@/components/Hello'

import MaterialList from '@/views/Material/MaterialList'
import MaterialApplyList from '@/views/Material/MaterialApplyList'
import DesignList from '@/views/Material/DesignList'
import DesignDetail from '@/views/Material/DesignDetail'

import MaterialInput from '@/views/MaterialIn/MaterialInput'
import MaterialInputList from '@/views/MaterialIn/MaterialInputList'

import MaterialOutput from '@/views/MaterialOut/MaterialOutput'
import MaterialOutputList from '@/views/MaterialOut/MaterialOutputList'

import ProcessorManagment from '@/views/Process/ProcessorManagment'
import Receive from '@/views/Process/Receive'
import newOutSource from  '@/views/Process/newOutSource'
import Outsourcelist from '@/views/Process/Outsourcelist'

import StartOutSourceManage from '@/views/ListManage/StartOutSourceManage'
import TechniqueList from '@/views/ListManage/TechniqueList'
import TailorPhaseList from '@/views/ListManage/TailorPhaseList'
import outSourceManage from '@/views/ListManage/outSourceManage'

import PurchaseList from '@/views/Purchase/PurchaseList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', 
      name: 'Home', 
      component: MaterialList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "物料管理", title2: "物料管理"
        });
        next();
      }
    }, 
    {
      path: '/Material/MaterialList',
      name: 'MaterialList',
      component: MaterialList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "物料管理", title2: "物料管理"
        });
        next();
      }
    },
    {
      path: '/Material/MaterialApplyList',
      name: 'MateraiApplyList', 
      component: MaterialApplyList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "物料管理", title2: "物料申请历史"
        });
        next();
      }
    },
    {
      path: '/Material/DesignList',
      name: 'DesignList',
      component: DesignList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "物料管理", title2: "款式管理"
        });
        next();
      }
    },
    {
      path: '/DesignDetail/:designID',
      component: DesignDetail,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "物料管理", title2: "款式详情"
        });
        next();
      }
    },
    {
      path: '/MaterialIn/MaterialInput',
      name: 'MaterialInput',
      component: MaterialInput,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "入库管理", title2: "入库"
        });
        next();
      }
    },
    {
      path: '/MaterialIn/MaterialInputList',
      name: 'MaterialInputList',
      component: MaterialInputList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "入库管理", title2: "入库历史"
        });
        next();
      }
    },
    {
      path: '/MaterialOut/MaterialOutput',
      name: 'MaterialOutput',
      component: MaterialOutput,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "出库管理", title2: "出库"
        });
        next();
      }
    },
    {
      path: '/MaterialOut/MaterialOutputList',
      name: 'MaterialOutputList',
      component: MaterialOutputList,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "出库管理", title2: "出库历史"
        });
        next();
      }
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
      path: '/Process/newOutSource',
      name: 'newOutSource',
      component: newOutSource,
      beforeEnter: (to, from, next) => {
        store.commit('changeTitle', {
          title1: "加工管理", title2: "新增外发单"
        });
        next();
      }
    },
    {
      path: '/Process/Outsourcelist',
      name: 'Outsourcelist',
      component: Outsourcelist
    },
    {
      path: '/ListManage/StartOutSourceManage',
      name: 'StartOutSourceManage',
      component : StartOutSourceManage
    },
    {
      path: '/ListManage/TechniqueList',
      name: 'TechniqueList',
      component: TechniqueList
    },
    {
      path: '/ListManage/TailorPhaseList',
      name: 'TailorPhaseList',
      component:TailorPhaseList
    },
    {
      path: '/ListManage/outSourceManage',
      name: 'outSourceManage',
      component: outSourceManage
    },
    {
      path: '/Purchase/PurchaseList',
      name: 'PurchaseList',
      component: PurchaseList
    }

  ]
})
