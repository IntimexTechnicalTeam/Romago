<template>
  <div id="header">
    <!-- <footerLayout1 /> -->
    <!-- <component :is="layout" /> -->

    <DefaultHeader />

    <FixedHeader v-if="this.$Settings.fixedHeader" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    DefaultHeader: () => import('@/components/business/pc/header/layout/DefaultHeader.vue'),
    FixedHeader: () => import('@/components/business/pc/header/layout/FixedHeader.vue')
    // headerLayout1: () => import('@/components/hkTasteBusiness/pc/header/InsHeaderLayout1.vue')
  }
})
export default class InsHeader extends Vue {
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
      this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
    }).catch((error) => {
      console.log(error);
    });
  }

  created () {
    this.getMenu();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
