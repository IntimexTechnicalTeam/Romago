<template>
  <div>
    <Header v-show="routerPath!=='/building'" />
    <router-view></router-view>
    <Footer v-show="routerPath!=='/building'"/>
    <ins-sidebar />
    <ins-slide-search :direction="'right'"></ins-slide-search>
    <ins-slide-code-select :direction="'right'" class="sliderCode"></ins-slide-code-select>
    <ins-slide-lang :direction="'right'"></ins-slide-lang>
    <ins-slide-menu :direction="'left'">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Header: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsHeader.vue'),
    Footer: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/footer/InsFooter.vue'),
    InsSlideMenu: () => import('@/components/business/pc/header/InsSlideMenu.vue'),
    InsSlideSearch: () => import('@/components/business/pc/header/InsSlideSearch.vue'),
    InsSlideCodeSelect: () => import('@/components/business/pc/header/InsSlideCodeSelect.vue'),
    InsSlideLang: () => import('@/components/business/pc/header/InsSlideLang.vue'),
    InsMenuLayout: () => import('@/components/hkTasteBusiness/pc/header/InsMenuLayout.vue'),
    InsSidebar: () => import('@/components/business/pc/header/InsSidebar.vue')
  }
})
export default class pcIndex extends Vue {
  get routerPath() {
    return this.$route.path;
  }
}
</script>
<style lang="less" scoped>
.sliderCode {
  /deep/ .el-scrollbar > .el-scrollbar__bar {
        opacity: 0!important;
  }
}
</style>
