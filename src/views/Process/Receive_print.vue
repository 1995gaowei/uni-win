<template>
<div>
		<div class="row" align="center">
			<h1> 收货单 </h1>
		</div>
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<table class="table-bordered table">
					<tr>
						<th>外发单号：</th>
						<td>{{outsourceInfo.outsourceCode}}</td>
						<th>收货日期：</th>
						<td>
							{{outsourceInfo.receiveDate}}
						</td>
					</tr>
					<tr>
						<th>数量：</th>
						<td>{{outsourceInfo.sum}}</td>
						<th>收货人：</th>
						<td>{{outsourceInfo.userName}}</td>
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
				    <template v-for="k in outsourceInfo.getDetails">
				    <tr>
				        <td>{{k.receiveColor}}</td>
				        <td>{{k.receiveXS}}</td>
				        <td>{{k.receiveS}}</td>
				        <td>{{k.receiveM}}</td>
				        <td>{{k.receiveL}}</td>
				        <td>{{k.receiveXL}}</td>
				        <td>{{k.receiveXXL}}</td>
				        <td>{{k.receiveTotal}}</td>
				    </tr>
				    
					
				</table>				
			</div>
			<div class="col-md-2">
				 <template>
                     <img src="../../assets/logo.png" class="image">
                 </template>	
			</div>
		</div>
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<table class="table-bordered table" style="margin-top:20px">
					<tr>
						<th colspan="10">加工方信息</th>
					</tr>
					<tr>
						<th>加工方：</th>
						<td><s:property value="getRO.processorName" /></td>
						<th>联系电话：</th>
						<td><s:property value="getRO.processorMobile" /></td>
					</tr>
					<tr>
						<th>加工方区域：</th>
						<td><s:property value="getRO.processorDistrict" /></td>
						<th>送货类型：</th>
						<td><s:property value="getRO.deliveryType" /></td>
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
            receiveInfo:{}
        };
    },
     created:function(){
          this.outsourceInfo = router.params.newOS;
        }
}
</script>
