<template>
  <div class="home" v-cloak>
    <HomeBanner :page="'Home'" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  get AreaCode () {
    return localStorage.getItem('AreaCode') || '';
  }
}
</script>

<style lang="less" scoped>
/deep/ .bannerNormal {
  width: 100%;
  height: 10vh!important;
  position: fixed;
}
/deep/ .banner {
  .swiper-pagination-bullet{
    width: 12px!important;
    height: 12px!important;
    background: #fff;
    opacity: 1;
  }

  .swiper-pagination-bullet-active{
    background: #666666!important;
  }
}

.activity {
  width: 90%;
  margin: 5rem auto;

  .TitleBg{
    width: 90%;
    height: 5rem;
    border:1px solid #4d4d4d;
    margin: 0 auto;
    padding: .5rem;
    margin-bottom: 4rem;
    .innerBox{
      width: 100%;
      height: 100%;
      background:#4d4d4d;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}

.ins-calendar {
  margin: 2rem auto;
}
</style>
