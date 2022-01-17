<template>
  <div class="login-container">
    <div class="title-wrapper">
      <div :class="['title-container',{'active': selectIndex === index}]"
           v-for="(i,index) in selectData"
           :key="index" @click="selectClick(index)">
        <div class="title">{{ i.name }}</div>
      </div>
    </div>
<!--    登录-->
    <el-form
        ref="loginForm"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        v-show="selectIndex === 0"
    >
      <el-form-item prop="username">
        <i class="el-icon-user-solid"></i>
        <el-input
            v-model="loginData.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <i class="el-icon-lock"></i>
        <el-input
            :key="passwordType"
            ref="pwdInput"
            v-model="loginData.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter="handleLogin"
        />
<!--      @keyup.enter.native   键盘回车事件-->
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view" v-if="passwordType !== 'password'"></i>
          <div class="pwd-hidden" v-else v-html="svgIcon"></div>
        </span>
      </el-form-item>
      <div class="pwd-checkbox">
        <el-checkbox v-model="remenberPassword">记住密码</el-checkbox>
      </div>
      <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="handleLogin"
      >
        登录
      </el-button>
    </el-form>

<!--    注册-->
    <el-form
        ref="setLoginFrom"
        :model="registerData"
        :rules="registerRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        v-show="selectIndex === 1"
    >
      <el-form-item prop="username">
        <i class="el-icon-user-solid"></i>
        <el-input
            v-model="registerData.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="passwordOne">
        <i class="el-icon-lock"></i>
        <el-input
            v-model="registerData.passwordOne"
            :key="passwordType"
            :type="passwordType"
            placeholder="请输入密码"
            name="password1"
            tabindex="2"
            auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view" v-if="passwordType !== 'password'"></i>
          <div class="pwd-hidden" v-else v-html="svgIcon"></div>
        </span>
      </el-form-item>
      <el-form-item prop="passwordTwo">
        <i class="el-icon-lock"></i>
        <el-input
            v-model="registerData.passwordTwo"
            :key="passwordType"
            :type="passwordType"
            placeholder="请再次输入密码"
            name="password2"
            tabindex="2"
            auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view" v-if="passwordType !== 'password'"></i>
          <div class="pwd-hidden" v-else v-html="svgIcon"></div>
        </span>
      </el-form-item>
      <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click="registerClick"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>

import {passwordSvg} from "../assets/images/login/svg.js";
import {ref, reactive, unref, onMounted} from "vue";

import {getLogin,setLogin} from "../http";
import * as cookies from "../assets/cookies";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";
import {debounce} from "../assets/js/config";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const routeFrom = route.query.from || "";
    const store = useStore();
    // dom映射变量定义
    const loginForm = ref(null);
    const setLoginFrom = ref(null)
    const pwdInput = ref(null);
    // 变量定义
    const svgIcon = passwordSvg;
    const loading = ref(false);
    const remenberPassword = ref(false);
    const loginRules = {
      username: [
        {required: true, trigger: "blur", message: "用户名不能为空"},
      ],
      password: [
        {required: true, trigger: "blur", message: "密码不能为空"},
        {min: 6, message: "密码要大于6位", trigger: "blur"},
      ],
    };
    const registerData =  reactive({
      username: '',
      passwordOne: '',
      passwordTwo: '',
    })

    //验证两个密码是否相同'
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== registerData.passwordOne) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const registerRules = reactive({
      username: [
        {required: true, trigger: "blur", message: "用户名不能为空"},
      ],
      passwordOne: [
        {required: true, trigger: "blur", message: "密码不能为空"},
        {min: 6, message: "密码要大于6位", trigger: "blur"},
      ],
      passwordTwo: [
        {required: true, trigger: "blur", message: "密码不能为空"},
        {min: 6, message: "密码要大于6位", trigger: "blur"},
        {validator:validatePass,trigger: "blur"}
      ],
    })

    const user = cookies.getUsername() || "";
    const pwd = cookies.getPassword() || "";
    const loginData = reactive({
      username: user,
      password: pwd,
    });
    const selectIndex = ref(0)
    const selectData = ref([{name: '登录'}, {name: '注册'}])

    const passwordType = ref("password");
    // 密码明文点击事件
    const showPwd = () => {
      passwordType.value = passwordType.value === "password" ? "" : "password";
      unref(pwdInput).focus();
    };

    const selectClick = (index) => {
      selectIndex.value = index
    }

    // 登录
    const handleLogin = debounce(()=>{
        const form = unref(loginForm)
        form.validate((valid) => {
          if (valid) {
            loading.value = true;
            getLogin({
              username: loginData.username.trim(),
              password: loginData.password,
            }).then((res) => {
              if (res.res === 0) {
                cookies.setToken(res.token);
                //记住密码功能
                if (remenberPassword.value) {
                  cookies.setUsername(loginData.username.trim());
                  cookies.setPassword(loginData.password);
                } else {
                  cookies.removeUsername();
                  cookies.removePassword();
                }
                if (routeFrom) {
                  router.push({name: routeFrom});
                } else {
                  router.push({path: "/"});
                }
              } else {
                ElMessage({
                  showClose: true,
                  message: '密码或用户名错误',
                  type: 'error',
                })
              }
            }).finally(() => {
              loading.value = false;
            });
          }
        })
      },1000)

    //注册
   const registerClick = debounce(()=>{
        const from =unref(setLoginFrom)
        from.validate((valid)=>{
          if(valid){
            setLogin({
              username: registerData.username.trim(),
              password: registerData.passwordTwo,
            }).then((res)=>{
              if(res.serverStatus === 2) {
                from.resetFields()
                ElMessage({
                  showClose: true,
                  message: '注册成功',
                  type: 'success',
                })
              } else {
                from.resetFields()
                ElMessage({
                  showClose: true,
                  message: res,
                  type: 'error',
                })
              }
            }).catch(error=>{
              console.log(error)
            }).finally(() => {
            });
          }
        })
      },1000)
    return {
      // doom 相关
      loginForm,
      setLoginFrom,
      pwdInput,
      // 变量
      svgIcon,
      loginRules,
      loginData,
      passwordType,
      // 事件
      showPwd,
      handleLogin,
      loading,
      remenberPassword,
      selectIndex,
      selectData,
      selectClick,
      registerData,
      registerRules,
      registerClick
    };
  },
};
</script>

<style lang="less">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container .el-input input {
    color: @cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 48px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 10px;
      color: @light_gray;
      height: 48px;
      caret-color: @cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 0 35px 0;
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

  i {
    margin-left: 15px;
    font-size: 16px;
    color: @dark_gray;
    vertical-align: middle;
    width: 16px;
    display: inline-block;
  }
  .title-wrapper {
    display: flex;
    margin: 20px 0;
    justify-content: center;
    padding-top: 10%;
    .title-container {
      width: 225px;
      border:1px solid #3e4957;
      text-align: center;
      .title {
        font-size: 26px;
        color: #3e4957;
        font-weight: bold;
      }
      &:nth-child(1){
        border-right: none;
      }
      &.active {
        background: #409eff;
        border: 1px solid #409eff;
        .title {
          color: @light_gray;
        }
      }
    }
  }
  .show-pwd {
    position: absolute;
    height: 100%;
    line-height: 46px;
    right: 20px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;

    .pwd-hidden {
      width: 16px;
      height: 16px;

      :deep(#icon-eye) {
        fill: currentColor;
        color: @dark_gray;
      }
    }
  }

  .pwd-checkbox {
    text-align: left;
    padding-left: 10px;
    padding-bottom: 30px;

    :deep(.el-checkbox) {
      color: #fff;
    }
  }
}
</style>

