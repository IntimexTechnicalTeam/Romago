<template>
  <div :style="styla" v-if="ShowItemsLength>0" class="PcVersionYouLike">
    <p class="pageTitle">{{title}}</p>
    <swiper :options="SwiperOption" ref="mySwiper" class="SwiperOptionTop">
      <!-- slides -->
      <swiperSlide v-for="(page,idx) in ShowItems" :key="idx">
        <div class="in_slider_page_container" @click="click">
          <div class="in_slider_page_item" v-for="(item,index) in page" :key="index">
            <div class="in_slider_page_item" v-if="!item.virtual">
              <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:90%;margin:0 auto;"></inProductWindow>
            </div>
          </div>
        </div>
      </swiperSlide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/pc/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/pc/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike extends Vue {
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  private ShowItemsLength: number = 0;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  @Prop() private readonly pageNum!: number;
  // @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly ProductSku!: string;
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
  @Watch('InnerItems')
  onInnerItemsChange (o, n) {
    this.InnerItemsCopy = this.InnerItems.slice();
    this.ShowItems.splice(0, this.ShowItems.length);
    while (this.InnerItemsCopy.length > 0) {
      this.ShowItems.push(this.InnerItemsCopy.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new YouWouldLike('-1', '', '', '', '', '', new Currency(), '', '', new Currency(), true)
      );
    }
  }
  get lang () {
    return this.$Storage.get('locale');
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
.PcVersionYouLike .swiper-button-prev{
      width: 40px;
      height: 40px;
      background: #c6b17b url('/images/mobile/ohters_20.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      left:.9rem;
}
.PcVersionYouLike .swiper-button-next{
      width: 40px;
      height: 40px;
      background: #c6b17b url('/images/mobile/ohters_21.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      right: .9rem;
}
</style>
<style  lang="less"  scoped>
.SwiperOptionTop {
  margin-top: 20px;
}
.TtitleBg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
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
        width: 15rem;
        display: inline-block;
        background: url('/images/mobile/mindex_04.png') no-repeat center center;
        height: 2rem;
        background-size: 100%;
        position: absolute;
        top: 1.2rem;
      }
    }
  }
.PcVersionYouLike {
  margin-top: 80px;
}
.in_slider_title {
  text-align: center;
  margin: 4rem 0;
  font-size: 2rem;
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  padding-top: 10px;
  padding-bottom: 10px;
}
.in_slider_page_item {
   width: 100%;
}
    .titleCn {
      width: 100%;
      display: inline-block;
      text-align: center;
      margin-bottom: 2rem;
      span {
        font-size:1.7rem;
        display: block;
        width: 60%;
        text-align: center;
        margin: 0 auto;
        text-transform: uppercase;
        font-weight: 700;
        color: #37aca1;
        &::before {
          content: '';
          border-top: 4px solid #37aca1;
          width: 15%;
          display: block;
          margin: 0 auto;
          margin-bottom: .5rem;
        }
        &::after {
          content: '';
          border-bottom:4px solid #37aca1;
          width: 15%;
          display: block;
          margin: 0 auto;
          margin-top: .5rem;
        }
      }
    }
.titleNameA {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-bottom: 2rem;
  span {
    font-size:32px;
    display: block;
    width: 60%;
    text-align: center;
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 700;
    color: #37aca1;
    &::before {
      content: '';
      border-top: 4px solid #37aca1;
      width: 35%;
      display: block;
      margin: 0 auto;
      margin-bottom: .5rem;
    }
    &::after {
      content: '';
      border-bottom:4px solid #37aca1;
      width: 35%;
      display: block;
      margin: 0 auto;
      margin-top: .5rem;
    }
  }
}
</style>
