<template>
  <div class="banner" v-loading="loading">
    <div class="sup_contbox_content">
              <swiper  ref="videoSwiper" :options="swiperOptionVideos" @slideChange="slideChange" v-if="VideoData.length!=0">
                <swiper-slide class="swiper-item" v-for='(item,index) of VideoData' :key='index'>
                  <div class="qhbox">
                    <div class="vrteacher" style="height:100vh;">
                      <video class="myVideo" :src="item.SeoKeyword"  ref="videoPlayer"  autoplay loop>
                        您的浏览器不支持video标签!
                      </video>
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

  private bannerList: object[] = [];
  page:number=1;
  pageSize:number=12;
  VideoData:any[]=[];
  private loading = false; // 數據加載過渡效果
  isRead:boolean =false;
  swiperOptionVideos:any= {
    initialSlide: 0, // 默认第几张
    loop: true, // 循环
    speed: 900 // 滑动速度
  }
  get videoSwiper() {
    return (this.$refs.videoSwiper as any).swiper;
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
      let _this = this;// 赋值vue的this
      // 实现鼠标移入时停止自动轮播，移出时开始自动轮播
      _this.videoSwiper.el.onmouseover = function() {
        _this.videoSwiper.autoplay.stop();
      };
      _this.videoSwiper.el.onmouseout = function() {
        _this.videoSwiper.autoplay.start();
      };
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
.banner {
  width: 100%;
  height: 100vh;
  .swiper-container {
    width: 100%;
    height: 100vh;
  }
 .sup_contbox_content {
   width: 100%;
   height: 100vh;
   .vrteacher {
        width: 100%;
        height: 100vh;
        video{
          object-fit: cover;
          width: 100%;
          height: 100vh;
        }
   }
 }
}
</style>
