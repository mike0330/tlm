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
        </template>
      </el-table-column>
    </el-table>
    <el-form ref="form" v-loading="formLoading"  :model="form" label-width="180px">
      <el-form-item label="许可证编号:"  >
        <el-input v-model="form.permitNum" :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="许可证类别:"  >
        <el-row v-for="(item,index) in form.permitType" :key="index">
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
      <el-form-item label="安全审批意见:" v-show="form.safeIdea">
        <el-input v-model="form.safeIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="工程审批意见:" v-show="form.projIdea">
        <el-input v-model="form.projIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="生产审批意见:" v-show="form.prodIdea">
        <el-input v-model="form.prodIdea" :readonly="true" >
        </el-input>
      </el-form-item>
      <el-form-item label="设备审批意见:" v-show="form.equipIdea">
        <el-input v-model="form.equipIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="监督（开工）审批意见:" v-show="form.superIdea">
        <el-input v-model="form.superIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="监督（收工）审批意见:" v-show="form.superEndIdea">
        <el-input v-model="form.superEndIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="监护（开工）审批意见:" v-show="form.tultleIdea">
        <el-input v-model="form.tultleIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="监护（收工）审批意见:" v-show="form.tultleEndIdea">
        <el-input v-model="form.tultleEndIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="领导（开工）审批意见:" v-show="form.leaderIdea">
        <el-input v-model="form.leaderIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="领导（收工）审批意见:" v-show="form.leaderEndIdea">
        <el-input v-model="form.leaderEndIdea"  :readonly="true">
        </el-input>
      </el-form-item>
      <div class="btn-group">
        <el-button type="primary" @click="endApply">收工申请</el-button>
      </div>
    </el-form>
  </div>  
</template>
<script>
import { getApplyList } from '@/api/apply'
import {getSession} from '@/utils/storage'
import { approve} from '@/api/approve'
import {getPermitType,getPermitImg} from '@/api/getInfo'
export default {
  data(){
    return {
      endWorkData:[],
      userInfo:getSession('userInfo'),
      formLoading:false,
      premitId:'',
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
        toolImgList:[],//工器具合格证6,
        approveIdea:'',
        safeIdea:'' ,
        projIdea:'' ,
        prodIdea:'' ,
        equipIdea:'' ,
        tultleIdea:'' ,
        superIdea:'' ,
        leaderIdea:'' ,
        tutelEndIdea:'',
        superEndIdea:'',
        leaderEndIdea:''
      },
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
    },
    detail(row){
      //查看详情
      console.log(row)
      this.form.safeImgList = []
      this.form.drawImgList = []
      this.form.analysisList = []
      this.form.gasImgList = []
      this.form.safePermitList = []
      this.form.personalImgList = []
      this.form.toolImgList = []
      this.formLoading = true
      this.premitId = row.id
      this.form.permitNum = row.numberId
      this.form.projectName = row.workName
      this.form.projectAddr = row.workPlace
      this.form.keyPerson = row.man
      this.form.startTime = row.timeLimit
      this.form.endTime = row.stime
      this.form.desc = row.taskName
      //审批意见
      this.form.safeIdea= row.safeIdea
      this.form.projIdea= row. projcetIdea
      this.form.prodIdea= row.produceIdea
      this.form.equipIdea= row.deviceIdea
      this.form.tultleIdea= row.tutelageStartIdea
      this.form.tutelEndIdea = row.tutelageEndIdea
      this.form.superIdea= row.controStartIdea
      this.form.superEndIdea = row.controEndIdea
      this.form.leaderIdea= row.leadStartIdea
      this.form.leaderEndIdea = row.leadEndIdea

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
    },
    endApply(){
      //重新申请
      approve({mark:3,id:this.premitId}).then(res => {
        console.log(res)
        if(res.msg == '审批完成'){
          this.$message.success('申请成功')
          this.$router.go(0)
        }else {
          this.$message.error('申请失败')
        }
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