<template>
  <div class="HkProductSlider">
    <div class="Innerbox">
        <div class="slider" :style="{'background':bgcolor}">
          <!-- 正面图片 -->
          <transition name="el-fade-in">
          <div class="Normal" v-show="isShow">
              <div class="figure" :style="{'opacity':parseFloat(optv).toFixed(2)}"><img src="/images/pc/p2.png"></div>
              <div class="figure" :style="{'opacity':parseFloat(Roptv).toFixed(2)}"><img src="/images/pc/p1.png"></div>
            </div>
          </transition>
          <!-- 背面图片 -->
          <transition name="el-fade-in">
            <div class="backimg" v-show="!isShow">
              <div class="figure"><img src="/images/pc/p3.png"></div>
            </div>
          </transition>
          <!-- 控制日夜效果 -->
          <transition name="el-fade-in">
            <div class="controlBar" v-show="isShow">
                <div class="control">
                  <span class="fa fa-moon-o" :style="{'color':fontcolor}"></span>
                  <el-slider v-model="opt" @input="getColor($event)" :show-tooltip="false" :max="235"></el-slider>
                  <span class="fa fa-sun-o" :style="{'color':fontcolor}"></span>
                </div>
            </div>
          </transition>
          <!-- 左侧工具条 -->
            <div class="funBar">
                <div class="Inner">
                  <span class="fa fa-repeat" :style="{'color':fontcolor}" @click="goclick()"></span>
                  <span class="fa fa-search-plus" :style="{'color':fontcolor}"></span>
                  <span class="fa fa-share-square-o" :style="{'color':fontcolor}"></span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class HkProductSlider extends Vue {
  opt:number=0;
  bgcolor:string='rgb(235,235,235)';
  fontcolor:string='rgb(0,0,0)';
  isShow:boolean=true;
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
  goclick () {
    this.opt = 0;
    this.bgcolor = 'rgb(' + 235 + ',' + 235 + ',' + 235 + ')';
    this.fontcolor = 'rgb(' + 0 + ',' + 0 + ',' + 0 + ')';
    this.isShow = !this.isShow;
  }
}
</script>
<style lang="less" scoped>
.HkProductSlider {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .Innerbox {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .slider {
      width: 100%;
      float: left;
      position: relative;
      height: 800px;
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
            &:hover{
              color: #ccc!important;
            }
          }
        }
      }
      .controlBar {
        position: absolute;
        bottom: 20px;
        z-index: 10;
        width: 100%;
      .control {
        width: 40%;
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
          width: 500px;
        }
      }
    }
  }
}
</style>
