<template>
  <div class="Search">
      <p class="back" @click="backMeun()"><i class="el-icon-close"></i></p>
      <div class="search-box">
        <input type="text" v-model="key" class="inputBox" />
        <span class="searchBtn" @click="searchFun(key)"></span>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsSearch extends Vue {
  private key: string = '';
  backMeun () {
    this.$store.dispatch('isShowSearch', false);
    this.$store.dispatch('isShowMenu', false);
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
}
</script>
<style scoped lang="less">
.Search {
  width: 600px;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .back {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    justify-content: flex-end;
    i {
      font-size: 1.6rem;
      color: #fff;
      cursor: pointer;
    }
  }
    .search-box {
      width: 90%;
      margin: 0 auto;
      margin-top: 50%;
      height: 40px;
      z-index: 999;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #fff;
      .searchBtn{
            width: 40px;
            height: 40px;
            display: inline-block;
            background: url('/images/mobile/mpic_08.png') no-repeat center center;
            background-size: 30px;
            cursor: pointer;
        }
      .inputBox {
          width: calc(100% - 50px);
          float: left;
          border:none;
          line-height: 38px;
          text-indent: 10px;
          height: 38px;
          outline: 0;
          background: transparent;
          color: #fff;
          &::placeholder {
            color: #fff;
          }
      }
    }
}
</style>
