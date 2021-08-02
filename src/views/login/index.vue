<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item style="margin-left: 0px" prop="code">
        <div class="el-row" span="24">
          <div class="el-col el-col-16">
            <span class="svg-container">
              <i class="el-icon-s-promotion" />
              <!-- <svg-icon icon-class="promotion" /> -->
            </span>
            <el-input type="text" maxlength="4" placeholder="请输入验证码" 
              v-model="loginForm.code" clearable autocomplete="off">
            </el-input>
          </div>
          <div class="el-col el-col-8">
            <div class="login-code">
              <span class="login-code-img" @click="onLoginCodeClick">
                {{loginCode}}
              </span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-button :loading="loading" 
        type="primary" 
        style="width:100%;margin-bottom:30px;" 
        @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { setSession } from "@/utils/storage";

export default {
  name: 'Login',
  data() { 
    // 用户名验证
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入用户名"));
      }else{
        callback()
      }
    };
    // 密码验证
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }else{
        callback()
      }
    };
    // 验证码验证
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.loginCode) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '147852369',
        password: '12341234',
        code:''
      },
      loginCode:null,
      loginRules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    onLoginCodeClick() {
      this.loginCode = Math.random().toString(36).substr(-4);
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            setTimeout(() => {
              this.$message.success(`${this.loginForm.username}欢迎回来！`);
            }, 300);
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      
    }
  },
  created(){
    this.onLoginCodeClick()
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 20px;
  }
  .login-code {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 0 10px;
    .login-code-img {
      margin-top: 7px;
      width: 100px;
      height: 38px;
      background-color: #fdfdfd;
      border: 1px solid #dcdfe6;
      color: #333;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 5px;
      line-height: 38px;
      text-indent: 5px;
      text-align: center;
      cursor: pointer;
      transition: all ease 0.2s;
      &:hover {
        border-color: #c0c4cc;
        transition: all ease 0.2s;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
