<template>
    <div class="cms-list">
        <p class="pageTitle">{{CategoryName}}</p>
        <div class="Innerbox">
            <div class="perData" v-for="(v,index) in ListData" :key="index" :class="{'FirstData':index===0}">
                    <p class="imgs" @click="GoLink(v)"><img :src="v.Cover?v.Cover:NoImg"></p>
                    <div class="BottomText">
                        <p class="title">{{v.Title}}</p>
                        <p class="contentTime">{{v.ContentDateTime}}</p>
                    </div>
            </div>
        </div>
        <div class="pager" v-if="totalRecord > 5">
          <InsPage
            :total="totalRecord"
            v-model="currentPage"
            :pageNum="pageSize"
          ></InsPage>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsCatLayout1 extends Vue {
    currentPage:number=1;
    pageSize:number=5;
    totalRecord:number=0;
    ListData:any[]=[];
    NoImg:string='/images/pc/proddef.jpg';
    CategoryName:string='';
    private tips:boolean = true;
    private LoadingInstance!: any;
    get cid () {
      return this.$route.params.id;
    }
    GoLink(v) {
        window.location.href = '/cms/contentN/' + v.Id;
    }
    getContentsByCatId (flag: string = '') {
        var _this = this;
        this.$Api.cms.getContentsByCatId(this.cid, this.currentPage, this.pageSize).then((result) => {
            result.Data.forEach(function (i) {
                _this.CategoryName = i.Category.Name;
                var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
                i.ContentDateTime = newDate.getDate() + '.' + (newDate.getMonth() + 1) + '.' + +newDate.getFullYear();
            });
            this.totalRecord = result.TotalRecord;
            this.ListData = result.Data;
            this.$HiddenLayer();
        });
    }
    created() {
        this.getContentsByCatId();
    }
  loading (e) {
    if (this.tips) {
      this.LoadingInstance = this.$loading({
        target: this.$refs.load as any,
        fullscreen: false,
        text: 'Loading...'
      });
      setTimeout(() => {
        this.LoadingInstance.close();
      }, 2000);
    }
  }
  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    this.getContentsByCatId();
  }
}
</script>
<style lang="less">
.cms-list {
  .el-loading-spinner .circular {
    display: none;
  }

  .el-loading-text {
    font-size: 1.3rem;
    color: #cccccc;
  }

  .el-loading-parent--relative {
    > p {
      display: none;
    }
  }
}
</style>
<style scoped lang="less">
.loading{
    text-align: center;
    height: 3rem;
    margin: 1rem 0 2rem;
    border-radius: 2rem;
    overflow: hidden;
    font-size: 1.2rem;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    p{
      font-size: 1.2rem;
      color: #fff;
      align-items: center;
      width: 100%;
      justify-content: center;
      display: flex;
    }
    .downIcon {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      i{
        font-size: 1.4rem;
        color: #fff;
      }
    }
}
.pageTitle {
    width: 100%!important;
    margin-top: 2rem;
    margin-bottom: 1rem;
}
.cms-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .Innerbox {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .perData {
            width:49%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            &:nth-child(2n) {
              margin-right: 2%;
            }
            .imgs {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                img {
                    width: 100%;
                }
            }
            .title {
                font-size: 20px;
                color: #fff;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-top: .5rem;
                margin-bottom: .5rem;
                font-family: 'PoppinsBold', 'Microsoft YaHei';
                width: 100%;
            }
            .contentTime {
                color:#c6b17b;
                font-size:20px;
                 width: 100%;
            }
        }
        .FirstData {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          position: relative;
          .BottomText {
            position: absolute;
            width: 50%;
            bottom: 0px;
            left: 0px;
            background: #c6b17b;
            padding-top: 10px;
            padding-bottom: 10px;
            .title {
              font-size: 40px;
              line-height: 46px;
              width: 90%;
              margin: 0 auto;
            }
            .contentTime {
              color: #fff;
              width: 90%;
              margin: 0 auto;
            }
          }
        }
    }
}
</style>
