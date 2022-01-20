<template>
  <button type="button" class="products-btn" :style="btnStyleConfig">
    {{ btnConfig.title }}
  </button>
</template>

<script>
export default {
  name: "ProductsBtn",
  props: { btnConfig: { type: Object } },
  computed: {
    btnStyleConfig() {
      return {
        height: this.btnConfig.height,
        width: this.btnConfig.width,
        background: this.btnConfig.isNotActive
          ? "none"
          : "linear-gradient(180deg, #6c9af3 0%, #1f5cf3 100%)",
        color: this.btnConfig.isNotActive ? "#404040" : "#FFFF",
      };
    },
  },
};
</script>

<style scoped lang="scss">
.products-btn {
  display: block;
  cursor: pointer;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 10px 10px
    linear-gradient(
      180deg,
      rgba(113, 157, 242, 0.38) 0%,
      rgba(20, 84, 242, 0.38) 100%
    );
font-family: Raleway;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;

  &:hover {
    box-shadow: 10px 10px 10px 10px
      linear-gradient(
        180deg,
        rgba(113, 157, 242, 0.38) 0%,
        rgba(20, 84, 242, 0.38) 100%
      );
  }
}
</style>
