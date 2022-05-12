<template>
    <div class="cms-list">
        <div class="Innerbox">
            <div class="perData" v-for="(v,index) in ListData" :key="index">
                    <p class="imgs" @click="GoLink(v)"><img :src="v.Cover?v.Cover:NoImg"></p>
                    <p class="title">{{v.Title}}</p>
                    <div class="HomeViewMore">
                        <router-link :to="'/cms/contentN/'+v.Id">{{$t('Message.ViewMore')}}</router-link>
                    </div>
            </div>
        </div>
         <div class="pager" v-if="totalRecord > pageSize">
            <ins-page :total="totalRecord" v-model="currentPage" :pageNum="pageSize"></ins-page>
        </div>
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
    pageSize:number=6;
    totalRecord:number=0;
    ListData:any[]=[];
    NoImg:string='/images/pc/proddef.jpg';
    get cid () {
      return this.$route.params.id;
    }
    GoLink(v) {
        window.location.href = '/cms/contentN/' + v.Id;
    }
    getContentsByCatId () {
        this.$Api.cms.getContentsByCatId(this.cid, this.currentPage, this.pageSize).then((result) => {
            if (result) {
                this.ListData = result.Data;
            }
            console.log(result, 'resultresultresult');
            this.totalRecord = result.TotalRecord;
        });
    }
    created() {
        this.getContentsByCatId();
    }
    @Watch('currentPage', { deep: true })
    onPagerChange() {
      this.getContentsByCatId();
    }
}
</script>

<style scoped lang="less">
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
                font-size: 1.2rem;
                color: #666;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
                margin-top: .5rem;
                margin-bottom: .5rem;
            }
        }
    }
}
</style>
