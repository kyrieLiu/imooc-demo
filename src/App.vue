<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="scss">
  @import '@css/style.scss';
  #app{
    width: 100%;
    height: 100%;

    .fold-left-enter-active{
      animation-name: fold-left-in;
      animation-duration: .4s;
    }

    .fold-left-leave-active{
      animation-name: fold-left-out;
      animation-duration: .4s;
    }

    @keyframes fold-left-in {
        0%{
          transform: translate(100%,0);
        }
      100%{
        transform: translate(0,0);
      }
    }

    @keyframes fold-left-out {
      0%{
        transform: translate(0,0);
      }
      100%{
        transform: translate(-100%,0);
      }
    }
    .fold-right-enter-active{
      animation-name: fold-right-in;
      animation-duration: .4s;
    }

    @keyframes fold-right-in {
      0%{
        transform: translate(-100%,0);
      }
      100%{
        transform: translate(0,0);
      }
    }
    .fold-right-leave-active{
      animation-name: fold-right-out;
      animation-duration: .4s;
    }
    @keyframes fold-right-out {
      0%{
        transform: translate(0,0);
      }
      100%{
        transform: translate(100%,0);
      }
    }

  }

</style>
<script>
import VConsole from 'vconsole'
export default {
  data () {
    return {
      transitionName: 'fold-left',
      virtualTaskStack: [
        'imooc'
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.virtualTaskStack.push(to.name)
        this.transitionName = 'fold-left'
      } else {
        this.virtualTaskStack.pop()
        this.transitionName = 'fold-right'
      }
      if (to.params.clearTask) {
        this.virtualTaskStack = ['imooc']
      }
    }
  },
  created () {
    // eslint-disable-next-line no-unused-vars,no-undef
    var vConsole = new VConsole()
    this.$store.commit('setIsIphoneX', window.isIphoneX)
    // 提供给native调用的方法
    window.nativeFunctionUserLogin = function (username) {
      alert(username)
      return 'H5回调'
    }

    // window.onFunction = function (str) {
    //   alert(str)
    //   return 'onFunction 方法已经调用完成'
    // }
  }
}
</script>
