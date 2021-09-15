<template>
  <div class="container">
    <el-table :data="approveData" style="width: 100%" max-height="250">
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
            查看({{scope.row.statusName}})
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" v-loading="formLoading" :model="form" label-width="110px">
      <el-form-item label="许可证编号:"  >
        <el-input v-model="form.permitNum" :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="许可证类别:"  >
        <el-row v-for="item in form.permitType" :key="item.id">
          <el-col >{{item.permitName}}:{{item.typeName}}</el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="项目名称:"  >
        <el-input v-model="form.projectName" :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="项目作业地点:"  >
        <el-input v-model="form.projectAddr" :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="关键作业人员:"  >
        <el-input v-model="form.keyPerson" :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="许可证有效期:"  >
        <el-row >
          <el-col>{{form.startTime}} -- {{form.endTime}} </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="工作任务描述:" >
        <el-input type="textarea" v-model="form.desc" :readonly="true"></el-input>
      </el-form-item>
      <el-form-item label="安全工作方案:" >
        {{form.safeImgList.length>0 ? '是' : '否'}}
        <el-image v-for="item in form.safeImgList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="图纸:" >
        {{form.drawImgList.length>0 ? '是' : '否'}}
        <el-image v-for="item in form.drawImgList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="气体检查:" >
        {{form.gasImgList.length>0 ? '' : '不涉及'}}
        <el-image v-for="item in form.gasImgList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="安全分析:" >
        <el-image v-for="item in form.analysisList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="安全措施:" >
        <el-image v-for="item in form.safePermitList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="人员资质:" >
        <el-image v-for="item in form.personalImgList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <el-form-item label="工、器具:" >
        <el-image v-for="item in form.toolImgList" :key="item.id" :src="item.url">
        </el-image>
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" v-show="safeBtn">安全审批（同意）</el-button>
        <el-button type="primary" v-show="projBtn">工程审批（同意）</el-button>
        <el-button type="primary" v-show="prodBtn">生产审批（同意）</el-button>
        <el-button type="primary" v-show="equipBtn">设备审批（同意）</el-button>
        <el-button type="primary" v-show="superBtn">监督审批（同意）</el-button>
        <el-button type="primary" v-show="tulBtn">监护审批（同意）</el-button>
        <el-button type="primary" v-show="leaderBtn">领导审批（同意）</el-button>
        <el-button type="danger" v-show="safeBtn">安全审批（拒绝）</el-button>
        <el-button type="danger" v-show="projBtn">工程审批（拒绝）</el-button>
        <el-button type="danger" v-show="prodBtn">生产审批（拒绝）</el-button>
        <el-button type="danger" v-show="equipBtn">设备审批（拒绝）</el-button>
        <el-button type="danger" v-show="superBtn">监督审批（拒绝）</el-button>
        <el-button type="danger" v-show="tulBtn">监护审批（拒绝）</el-button>
        <el-button type="danger" v-show="leaderBtn">领导审批（拒绝）</el-button>
      </div>
    </el-form>
  </div>    
</template>
<script>
import {getPermitType,getPermitImg} from '@/api/getInfo'
import { 
  getSafeApproveList,
  getProjApproveList,
  getProdApproveList,
  getEquipApproveList,
  getSuperApproveList,
  getLeaderApproveList
} from '@/api/approve'
import {getSession} from '@/utils/storage'
export default {
  data(){
    return {
      userInfo:getSession('userInfo'),
      formLoading:false,
      approveData:[],
      form:{
        permitNum:'',
        permitType:[],
        projectName:'',//
        projectAddr:'',
        keyPerson:'',
        startTime:'',
        endTime:'',
        desc:'',
        imgList:[],
        safeImgList: [],//安全工作方案0
        drawImgList:[],//图纸1
        analysisList:[],//安全分析2
        gasImgList:[],//气体检查表3
        safePermitList:[],//安全措施4
        personalImgList:[],//人员资质5
        toolImgList:[],//工器具合格证6
      },
      safeBtn: false,
      projBtn: false,
      prodBtn: false,
      equipBtn: false,
      superBtn: false,
      tulBtn: false,
      leaderBtn: false
    }
  },
  methods:{
    init(){
      getSafeApproveList({
        wellId:this.userInfo.wellId,
        safeUserId:this.userInfo.id,
        safeMarkk:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','safe')
            this.$set(item,'statusName','安全')
            this.approveData.push(item)
          });
        }
      })
      getProjApproveList({
        wellId:this.userInfo.wellId,
        projectUserId:this.userInfo.id,
        projectMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','proj')
            this.$set(item,'statusName','工程')
            this.approveData.push(item)
          });
        }
      })
      getProdApproveList({
        wellId:this.userInfo.wellId,
        produceUserId:this.userInfo.id,
        produceMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','prod')
            this.$set(item,'statusName','生产')
            this.approveData.push(item)
          });
        }
      })
      getEquipApproveList({
        wellId:this.userInfo.wellId,
        deviceUserId:this.userInfo.id,
        deviceMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','equip')
            this.$set(item,'statusName','设备')
            this.approveData.push(item)
          });
        }
      })
      getSuperApproveList({
        wellId:this.userInfo.wellId,
        controlUserId:this.userInfo.id,
        controStartMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','super')
            this.$set(item,'statusName','监督')
            this.approveData.push(item)
          });
        }
      })
      getSuperApproveList({
        wellId:this.userInfo.wellId,
        tutelageUserId:this.userInfo.id,
        tutelageStartMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','tutel')
            this.$set(item,'statusName','监护')
            this.approveData.push(item)
          });
        }
      })
      getLeaderApproveList({
        wellId:this.userInfo.wellId,
        leadUserId:this.userInfo.id,
        leadStartMark:0
      }).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            //添加状态
            this.$set(item,'statusId','leader')
            this.$set(item,'statusName','领导')
            this.approveData.push(item)
          });
        }
      })
    },
    detail(row){
      //查看详情
      console.log(row)
      this.formLoading = true
      this.form.permitNum = row.numberId
      this.form.projectName = row.workName
      this.form.projectAddr = row.workPlace
      this.form.keyPerson = row.man
      this.form.startTime = row.timeLimit
      this.form.endTime = row.stime
      this.form.desc = row.taskName
      //判断按钮的显示隐藏
      switch (row.statusId ) {
        case "safe": 
          this.safeBtn = true
          break
        case 'proj':
          this.projBtn = true
          break
        case 'prod':
          this.prodBtn = true
          break
        case 'equip':
          this.equipBtn = true
          break
        case 'super':
          this.superBtn = true
          break
        case 'tutel':
          this.tulBtn = true
          break
        case 'leader':
          this.leaderBtn = true
          break
      }
      
      getPermitType({numberId:row.numberId}).then(res => {
        this.form.permitType = res.data
        this.formLoading = false
      })
      getPermitImg({numberId:row.numberId}).then(res => {
        if(res.data.length > 0) {
          res.data.forEach(item => {
            switch( item.typeId ){
              case 0:
                this.form.safeImgList.push(item)
                break
              case 1:
                this.form.drawImgList.push(item)
                break
              case 2:
                this.form.analysisList.push(item)
                break
              case 3:
                this.form.gasImgList.push(item)
                break
              case 4:
                this.form.safePermitList.push(item)
                break
              case 5:
                this.form.personalImgList.push(item)
                break
              case 6:
                this.form.toolImgList.push(item)
                break
            }
          })
        }
        this.formLoading = false
      })
      
    }
  },
  created() {
    this.init()
  },
}
</script>
<style lang="scss" scoped>
  .container {
    margin: 30px;
    font-size: 30px;
    line-height: 46px;
  }
  .el-form {
    padding-top: 50px;
  }
  .el-input {
    width: 50%;
  }
  .leader{
    margin-top: 20px;
  }
  .el-image {
    margin-left:20px;
    width: 100px; 
    height: 100px
  }
  .btn-group{
    text-align: center;
  }
</style>