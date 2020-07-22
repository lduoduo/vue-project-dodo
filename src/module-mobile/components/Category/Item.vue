<template>
  <div class="comp-category-item">
    <div class="item-head">
      <div>
        <span class="item-title">{{ data.title }}</span>
        <span class="item-tip">{{ data.count }}</span>
      </div>
      <span class="item-btn" @click="onToggle">
        {{
        expand ? '收起' : '展开'
        }}
      </span>
    </div>
    <transition name="fade">
      <div class="item-body" v-if="expand">
        <div class="body-child" v-for="item in data.list" :key="item.id">
          <div class="child-bg-wrapper">
            <div class="child-bg" :style="{ backgroundImage: `url(${item.iconUrl})` }" />
          </div>
          <p class="child-title">{{ item.name }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.comp-category-item {
  .item-head {
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }

  .item-body {
    text-align: left;
  }

  .body-child {
    text-align: center;
    display: inline-block;
    width: 25%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    vertical-align: top;
  }

  .child-bg-wrapper {
    width: 60%;
    display: inline-block;
    .child-bg {
      width: 100%;
      padding-bottom: 100%;
      border-radius: 50%;
      background-color: #eee;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .child-title {
    margin: 8px 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>

<script>
// import Iconfont from '@/components/Iconfont.vue';

export default {
  name: "CategoryItem",
  components: {
    // Iconfont,
  },
  props: {
    data: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      expand: true
    };
  },
  methods: {
    onToggle() {
      this.expand = !this.expand;
    }
  }
};
</script>
