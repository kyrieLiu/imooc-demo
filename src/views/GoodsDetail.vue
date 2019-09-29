<template>
  <div class="goods-detail">
      <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
          <template v-slot:nav-left>
            <div class="goods-detail-nav-left" @click="onBackClick">
              <img src="@img/back-2.svg">
            </div>
          </template>
      </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper :height="SWIPER_IMAGE_HEIGHT+'px'"
                 :swiperImgs="goodsData.swiperImgs"
                 :paginationType="'2'"></my-swiper>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
import MySwiper from '@c/swiper/MySwiper'
export default {
  name: 'GoodsDetail',
  components: {
    NavigationBar,
    MySwiper
  },
  data () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      navBarStyle: {
        backgroundColor: ''
      },
      goodsData: {}
    }
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    }
  },
  created () {
    this.goodsData = this.$route.params.goods
  }
}
</script>

<style scoped>

</style>
