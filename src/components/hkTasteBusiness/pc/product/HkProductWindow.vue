<template>
    <div class="in_pdWindow_page_item pcv" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false"  v-if="item">
        <div class="picBox">
            <img :src="(item.Image?item.Image:item.Img_L?item.Img_L:item.Img)"  :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" @click="buttonSubmit(item)"/>
            <div class="fav"><img :src="item.IsFavorite ? '/images/mobile/others/ohters_03.png': '/images/mobile/ohters_04.png'" @click="addToFavorite(item)" /></div>
        </div>
        <div class="in_pdWindow_item_description">
             <router-link :to="'/product/detail/'+item.Sku" class="in_pdWindow_item_title" >&nbsp;{{item.Name}}</router-link >
            <div class="in_pdWindow_item_code">{{item.Code}}</div>
            <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" :DefaultListPrice="item.DefaultListPrice" :DefaultSalePrice="item.DefaultSalePrice" :DefaultCurrency="item.DefaultCurrency" size="small"></inPrices>
            </div>
            <!-- <div class="AddToCart">
              <a href="javascript:;" @click="addCart(item)">{{$t('product.addToCart')}}</a>
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/pc/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductWindow extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private imgStyla!:string;
    @Prop() private styla!:string;
    buttonSubmit (item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    addToFavorite (p) {
      if (p.IsFavorite) {
        this.$Api.member.removeFavorite(p.Sku).then((result) => {
          p.IsFavorite = false;
          this.$message({
            message: this.$t('MyFavorite.RemoveSuccess') as string
          });
        });
      } else {
        this.$Api.member.addFavorite(p.Sku).then((result) => {
          if (result.Succeeded) {
            p.IsFavorite = true;
            this.$message({
              message: this.$t('MyFavorite.AddSuccess') as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
          } else {
            this.$router.push('/Account/login');
          }
        });
      }
    }
    addCart (val) {
      console.log(val.Sku);
      this.$Api.product.GetProduct(val.Sku).then((result) => {
        var a = result.PanelDetail.AttrList[0].length;
        var b = result.PanelDetail.AttrList[1].length;
        var c = result.PanelDetail.AttrList[2].length;
        var d = result.PanelDetail.AttrList[3].length;
        var e = result.PanelDetail.AttrList[4].length;
        var f = result.PanelDetail.AttrList[5].length;
        if (a || b || c || d || e || f) {
          this.$router.push('/product/detail/' + result.PanelDetail.Sku);
        } else {
         this.$Api.shoppingCart.addItem(val.Sku, 1, '1', '1', '1')
          .then(
            (result) => {
              this.$message({
                message: result.Message.Message as string,
                type: 'success',
                customClass: 'messageboxNoraml'
              });
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
          }).catch();
        }
      });
    }
    click (e) {
      let target = e.target as HTMLElement;
      if (target.nodeName === 'IMG') { this.$router.push('/product/detail/' + target.dataset.key); };
    }
    loadError (e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
}
</script>
<style lang="less">
.pcv {
  .in_pdWindow_item_price .currentPricesMain ,.in_pdWindow_item_price .primePricesMain{
    width: 100%;
    display: inline-block;
    text-align: center;
  }
  .in_pdWindow_item_price .currentPricesMain  .small:nth-child(1) {
    font-size: 20px;
    word-break:break-word;
    text-align: center;
    color: #c6b17b;
    display: inline-block;
  }
  .in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 20px;
    color: #c6b17b;
    display: inline-block;
  }
  .in_pdWindow_item_price .primePricesMain  .small:nth-child(1) {
    font-size: 16px;
    word-break:break-word;
    text-align: center;
    color: #cccccc;
    display: inline-block;
    text-decoration: line-through;
  }
  .in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 16px;
    color: #cccccc;
    display: inline-block;
  }
}
</style>
<style lang="less" scoped>
.in_pdWindow_page_item {
  transition: all .3s;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid #fff;
    .in_pdWindow_item_title {
      color: #c6b17b;
    }
  }
}
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
}
.in_pdWindow_item_description {
  min-height: 13rem;
  position: relative;
}
.picBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  img {
    width: 100%;
  }
  .fav {
    position: absolute;
    right: .5rem;
    top: .5rem;
    img {
      width: 25px;
    }
  }
}
.in_pdWindow_item_title {
    font-size: 18px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    line-height:25px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-family: 'PoppinsBold', 'Microsoft YaHei';
}
.in_pdWindow_item_code {
  color: #cccccc;
  text-align: center;
  font-size: 16px;
}
.AddToCart {
  width: 100%;
  background: @base_color;
  height: 3rem;
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  left: 0px;
  transition: all .3s;
  a{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 1.2rem;
    align-items: center;
    justify-content: center;
  }
}
</style>
