<template>
  <el-checkbox-group @change="$emit('update:modelValue', $event)" :model-value="selectedTags" class="product-tags">
    <el-checkbox-button
        v-for="tag in tags"
        :key="tag.label"
        :label="tag.label"
        class="product-tags__item"
    >
      <span :style="{backgroundColor: tag.bg}" class="product-tags__img-wrapper">
        <img alt="" :src="require(`@/assets/image/products/${tag.img}`)"/>
      </span>
      {{ tag.title }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>

<script>
import {productsController} from "@/app/products/products.controller";

export default {
  name: "product-tags",
  model: {event: 'change', prop: "selectedTags"},
  props: {
    selectedTags: {type: Array, required: true}
  },
  data() {
    return {
      tags: []
    };
  },
  created() {
    this.tags = productsController.getTags()
  }
};
</script>
<style lang="scss" scoped>
.product-tags {
  &__img-wrapper {
    flex: 0 0 24px;
    height: 24px;
    align-self: flex-start;

    border-radius: 50%;

    transition: all 0.3s ease 0s;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    margin-right: 12px;
  }
}
</style>

<style lang="scss">
.el-checkbox-group {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
}

.el-checkbox-button {
  &__inner {
    display: flex;
    align-items: center;

    border: 0;
    padding: 0;

    transition: all 0.3s ease 0s;

    font-family: Manrope, sans-serif;
    color: #000;
    white-space: normal;

    &:hover {
      color: #1454F2;
      .product-tags__img-wrapper {
        background-color: #1454F2 !important;
      }
    }
  }

  &.is-checked {
    & .el-checkbox-button__inner {
      background-color: transparent;
      border: none !important;

      box-shadow: -1px 0 0 0 #fdfdfd;
      color: #1454F2;
    }
    & .product-tags__img-wrapper {
      background-color: #1454F2 !important;
    }
  }

  &:first-child .el-checkbox-button__inner {
    border: none !important;
  }

  &.is-focus .el-checkbox-button__inner {
    border: none !important;
  }
}
</style>

