<!--
   User: liuyin
   Date: 2019-09-04 17:19
   Description:
 -->
<template>
    <div class="main">
      <div style="background-color: yellow;height: 100%;"></div>
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
      <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'imooc',
  data () {
    return {
      currentComponent: 'home'
    }
  },
  activated () {
    this.pushFragment()
  },
  methods: {
    onChangeFragment: function (componentName) {
      this.currentComponent = componentName
    },
    pushFragment () {
      let componentIndex = this.$route.params.componentIndex
      if (componentIndex === undefined) return
      this.$refs.toolBar.pushFragment(componentIndex)
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
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
