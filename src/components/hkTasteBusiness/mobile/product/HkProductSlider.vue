<template>
  <div class="HkProductSlider">
    <div class="Innerbox" v-if="AdditionalImage.length>1">
        <div class="slider" :style="{'background':bgcolor}">
          <!-- 正面图片 -->
          <transition name="el-fade-in">
          <div class="Normal" v-show="isShow">
              <div class="figure" :style="{'opacity':parseFloat(optv).toFixed(2)}"><img :src="NightImg"></div>
              <div class="figure" :style="{'opacity':parseFloat(Roptv).toFixed(2)}"><img :src="SumImg"></div>
            </div>
          </transition>
          <!-- 背面图片 -->
          <transition name="el-fade-in">
            <div class="backimg" v-show="!isShow">
              <div class="figure"><img :src="BackImg"></div>
            </div>
          </transition>
          <!-- 控制日夜效果 -->
          <transition name="el-fade-in">
            <div class="controlBar" v-show="isShow">
                <div class="control">
                  <span class="fa fa-sun-o" :style="{'color':fontcolor}"></span>
                  <el-slider v-model="opt" @input="getColor($event)" :show-tooltip="false" :max="235"></el-slider>
                  <span class="fa fa-moon-o" :style="{'color':fontcolor}"></span>
                </div>
            </div>
          </transition>
          <!-- 左侧工具条 -->
            <div class="funBar">
                <div class="Inner">
                  <span class="fa fa-repeat" :style="{'color':fontcolor}" @click="goclick()" v-if="AdditionalImage.length===3"></span>
                  <span class="fa fa-search-plus" :style="{'color':fontcolor}" @click="previewImgObject()"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="Innerbox" v-else>
      <div class="slider">
          <transition name="el-fade-in">
          <div class="Normal">
              <div class="figure"><img :src="CoverImg"></div>
            </div>
          </transition>
        </div>
    </div>
    <!-- <div class="SliderSwiperN" v-show="isShowSliderSwiperN">
          <SliderSwiperN :imgList="AdditionalImage"></SliderSwiperN>
    </div> -->
  </div>
</template>
<script lang="ts">
  import 'viewerjs/dist/viewer.css';
  import { api as viewerApi } from 'v-viewer';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component({ components: {
} })
export default class HkProductSlider extends Vue {
  @Prop() private AdditionalImage!: any;
  opt:number=0;
  bgcolor:string='rgb(235,235,235)';
  fontcolor:string='rgb(0,0,0)';
  isShow:boolean=true;
  isShowSliderSwiperN:boolean=false;
  hasCover:boolean = false;
  CoverImg:string='';
  BackImg:string='';
  SumImg:string='';
  NightImg:string='';
  sourceImageObjects:any=[]
  get optv() {
    return this.opt / 100;
  }
  get Roptv() {
    return 1 - this.opt / 100;
  }
  getColor(val) {
    if (val > 0) {
      var bg = 235 - val;
      var font = val;
      this.bgcolor = 'rgb(' + bg + ',' + bg + ',' + bg + ')';
      this.fontcolor = 'rgb(' + font + ',' + font + ',' + font + ')';
    }
  }
  LoadData() {
      this.AdditionalImage.forEach(element => {
          element.forEach((v, index) => {
            if (index === 0) {
              this.sourceImageObjects.push({
                src: v
              });
            }
          });
      });
  }
  goclick () {
    this.opt = 0;
    this.bgcolor = 'rgb(' + 235 + ',' + 235 + ',' + 235 + ')';
    this.fontcolor = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
    this.isShow = !this.isShow;
  }
  previewImgObject () {
        // 或者你可以单独引入api然后执行它
      const $viewer = viewerApi({
        options: {
          toolbar: true,
          url: 'src',
          initialViewIndex: 0
        },
        images: this.sourceImageObjects
      });
    }
  LoadImg () {
    setTimeout(() => {
        // 默认第一张为封面图也为手表日图，第二张为手表夜图，第三张为手表背面图
        switch (this.AdditionalImage.length) {
        case 1:
              this.CoverImg = this.AdditionalImage[0][0];
              this.SumImg = this.AdditionalImage[0][0];
        break;
        case 2:
          this.SumImg = this.AdditionalImage[0][0];
          this.NightImg = this.AdditionalImage[1][0];
          break;
        case 3:
          this.SumImg = this.AdditionalImage[0][0];
          this.NightImg = this.AdditionalImage[1][0];
          this.BackImg = this.AdditionalImage[2][0];
          break;
          }
    }, 400);
  }
  created() {
    this.LoadData();
    this.LoadImg();
    console.log(this.sourceImageObjects, 'ddddddd');
  }
  @Watch('AdditionalImage', { deep: true })
  onRouteChange () {
    this.LoadImg();
    this.LoadData();
  }
}
</script>
<style lang="less" scoped>
.HkProductSlider {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  .SliderSwiperN {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
  }
  .Innerbox {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .slider {
      width: 100%;
      float: left;
      position: relative;
      height: 100%;
      background: -webkit-radial-gradient(#ffffff, #c9c9c9);
      transition: all .3s;
      .funBar {
        position: absolute;
        left: 10%;
        top: 10%;
        width: 30px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .Inner {
          width: 100%;
          span{
            font-size: 30px;
            margin-bottom: 30px;
            cursor: pointer;
          }
        }
      }
      .controlBar {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
      .control {
        width: 60%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 25px;
          cursor: pointer;
        }
        /deep/ .el-slider {
          width: 70%;
          .el-slider__runway {
            background: #000;
            height: 2px;
          }
          .el-slider__bar {
            background: #fff;
            height: 2px;
          }
          .el-slider__button-wrapper {
              width: 20px;
              height: 20px;
              top: -10px;
          }
          .el-slider__button {
            border:2px solid #000;
            cursor: pointer;
          }
          .el-slider__button {
            width: 12px;
            height: 12px;
          }
          .el-slider__button.dragging, .el-slider__button.hover, .el-slider__button:hover {
            transform: scale(1);
          }
        }
      }
      }
      .figure {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>
