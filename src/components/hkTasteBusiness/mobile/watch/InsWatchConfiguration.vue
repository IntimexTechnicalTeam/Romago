<template>
  <div class="MobileWatchConfiguration" id="RomagoBg">
    <!-- <p class="topTitle">{{$t('Message.Limitedproduction')}}</p> -->
    <!-- 錶盤-->
    <div class="topA" v-show="IsDial">
        <div class="swiper-father">
            <swiper :options="swiperOptionA" ref="mySwiperA" @slideChange="onslideChangeA(Dial)" @ready="getReadyDataA(Dial)"  v-if="initSwiper">
            <!-- slides -->
            <swiperSlide v-for="(slide, indexA) in Dial" :key="indexA">
                <div class="imgbox"><img :src="slide.Image"></div>
                <div class="contentText" v-show="indexA===activeIndexA">{{slide.Name}}/{{SlectName}}</div>
            </swiperSlide>
              <div class="swiper-scrollbar swiper-scrollbarA" slot="scrollbar"></div>
            </swiper>
            <div class="mobileImageBoxInner"><img src="/images/pc/STRAP.png"></div>
        </div>
        <div class="SelectVet">
             <p class="Reset"><a class="resetBtn" @click="ResetAct"><i></i>{{$t('Message.Reset')}}</a><a class="to_left"><i></i>{{$t('Message.Previous')}}</a></p>
             <p class="selectAct"><a class="to_right" @click="SelectItemsA">{{$t('Message.Select')}}<i></i></a></p>
        </div>
    </div>
    <!-- 錶帶-->
    <div class="topA" v-show="IsStrap">
        <div class="swiper-father">
            <swiper :options="swiperOptionB" ref="mySwiperB" @slideChange="onslideChangeB(Strap)" @ready="getReadyDataB(Strap)"  v-if="initSwiper">
            <!-- slides -->
            <swiperSlide v-for="(slide, indexB) in Strap" :key="indexB">
                <div class="imgbox"><img :src="slide.Image"></div>
                <div class="contentText" v-show="indexB===activeIndexB">{{slide.Name}}/{{SlectName}}</div>
            </swiperSlide>
              <div class="swiper-scrollbar swiper-scrollbarB" slot="scrollbar"></div>
            </swiper>
            <div class="mobileImageBoxInner"><img :src="SelectDialImg"></div>
        </div>
        <div class="SelectVet">
            <p class="Reset"><a class="resetBtn"  @click="ResetAct"><i></i>{{$t('Message.Reset')}}</a><a class="to_left" @click="BackA"><i></i>{{$t('Message.Previous')}}</a></p>
            <p class="selectAct"><a class="to_right" @click="SelectItemsB">{{$t('Message.Select')}}<i></i></a></p>
        </div>
    </div>
    <!-- 手錶成品 -->
    <div class="topA" v-show="IsBeltWatch">
        <div class="swiper-father" style="height:400px;" id="print" ref="print">
            <div class="mobileImageBoxInner"><img :src="SelectStrapImg"></div>
            <div class="mobileImageBoxInner"><img :src="SelectDialImg"></div>
        </div>
        <div class="contentText">{{SlectName}}</div>
        <div class="SelectVet">
            <p class="Reset"><a class="resetBtn"  @click="ResetAct"><i></i>{{$t('Message.Reset')}}</a><a class="to_left" @click="BackB"><i></i>{{$t('Message.Previous')}}</a></p>
            <p class="selectAct"><a class="to_right" @click="save()">{{$t('Message.DownLoad')}}</a></p>
            <a id="link"></a>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
import html2Canvas from 'html2Canvas';
@Component({
  components: {
    swiper,
    swiperSlide
  }
})
export default class InsWatchConfiguration extends Vue {
  initSwiper:boolean = false;
  IsStrap:boolean = false;
  IsDial:boolean = true;
  IsBeltWatch:boolean = false;
  Strap:any[]=[];
  Dial:any[]=[];
  TypeName:string = '';
  SelectDialName:string = '';
  SelectStrapName:string = '';
  SelectStrapImg:string = '';
  SelectDialImg:string = '';
  SlectName:string ='';
  SelectStrapId:object = {};
  SelectDialId:object = {};
  AttsId:any[] = [];
  NameArray:string = '';
  CateIdS:string = '';
  CateName:string='';
  activeIndexA:number= 0;
  activeIndexB:number= 0;
  bgcolor:string = '';
  currentPage: number = 1; // 当前页
  pageSize: number = 1; // 每页显示条目个数
  totalRecord: number = 0; // 总条目数
  searchCatalogs:any[] = [];
  productSku:string ='';
  searchKey:string = '';
  swiperOptionA: object = {
    scrollbar: {
      el: '.swiper-scrollbarA'
    },
    navigation: {
      nextEl: '.pla',
      prevEl: '.pra'
    },
    slidesPerView: 3,
    centeredSlides: true,
    slideToClickedSlide: true
  };
  swiperOptionB: object = {
    scrollbar: {
      el: '.swiper-scrollbarB',
      hide: false
    },
    navigation: {
      nextEl: '.plb',
      prevEl: '.prb'
    },
    slidesPerView: 3,
    centeredSlides: true,
    slideToClickedSlide: true
  };
  // 錶款切換時候的選中數據
  onslideChangeA (e) {
    this.activeIndexA = (this.$refs.mySwiperA as any).swiper.activeIndex;
      this.SelectDialName = e[this.activeIndexA].Name;
      this.SelectDialImg = e[this.activeIndexA].Image;
      this.TypeName = e[this.activeIndexA].Code.split('*')[0];
  }
  // 初始化數據，默認選中第一個
  getReadyDataA (e) {
    this.$nextTick(() => {
        this.SelectDialName = e[0].Name;
        this.SelectDialImg = e[0].Image;
    });
  }
  onslideChangeB (e) {
    this.activeIndexB = (this.$refs.mySwiperB as any).swiper.activeIndex;
    this.SelectStrapName = e[this.activeIndexB].Name;
    this.SelectStrapImg = e[this.activeIndexB].Image;
  }
  getReadyDataB (e) {
    this.$nextTick(() => {
        this.SelectStrapName = e[0].Name;
        this.SelectStrapImg = e[0].Image;
    });
  }
  // 重置事件
  ResetAct () {
    this.Reload();
  }
  // 選中點擊事件，根據code跳轉
  SelectItemsA () {
    this.IsDial = false;
    this.IsStrap = true;
    this.SlectName = this.SelectDialName;
  }
  SelectItemsB () {
    this.SlectName = this.SelectDialName + '/' + this.SelectStrapName;
    this.IsDial = false;
    this.IsStrap = false;
    this.IsBeltWatch = true;
    // this.AttsId.push(this.SelectClaspId);
  }
  // 返回上一步點擊事件
  BackA () {
    this.IsDial = true;
    this.IsStrap = false;
    this.IsBeltWatch = false;
  }
  BackB () {
    this.IsDial = false;
    this.IsStrap = true;
    this.IsBeltWatch = false;
  }
 save() {
   html2Canvas(this.$refs.print as any, {
    allowTaint: false,
    // taintTest: false,
    useCORS: true,
    // dpi: window.devicePixelRatio * 4,
    scale: 4
    // scrollX: 0,
    // scrollY: 0
    }).then((canvas) => {
    const url = canvas.toDataURL('image/jpg');
    console.log(url, 'urlurl');
    var link = document.getElementById('link') as any;
    link.setAttribute('download', 'download.jpg');
    link.setAttribute('href', url.replace('image/jpg', 'image/octet-stream'));
    console.log(link, 'linklink');
    link.click();
    });
  }
  // 获取全部非库存属性
  getAttrList () {
   this.$Api.prodAttr.getAttrList({ type: 2 }).then((result) => {
      this.initSwiper = true;
      // 获取表盘数据
      this.Dial = result[1].AttrValues;
      // 获取表带数据
      this.Strap = result[0].AttrValues;
      console.log(this.Dial, 'result');
      console.log(this.Strap, 'result');
    });
  }
  mounted() {
    this.getAttrList();
  }
}
</script>
<style lang="less">
.MobileWatchConfiguration{
    .TpC{
      width: 100%;
      display: inline-block;
    }
    .swiper-scrollbar {
        border-radius:0px!important;
        position: relative;
        background: #8d8d8d!important;
    }
    .swiper-scrollbar-drag{
          background: #fff!important;
          border-radius: 0px;
    }
    .swiper-container-horizontal > .swiper-scrollbar{
        height: 4px!important;
    }
    .swiper-father{
      width: 100%;
      position: relative;
    }
    .swiper-container{
      width: 95%;
      margin: 0 auto;
    }
    .swiper-button-prev, .swiper-button-next{
      width: 35px!important;
      height: 35px!important;
      background-size: 16px 28px!important;
      margin-top: -50px;
      background: #fff;
      background-repeat: no-repeat;
      background-position: center center;
      border-radius: 5px;
      background-size: 15px;
    }
    .swiper-button-next{
       right: 0px!important;
       outline: 0;
    }
    .swiper-button-prev{
        left: 0px!important;
        outline: 0;
    }
    .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
        background-image: url('/images/pc/rightside.png')!important;
    }
    .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
        background-image: url('/images/pc/leftside.png')!important;
    }
}

</style>
<style lang="less" scoped>
.MobileWatchConfiguration{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 7.5rem;
  padding-bottom: 100px;
  background-size: 100% 100%;
  transition: all 1s;
  .mobileImageBoxInner{
    position: absolute;
    left: 50%;
    transform:translate(-50%);
    top: 0px;
    height: 30rem;
    img{
      height: 100%;
    }
  }
  .topTitle{
    text-align: center;
    color:#fff;
    font-size: 1.4rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-family: 'Arial';
    font-weight: 700;
    letter-spacing: 2px;
  }
  .topA{
    width: 100%;
    margin: 0 auto;
    .imgbox{
      text-align: center;
      position: relative;
      height: 30rem;
      img{
        height: 100%;
      }
      .mobileImageBox{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        height: 30rem;
        img{
          height: 100%;
        }
      }
    }
    .contentText{
      text-align: center;
      color:#fff;
      font-size: 1.4rem;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .SelectVet{
      width: 90%;
      text-align: center;
      display: flex;
      margin: 0 auto;
      margin-top: 30px;
      .selectAct{
       width: 40%;
       float: left;
        .to_right{
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 1.4rem;
          display: inline-block;
          cursor: pointer;
          background: #fff;
          border-radius: 5px;
          color: #333333;
          cursor: pointer;
          i{
            background: url('/images/mobile/to_right.png') no-repeat center center;
            width: 16px;
            height: 16px;
            background-size: 16px;
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      .Reset{
        width: 60%;
        float: left;
        .resetBtn{
          font-size: 16px;
          color:#FFFFFF;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          i{
            background: url('/images/mobile/reset.png') no-repeat center center;
            width: 20px;
            height: 20px;
            background-size: 20px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
        .to_left{
          font-size: 16px;
          color:#FFFFFF;
          margin-left: 2rem;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          i{
            background: url('/images/mobile/to_left.png') no-repeat center center;
            width: 16px;
            height: 16px;
            background-size: 16px;
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
