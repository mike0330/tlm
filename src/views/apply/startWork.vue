<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="许可证类别">
        <el-cascader v-model="form.typePermit" :props="form.props" 
          collapse-tags :options="form.options" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="许可证编号">
        <el-input placeholder="请输入内容" v-model="form.permitNum" :disabled="true">
        </el-input>
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
          end-placeholder="结束日期">
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
export default {
    data () {
      return {
        form: {
          props: { multiple: true },
          typePermit:'',
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
          options: [{
            value: '一级',
            label: '一级',
            children:[{
              value: '一级1',
              label: '一级1',
            },{
              value: '一级2',
              label: '一级2',
            }]
          },{
            value: '二级',
            label: '二级',
            children:[{
              value: '二级1',
              label: '二级1',
            },{
              value: '二级2',
              label: '二级2',
            }]
          }],
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]

      }
    },
    computed: {
      isSafetyChange(){
        console.log(this.form.isSafety)
      }
    },
    methods: {
      onSubmit(){
        console.log(this.form.validityPermit)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
      
    }
}
</script>
<style lang="scss" scoped>
  .container {
    margin: 30px;
    font-size: 30px;
    line-height: 46px;
  }
  

</style>