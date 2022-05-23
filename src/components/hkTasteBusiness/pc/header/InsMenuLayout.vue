<template>
  <div class="MeunMain">
    <div class="MenuContainer">
        <div class="topbar">
          <div class="closeBtn" @click="closeSlideMenu"><img src="/images/mobile/mpic_19.png"></div>
          <div class="functionBtn">
            <span class="fav" @click="goFav()"><img src="/images/mobile/mpic_21.png"></span>
            <span class="code" @click="showSlideCode()"><img src="/images/mobile/mpic_22.png"></span>
            <span class="lang" @click="showSlideLang()"><img src="/images/mobile/mpic_23.png"></span>
          </div>
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
    Menu: () => import('@/components/business/pc/header/InsMenu.vue')
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
    background:rgba(0,0,0,.7) !important;
}
.menu_footer span{
    display: flex;
    float: left;
    border:1px solid #eee;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    font-size: 1.4rem;
}
.innerShare{
    width: 90%;
    margin: 0 auto;
    display: flex;
    margin-top: 2rem;
    padding-bottom: 5rem;
    align-items: center;
    justify-content: center;
}
.innerShare a {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
}
.innerShare a img {
    width: 3rem;
}

.search-box {
    width: 90%;
    height: 4rem;
    margin: 0 auto;
    margin-top: 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border: 1px solid #666666;

  /deep/ .el-select {
    width: 20%;
    position: absolute;
    left: 0;
    top: 0;

    .el-input__inner {
        height: 4rem;
        border: 0;
        border-right: 1px solid #DCDFE6;
        border-radius: 0;
        padding: 0 2rem 0 0.5rem;
    }

    .el-input__icon {
      line-height: 4rem;
      font-size: 1rem;
    }
  }

  .search-input {
    width: 100%;
    height: 100%;

    > input {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0 20% 0 22%;
        box-sizing: border-box;
        font-size: 1.2rem;
        outline: none;
    }

    .searchBtn{
        width: 4rem;
        height: 4rem;
        background: #666666;
        display: inline-block;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 50%;
            margin: 0 auto;
            display: block;
        }
    }
  }
}

// #menu {
//     .el-submenu__icon-arrow {
//         display: none;
//     }

//     .el-submenu__title {
//         padding-top: 0.5rem;
//         padding-bottom: 0.5rem;
//         padding-left: 0px!important;
//         height: auto!important;
//         line-height: unset;
//         background-color:transparent!important;
//         .name{
//             font-size: 1.4rem!important;
//             color:#fff;
//             height: auto!important;
//             line-height: unset!important;
//         }
//     }

//     .el-menu {
//         width: 90%;
//         margin: 0 auto;
//         background-color: transparent;
//         border: 0;
//         .el-submenu__icon-arrow {
//             display: block;
//             font-size: 1.4rem;
//         }

//         > li {
//             height: auto;
//             line-height: unset;
//             text-align: left;
//              >a {
//                  color:#666666;
//                  background-size: 100% 100%;
//                  display:block;
//                  width: 100%;
//                  padding-top: .5rem;
//                  padding-bottom: .5rem;
//                  margin: 0 auto;
//                  font-weight: 500;
//                  b{
//                      color:#FFF;
//                      display: block;
//                      width: 100%;
//                      font-weight: 500;
//                      &:nth-child(1){
//                         color:#fff;
//                         font-weight: 500;
//                         font-size: 1.4rem;
//                      }
//                      &:nth-child(2){
//                          color:#fff;
//                          font-size: 1.2rem;
//                      }
//                  }
//             }

//             a {
//                 text-decoration: none;
//             }
//         }

//         li {
//             line-height: unset;
//             padding: 0 !important;
//             min-width: unset;
//         }
//     }
// }
// #menu .is-opened > .el-submenu__title{
//     background:transparent!important;
//     color:#fff!important;
//     .name{
//         color:#FFF!important;
//     }
// }
// #menu .is-opened > .el-submenu__title .el-submenu__icon-arrow{
//     color:#fff!important;
// }
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
          display: block;
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
            font-size: 1.2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            text-transform: uppercase;
            }
          }
        }
        >a {
          color:#fff;
          padding: 0px;
          font-size: 1.4rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          text-transform: uppercase;
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
    width:2.5rem;
    cursor: pointer;
    img {
      width: 100%;
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
</style>
