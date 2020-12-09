<template>
  <div class="home">
    <Grid>
      <GridItem><router-link to="about">关于</router-link></GridItem>
      <GridItem><router-link to="o">其他</router-link></GridItem>
      <GridItem><router-link :to="{ name: 'person', params: { userId: 123 }}">关于参数1</router-link></GridItem>
      <GridItem><router-link :to="{ path: 'person', query: { plan: 'private' }}">关于参数2</router-link></GridItem>
      <GridItem><router-link to="m">移动端首页</router-link></GridItem>
      <GridItem><router-link to="o/todo">其他todo</router-link></GridItem>
    </Grid>
    <Menu />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { Grid, GridItem } from 'vant';

import HelloWorld from '@/components/HelloWorld.vue';
import Menu from '@/module-mobile/components/Menu.vue';

@Component({
  name: 'Home',
  components: {
    Menu,
    Grid,
    GridItem,
  },
})
export default class Home extends Vue {
  @Prop() private msg!: string;
}
</script>
