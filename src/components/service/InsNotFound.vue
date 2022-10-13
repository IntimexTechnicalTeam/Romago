<template>
  <div class="container" :class="{ 'pcNotFound': userAgent === 'pc', 'MobileNotFound': userAgent === 'mobile' }">
      <div class="Innerbg">
          <div class="Pos">
            <p><img src="/images/pc/404.png"></p>
            <p class="title">{{$t('Input.PAGENOTFOUND')}}</p>
            <p class="url"><router-link to="/">{{$t('Action.ReturnHomePage')}}</router-link></p>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsNotFound extends Vue {
}
</script>
<style lang="less" scoped>
.pcNotFound {
    width: 100%;
    display: inline-block;
    padding-top:130px;
    background: #000;
    background-size: cover;
    min-height: 500px;
  .Innerbg {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    background-size: contain;
    padding-top: 150px;
    padding-bottom: 150px;
    position: relative;
    .Pos {
      img {
        display: block;
        width: 600px;
        margin: 0 auto;
      }
      .title {
        margin-top: 30px;
        font-size: 20px;
        color: #666;
      }
      .url {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-top:30px;
        a{
          padding: 10px 20px;
          border: 1px solid #fff;
          border-radius: 20px;
          color: #fff;
          transition: all .3s;
          font-size: 16px;
          &:hover {
            background: @base_color;;
            color: #fff;
          }
        }
      }
    }
  }
}
.MobileNotFound {
    width: 100%;
    display: inline-block;
    padding-top:150px;
    background: #000;
    background-size: cover;
    min-height: 300px;
  .Innerbg {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    background-size: contain;
    padding-bottom: 50px;
    position: relative;
    .Pos {
      img {
        display: block;
        width: 80%;
        margin: 0 auto;
      }
      .title {
        margin-top: 30px;
        font-size: 1.4rem;
        color: #666;
      }
      .url {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin-top:30px;
        a{
          padding: 10px 20px;
          border: 1px solid #fff;
          border-radius: 20px;
          color: #fff;
          transition: all .3s;
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
