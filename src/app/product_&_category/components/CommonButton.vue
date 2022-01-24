<template>
  <button
    type="button"
    class="common-btn general-btn"
    :style="btnStyleConfig"
    :class="{ 'general-btn__not-active': btnConfig.isNotActive }"
  >
    {{ btnConfig.title }}
  </button>
</template>

<script>
export default {
  name: "Buttons",
  props: { btnConfig: { type: Object } },
  computed: {
    btnStyleConfig() {
      return {
        height: this.btnConfig.height,
        width: this.btnConfig.width,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.common-btn {
  display: block;
  padding: 10px 18px;
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
}
</style>
