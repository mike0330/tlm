<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的工作台</span>
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
  .box-card {
    width: 60%;
  }
</style>
