<template>
<div id="app">
     <el-form :inline="true"  v-model="getmaterial"  class="demo-form-inline">
      <el-form-item label="物料编码">
      <el-input v-model="getmaterial.materialCode" ></el-input>
     </el-form-item>
     <el-form-item label="款号">
      <el-input v-model="getmaterial.designId"></el-input>
     </el-form-item>
     <el-form-item label="入库类型">
      <el-select v-model="getmaterial.materialInput" >
      <el-option label="面料" value="面料"></el-option>
      <el-option label="辅料" value="辅料"></el-option>
      </el-select>
     </el-form-item>
     <el-form-item label="采购单号">
      <el-input v-model="getmaterial.buyId"></el-input>
     </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
    </el-form-item>
     </el-form>

     <el-table :data="result" style="width:100%">
        <el-table-column prop="materialCode" label="物料编码" >
        </el-table-column>
        <el-table-column prop="materialName" label="物料名称" >
        </el-table-column>
        <el-table-column prop="materialType" label="物料类型" >
        </el-table-column>
        <el-table-column prop="vendor" label="供应商" >
        </el-table-column>
        <el-table-column prop="color" label="颜色">
        </el-table-column>
     </el-table>    
</div>     
</template>
<script>
export default {
  name: 'materialInput',
  data () {
       return{
       material:[ { materialCode:'A001', materialName:'棉布001',materialType:'棉布',vendor:'V001',color:'RGB001'},
                  { materialCode:'A002', materialName:'棉布002',materialType:'棉布',vendor:'V002',color:'RGB002'},
                  { materialCode:'A003', materialName:'棉布003',materialType:'棉布',vendor:'V003',color:'RGB003'}
                ],
       getmaterial:{
          materialCode:'',
          designId:'',
          materialInput:'',
          buyId:''
       },
       result:[]
   }
  },
  r
  methods:{
       search(){
         var i;      
         for(i=0;i<3;i++){
        
            if(this.getmaterial.materialCode.indexOf(this.material[i].materialCode)){                
                 this.result.push(this.material[i]);              
                 break;
             }
         }
         
       }

  }

}
</script>
