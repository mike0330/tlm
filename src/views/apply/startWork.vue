<template>
  <div class="container">
    <el-form ref="form" :rules="rules"  :model="form" label-width="140px">
      <el-form-item label="许可证编号"  >
        <el-input v-model="form.permitNum"  :readonly="true">
        </el-input>
      </el-form-item>
      <el-form-item label="许可证类别" prop="typePermitResStr">
        <el-input placeholder="点击选择" ref="typePermitOnblur"  v-model="form.typePermitResStr"  @focus="showPermitTypeDialog">
        </el-input>
      </el-form-item>
      <el-dialog title="许可证类型" :visible.sync="permitDialog" width="30%">
        <el-cascader ref="typePermitRef" v-model="form.typePermitRes" :props="form.props" 
          collapse-tags :options="form.typePerOpt">
        </el-cascader> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-form-item label="项目名称" prop="projectName">
        <el-input placeholder="请输入内容"  v-model="form.projectName" >
        </el-input>
      </el-form-item>
      <el-form-item label="项目作业地点" prop="projectAddr">
        <el-input placeholder="请输入内容" v-model="form.projectAddr" >
        </el-input>
      </el-form-item>
      <el-form-item label="关键作业人员" prop="keyPerson">
        <el-input placeholder="请输入内容"  v-model="form.keyPerson" >
        </el-input>
      </el-form-item>
      <el-form-item label="许可证有效期" prop="validityPermit">
        <el-date-picker
          v-model="form.validityPermit"
          type="datetimerange"
          value-format="yyyy/MM/dd HH:mm"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change = "dateChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作任务描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="安全工作方案" >
        <el-switch v-model="form.isSafety" @change="isSafetyChange"></el-switch>
        <el-upload v-if="form.isSafety"
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,0)"
          :file-list="safeImgList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图纸">
        <el-switch v-model="form.isDrawings" @change="isDrawingsChange"></el-switch>
        <el-upload v-if="form.isDrawings"
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,1)"
          :file-list="drawImgList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="工作前安全分析表" prop="uploadImg">
        <div>   </div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :on-error="errorUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,2)"
          :file-list="analysisList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="气体检查表" prop="uploadImg">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,3)"
          :file-list="gasImgList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="开工前条件确认" prop="uploadImg">
        <div class="littleTittle" > 安全资质：</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,4)"
          :file-list="safePermitList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div > 人员资质：</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,5)"
          :file-list="personalImgList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div > 工、器具合格证：</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="string"
          accept="image/jpeg,image/png,image/jpg"
          :multiple="true"
          :on-remove="handleRemove"
          :on-success="successUpload"
          :before-upload="onBeforeUploadImage"
          :http-request="(params) => UploadImage(params,6)"
          :file-list="toolImgList"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择审批人" prop="jurisdiction">
        <el-row>
          <el-col :span="6">
            <el-select v-model="form.safeApprovePer" clearable name="jurisdiction" placeholder="选择安全审批人">
              <el-option
                v-for="item in form.safeApprovePerOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.equipApprovePer" clearable placeholder="选择设备审批人">
              <el-option
                v-for="item in form.equipApprovePerOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.prodApprovePer" clearable placeholder="选择生产审批人">
              <el-option
                v-for="item in form.prodApprovePerOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.projApprovePer" clearable placeholder="选择工程审批人">
              <el-option
                v-for="item in form.projApprovePerOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="leader">
          <el-col :span="6">
            <el-select v-model="form.super" clearable placeholder="请选择监督">
              <el-option
                v-for="item in form.superOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.tutelage" clearable placeholder="请选择监护">
              <el-option
                v-for="item in form.tutelageOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select v-model="form.leader" clearable placeholder="请选择领导">
              <el-option
                v-for="item in form.leaderOpt"
                :key="item.id"
                :label="`${item.userName}-${item.telephone}`"
                :value="`${item.userId}-${item.userName}`">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="text-align: center;margin-top: 24px;">
        <el-button style="width:100px"  type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>
<script>
import {getSession} from '@/utils/storage'
import {typePermit} from './typePermit'
import {
  permitNumLast,
  submitPermitType,
  getJurisdiction,
  getSuper,
  getLeader,
  upload,
  delImg,
  delAllImg,
  submit
} from '@/api/apply'
export default {
  data () {
    //书面审查人验证
    const validateJurisdiction = (rule, value, callback) => {
      if(!(this.form.safeApprovePer || this.form.equipApprovePer || this.form.prodApprovePer || 
      this.prodApprovePer)){
        callback(new Error("书面审查人必须选择一个"))
      }else if (!(this.form.super && this.form.tutelage && this.form.leader)){
        callback(new Error("监督，监护，领导必选"))
      }else if((this.form.super == this.form.tutelage)){
        callback(new Error("监督监护不能一样"))
      }else {
        callback()
      }
    };
    const validateImgList = (rule, value, callback) => {
      // console.log(this.analysisList.length,'分析')
      // console.log(this.gasImgList.length,'qiti')
      // console.log(this.safePermitList.length,'anqzj')
      // console.log(this.personalImgList.length,'renyuan')
      // console.log(this.toolImgList.length,'gongqiju')
      if(this.analysisList.length == 0 || this.gasImgList.length == 0 || this.safePermitList.length == 0 || this.personalImgList.length == 0 || this.toolImgList.length == 0){
        callback(new Error('图片需要上传'))
      }else {
        callback()
      }
    }
    return {
      userInfo:'',
      permitDialog:false,//许可证类型对话框
      form: {
        props: { multiple: true },
        typePermitRes:[],
        typePermitResStr:'',//许可证类型str
        permitNum:'',
        projectName:'',
        projectAddr:'',
        validityPermit:'',//许可证有效期
        startTime:'',
        endTime:'',
        desc:'',
        isSafety:false,//是否有安全工作方案
        isDrawings:false,//是否有图纸,
        keyPerson:'',//关键作业人,
        typePerOpt: [],//许可证类型选项
        //审批人开始
        safeApprovePerOpt:[],//安全
        safeApprovePer:'',
        equipApprovePerOpt:[],//设备
        equipApprovePer:'',
        prodApprovePerOpt:[],//生产
        prodApprovePer:'',
        projApprovePerOpt:[],//工程
        projApprovePer:'',
        superOpt:[],
        super:'',
        tutelageOpt:[],
        tutelage:'',
        leaderOpt:[],
        leader:''
        //审批人结束
      },
      //上传图片
      safeImgList: [],//安全工作方案0
      drawImgList:[],//图纸1
      analysisList:[],//安全分析2
      gasImgList:[],//气体检查表3
      safePermitList:[],//安全资质4
      personalImgList:[],//人员资质5
      toolImgList:[],//工器具合格证6
      rules:{
        typePermitResStr:[
          {required:true,message:'许可证类型必填',trigger: 'blur'}
        ],
        projectName:[
          {required:true,message:'项目名称必填',trigger: 'blur'}
        ],
        projectAddr:[
          {required:true,message:'项目作业地点必填',trigger: 'blur'}
        ],
        keyPerson:[
          {required:true,message:'关键作业人必填',trigger: 'blur'}
        ],
        validityPermit:[
          {required:true,message:'许可证有效期必填',trigger: 'blur'}
        ],
        desc:[
          {required:true,message:'工作任务描述必填',trigger: 'blur'}
        ],
        jurisdiction:[
          {required:true,validator:validateJurisdiction,trigger:'change'}
        ],
        uploadImg:[
          {required:true,validator:validateImgList}
        ]
      }
    }
  },
  computed: {
    
  },
  methods: {
    init(){
      this.userInfo = getSession('userInfo')
      this.form.typePerOpt = typePermit
      this.getPermitNum()
      this.getApprovePerson()
      this.deleteAllImg()
    },
    //获取许可证编号
    getPermitNum (){
      permitNumLast({wellId:this.userInfo.wellId}).then(res => {
        let numStr2 = ''
        if(res.msg !== "null"){
          let str = res.data
          let numStr = str.split('-')[2]
          let num = parseInt(numStr)
          if(num <9) {
            numStr2 = '00' + (num+=1) 
          }else if(num >= 9 && num <= 98){
            numStr2 = '0' + (num+=1)
          }else if(num > 98){
            numStr2 = '' + (num+=1)
          }
        }else{
          numStr2 = '000'
        }
        this.form.permitNum = this.userInfo.remark + '-' + new Date().getFullYear() + '-' + numStr2
      })
    },
    //获取审批人
    getApprovePerson(){
      let params = {
        wellId:this.userInfo.wellId
      }
      getJurisdiction(params).then(res => {
        this.form.safeApprovePerOpt = res.data.filter(item => {
          return item.roleName == '安全审批' && item.userName != this.userInfo.username
        })
        this.form.equipApprovePerOpt = res.data.filter(item => {
          return item.roleName == '设备审批' && item.userName != this.userInfo.username
        })
        this.form.prodApprovePerOpt = res.data.filter(item => {
          return item.roleName == '生产审批' && item.userName != this.userInfo.username
        })
        this.form.projApprovePerOpt = res.data.filter(item => {
          return item.roleName == '工程审批' && item.userName != this.userInfo.username
        })
      })
      getSuper(params).then(res => {
        this.form.superOpt = res.data.filter(item => {
          return item.roleName == "安全监督" && item.userName != this.userInfo.username
        })
        this.form.tutelageOpt = res.data.filter(item => {
          return item.roleName == "安全监护" && item.userName != this.userInfo.username
        })
      })
      getLeader(params).then(res => {
        
        this.form.leaderOpt = res.data
      })
    },
    //许可证类型
    showPermitTypeDialog(e){
      //显示许可证类型对话框
      this.permitDialog = true
      
    },
    confirm(){
      //点击确定
      this.permitDialog = false
      let resArr = []
      if(this.form.typePermitRes){
        this.form.typePermitRes.forEach((item) => {
          resArr.push(item[1])
        })
      }
      let arr = []
      this.$refs['typePermitRef'].getCheckedNodes({
        leafOnly:true
      }).forEach(item => {
        arr.push(item.label)
      })
      this.form.typePermitResStr = arr.toString()
      this.$refs.form.clearValidate('typePermitResStr')
      //确认后提交
      let params = {
        numberId:this.form.permitNum,
        ids:resArr.toString()
      }
      submitPermitType(params).then(res => {
        if(res.msg =="提交成功"){
          this.$message({
            message: '提交成功',
            type: 'success'
          });
        }else{
          this.$message.error('提交失败，请重新选择')
        }
      })
    },
    cancel(){
      this.permitDialog = false
    },
    //许可证类型结束
    onSubmit(){
      let data = {
        numberId:this.form.permitNum,
        userId:this.userInfo.id,
        workName:this.form.projectName,
        workPlace:this.form.projectAddr,
        timeLimit:this.form.startTime,
        sTime:this.form.endTime,
        taskName:this.form.desc,
        planId:this.form.isSafety ? 0 : 1,
        drawId:this.form.isDrawings ? 0 : 1,
        man: this.form.keyPerson,
        produceUserId: this.form.prodApprovePer ? this.form.prodApprovePer.split('-')[0] : '',
        produceUserName: this.form.prodApprovePer ? this.form.prodApprovePer.split('-')[1] : '',
        deviceUserId:this.form.equipApprovePer ? this.form.equipApprovePer.split('-')[0] : '',
        deviceUserName: this.form.equipApprovePer ? this.form.equipApprovePer.split('-')[1] : '',
        safeUserId:this.form.safeApprovePer ? this.form.safeApprovePer.split('-')[0] : '',
        safeUserName:this.form.safeApprovePer ? this.form.safeApprovePer.split('-')[1] : '',
        projectUserId:this.form.projApprovePer ? this.form.projApprovePer.split('-')[0] : '',
        projectUserName:this.form.projApprovePer ? this.form.projApprovePer.split('-')[1] : '',
        controlUserId:this.form.super ? this.form.super.split('-')[0] : '',
        controlUserName:this.form.super ? this.form.super.split('-')[1] : '',
        tutelageUserId:this.form.tutelage ? this.form.tutelage.split('-')[0] : '',
        tutelageUserName:this.form.tutelage ? this.form.tutelage.split('-')[1] : '',
        leadUserId:this.form.leader ? this.form.leader.split('-')[0] : '',
        leadUserName:this.form.leader ? this.form.leader.split('-')[1] : '',
        produceMark:0,
        deviceMark:0,
        safeMark:0,
        projectMark:0,
        controStartMark:0,
        tutelageStartMark:0,
        leadStartMark:0,
        controEndMark:0,
        tutelageEndMark:0,
        leadEndMark:0,
        mark:0
      }
      this.$refs.form.validate(validator => {
        if(validator){
          submit(data).then(res => {
            if(res.msg == '申请成功'){
              this.$message.success('申请成功')
              this.init()
              this.$router.go(0)
              
            }
          })
        }else {
          console.log('不提交')
        }
      })
    },
    dateChange(){
      // let starTime = new Date(this.form.validityPermit[0]).getTime()
      // let endTime = new Date(this.form.validityPermit[1]).getTime()
      // if(endTime - starTime > (8*3600*1000)) {
      //   this.$message.error('许可证有效期不能超过8小时')
      //   this.form.validityPermit = []
      // }
      this.form.startTime = this.form.validityPermit[0]
      this.form.endTime = this.form.validityPermit[1]
    },
    isSafetyChange(e){
      this.form.isSafety = e
    },
    isDrawingsChange(){
      this.form.isDrawings = e
    },
    //上传图片
    onBeforeUploadImage(file){
      
    },
    UploadImage(params,typeId){
      let data = new FormData()
      data.append('file',params.file)
      data.append('numberId',this.form.permitNum)
      data.append('typeId',typeId)
      upload(data).then(res => {
        if(res.msg == '上传成功'){
          params.onSuccess(res)
        }
      }).catch(err => {
        params.onError(err)
      })
    },
    handleRemove(file,fileList){
      //删除图片
      let params = {
        id:file.response.data.id,
        numberId:this.form.permitNum
      }
      delImg(params).then(res => {
        if(res.msg == '文件删除成功'){
          this.$message(`${res.msg}`)
        }
      })
    },
    successUpload(res,file,fileList){
      //文件上传成功
      if(res.data.typeId == 6){
        // fileList.forEach( item => {
        //   this.toolImgList.push(item)
        // })
        this.toolImgList = fileList
        
      }else if(res.data.typeId == 5) {
        this.personalImgList = fileList
      }else if(res.data.typeId == 4){
        //安全资质
        this.safePermitList = fileList
      }else if(res.data.typeId == 3){
        this.gasImgList = fileList
      }else if(res.data.typeId == 2){
        this.analysisList = fileList
      }else if(res.data.typeId == 1){
        this.drawImgList = fileList
      }else if(res.data.typeId == 0){
        this.safeImgList = fileList
      }
    },
    errorUpload(err,file,fileList){
      //上传失败
      console.log(err)
      console.log(file)
      console.log(fileList)
      this.$message('上传失败')
    },
    // uploadProgress(e){
    //   //文件上传时
    //   console.log(e)
    // },
    // errorUpload(){
    // }
    deleteAllImg(){
      let params = {number:this.form.permitNum}
      delAllImg(params).then(res => {
      })
    },
    
  },
  created(){
    this.init()
  },
  mounted() {
    
  },
}
</script>
<style lang="scss" scoped>
  .container {
    margin: 30px;
    font-size: 30px;
    line-height: 46px;
  }
  .el-input {
    width: 50%;
  }
  .leader{
    margin-top: 20px;
  }
</style>