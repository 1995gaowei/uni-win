<template>
    <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>物料管理</template>
            <el-menu-item-group>
                <el-menu-item index="/Material/MaterialList"><i class="el-icon-d-arrow-right"></i>物料管理</el-menu-item>
                <el-menu-item index="/Material/MaterialApplyList"><i class="el-icon-d-arrow-right"></i>物料申请历史</el-menu-item>
                <el-menu-item index="1-5"><i class="el-icon-d-arrow-right"></i>供应商管理</el-menu-item>
                <el-menu-item index="/Material/DesignList"><i class="el-icon-d-arrow-right"></i>款式管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>入库管理</template>
            <el-menu-item-group>
                <el-menu-item index="/MaterialIn/MaterialInput"><i class="el-icon-d-arrow-right"></i>入库</el-menu-item>
                <el-menu-item index="/MaterialIn/MaterialInputList"><i class="el-icon-d-arrow-right"></i>入库历史</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>出库管理</template>
            <el-menu-item-group>
                <el-menu-item index="/MaterialOut/MaterialOutput"><i class="el-icon-d-arrow-right"></i>出库</el-menu-item>
                <el-menu-item index="/MaterialOut/MaterialOutputList"><i class="el-icon-d-arrow-right"></i>出库历史</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>加工管理</template>
            <el-menu-item-group>
                <el-menu-item index="/Process/ProcessorManagment"><i class="el-icon-d-arrow-right"></i>加工方管理</el-menu-item>
                <el-menu-item index="/Process/Receive"><i class="el-icon-d-arrow-right"></i>收货单管理</el-menu-item>
                <el-menu-item index="/Process/OutSource_new"><i class="el-icon-d-arrow-right"></i>新增外发单</el-menu-item>
                <el-menu-item index="/Process/Outsourcelist"><i class="el-icon-d-arrow-right"></i>外发单管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-menu"></i>排单管理</template>
            <el-menu-item-group>
                <el-menu-item index="/ListManage/StartOutSourceManage"><i class="el-icon-d-arrow-right"></i>开始排单</el-menu-item>
                <el-menu-item index="/ListManage/TechniqueList"><i class="el-icon-d-arrow-right"></i>大货工艺排单</el-menu-item>
                <el-menu-item index="/ListManage/TailorPhaseList"><i class="el-icon-d-arrow-right"></i>大货裁剪排单</el-menu-item>
                <el-menu-item index="/ListManage/outSourceManage"><i class="el-icon-d-arrow-right"></i>大货外发排单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-menu"></i>采购管理</template>
            <el-menu-item-group>
                <el-menu-item index="/Purchase/PurchaseList"><i class="el-icon-d-arrow-right"></i>面料采购单管理</el-menu-item>
                <el-menu-item index="6-2"><i class="el-icon-d-arrow-right"></i>辅料采购单管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
            <template slot="title"><i class="el-icon-menu"></i>工艺管理</template>
            <el-menu-item-group>
                <el-menu-item index="7-1"><i class="el-icon-d-arrow-right"></i>新增款式工艺单</el-menu-item>
                <el-menu-item index="7-2"><i class="el-icon-d-arrow-right"></i>工艺管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8">
            <template slot="title"><i class="el-icon-menu"></i>生产管理</template>
            <el-menu-item-group>
                <el-menu-item index="8-1"><i class="el-icon-d-arrow-right"></i>生产单列表</el-menu-item>
                <el-menu-item index="8-2"><i class="el-icon-d-arrow-right"></i>异常积压订单</el-menu-item>
                <el-menu-item index="8-3"><i class="el-icon-d-arrow-right"></i>NEW裁剪单订单预警</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="9">
            <template slot="title"><i class="el-icon-menu"></i>样衣信息</template>
            <el-menu-item-group>
                <el-menu-item index="9-1"><i class="el-icon-d-arrow-right"></i>样衣入库</el-menu-item>
                <el-menu-item index="9-2"><i class="el-icon-d-arrow-right"></i>样衣资料管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="10">
            <template slot="title"><i class="el-icon-menu"></i>补料单</template>
            <el-menu-item-group>
                <el-menu-item index="10-1"><i class="el-icon-d-arrow-right"></i>面料补料单</el-menu-item>
                <el-menu-item index="10-2"><i class="el-icon-d-arrow-right"></i>辅料补料单</el-menu-item>
                <el-menu-item index="10-3"><i class="el-icon-d-arrow-right"></i>物料补料单管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="11">
            <template slot="title"><i class="el-icon-menu"></i>QC质检单</template>
            <el-menu-item-group>
                <el-menu-item index="11-1"><i class="el-icon-d-arrow-right"></i>新增质检单</el-menu-item>
                <el-menu-item index="11-2"><i class="el-icon-d-arrow-right"></i>质检单列表</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="12">
            <template slot="title"><i class="el-icon-menu"></i>询价单管理</template>
            <el-menu-item-group>
                <el-menu-item index="12-1"><i class="el-icon-d-arrow-right"></i>询价管理</el-menu-item>
                <el-menu-item index="12-2"><i class="el-icon-d-arrow-right"></i>询价单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="13">
            <template slot="title"><i class="el-icon-menu"></i>客户订单管理</template>
            <el-menu-item-group>
                <el-menu-item index="13-1"><i class="el-icon-d-arrow-right"></i>NEW客户订单管理列表</el-menu-item>
                <el-menu-item index="13-2"><i class="el-icon-d-arrow-right"></i>NEW样衣单管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="14">
            <template slot="title"><i class="el-icon-menu"></i>图形报表</template>
            <el-menu-item-group>
                <el-menu-item index="14-1"><i class="el-icon-d-arrow-right"></i>每日工艺单积压趋势图</el-menu-item>
                <el-menu-item index="14-2"><i class="el-icon-d-arrow-right"></i>每日制版单积压趋势图</el-menu-item>
                <el-menu-item index="14-3"><i class="el-icon-d-arrow-right"></i>环节订单数积压趋势图</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="15">
            <template slot="title"><i class="el-icon-menu"></i>客户管理</template>
            <el-menu-item-group>
                <el-menu-item index="15-1"><i class="el-icon-d-arrow-right"></i>客户资料管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="16">
            <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
            <el-menu-item-group>
                <el-menu-item index="16-1"><i class="el-icon-d-arrow-right"></i>权限设置</el-menu-item>
                <el-menu-item index="16-2"><i class="el-icon-d-arrow-right"></i>角色分配</el-menu-item>
                <el-menu-item index="16-3"><i class="el-icon-d-arrow-right"></i>用户管理</el-menu-item>
                <el-menu-item index="16-4"><i class="el-icon-d-arrow-right"></i>模组资料</el-menu-item>
                <el-menu-item index="16-5"><i class="el-icon-d-arrow-right"></i>组织管理</el-menu-item>
                <el-menu-item index="16-6"><i class="el-icon-d-arrow-right"></i>系统异常参数设置</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="17">
            <template slot="title"><i class="el-icon-menu"></i>款式与订单</template>
            <el-menu-item-group>
                <el-menu-item index="17-1"><i class="el-icon-d-arrow-right"></i>新增订单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-menu {
    width: 300px;
    position: fixed;
    top:60px;
    bottom: 0;
    overflow-y: auto;
}
</style>