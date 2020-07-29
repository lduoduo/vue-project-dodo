<template>
  <div :class="['comp-pyq-item', activeGoodsId === data.goodsId ? 'active' : '']">
    <ImageLoad class="item-image" :url="data.goodsThumbnailUrl" />

    <div class="item-main">
      <div class="item-head">精选商品</div>
      <div class="item-date">{{ currDay }}</div>
      <div class="item-title">{{ data.goodsName }}</div>
      <div class="item-price">
        <span class="item-price-origin">
          {{
          `${data.couponDiscount ? '【券后价】' : ''}￥${
          data.discountMinPrice
          }`
          }}
        </span>

        <span class="item-price-current" v-if="data.couponDiscount > 0">
          {{
          `${data.couponDiscount ? '【原价】' : ''}￥${data.minPrice}`
          }}
        </span>
      </div>

      <div class="item-banner">
        <ImageLoad
          class="item-banner-image"
          v-for="(item, index) in imageArr"
          :key="item"
          :url="item"
          @click="onIamgeClick(index)"
        />
      </div>

      <div class="item-detail flex" @click="onDetailClick">
        <div class="item-detail-info flex">
          <ImageLoad class="item-detail-image" :url="data.goodsThumbnailUrl" />
          <div class="item-info flex">
            <p class="item-text">{{ data.goodsName }}</p>
            <p class="item-price">
              {{
              `${data.couponDiscount ? '券后价' : ''}￥${
              data.discountMinPrice
              }`
              }}
            </p>
          </div>
        </div>

        <Iconfont type="icon-ddj-xiangyoujiantou" class="icon-right" />
      </div>

      <div class="flex item-share">
        <p class="share-price">{{ `分享赚￥${formatPrice(data.myPromotionPrice)}` }}</p>
        <p class="share-count">{{ `${data.shareCount}人已分享` }}</p>
      </div>

      <div class="item-foot">
        <div class="foot-btn btn-buy" @click="onShareText">
          <div>分享文案</div>
        </div>

        <div class="foot-btn" type="goods">
          <div class="foot-btn btn-share" @click="onSharePoster">
            <div>分享海报</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/mixin.scss";

.comp-pyq-item {
  box-shadow: $boxShadow;
  overflow: hidden;
  padding: 12px;
  box-sizing: border-box;

  &.active {
    border: 1px dashed pink;
  }

  p {
    margin: 0;
  }

  .item-image,
  .item-main {
    text-align: left;
    display: inline-block;
    vertical-align: top;
  }

  .item-image {
    position: relative;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }

  .item-main {
    margin-left: 8px;
    width: calc(100% - 48px);

    .item-head,
    .item-date {
      font-size: 13px;
    }

    .item-date {
      color: $subTxtColor;
    }

    .item-title {
      font-size: 14px;
      word-break: break-all;
    }

    .item-banner {
      .item-banner-image {
        width: 30%;
        margin: 1%;
        display: inline-block;
        padding-bottom: 30%;
        border: 1px solid #f1f1f1;
        border-radius: 12px;
        background-size: contain;
      }
    }

    .item-price {
      font-size: 14px;
      margin: 8px 0;

      .discount {
        background-color: $activeColor;
        border-radius: 2px;
      }
    }

    .item-detail {
      background-color: #f6f6f6;
      padding: 8px;
      border-radius: 6px;

      .item-detail-info {
        flex: none;
        width: calc(100% - 20px);
      }

      &-image {
        width: 50px;
        height: 50px;
      }

      .item-info {
        height: 50px;
        margin-left: 8px;
        width: calc(100% - 58px);
        font-size: 13px;
        color: $subTxtColor;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        .item-text {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-price {
          font-size: inherit;
          margin: 0;
        }
      }
    }

    .item-share {
      margin: 8px;

      .share-price {
        font-size: 15px;
        font-weight: bold;
        color: $colorRed;
      }

      .share-count {
        font-size: 12px;
        color: $mainTxtColor;
      }
    }
    .item-foot {
      text-align: right;
    }
  }
}
</style>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapState, mapGetters, mapActions } from "vuex";
import { ImagePreview } from "vant";

import { Observer } from "mobx-vue";
import StoreGoods from "@/store-mobx/goods";

import Iconfont from "@/components/Iconfont.vue";
import ImageLoad from "@/components/ImageLoad.vue";
import { format$Floor, formatFloor } from "@/utils/price";

@Observer
@Component
export default class App extends Vue {
  state = {
    activeGoods: StoreGoods,
  };

  mounted() {
    this.state.fetchUsers();
  }
}

</script>
