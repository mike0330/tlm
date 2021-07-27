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
              <img src="" alt="">
            </div>
            <div class="perInfo">
              NNNNNN
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-badge :value="1" :max="99" class="item">
              <div class="message">消息</div>
            </el-badge>
          </div>
          <div class="card-body">
            <div class="perInfo">
              NNNNNN
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'homePage',
  computed: {
    ...mapGetters([
      'name'
    ])
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
