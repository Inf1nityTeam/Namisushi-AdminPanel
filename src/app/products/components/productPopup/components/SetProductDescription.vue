<template>
  <div class="set-product-description">
    <div class="set-product-description__type">
      <el-radio
          :model-value="productType"
          @change="$emit('update:productType', 'default')"
          label="default">
        Обычный
      </el-radio>
      <el-radio
          :model-value="productType"
          @change="$emit('update:productType', 'variousFillings')"
          label="variousFillings">
        С различными начинками
      </el-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: "set-product-description",
  props: {
    productType: {type: String}
  },
  emits: ['update:productType']
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
