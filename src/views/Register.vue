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
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
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
