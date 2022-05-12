<template>
  <div :style="styla" v-if="ShowItemsLength>0">
    <p class="pageTitle">{{title}}</p>
    <div class="clear"></div>
    <div class="productBox">
    <swiper :options="SwiperOption" ref="mySwiper" class="youlikeMain" v-if="InnerItems.length >0">
      <!-- slides -->
      <swiperSlide v-for="(item,idx) in InnerItems" :key="idx">
        <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:90%;margin:0 auto;padding-bottom:2rem;margin-bottom: 2rem;"></inProductWindow>
      </swiperSlide>
    </swiper>
      <div
      class="swiper-button-prev"
      slot="button-prev"
      v-if="SwiperOption.navigation && SwiperOption.navigation.nextEl"
    ></div>
    <div
      class="swiper-button-next"
      slot="button-next"
      v-if="SwiperOption.navigation && SwiperOption.navigation.prevEl"
    ></div>
    </div>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/mobile/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike2 extends Vue {
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  private ShowItemsLength: number = 0;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  // @Prop() private readonly pageNum!: number;
  // @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly ProductSku!: string;
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 2
  };
  //   method
  click (e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
    }
  }
  buttonClick (item: YouWouldLike) {
    console.log(item);
  }
  created () {
    this.$Api.product.getRltProduct(this.ProductSku).then((result) => { this.InnerItems = result.YouWouldLike; this.ShowItemsLength = result.YouWouldLike.length; });
  }
  @Watch('ProductSku')
  onProductSkuChange (o, n) {
    this.$Api.product.getRltProduct(this.ProductSku).then(result => {
      this.InnerItems = result.YouWouldLike;
      this.ShowItemsLength = result.YouWouldLike.length;
    });
  }
}
</script>
<style lang="less">
.productBox{
  .swiper-container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
  }
  .swiper-button-prev{
      width: 40px;
      height: 40px;
      border:1px solid #c6b17b;
      background: #c6b17b url('/images/mobile/ohters_20.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      left: 0px;
  }
  .swiper-button-next{
      width: 40px;
      height: 40px;
      border:1px solid #c6b17b;
      background: #c6b17b url('/images/mobile/ohters_21.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      right: 0px;
  }
}
</style>
<style lang="less" scoped>
.productBox {
  margin-top: 3rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.clear {
  clear: both;
}
.TtitleBg {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  p {
    font-size: 1.6rem;
    color: #333333;
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: '';
      width: 16rem;
      display: inline-block;
      background: url('/images/mobile/mindex_04.png') no-repeat center center;
      height: 2rem;
      background-size: 100%;
      position: absolute;
      top: 1rem;
    }
  }
}
.youlikeMain{
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-top: 10px;
  padding-bottom: 10px;
}
.in_slider_title {
  text-align: center;
  margin: 4rem 0;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  &::after{
content: '';
    width: 15%;
    background: #e83428;
    height: 4px;
    display: block;
    position: absolute;
    left: 50%;
    bottom: -50%;
    transform: translate(-50%);
  }
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 4rem;
  user-select: none;
}
.in_slider_page_item {
  width: 100%;
}
</style>
