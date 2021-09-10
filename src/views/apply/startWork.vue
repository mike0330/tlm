<template>
  <div class="container">
    <el-form ref="form" :rules="rules" :validate-on-rule-change="false" :model="form" label-width="140px">
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
      <el-form-item label="安全工作方案">
        <el-switch v-model="form.isSafety" :on-change="isSafetyChange"></el-switch>
        <el-upload v-if="form.isSafety"
          class="upload-demo"
          action="https://zyxk.oilhb.com:8099/upload/template"
          :on-remove="handleRemove"
          :file-list="safeImgList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图纸">
        <el-switch v-model="form.isDrawings"></el-switch>
        <el-upload v-if="form.isDrawings"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="工作前安全分析表">
        <div>   </div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="气体检查表">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="开工前条件确认">
        <div class="littleTittle" > 安全资质：</div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
        <div > 人员资质：</div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
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
          :on-remove="handleRemove"
          :before-upload="onBeforeUploadImage"
          :http-request="UploadImage"
          :file-list="safeImgList"
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
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
  upload
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
      }

      
    };
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
        safeApprovePerOpt:[],
        safeApprovePer:'',
        equipApprovePerOpt:[],
        equipApprovePer:'',
        prodApprovePerOpt:[],
        prodApprovePer:'',
        projApprovePerOpt:[],
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
      safeImgList: [],
      fileList:[],
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
        ]
      }
    }
  },
  computed: {
    isSafetyChange(){
      
    }
  },
  methods: {
    init(){
      
      this.userInfo = getSession('userInfo')
      this.form.typePerOpt = typePermit
      this.getPermitNum()
      this.getApprovePerson()
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
      this.$refs.form.validate(validator => {
        if(validator){
          
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
    //上传图片
    onBeforeUploadImage(file){
      console.log(file)
    },
    UploadImage(params){
      console.log(params)
      let data = new FormData()
      data.append('file',params.file)
      data.append('numberId',this.form.permitNum)
      data.append('typeId',6)
      upload(data).then(res => {
        console.log(res)
        if(res.msg == '上传成功'){

        }
        
      })
    },
    handleRemove(){

    }
    
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
  // .el-form-item{
  //   width: 50%;
  // }
  .el-input {
    width: 50%;
  }
  .leader{
    margin-top: 20px;
  }
</style>