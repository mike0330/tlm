<template>
  <div class="container">
    <el-table :data="endWorkData" style="width: 100%" max-height="250">
      <el-table-column
        fixed
        prop="numberId"
        label="许可证编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="申请人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="safeUserName"
        label="安全审批"
        width="100">
      </el-table-column>
      <el-table-column
        prop="projectUserName"
        label="工程审批"
        width="100">
      </el-table-column>
      <el-table-column
        prop="produceUserName"
        label="生产审批"
        width="100">
      </el-table-column>
      <el-table-column
        prop="deviceUserName"
        label="设备审批"
        width="100">
      </el-table-column>
      <el-table-column
        prop="controlUserName"
        label="监督"
        width="100">
      </el-table-column>
      <el-table-column
        prop="tutelageUserName"
        label="监护"
        width="100">
      </el-table-column>
      <el-table-column
        prop="leadUserName"
        label="领导"
        width="100">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="总状态"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="detail(scope.row)"
            type="text"
            size="small">
            查看
          </el-button>
          <el-button 
            v-show="scope.row.mark == 5"
            @click.native.prevent="reApply(scope.row)"
            type="text"
            size="small">
            重新申请
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>  
</template>
<script>
import { getApplyList } from '@/api/apply'
import {getSession} from '@/utils/storage'
import {typePermit} from './typePermit'
export default {
  data(){
    return {
      endWorkData:[],
      userInfo:getSession('userInfo')
    }
    
  },
  methods:{
    init(){
      this.getEndWorkData()
    },
    getEndWorkData(){
      getApplyList({mark:1,userId:this.userInfo.id}).then(res => {
        //开工待通过后才能申请收工
        if(res.data.length > 0) {
          res.data.forEach(item => {
            this.endWorkData.push(item)
          })
        }
      })
    }
  },
  created() {
    this.init()
  },
}
</script>
<style lang="less" scoped>

</style>