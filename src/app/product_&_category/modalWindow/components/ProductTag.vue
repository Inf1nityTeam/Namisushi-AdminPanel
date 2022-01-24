<template>
  <el-checkbox-group v-model="changeTegs" class="product-tag">
    <el-checkbox-button
      v-for="el in tags"
      :key="el.label"
      :label="el.label"
      class="prduct-tag__tag"
    >
      <span :style="`background: ${el.bg}`" class="product-tag__img-wrapper">
        <img :src="require(`@/assets/image/products/${el.img}`)" />
      </span>
      {{ el.title }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
export default {
  name: "ProductTag",
  data() {
    return {
      changeTegs: [],
      tags: [
        {
          img: "icon-vegan.svg",
          label: "vegan",
          title: "Вегетарианский",
          bg: "#54B508",
        },
        {
          img: "icon-like.svg",
          label: "favorite",
          title: "Избранный",
          bg: "#9A4AFF",
        },
        {
          img: "icon-fire.svg",
          label: "sharp",
          title: "Острый",
          bg: "#F92C23",
        },
        { img: "icon-new.svg", label: "new", title: "Новый", bg: "#2864F3" },
      ],
    };
  },
};
</script>

<style lang="scss">
.product-tag {
  padding-top: 5px;

  &__img-wrapper {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-checkbox-button__inner {
    margin: 4px 5px;
    border: none;
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 10px;
    border: none;
    border-radius: 8px !important;
    font-family: Manrope;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }

  .el-checkbox-button.is-checked .el-checkbox-button__inner {
    border-left-color: none;
    color: #1454f2 !important;
    background-color: #ffffff !important;
    border-color: #fff !important;
    box-shadow: -1px 0 0 0 #fdfdfd !important;
    .product-tag__img-wrapper {
      background: #1454f2 !important;
    }
  }
  .el-checkbox-button .el-checkbox-button__inner {
    border-left: none !important;
  }
}
</style>
