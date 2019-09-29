<!--
   User: liuyin
   Date: 2019-09-06 16:13
   Description:
 -->
<template>
  <!--1.需要一个swiper
      2.swiper组件-->
    <div>
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
          <img class="swiper-slide-img" :style="{height:height}" :src="item">
        </swiper-slide>
        <template v-slot:pagination>
          <div class="swiper-pagination"></div>
        </template>
      </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    /**
      * 1.圆点切换
      * */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      swiperOptions: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  created () {
    this.initPaginnationLayout()
  },
  methods: {
    initPaginnationLayout: function () {
      switch (this.paginationType) {
        case '1':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletClass: 'custom-bullet-class'
          }
          break
        case '2':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            type: 'fraction'

          }
          break
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted () {
    console.log('images===', this.swiperImgs)
  }
}
</script>

<style lang="scss">
  @import '@css/style.scss';
  .swiper-pagination{
    bottom: px2rem(12);
    .custom-bullet-class{
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 100%;
      height: px2rem(6);
      width: px2rem(6);
      border: px2rem(1) solid #fff;
      margin: 0 px2rem(4);
      display: inline-block;
      opacity: 1;
    }
    .swiper-pagination-bullet-active{
      background: #fff;
    }
  }
  //数字分页器
  .swiper-pagination-fraction{
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0,0,0,0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;
    .swiper-pagination-current{
      font-size: $titleSize;
      font-weight: bold;
    }
  }
  .swiper-slide-img{
    width: 100%    ;
  }
</style>
