<!--
   User: liuyin
   Date: 2019-09-04 17:19
   Description:
 -->
<template>
    <div class="main">
      <component :is="currentComponent"></component>
      <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/ToolBar.vue'
export default {
  data () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    onChangeFragment: function (componentName) {
      console.log(componentName)
      this.currentComponent = componentName
    }
  },
  components: {
    'tool-bar': toolBar,
    // 异步组件引入方式
    'home': () => import('@c/Home'),
    'shopping': () => import('@c/Shopping'),
    'my': () => import('@c/My')

  }
}
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
