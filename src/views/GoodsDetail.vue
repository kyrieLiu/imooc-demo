<template>
  <div class="goods-detail">
      <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
          <template v-slot:nav-left>
            <div class="goods-detail-nav-left" @click="onBackClick">
              <img src="@img/back-2.svg" :style="{opacity:leftImgOpacity}">
              <img src="@img/back-white.svg" :style="{opacity:navBarSlotOpacity}">
            </div>
          </template>
        <template slot="nav-center">
          <p class="goods-detail-nav-title" :style="{opacity:navBarSlotOpacity}" style="font-size: 16px">商品详情</p>
        </template>
      </navigation-bar>

    <div class="goods-detail-content">
      <parallax  @onScrollChange="onScrollChange">
        <template slot="parallax-slow">
          <my-swiper :height="SWIPER_IMAGE_HEIGHT+'px'"
                     :swiperImgs="goodsData.swiperImgs"
                     :paginationType="'2'"></my-swiper>
        </template>
        <template>
          <!--内容-->
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-price">¥{{goodsData.price}}</p>
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsData.isDirect"></direct>
                ¥{{goodsData.name}}</p>
            </div>
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-select">已选<span class="single-row-text">{{goodsData.name}}</span></p>
              <!--附加服务-->
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li class="goods-detail-content-desc-item-support-list-item"
                      v-for="(item,index) in attachDatas" :key="index">
                    <img src="@img/support.svg">
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
              <div class="goods-detail-content-desc-detail">
                <img v-for="(item,index) in goodsData.detailImgs" :key="index" :src="item">
              </div>

            </div>
          </div>
        </template>
      </parallax>
    </div>
    <!--加入购物车 立即购买-->
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add" @click="onAddGoodsClick()">
        加入购物车
      </div>
      <div class="goods-detail-buy-now" @click="onBuyClick()">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
import MySwiper from '@c/swiper/MySwiper'
import Direct from '@c/goods/Direct'
import Parallax from '@c/parallax/Parallax'
export default {
  name: 'goodsDetail',
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  data () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      // navBarStyle: {
      //   backgroundColor: '',
      //   position: 'fixed'
      // },
      goodsData: {},
      attachDatas: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ],
      // 锚点值
      ANCHOR_SCROLL_TOP: 310,
      scrollValue: 0
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onScrollChange (scrollValue) {
      this.scrollValue = scrollValue
    },
    loadGoodsData () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then((data) => {
        this.goodsData = data.goodsData
      })
    },
    onBuyClick () {
      this.$router.push({
        name: 'buy',
        params: {
          routerType: 'push'
        },
        query: {
          goodsId: this.goodsData.id
        }
      })
    },
    onAddGoodsClick: function () {
      this.$store.commit('addShoppingData', this.goodsData)
      alert('添加成功')
      this.$router.push(
        {
          name: 'imooc',
          params: {
            routerType: 'push',
            componentIndex: 1,
            clearTask: true
          }
        }
      )
    }
  },
  created () {
    this.loadGoodsData()
  },
  computed: {
    leftImgOpacity () {
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    navBarStyle () {
      return {
        backgroundColor: 'rgba(216,30,6,' + this.navBarSlotOpacity + ')',
        position: 'fixed',
        top: '0'
      }
    },
    navBarSlotOpacity () {
      return 1 - this.leftImgOpacity
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .goods-detail{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    &-nav-left{
      width: 100%;
      display: flex;
      position: relative;
      img{
        position: absolute;
        align-self: center;
      }
    }
    &-nav-title{
      width: 100%;
      height: 100%;
      font-size: $titleSize;
      text-align: center;
      color: white;
    }
    &-content{
      overflow: hidden;
      height: 100%;
      &-desc{
        width: 100%;
        background-color: $bgColor;
        box-shadow: 0 0 px2rem(16) 0 rgba(0,0,0,0.2);
        &-item{
          background-color: white;
          padding: $marginSize;
          margin-bottom: $marginSize;
          &-price{
            font-size: px2rem(20);
            color: $mainColor;
            font-weight: 500;
          }
          &-name{
            margin-top: $marginSize;
            font-size: $titleSize;
            font-weight: 500;
            line-height: px2rem(20);
          }
          &-select{
            font-size: $infoSize;
            color: $hintColor;
            height: px2rem(44);
            display: flex;
            align-items: center;
            border-bottom: px2rem(1) solid $lineColor;
            span{
              color: $textColor;
              font-size: $titleSize;
              font-weight: bold;
              margin-left: px2rem(4);
              width: 80%;
            }
          }
          &-support{
            margin-top: $marginSize;
            &-list{
              display: flex;
              flex-wrap: wrap;
              &-item{
                display: flex;
                align-items: center;
                padding: px2rem(6) 0;
                margin-right: $marginSize;
                img{
                  width: px2rem(12);
                  margin-right: px2rem(4);
                }
                span{
                  font-size: $infoSize;
                  color: $hintColor;
                };
              }
            }
          }
        }
        &-detail{
          img{
            width: 100%;
          }
        }
      }
    }
    &-buy{
      background-color: white;
      border-top: px2rem(1) solid $lineColor;
      height: 50px;
      line-height: px2rem(46);
      text-align: right;
      div{
        display: inline-block;
        width: px2rem(100);
        text-align: center;
        font-size: $infoSize;
        color: white;
      }
      &-add{
        background-color: $mainColor;
      }
      &-now{
        background-color: darkgoldenrod;
      }
    }
  }
</style>
