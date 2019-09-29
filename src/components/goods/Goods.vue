<!--
   User: liuyin
   Date: 2019-09-11 15:22
   Description:
 -->
<template>
    <div class="goods" :class="[layoutClass,{'goods-scroll':isScroll}]" :style="{height:goodsViewHeight}">
        <div class="goods-item" :class="layoutItemClass" ref="goodsItem" @click="onItemClick(item)"
        v-for="(item,index) in sortGoodsData" :key="index" :style="goodsItemStyles[index]">
              <img class="goods-item-img" :style="imgStyles[index]" :src="item.img">
          <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint':!item.isHave}">
              <direct v-if="item.isDirect"></direct>
              <no-have v-if="!item.isHave"></no-have>
              {{item.name}}
              </p>
            <div class="goods-item-desc-data">
              <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
              <p class="goods-item-desc-data-volume">销量:{{item.volume}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {

  props: {
    layoutType: {
      type: String,
      default: '1'
    },
    isScroll: {
      type: Boolean,
      default: true
    },
    sort: {
      type: String,
      default: '1'
    }
  },

  components: {
    Direct,
    NoHave
  },
  data () {
    return {
      dataSource: [
      ],
      sortGoodsData: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      goodsViewHeight: '100%',
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item'

    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          console.log(data.list)
          this.dataSource = data.list
          this.setSortGoodsData()
          this.initLayout()
        })
    },
    setSortGoodsData () {
      switch (this.sort) {
        case '1':
          this.sortGoodsData = this.dataSource.slice(0)
          break
        case '1-2':
          this.getSortGoodsDataFromKey('price')
          break
        case '1-3':
          this.getSortGoodsDataFromKey('volume')
          break
        case '2':
          this.getSortGoodsDataFromKey('isHave')
          break
        case '3':
          this.getSortGoodsDataFromKey('isDirect')
          break
      }
    },
    getSortGoodsDataFromKey (key) {
      this.sortGoodsData.sort((goods1, goods2) => {
        let v1 = goods1[key]
        let v2 = goods2[key]
        // 对value进行对比
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        } else {
          return 1
        }
      })
    },
    initLayout: function () {
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    imgHeight: function () {
      let result = Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT
      return result
    },
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        let imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgHeight
        })
      })
    },
    initWaterfall: function () {
      let $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      let leftHeightTotal = 0; let rightHeightTotal = 0
      $goodsItems.forEach(($el, index) => {
        let goodsItemStyle = {}
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      if (!this.isScroll) {
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    },
    onItemClick: function (item) {
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'goodsDetail',
        params: {
          goods: item
        }
      })
    }
  },
  watch: {
    layoutType: function () {
      this.initLayout()
    },
    sort: function () {
      this.setSortGoodsData()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@css/style.scss";
  .goods{

    &-scroll{
      overflow: hidden;
      overflow-y: auto;
    }

    background-color: $bgColor;

    &-item{
      background-color: white;
      padding: $marginSize;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      &-desc{
        width: 100%;

        &-name{
          font-size: $infoSize;
          line-height: px2rem(18);

          &-hint{
            color: #999999;
          }
        }
        &-data{
          width: 100%;
          display: flex;
          align-items:center;
          justify-content: space-between;
          margin-top: $marginSize;

          &-price{
            font-size: $titleSize;
            color: $mainColor;
            font-weight: 500;
          }
          &-volume{
            font-size: $infoSize;
            color: $hintColor;
          }
        }
      }
    }
  }
  .goods-list{
        &-item{
          display: flex;
          border-bottom: 1px solid $lineColor;

          .goods-item-img{
            width: px2rem(120);
            height: px2rem(120);
          }
          .goods-item-desc{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: $marginSize;
          }
        }
  }

  .goods-grid{
    padding: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item{
      width: 49%;
      -webkit-border-radius: $radiusSize;
      -moz-border-radius: $radiusSize;
      border-radius: $radiusSize;
      margin-bottom: $marginSize;
      .goods-item-img{
        width: 100%;
      }
    }
  }

  .goods-waterfall{
    position: relative;
    margin: $marginSize;

    &-item{
      position: absolute;
      width:49%;
      border-radius: $radiusSize;
      .goods-item-img{
        width: 100%;
      }
    }
  }
</style>
