<template>
  <div class="banner" v-loading="loading">

    <div class="sup_contbox_content">
              <swiper  ref="videoSwiper" :options="swiperOptionVideos" @slideChange="slideChange"  v-if="VideoData.length!=0">
                <swiper-slide class="swiper-item" v-for='(item,index) of VideoData' :key='index'>
                  <div class="qhbox">
                    <div class="vrteacher" style="height:100vh;">
                      <div class="Innerlayer"></div>
                      <div class="Inner">
                        <div class="ptitle">{{item.Title}}</div>
                        <div class="pdesc">{{item.Desc}}</div>
                        <div class="next" v-show="isShowDown"><i class="down"></i></div>
                      </div>
                        <video class="myVideo" :src="item.SeoKeyword"  ref="videoPlayer" :id="'startvideo'+index"  autoplay></video>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
      </div>
</template>

<script lang="ts">
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    videoPlayer
  }
})
export default class Banner extends Vue {
  @Prop() private initOptions!: object;
  @Prop() private data!: any;
  isShowDown:boolean=true;
  isLast:boolean = false;
  private bannerList: object[] = [];
  page:number=1;
  pageSize:number=12;
  VideoData:any[]=[];
  private loading = false; // 數據加載過渡效果
  isRead:boolean =false;
  swiperOptionVideos:any= {
    direction: 'vertical',
    autoHeight: true,
    initialSlide: 0, // 默认第几张
    loop: false, // 循环
    speed: 900, // 滑动速度
    slidesPerView: 'auto', // 记得这里写 auto 不要默认写1哦
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    on: {
    touchEnd: function(swiper, event) {
      // 你的事件
      console.log('dddddddd');
      }
    }
  }
  get videoSwiper() {
    return (this.$refs.videoSwiper as any).swiper;
  }
  init () {
    console.log('init');
  }
  slideChange() {
        var videos = document.getElementsByClassName('myVideo') as any;
        for (let i = 0; i < videos.length; i++) {
            setTimeout(() => {
              videos[i].pause();
              videos[i].load();
            }, 150);
          }
          setTimeout(() => {
            // this.videoSwiper.activeIndex为当前slide的序号
            videos[this.videoSwiper.activeIndex].play();
        }, 200);
      }
     getContentsByCatKeyEx () {
      var params = {
        key: 'VideoHome',
        page: this.page,
        pageSize: this.pageSize
      };
      this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
          console.log(result, 'resultresultresult');
          this.VideoData = result.Data;
          this.isRead = true;
      });
    }
  mounted() {
    // for (var i = 0; i < 4; i++) {
    //         // 获取四个视频的id
    //             var video = document.getElementById('startvideo' + i) as any;
    //         // 调用video标签的播放函数
    //             video.play();
    //     }

      // let _this = this;// 赋值vue的this
      // // 实现鼠标移入时停止自动轮播，移出时开始自动轮播
      // (_this.$refs.videoSwiper as any).swiper.el.onmouseover = function() {
      //   (_this.$refs.videoSwiper as any).swiper.autoplay.stop();
      // };
      // (_this.$refs.videoSwiper as any).swiper.el.onmouseout = function() {
      //   (_this.$refs.videoSwiper as any).swiper.autoplay.start();
      // };
    }

  created () {
    this.getContentsByCatKeyEx();
    if (this.isRead) {
     var videos = document.getElementsByClassName('myVideo') as any;
        setTimeout(() => {
          // this.videoSwiper.activeIndex为当前slide的序号
          videos[0].play();
      }, 200);
    }
  }
}
</script>

<style lang="less" scoped>
.bannerNormal {
  width: 100%;
  height: 10vh!important;
  position: fixed;
}
.banner {
  width: 100%;
  height: 100vh;
  .swiper-container {
    width: 100%;
    height: 100%;
    transform: translate3d(0,0,0);
    overflow: hidden;
  }
 .sup_contbox_content {
   width: 100%;
    height: 100%;
   transform: translate3d(0,0,0);
   .vrteacher {
        width: 100%;
        height: 100%;
        transform: translate3d(0,0,0);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .Innerlayer {
          position: absolute;
          top: 0px;
          height: 100vh;
          width: 100%;
          left: 0px;
          background: rgba(0,0,0,0.7);
          z-index: 10;
        }
        .Inner {
          width: 90%;
          position: absolute;
          bottom: 20%;
          left: 50%;
          transform: translate(-50%);
          z-index: 99;
          .ptitle {
            color: #c6b17b;
            font-size: 2rem;
            margin-bottom: 1rem;
          }
          .pdesc {
            color: #fff;
            font-size: 3rem;
          }
          .next {
            margin-top: 2rem;
            .down {
              width: 20px;
              height: 20px;
              background: url('/images/mobile/arrowhead-down.png') no-repeat center center;
              background-size: 15px;
              display: inline-block;
            }
          }
        }
        video{
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
   }
 }
}
</style>
