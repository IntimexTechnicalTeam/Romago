<template>
  <div class="MeunMain pcHeaderMain">
    <div class="MenuContainer">
        <div class="topbar">
          <div class="closeBtn" @click="closeSlideMenu"><img src="/images/mobile/mpic_19.png"></div>
          <div class="functionBtn">
            <span class="fav" @click="goFav()"><img src="/images/mobile/mpic_21.png"></span>
            <span class="lang" @click="showSlideLang()"><img src="/images/mobile/mpic_23.png"></span>
          </div>
        </div>
        <div class="SearchboxMain">
            <input type="text" v-model="key" class="inputBox" />
            <span class="searchBtn" @click="searchFun(key)"></span>
        </div>
        <div id="menu" class="MeunBar">
            <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="false"  :type="'header'"/>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    Menu: () => import('@/components/business/mobile/header/InsElMenu.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  private key: string = '';
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
  searchFun (key) {
    this.$store.dispatch('setSearchKey', key);
    if (key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: key
        }
      });
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
    }
  }
  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  get user () {
    return this.$store.state.user;
  }
  goFav () {
    this.$router.push('/account/myFavorite');
  }
  get isLogin () {
    return this.$store.state.isLogin;
  }
  @Watch('$route', { deep: true })
    onRouteChange (n, o) {
       this.$store.dispatch('isShowMenu', false);
    }
}
</script>
<style lang="less">
.sidebar-container {
    background-color: rgba(0,0,0,0.9) !important;
}
.pcHeaderMain {
  #menu {
      .el-submenu__icon-arrow {
          display: none;
      }

      .el-submenu__title {
          background: transparent !important;
          padding: 0px!important;
          margin: 0 auto;
          height: auto!important;
          line-height: auto!important;
          .name{
            font-size: 1.4rem !important;
            background-size: 100% 100%;
            display: block;
            width: 90%;
            padding-top: 0.9rem;
            padding-bottom: 0.9rem;
            margin: 0 auto;
            font-weight: 500;
            color: #fff;
          }
          i {
            color: #fff;
            background: url('/images/mobile/add.png') no-repeat center center;
            width: 16px;
            height: 16px;
            display: inline-block;
            background-size: contain;
            &::before {
              content: ''!important;
            }
          }
      }

      .el-menu {
          margin: 0 auto;
          background-color: transparent;
          border: 0;
          margin-bottom: 1rem;
          margin-top: 1rem;
          width: 100%;
          .el-submenu__icon-arrow {
              display: block;
              font-size: 1.6rem;
          }

          > li {
              height: auto;
              line-height: unset;
              >a {
                  color:#333333;
                  background-size: 100% 100%;
                  display:block;
                  width: 90%;
                  padding-top: 1rem;
                  padding-bottom: 1rem;
                  margin: 0 auto;
                  font-weight: 500;
                  b{
                      color:#FFF;
                      display: block;
                      width: 100%;
                      font-weight: 500;
                      &:nth-child(1){
                          color:#fff;
                          font-weight: 500;
                          font-size: 1.4rem;
                          white-space:break-spaces;
                          word-break: break-word;
                      }
                      &:nth-child(2){
                          color:#fff;
                          font-size: 1.4rem;
                      }
                  }
              }

              a {
                  text-decoration: none;
              }
          }

          li {
              line-height: unset;
              padding: 0 !important;
              min-width: unset;
              background: transparent!important;
          }
      }
      .el-menu--inline {
        background: #fafafa;
        margin-top: 0px!important;
        margin-bottom: 0px!important;
        li {
          background: #5a5548!important;
          border-bottom: 1px solid rgba(0,0,0,0.9)!important;
          &:last-child {
            border-bottom: 0px!important;
          }
          a {
            &:hover {
              b {
                text-decoration: underline;
              }
            }
          }
          b {
            font-size: 1.4rem!important;
            color: #fff!important;
          }
        }
      }
  }
  #menu .is-opened > .el-submenu__title{
      background: #c6b17b!important;
      color:#fff!important;
      .name{
          color:#fff!important;
      }
  }
  #menu .is-opened > .el-submenu__title .el-submenu__icon-arrow{
      color:#fff!important;
      background: url('/images/mobile/reduce.png') no-repeat center center;
      width: 16px;
      height: 16px;
      display: inline-block;
      background-size: contain;
  }
}
</style>
<style scoped lang="less">
.MeunBar {
  width: 90%;
  margin: 0 auto;
   /deep/ .nav_menu {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
     > ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      top: 0;
      left: 0;
      >li {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        text-align: left;
        &:hover {
          > a {
            color: #fff;
          }
        }
        >ul {
          position: relative;
          left:0;
          top: 0;
          width: 100%;
          border: 0px;
          li {
            background: transparent;
            border: 0px;
            padding-left: 2rem;
            &:hover {
              a{
                color:#c6b17b;
                text-decoration: underline;
              }
            }
            >a {
            color:#e5e5e5;
            padding: 0px;
            font-size: 18px;
            padding-top: .8rem;
            padding-bottom: .8rem;
            text-transform: uppercase;
            }
          }
        }
        >a {
          color:#fff;
          padding: 0px;
          font-size: 1.4rem;
          padding-top: .8rem;
          padding-bottom: .8rem;
          text-transform: uppercase;
          font-family: 'PoppinsBold', 'Microsoft YaHei';
          &:hover {
              color:#c6b17b;
              text-decoration: underline;
          }
        }
      }
    }
  }
}
.topbar {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 2rem;
  .closeBtn {
    cursor: pointer;
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
    }
    .Meun {
      color: #fff;
      font-size: 1.4rem;
      margin-left: 10px;
    }
  }
  .functionBtn {
    span{
      width: 2.5rem;
      display: inline-block;
      margin-left: 1rem;
      cursor: pointer;
      img {
        width: 100%;
      }
    }
  }
}
.SearchboxMain {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    margin-top: 2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    .inputBox {
      width: calc(100% - 30px);
      height: 40px;
      line-height: 40px;
      border: 0px;
      background: transparent;
      color: #fff;
      text-indent: 10px;
      outline: 0;
    }
    .searchBtn {
      width:25px;
      height: 25px;
      background: url('/images/mobile/mpic_20.png') no-repeat center center;
      display: inline-block;
      background-size: 25px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
</style>
