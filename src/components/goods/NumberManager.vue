<!--
   User: liuyin
   Date: 2019-10-10 14:21
   Description:
 -->
<template>
    <div class="number-manager">
        <span class="number-manager-less" @click="onLessClick" :class="{'number-manager-disabled':number===1}">-</span>
        <span class="number-manager-number">{{number}}</span>
        <span class="number-manager-add" @click="onAddClick">+</span>
    </div>
</template>

<script>
export default {
  props: {
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: 1
    }
  },
  watch: {
    defaultNumber: function (newV) {
      this.number = newV
    },
    number: function (newV) {
      this.$emit('onChangeNumber', newV)
    }
  },
  methods: {
    onLessClick: function () {
      if (this.number === 1) {
        return
      }
      this.number -= 1
    },
    onAddClick: function () {
      this.number += 1
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .number-manager{
    display: flex;
    font-size: $infoSize;
    height: px2rem(20);
    line-height: px2rem(20);
    span{
      width: px2rem(30);
      text-align: center;
      display: inline-block;
      font-weight: 500;
    }
    &-number{
      background-color: $bgColor;
      padding: 0 px2rem(4);
      width: 100px;
    }
    &-disabled{
      color: $hintColor;
    }
  }
</style>
