<template>
  <div class="logo">
    <router-link to="/">
      <img src="/images/mobile/mpic_06.png" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLogo extends Vue {
  // @Prop({ default: '' }) private src!: string;
}
</script>
<style scoped lang="less">
.logo {
  img{
    max-width: 100%;
  }
}
</style>
