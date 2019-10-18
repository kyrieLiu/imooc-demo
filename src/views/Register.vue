<!--
   User: liuyin
   Date: 2019-10-10 19:08
   Description:
 -->
<template>
    <div class="register-page">
      <navigation-bar :pageName="'注册'" @onLeftClick="onLeftClick"></navigation-bar>
      <div class="register-page-content">
        <div class="input-container">
          <input type="text" v-model="username" placeholder="用户名">
        </div>
        <div class="input-container">
          <input type="password" v-model="password" placeholder="密码">
        </div>
        <div class="input-container">
          <input type="password" v-model="confirmPassword" placeholder="确认密码">
        </div>
        <div class="register-page-content-register page-commit" @click="onRegisterClick">注册</div>
      </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
import md5 from '@js/md5.min.js'
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    onLeftClick: function () {
      this.$router.go(-1)
    },
    onRegisterClick: function () {
      if (this.username.length === 0) {
        alert('前完善用户名')
        return
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('请完善密码')
        return
      }
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onRegisterToAndroid()
      } else if (window.webkit) {
        this.onRegisterToIOS()
      }
    },
    onRegisterToAndroid: function () {
      let userJson = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.register(userJson)
      this.onRegisterCallback(result)
    },
    onRegisterToIOS: function () {
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.registerCallback = this.onRegisterCallback
      window.webkit.messageHandlers.register.postMessage(userObj)
    },
    onRegisterCallback: function (result) {
      if (result) {
        alert('注册成功')
        this.$router.go(-1)
      } else {
        alert('注册失败,请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .register-page{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    &-content{
      width: 100%;
      height: 100%;
      &-register{
        margin-top: 40%;
      }
    }
  }

</style>
