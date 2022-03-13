<template>
  <div class="product-type">
    <el-radio
        disabled
        v-for="type in types"
        :key="type.label"
        :model-value="productType"
        @change="$emit('update:modelValue', type.label)"
        :label="type.label">
      {{type.title}}
    </el-radio>
  </div>
</template>

<script>
import {productsController} from "@/app/products/products.controller";

export default {
  name: "product-type",
  model: { event: "change", prop: "productType"},
  props: {
    productType: {type: String, default: "variousFillings"},
  },

  data() {
    return {
      types: []
    }
  },
  created() {
    this.getProductTypes()
  },
  methods: {
    getProductTypes() {
      this.types = productsController.getProductTypes()
    }
  }
}
</script>



<style lang="scss">
.el-radio {
  height: auto;
  &__input.is-checked {
    & + .el-radio__label {
      color: #1454F2;
    }

    .el-radio__inner {
      border-color: #1454F2;
      background-color: #fff;

      &::after {
        background-color: #1454F2;
        transform: translate(-50%, -50%) scale(1);
      }


    }
  }
  &__inner {
    &:hover {
      border-color: #1454F2;
    }
  }
  &__label {
    font-family: Manrope, sans-serif;
    font-weight: 500;
  }

  &__inner {
    width: 24px;
    height: 24px;

    background-color: #fff;
    border: 1px solid #585858;

    &::after {
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%) scale(0);

      width: 12px;
      height: 12px;

      background-color: #1454F2;
    }
  }
}
</style>
