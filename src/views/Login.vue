<!--
   User: liuyin
   Date: 2019-10-10 19:08
   Description:
 -->
<template>
    <div class="login-page">
      <navigation-bar :pageName="'登录'" @onLeftClick="onLeftClick"></navigation-bar>
      <div class="login-page-content">
          <div class="input-container">
            <input v-model="username" type="text" placeholder="用户名">
          </div>
        <div class="input-container">
          <input v-model="password" type="password" placeholder="密码">
        </div>
        <div class="login-page-content-login page-commit" @click="onLoginClick">登录</div>
        <a class="login-page-content-register" @click="onRegisterClick">注册新用户</a>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
import md5 from '@js/md5.min.js'
export default {
  name: 'login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLeftClick: function () {
      this.$router.go(-1)
    },
    onLoginClick: function () {
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码未输入')
      }
      // 与原生交互
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else if (window.webkit) {
        this.onLoginToIOS()
      }
    },
    onLoginToAndroid: function () {
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.login(userJson)
      alert(result)
      this.onLoginCallback(result)
    },
    onLoginToIOS: function () {
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.loginCallback = this.onLoginCallback
      window.webkit.messageHandlers.login.postMessage(userObj)
    },
    onLoginCallback: function (result) {
      switch (result) {
        case '-1':
          alert('系统内部错误')
          break
        case '0':
          this.$store.commit('setUsername', this.username)
          this.$router.go(-1)
          break
        case '1':
          alert('用户密码错误')
          break
      }
    },
    onRegisterClick: function () {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
  .login-page{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    &-content{
      width: 100%;
      height: 100%;
      &-login{
        margin-top: 40%;
      }
      &-register{
        font-size: $infoSize;
        color: $hintColor;
        margin-top: $marginSize;
        padding: $marginSize;
        float: right;
      }
    }
  }
</style>
