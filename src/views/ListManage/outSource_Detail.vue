   <template>
      <div>
        <h1>排单详情</h1>
         <table  cellSpacing="80px">
            <tr>
              <td style="width:50%;">
                 <table>
                    <tr>
                       <td>外发单编号:</td>
                       <td>{{outSourceDetail.outSourceCode}}</td>
                    </tr>
                    <tr>
                       <td>款号:</td>
                       <td>{{outSourceDetail.designCode}}</td>
                    </tr>
                    <tr>
                       <td>排单时间:</td>
                       <td>{{outSourceDetail.osScheduleDate}}</td>
                    </tr>
                 </table>
              </td>
              <td style="width:50%;">
                 <table>
                    <tr>
                       <td>工序:</td>
                       <td>{{outSourceDetail.designTechProcedure}}</td>
                    </tr>
                    <tr>
                       <td>款式名称:</td>
                       <td>{{outSourceDetail.designName}}</td>
                    </tr>
                    <tr>
                       <td>参考工价:</td>
                       <td>{{outSourceDetail.labourCost}}</td>
                    </tr>
                 </table>
              </td>
            </tr>
         </table>
         <span>加工信息>></span>
         <el-table v-model="outSourceDetail.processDetails">
           <el-table-item prop="outsourceColor" label="颜色"></el-table-item>
           <el-table-item prop="outsourceXS" label="XS"></el-table-item>
           <el-table-item prop="outsourceS" label="S"></el-table-item>
           <el-table-item prop="outsourceM" label="M"></el-table-item>
           <el-table-item prop="outsourceL" label="L"></el-table-item>
           <el-table-item prop="outsourceXL" label="XL"></el-table-item>
           <el-table-item prop="outsourceXXL" label="XXL"></el-table-item>
           <el-table-item prop="outsourceTotal" label="合计"></el-table-item>
         </el-table>
         <table cellSpacing="80px">
            <tr>
              <td>
                <table>
                  <tr>
                    <td>加工方</td>
                    <td>{{outSourceDetail.processorCode}}</td>
                  </tr>
                   <tr>
                    <td>发货人</td>
                    <td>{{outSourceDetail.DeliveryName}}</td>
                  </tr>
                </table>
              </td>
               <td>
                <table>
                  <tr>
                    <td>联系电话</td>
                    <td>{{outSourceDetail.processorMobileNum}}</td>
                  </tr>
                   <tr>
                    <td>预约外发时间</td>
                    <td>{{outSourceDetail.referenceOutDate}}</td>
                  </tr>
                </table>
              </td>
               <td>
                <table>
                  <tr>
                    <td>订单状态</td>
                    <td>{{outSourceDetail.order_state}}</td>
                  </tr>
                   <tr>
                    <td>参考收货时间</td>
                    <td>{{outSourceDetail.finishDate}}</td>
                  </tr>
                </table>
              </td>
            </tr>
         </table>
  </div>
</template>



<script>
import Vue from 'vue'
import Api from '@/config/api'
import router from '@/router'

export default{
    data(){
        return {
           outsourceDetail:{}
        };
    },
    created:function(){
        this.outsourceDetail = router.params.outSourceDetail;
    }
}
</script>