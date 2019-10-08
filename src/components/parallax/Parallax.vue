<!--
   User: liuyin
   Date: 2019-10-08 14:08
   Description:
 -->
<template>
    <div>
        <!--视差效果 让多层背景以不同速度去进行移动
            至少需要两层背景
        -->
      <div class="parallax" @scroll="onScrollChange">
        <div class="parallax-slow" :style="{top:slowTop}">
            <slot name="parallax-slow"></slot>
        </div>
        <div class="parallax-content z-index-2">
            <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      parallaxScroll: 0,
      SPEED_DIFF: 2
    }
  },
  methods: {
    onScrollChange: function ($event) {
      this.parallaxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    slowTop: function () {
      return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@css/style.scss";
  .parallax{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;

    &-slow{
      width: 100%;
      position: relative;
    }

    &-content{
      width: 100%;
      position: relative;
    }

  }

</style>
