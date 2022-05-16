<template>
    <div class="cms-list">
        <p class="pageTitle">{{CategoryName}}</p>
        <div class="Innerbox">
            <div class="perData" v-for="(v,index) in ListData" :key="index">
                    <p class="imgs" @click="GoLink(v)"><img :src="v.Cover?v.Cover:NoImg"></p>
                    <p class="title">{{v.Title}}</p>
                    <p class="contentTime">{{v.ContentDateTime}}</p>
            </div>
        </div>
        <div ref="load" class="loading" @touchstart="loading" v-if="totalRecord>pageSize"><p>{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</p><p class="downIcon" v-if="tips"><i class="el-icon-arrow-down"></i></p></div>
        <div class="loading" v-else>{{$t('home.Thatsall')}}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsPage: () => import('@/components/base/mobile/InsPage.vue')
  }
})
export default class InsCatLayout1 extends Vue {
    currentPage:number=1;
    pageSize:number=1;
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
            if (flag === 'loadpage') {
                this.ListData = this.ListData.concat(result.Data);
                this.totalRecord = result.TotalRecord;
            } else {
                this.ListData = result.Data;
                this.totalRecord = result.TotalRecord;
            }
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
        this.load();
        this.LoadingInstance.close();
      }, 2000);
    }
  }
  load () {
    console.log(this.totalRecord, this.ListData.length);
    if (this.totalRecord !== this.ListData.length) { this.currentPage++; } else { this.tips = false; }
  }
  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    if (this.currentPage !== 1) {
      this.getContentsByCatId('loadpage');
    }
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
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 2rem;
            .imgs {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                img {
                    width: 100%;
                    border-radius: 5px;
                }
            }
            .title {
                font-size: 1.4rem;
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
            }
            .contentTime {
                color:#c6b17b;
                font-size: 1.2rem;
            }
        }
    }
}
</style>
