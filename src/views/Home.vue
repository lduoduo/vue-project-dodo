<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Menu />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import HelloWorld from '@/components/HelloWorld.vue';
import Menu from '@/module-mobile/components/Menu.vue';

@Component({
  name: 'Home',
  components: {
    Menu,
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Prop() private msg!: string;
}
</script>