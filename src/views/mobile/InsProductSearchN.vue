<template>
  <div id="container" class="ProductSearch">
        <div class="SearchSlide">
          <div class="leftSide">
            <advancedSearch @advancedChange="advancedChange" v-if="isAdvanced"  @closeSub="closeSub" @resetAll="resetAll" />
          </div>
        </div>
      <div class="selectBar">
          <ul>
            <li @click="showSearchSlide"><span class="filterIcon"></span><b>{{$t('product.Filter')}}</b></li>
            <li>
              <select v-model="PriceItem" @change="getselect(PriceItem)">
                <option value="desc">{{$t('product.PriceHL')}}</option>
                <option value="asc">{{$t('product.PriceLH')}}</option>
              </select>
            </li>
          </ul>
        </div>
    <!-- <advancedSearch :attrType="2"  @advancedChange="advancedChange" /> -->

    <div class="prolist-box">
      <div class="products_container" v-if="proList.length>0">
          <InsProductList v-for="item in proList" :key="item.productCode" :item="item" :needCode="false" class="product_item" ></InsProductList>
        </div>
        <div class="products_container" v-else>
             <h3 class="nocontentTips">{{$t('messageTips.NoContent')}}</h3>
        </div>
        <div ref="load" class="loading" @touchstart="loading" v-if="totalRecord>pageSize"><p>{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</p><p class="downIcon" v-if="tips"><i class="el-icon-arrow-down"></i></p></div>
        <div class="loading" v-else>{{$t('home.Thatsall')}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
import $ from 'jquery';
@Component({
  components: {
    InsProductList: () => import('@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue'),
    advancedSearch: () => import('@/components/hkTasteBusiness/mobile/product/InsAdvancedSearch.vue'),
    ProductListSwiper: () => import('@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue')
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 6; // 每页显示条目个数
  totalRecord: number = 0;// 总条目数
  private tips:boolean = true;
  private LoadingInstance!: any;

  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  PriceItem:string='desc';
  isAdvanced: boolean = true;

  // 搜索关键词
  get searchKey () {
    let a = this.$store.state.searchKey;
    if (a === '-' || a === '') {
      return '';
    } else {
      return a;
    }
  }
  // 价格传值
  getselect (val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 产品高级搜索
  productSearch (flag: string = '') {
    this.tips = true;
    this.$Api.product.search({
      Key: this.searchKey,
      PageInfo: {
        Page: this.currentPage,
        PageSize: this.pageSize,
        SortName: 'SalePrice',
        SortOrder: this.PriceItem
      },
      CatIdS: this.searchCatalogs,
      Attrs: this.attrs,
      Type: this.searchType,
      Reflesh: 1
    }).then((result) => {
      if (flag === 'loadpage') {
        this.proList = this.proList.concat(result.YouWouldLike);
        this.totalRecord = result.TotalRecord;
      } else {
        this.proList = result.YouWouldLike;
        this.totalRecord = result.TotalRecord;
      }

      this.$HiddenLayer();
    });
  }

  advancedChange (Attrs, Catalogs) {
    this.currentPage = 1;
    this.attrs = Attrs;
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }
  // 重置搜索
  resetAll () {
    window.location.href = '/product/search/-';
    this.closeSub();
  }
  // 关闭筛选弹窗
  closeSub () {
    $('.SearchSlide').fadeOut();
    $('.leftSide').removeClass('closeBar');
    document.body.style.overflow = 'auto';
  }
  // 打开筛选弹窗
  showSearchSlide () {
    $('.SearchSlide').fadeIn();
    $('.leftSide').addClass('closeBar');
    document.body.style.overflow = 'hidden';
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
    console.log(this.totalRecord, this.proList.length);
    if (this.totalRecord !== this.proList.length) { this.currentPage++; } else { this.tips = false; }
  }

  mounted () {

  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange () {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    if (this.currentPage !== 1) {
      this.productSearch('loadpage');
    }
  }
}
</script>

<style lang="less">
.ProductSearch {
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
#container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: url('/images/mobile/ohters_16.jpg') no-repeat center center;
  background-size: cover;
  padding-top: 5rem;
}
.nocontentTips{
  width: 95%;
  margin: 0 auto;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: left;
  display: block;
  padding: 1rem;
  color: #666;
}
.product_warpper{
  width: 100%;
  margin:0 auto;
}
.products_container{
  display: flex;
  flex-wrap: wrap;
}

.product_item{
    width: 48% !important;
    box-sizing:border-box;
    margin-right: 4%;
    margin-bottom: 4%;
    overflow: hidden;
    &:nth-child(2n) {
      margin-right: 0px!important;
    }
}
.prolist-box {
  width: 90%;
  margin: 0 auto;
}
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

.ProductSearch {
  .InsAdvancedSearch {
    background: rgba(0,0,0,.9);
    min-height: 100vh;
  }
}
.SearchSlide{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  overflow-x: scroll;
  z-index: 999999;
  display: none;
  .leftSide{
    width: 100%;
    left:-100%;
    min-height: 100%;
    position: absolute;
    transition: all .5s;
  }

}
.closeBar{
    left: 0%!important;
  }
.selectBar{
    width: 100%;
    margin: 0 auto;
    display: inline-block;
    margin-top: 2rem;
    margin-bottom: 2rem;
  ul{
    width: 90%;
    margin: 0 auto;
  }
  li{
    float: left;
    margin-right: 4%;
    width: 47%;
    background: transparent;
    border:1px solid #fff;
    font-size: 1rem;
    color: #fff;
    height: 3rem;
    line-height: 3rem;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    .filterIcon  {
      background: url('/images/mobile/ohters_02.png') no-repeat center center;
      width: 1.5rem;
      height: 1.5rem;
      background-size: 1.5rem;
      display: inline-block;
    }
    b{
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
      margin-left: .5rem;
      text-transform: uppercase;
    }
    select{
    width: 100%;
    border: none;
    padding-left: .5rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.2rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent url(/images/mobile/mobileIndex_14.png) 98% 50% no-repeat;
    background-size:1.8rem;
    outline: none;
    color: #fff;
    text-transform: uppercase;
      option{
        color: #333333;
      }
    }
    &:last-child{
      margin-right: 0px!important;
    }
  }
}
</style>
