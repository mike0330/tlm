<template>
  <div class="dashboard-container">
    <el-row  :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div  class="item">
              <span>我的工作台</span>
            </div>
          </div>
          <div class="card-body">
            <div class="avatar">
              <img src="" alt="" >
            </div>
            <div class="perInfo">
              <div>XXXXX</div>
              <div>XXXXX</div>
              <div>XXXXX</div>
              <div class="btn">
                <el-button type="info" plain size="medium">消息</el-button>            
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div  class="item">
              <span>文件列表</span>
            </div>
          </div>
          <div class="card-body">
            <div class="perInfo">
              
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {getSession} from '@/utils/storage'
export default {
  name: 'homePage',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    init () {
      this.userInfo = getSession('userInfo')
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .card-body{
    display: flex;
    height: 120px;
  }
  .avatar{
    width: 20%;
  }
  .perInfo{
    width: 80%;
    padding: 20px
  }
  .btn{
    padding: 5px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .message {
    width: 40px;
    text-align: center;
  }
  
</style>
