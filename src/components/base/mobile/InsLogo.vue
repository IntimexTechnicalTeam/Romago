<template>
  <a href="/" class="logo">
    <img src="/images/mobile/mpic_06.png" />
  </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLogo extends Vue {

}
</script>
<style scoped lang="less">
.logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  img {
    width: 12rem;
    padding-top: 0.5rem;
  }
}
</style>
