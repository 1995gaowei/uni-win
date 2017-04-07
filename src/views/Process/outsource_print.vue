<template>
   	<div>
		<div class="row" align="center">
			<h1> 外发单 </h1>
		</div>
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<table class="table-bordered table">
					<tr>
						<th>外发单号：</th>
						<td>{{outsourceInfo.osCode}}</td>
						<th>预约交期：</th>
						<td>
                           {{outsourceInfo.finishDate}}
						
						</td>

					</tr>
					<tr>
						<th>款号：</th>
						<td>{{outsourceInfo.designCode}}</td>
						<th>款式名称：</th>
						<td>{{outsourceInfo.designName}}</td>
					</tr>
					<tr>
						<th>排单时间：</th>
						<td>
							{{outsourceInfo.osScheduleDate}}
						</td>
						<th>外发时间：</th>
						<td>
							{{outsourceInfo.actualOutDate}}
						</td>
					</tr>
					<tr>
						<th>订单优先级：</th>
						<td>{{outsourceInfo.osPriority}}</span></td>
						<th>数量：</th>
						<td>{{outsourceInfo.sum}}</td>
					</tr>

					
				</table>
			</div>
		</div>

		<div class="row">
			<!-- 详细信息-->
			<div class="col-md-2 col-md-offset-1">
				<h4>详细信息：</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8 col-md-offset-1">
				<!-- 详细信息-->
				<table class="table-responsive table-bordered table">											
					<tr class="detail-th">
						<th>颜色</th>
						<th>XS</th>
						<th>S</th>
						<th>M</th>
						<th>L</th>
						<th>XL</th>
						<th>XXL</th>
						<th>合计</th>
					</tr>						
				 <template v-for="k in outsourceInfo.details">
				    <tr>
				        <td>{{k.outsourceColor}}</td>
				        <td>{{k.outsourceXS}}</td>
				        <td>{{k.outsourceS}}</td>
				        <td>{{k.outsourceM}}<td>
				        <td>{{k.outsourceL}}</td>
				        <td>{{k.outsourceXL}}</td>
				        <td>{{k.outsourceXXL}}</td>
				        <td>{{k.outsourceTotal}}</td>
				    </tr>
				 <template>
					
				</table>				
			</div>
			<div class="col-md-2">
				   <template >
                       <img src="../../assets/logo.png" class="image">
                  </template>	
			</div>
		</div>
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<table class="table-bordered table table-buttom" style="margin-top:20px">
					<tr>
						<th colspan="10">加工方信息</th>
					</tr>
					<tr>
						<th>加工方：</th>
						<td>{{outsourceInfo.processorName}}</td>
						<th>联系电话：</th>
						<td>{{outsourceInfo.processorMobile}}</td>
					</tr>
					<tr>
						<th>实际工价：</th>
						<td>{{outsourceInfo.labourCost}}</td>
						<th>外发负责人：</th>
						<td>{{outsourceInfo.userName}}</td>
					</tr>					
				</table>
			</div>
		</div>

	</div>
</template>
<script>
import Vue from 'vue'
import Api from '@/config/api'
import router from '@/router'

export default{
    data(){
        return{
          outsourceInfo:{}
        };      
        },
        created:function(){
          this.outsourceInfo = router.params.newOS;
        }
       
}
</script>