<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="许可证类别">
        <el-select v-model="form.typePermit" multiple placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="许可证编号">
        <el-input placeholder="请输入内容" v-model="form.permitNum" :disabled="true">
        </el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input placeholder="请输入内容" v-model="form.projectName" >
        </el-input>
      </el-form-item>
      <el-form-item label="项目作业地点">
        <el-input placeholder="请输入内容" v-model="form.projectAddr" >
        </el-input>
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
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="安全工作方案">
        <el-switch v-model="form.isSafety" :on-change="isSafetyChange"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-upload v-if="form.isSafety"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          list-type="picture">
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>  
</template>
<script>
export default {
    data () {
      return {
        form: {
          typePermit:'',
          permitNum:'',
          projectName:'',
          projectAddr:'',
          validityPermit:'',//许可证有效期
          desc:'',
          isSafety:false,//是否有安全工作方案
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
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