<template>
  <button type="button" class="products-btn" :style="btnStyleConfig">
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
        background: this.btnConfig.isNotActive
          ? "none"
          : "linear-gradient(180deg, #6c9af3 0%, #1f5cf3 100%)",
        color: this.btnConfig.isNotActive ? "#404040" : "#FFFF",
        boxShadow: !this.btnConfig.isNotActive
          ? "rgb(135 168 249 / 85%) 2px 5px 15px, rgb(250 251 255) -5px -5px 10px"
          : "none",
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
  font-family: Raleway;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  //box-shadow: rgb(135 168 249 / 85%) 2px 5px 15px, rgb(250 251 255) -5px -5px 10px;

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
