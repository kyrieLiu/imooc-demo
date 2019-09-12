<!--
   User: liuyin
   Date: 2019-09-11 13:36
   Description:
 -->
<template>
    <div class="count-down">
        <span class="count-down-end-time">
          {{endHours}}点场
          </span>
      <span class="count-down-surplus">
        {{surplus | filterTime}}
      </span>
    </div>
</template>

<script>
export default {
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  created () {
    this.computedSurplusTime()
  },
  data () {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      interval: undefined
    }
  },
  methods: {
    computedSurplusTime: function () {
      if (this.interval) {
        clearInterval(this.interval)
      }

      const date = new Date()
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
      }
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()

      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  watch: {
    diffSeconds: function (newV) {
      const hours = Math.floor(newV / 3600)
      const minutes = Math.floor(newV / 60) % 60
      const seconds = newV % 60
      this.surplus = hours + ':' + minutes + ':' + seconds

      if (newV === 0) {
        this.computedSurplusTime()
      }
    },
    endHours: function () {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
  .count-down{
    display: inline-block;
    font-size: $infoSize;
    margin-left: $marginSize;

    span{
      display: inline-block;
      padding: px2rem(2) px2rem(4);
    }

    &-end-time{
      background-color: $mainColor;
      border-top-left-radius: px2rem(4);
      border-bottom-left-radius: px2rem(4);
      border: px2rem(1) solid $mainColor;
      color: white;
    }
    &-surplus{
      background-color: white;
      border-top-right-radius: px2rem(4);
      border-bottom-right-radius: px2rem(4);
      border: px2rem(1) solid $mainColor;
      color: $mainColor;
    }

  }
</style>
