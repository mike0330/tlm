<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="许可证编号" >
        <el-input v-model="form.permitNum" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="许可证类别">
       
        <!-- <el-button type="primary" style="margin-left:40px">确定</el-button> -->
        <el-input placeholder="点击选择" @focus="showPermitTypeDialog">
        </el-input>
        <el-dialog title="许可证类型" :visible.sync="permitDialog" width="30%">
          <el-cascader v-model="form.typePermitRes" :props="form.props" 
            collapse-tags :options="form.typePerOpt">
          </el-cascader> 
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input placeholder="请输入内容"  v-model="form.projectName" >
        </el-input>
      </el-form-item>
      <el-form-item label="项目作业地点">
        <el-input placeholder="请输入内容" v-model="form.projectAddr" >
        </el-input>
      </el-form-item>
      <el-form-item label="关键作业人员">
        <el-select v-model="form.keyPeaple" placeholder="请选择">
          <el-option
            v-for="item in form.keyPeapleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="许可证有效期">
        <el-date-picker
          v-model="form.validityPermit"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change = "dateChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工作任务描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="安全工作方案">
        <el-switch v-model="form.isSafety" :on-change="isSafetyChange"></el-switch>
        <el-upload v-if="form.isSafety"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
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
          :on-preview="handlePreview"
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
          :on-preview="handlePreview"
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
          :on-preview="handlePreview"
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
          :on-preview="handlePreview"
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
          :on-preview="handlePreview"
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
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture-card">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="选择审批人">
        <el-col :span="6">
          <el-select v-model="form.writtenPer" placeholder="请选择书面">
            <el-option
              v-for="item in form.writtenPerOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="form.writtenPer" placeholder="请选择监督">
            <el-option
              v-for="item in form.writtenPerOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="form.writtenPer" placeholder="请选择监护">
            <el-option
              v-for="item in form.writtenPerOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>
<script>
import { mapGetters } from 'vuex'
import {getSession} from '@/utils/storage'
import {typePermit} from './typePermit'
import {permitNumLast} from '@/api/apply'
export default {
  data () {
    return {
      userInfo:'',
      permitDialog:false,//许可证类型对话框
      form: {
        props: { multiple: true },
        typePermitRes:'',
        permitNum:'',
        projectName:'',
        projectAddr:'',
        validityPermit:'',//许可证有效期
        desc:'',
        isSafety:false,//是否有安全工作方案
        isDrawings:false,//是否有图纸,
        keyPeaple:'',//关键作业人,
        writtenPer:'',//书面
        writtenPerOpt:[{
          value:'11111111111',
          label:'张三'
        }],
        keyPeapleOptions:[{
          value:'XXX',
          label:'XXX'
        },{
          value:'xxxx1',
          label:'xxxx1',
        }],
        typePerOpt: [],
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

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
    },
    getPermitNum (){
      //获取许可证编号
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
    //许可证类型
    showPermitTypeDialog(e){
      //显示许可证类型对话框
      this.permitDialog = true
      
    },
    confirm(){
      //点击确定
      this.permitDialog = false
      console.log(this.form.typePermitRes)
    },
    cancel(){
      this.permitDialog = false

    },
    //许可证类型结束
    onSubmit(){
    },
    dateChange(){
      let starTime = new Date(this.form.validityPermit[0]).getTime()
      let endTime = new Date(this.form.validityPermit[1]).getTime()
      if(endTime - starTime > (8*3600*1000)) {
        this.$message.error('许可证有效期不能超过8小时')
        this.form.validityPermit = []
      }
      
    },
    handlePreview(){

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
  .el-form-item{
    width: 50%;
  }

</style>