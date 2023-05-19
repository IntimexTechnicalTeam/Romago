<template>
  <div class="headerMain">
    <!-- 正常菜单 -->
      <div class="header-box header-normal">
        <div class="headerTop">
            <span @click="showSlideMenu" class="slide-menu"><b class="MeunImg"></b><i>{{$t('Message.Menu')}}</i></span>
            <ins-logo />
            <div class="rightSide">
                <span class="lang" @click="showSlideLang()"></span>
                <span class="code" @click="showSlideCode()"></span>
                <ins-login />
                <shopcart class="shoppingcart" />
            </div>
        </div>
      </div>
      <!-- 固定菜单 -->
      <div class="header-box header-fixed">
        <div class="headerTop">
            <span @click="showSlideMenu" class="slide-menu"><b class="MeunImg"></b><i>{{$t('Message.Menu')}}</i></span>
            <ins-logo />
            <div class="rightSide">
                <span class="lang" @click="showSlideLang()"></span>
                <span class="code" @click="showSlideCode()"></span>
                <ins-login />
                <shopcart class="shoppingcart" />
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/pc/InsLogo.vue'),
    InsLogin: () => import('@/components/business/pc/header/InsLogin.vue'),
    shopcart: () => import('@/components/business/pc/header/InsShoppingCart.vue')
  }
})
export default class DefaultHeader extends Vue {
  searchKey: string = '';
  private key: string = '';
  private search: boolean = false;
  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }
  showsearch () {
    this.$store.dispatch('isShowSearch', true);
  }
  showSlideCode () {
    this.$store.dispatch('isShowCodeSelect', true);
    this.$store.dispatch('isShowMenu', false);
    this.$store.dispatch('isShowLangSwitch', false);
    this.$store.dispatch('isShowSearch', false);
  }
  showSlideLang () {
    this.$store.dispatch('isShowLangSwitch', true);
    this.$store.dispatch('isShowMenu', false);
    this.$store.dispatch('isShowCodeSelect', false);
    this.$store.dispatch('isShowSearch', false);
  }
  get showHomePage () {
    return this.$route.path;
  }
  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  created() {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
     addEventListener('scroll', () => {
      var _this = this;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= 60) {
        $('.header-fixed').slideDown(300);
      } else {
        $('.header-fixed').fadeOut(300);
      }
    }, false);
  }
  @Watch('$route', { deep: true })
    onRouteChange () {
      this.$store.dispatch('isShowSearch', false);
      this.$store.dispatch('isShowMenu', false);
      this.$store.dispatch('isShowLangSwitch', false);
      this.$store.dispatch('isShowCodeSelect', false);
    }
}
</script>

<style scoped lang="less">
  .header-fixed {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background: #000;
    display: none;
  }
  .header-normal {
    position: absolute!important;
    top: 0;
    z-index: 999;
    background: transparent!important;
    width: 100%;
    left: 0;
  }
  .searchMain {
    display: flex;
    float: left;
    align-items: center;
    cursor: pointer;
  }
  .searchImg {
        background: url('/images/mobile/mpic_08.png') no-repeat center center;
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background-size: contain;
        transition: all .3s;
        &:hover {
          background: url('/images/mobile/mpic_08_hover.png') no-repeat center center;
          background-size: contain;
        }
    }
    .header-box {
      .flex-box {
        height: 7rem;
        background-color: #000;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;

        .logo {
          width: 15rem;
          margin: 0 auto;
        }

        .slide-menu {
          cursor: pointer;
          width: 2rem;
          img {
            width: 2rem;
          }
        }
        .close-meun {
          cursor: pointer;
          width: 2.5rem;
        }
      }
    }
.headerTop{
  width: 85%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: .5rem;
  padding-bottom: .5rem;
  display: flex;
  .rightSide {
    float: right;
    display: flex;
    align-items: center;
    .code {
      width: 2rem;
      height: 2rem;
      background: url('/images/mobile/mpic_22.png') no-repeat center center;
      display: inline-block;
      background-size: contain;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        width: 2rem;
        height: 2rem;
        background: url('/images/mobile/mpic_22_hover.png') no-repeat center center!important;
        background-size: contain;
      }
    }
    .lang {
      width: 2rem;
      height: 2rem;
      background: url('/images/mobile/mpic_23.png') no-repeat center center;
      display: inline-block;
      background-size: contain;
      cursor: pointer;
      margin-right: 1rem;
      transition: all .3s;
      &:hover {
        width: 2rem;
        height: 2rem;
        background: url('/images/mobile/mpic_23_hover.png') no-repeat center center!important;
        background-size: contain;
      }
    }
  }
  .slide-menu {
    margin-top: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .5rem;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      .MeunImg {
        background: url('/images/mobile/mpic_09_hover.png') no-repeat center center;
        background-size: contain;
      }
      i{
        color:#c6b17b;
      }
    }
    .MeunImg {
      background: url("/images/mobile/mpic_09.png") no-repeat center center;
      background-size: contain;
      position: relative;
      cursor: pointer;
      transition: all .3s;
      display: inline-block;
      width: 2rem;
      height: 2rem;
    }
    i {
      padding-left: .5rem;
      color: #fff;
      font-size: 1.2rem;
      font-style: normal;
      font-family: 'PoppinsBold', 'Microsoft YaHei';
      text-transform: uppercase;
    }
  }
  .shoppingcart{
      padding-right: 0rem;
      float: left;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .headerLang{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 0px;
    height: 3.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-code{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 25%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.homePage {
    position: absolute!important;
    top: 0;
    z-index: 999;
    background: transparent!important;
    width: 100%;
  }
</style>
