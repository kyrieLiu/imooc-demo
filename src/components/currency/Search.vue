<!--
   User: liuyin
   Date: 2019-09-12 14:31
   Description:
 -->
<template>
    <div class="search" :style="{backgroundColor:bgColor}">
        <img class="search-icon" :src="icon">
      <span class="search-hint" :style="{color:hintColor}">大前端开发</span>
    </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: require('@img/search.svg')
    },
    hintColor: {
      default: '#999999',
      type: String
    },
    bgColor: {
      default: '#ffffff',
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
  .search{
    background-color: white;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;

    &-icon{
      margin-left: $marginSize;
      width: px2rem(16);
    }
    &-hint{
      margin-left: $marginSize;
      font-size: $minInfoSize;
      color: $hintColor;
    }
  }
</style>
