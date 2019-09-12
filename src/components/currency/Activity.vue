<!--
   User: liuyin
   Date: 2019-09-10 09:49
   Description:
 -->
<template>
    <div class="activity">
      <!--插槽展示活动内容-->
      <slot></slot>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
    @import "@css/style.scss";
    .activity{
      max-height: px2rem(160px);
      position: relative;
      z-index: 2;
    }
</style>
