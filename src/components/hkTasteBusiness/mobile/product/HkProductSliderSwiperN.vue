<template>
  <div class="in_preview_warpper pkswiperN">
            <Viewer :images="imgList"
                      class="viewer" ref="viewer"
                      @inited="inited"
                      :options="viewOptions"
              >
              <img v-for="(item,index) in imgList" :src="item[0]" :key="index" :alt="ProductTitleName"  :id="'displayN'+index" class="PreViewimage">
              </Viewer>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import 'viewerjs/dist/viewer.css';
import { component as Viewer } from 'v-viewer';
// import Viewer from 'v-viewerc/component.vue';
@Component({ components: { Viewer } })
export default class HkProductSliderSwiperN extends Vue {
  @Prop() private readonly imgList!: string[];
  @Prop() private readonly ProductTitleName!: string[];
  private currentIndex = 0;
   viewOptions:any={
     inline: false
  }
  get isClick () {
    return localStorage.getItem('isClicked');
  }
  get AttrImg () {
        return this.$store.state.AttrImgList;
  }
  $viewer: any;
  @Watch('imgList', { deep: true })
    imgListChange () {
  }
  inited(Viewer) {
    // if (this.isClick === 'true') {
    //     this.$viewer = Viewer;
    //     setTimeout(() => {
    //       $('#displayN0').trigger('click');
    //     }, 1000);
    // }
  }
  hide (Viewer) {
    this.$viewer = Viewer;
    console.log('ddddddddddddd');
  }
  initedN(Viewer) {
    this.$viewer = Viewer;
  }
  viewImg (val) {
      this.$viewer.view(val);
  }
  RetrunImg () {
      this.$store.dispatch('isClick', false);
  }
  show () {
    const viewer = (this.$el.querySelector('.viewer') as any).$viewer;
    viewer.show();
  }
}
</script>
<style lang="less">
.PreViewimage {
    display: none;
}
.viewer-container {
  z-index: 9999999!important;
}
.viewer-title{
  font-size: 16px!important;
  opacity: 0.9;
  color: #fff;
}
.pkswiperN{
 .swiper-pagination-bullet {
    margin-left: 5px;
    width: 10px!important;
    height: 10px!important;
    background: #fff;
    opacity: 1;
    border:2px solid #fff;
  }
.swiper-pagination-bullet-active{
    border:2px solid #fff!important;
    width: 10px!important;
    height: 10px!important;
    background:transparent!important;
  }
.swiper-pagination{
      margin-top: -1rem;
      transform: translateX(-50%) translateY(-50%);
      left: 50%;
  }
}
</style>
<style scoped lang="less">
.pkswiperN{
    width: 100%;
    height: 100%;
    /deep/ .viewer-container {
      width: 100%!important;
      height: 100%!important;
    }
}
.pkswiperN .BannerImg{
    width: 100%;
    display: block;
}
.AttrImg {
  width: 100%;
  display: inline-block;
  position: relative;
  img {
    width: 100%;
  }
  .RetrunImg {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 60px;
    color: #fff;
    text-align: center;
    i {
      font-size: 25px;
      color: #fff;
      width: 100%;
      padding-top: 5px;
    }
  }
}
</style>
