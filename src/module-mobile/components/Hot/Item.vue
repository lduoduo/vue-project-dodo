<template>
  <div
    :class="['comp-hot-item', activeGoodsId === data.goodsId ? 'active' : '']"
    @click="onDetailClick"
  >
    <p>{{ activeGoodsId2 }}</p>
    <ImageLoad
      class="item-image"
      :url="data.goodsThumbnailUrl"
      style="{ backgroundImage: `url(${data.goodsThumbnailUrl})` }"
    >
      <span :class="['item-tip', vip ? 'vip' : '']">{{ data.mallName }}</span>
    </ImageLoad>
    <div class="item-body">
      <div class="item-title">{{ data.goodsName }}</div>
      <div class="item-price flex">
        <div>
          <span class="item-price-buy-tip">{{
            `${data.couponDiscount ? '券后价' : ''}￥`
          }}</span>
          <span class="item-price-buy">{{ data.discountMinPrice }}</span>
        </div>
        <div class="flex discount" v-if="data.couponDiscount > 0">
          <span class="item-discount-tip">券</span>
          <span class="item-discount-price">{{
            data.couponDiscount + '元'
          }}</span>
        </div>
      </div>
      <div class="item-option flex ">
        <p class="item-tip">{{ `销量${data.salesTip}件` }}</p>
        <p class="item-share">
          <span class="item-share-tip">分享赚￥</span>
          <span class="item-share-price">{{
            data.vipPromotionPrice | formatPrice
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/css/mixin.scss';

.comp-hot-item {
  box-shadow: $boxShadow;
  border-radius: 5px;
  overflow: hidden;
  p {
    margin: 0;
  }
  .item-image {
    padding-bottom: 100%;
    position: relative;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    .item-tip {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: #757575;
      color: #fff;
      padding: 2px 6px;
      font-size: 12px;
      &.vip {
        background-color: rgba(139, 87, 42, 1);
      }
    }
  }

  .item-body {
    padding: 8px;

    .item-title {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-price {
      font-size: 10px;
      margin: 8px 0;

      &-buy,
      &-buy-tip {
        color: $colorRed;
      }

      &-buy {
        font-size: 12px;
        font-weight: bold;
      }

      .discount {
        background-color: $activeColor;
        border-radius: 2px;
      }

      .item-discount-price,
      .item-discount-tip {
        position: relative;
        color: white;
      }

      .item-discount-tip {
        padding: 0 3px;
      }

      .item-discount-price {
        padding: 0 4px;

        &:after {
          content: '...';
          display: inline-block;
          color: white;
          position: absolute;
          left: -1px;
          transform: rotate(90deg);
        }
      }
    }

    .item-option {
      .item-tip {
        font-size: 11px;
        color: $tipColor;
      }

      .item-share {
        font-size: 13px;
        font-weight: bold;
        color: white;
        background-color: $mainColor;
        padding: 4px 6px;
        padding-right: 6px;
        border-radius: 3px;
        box-sizing: border-box;
        width: 60%;
        text-align: center;

        .item-share-tip {
          font-size: 11px;
        }
      }
    }
  }
}
</style>

<script>
import { mapState, mapActions } from 'vuex';
import ImageLoad from '@/components/ImageLoad.vue';
import { format$Floor, formatFloor } from '@/utils/price';

export default {
  name: 'CategoryItem',
  components: {
    ImageLoad,
  },
  props: {
    data: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vip: /(5|3)/.test(this.data.merchantType),
    };
  },
  computed: {
    activeGoodsId() {
      console.log('this.$store', this.$store);
      return this.$store.getters.dataGoods.goodsId;
    },
    ...mapState({
      // 箭头函数可使代码更简练
      activeGoodsId2: (state) => {
        console.log('activeGoodsId', state);
        return state.count;
      },
      activeGoodsId3: 'dataGoods',
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',

      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount;
      },
    }),
  },
  beforeMount() {
    // console.log('this.data', this.data);
  },
  filters: {
    formatPrice(e) {
      return formatFloor(e);
    },
  },
  methods: {
    ...mapActions(['setGoods']),
    onToggle() {
      this.expand = !this.expand;
    },
    onDetailClick() {
      this.setGoods(this.data);
    },
  },
};
</script>
