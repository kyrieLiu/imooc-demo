<!--
   User: liuyin
   Date: 2019-09-06 14:34
   Description:
 -->
<template>
    <div class="home" @scroll="onScrollChange" ref="home">
      <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <template v-slot:nav-left>
          <img :src="navBarCurrentSlotStyle.leftIcon">
        </template>
        <template v-slot:nav-center>
          <search :bgColor="navBarCurrentSlotStyle.search.bgColor"
                  :hintColor="navBarCurrentSlotStyle.search.hintColor"
                  :icon="navBarCurrentSlotStyle.search.icon">
          </search>
        </template>
        <template v-slot:nav-right>
          <img :src="navBarCurrentSlotStyle.rightIcon">
        </template>

      </navigation-bar>
      <div class="home-content">
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
        <activity>
          <div class="activity-520">
            <img v-for="(item,index) in activityDatas" :key="index" :src="item.icon">
          </div>
        </activity>
        <ModeOptions></ModeOptions>
        <Seconds :dataSource="secondsDatas"></Seconds>
        <activity>
          <div class="activity-pin-gou-jie">
            <img src="@img/pinGouJie.gif">
          </div>
        </activity>
        <goods :layoutType="'3'" :isScroll="false"></goods>
      </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seconds from '@c/seconds/Seconds.vue'
import Goods from '@c/goods/Goods.vue'
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search.vue'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data () {
    return {

      swiperData: [],
      swiperHeight: this.$store.state.isIphoneX ? '228px' : '184px',
      activityDatas: [],
      secondsDatas: [],
      navBarSlotStyle: {
        // 默认样式
        normal: {
          // 左侧插槽
          leftIcon: require('@img/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@img/search.svg')
          },
          // 右侧插槽
          rightIcon: require('@img/message-white.svg')
        },
        // 高亮样式
        highlight: {
          // 左侧插槽
          leftIcon: require('@img/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@img/search-white.svg')
          },
          // 右侧插槽
          rightIcon: require('@img/message.svg')
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // navBar 的定制样式,
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      scrollTopValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  /* keepAlive组件被激活的时候调用 */
  activated () {
    this.$refs.home.scrollTop = this.scrollTopValue
  },
  mounted () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    console.log('style===', this.navBarCurrentSlotStyle)
    this.initData()
  },
  methods: {
    initData: function () {
      // this.$http.get('/swiper')
      //   .then(data => {
      //     this.swiperData = data.list
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // this.$http.get('/activitys')
      //   .then(data => {
      //     this.activityDatas = data.list
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // 同时发送多个请求
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityData, secondsData) => {
        this.swiperData = swiperData.list
        this.activityDatas = activityData.list
        this.secondsDatas = secondsData.list
      }))
    },
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      this.navBarStyle.backgroundColor = 'rgba(255,255,255,' + opacity + ')'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
    .home{
      width: 100%;
      height: 100%;
      background-color: $bgColor;
      overflow: hidden;
      overflow-y: auto;
      &-content{
        height: 100%;

        .activity-520{
          margin-top: px2rem(8);
          border-top-left-radius: px2rem(8);
          border-top-right-radius: px2rem(8);

          img{
            display: inline-block;
            width: 33.33%;
          }
        }
        .activity-pin-gou-jie{
          background-color: white;
          margin-top: $marginSize;

          img{
            width: 100%;
          }
        }
      }
    }
</style>
