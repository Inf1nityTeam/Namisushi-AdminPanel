<template>
  <div class="categories-select">
    <span v-if="label" class="categories-select__label"><span>{{label}}</span></span>
    <el-select
        :model-value="category"
        no-data-text="Нет доступных категорий"
        placeholder="Выберите категорию"
        @change="$emit('update:modelValue', $event)"
    >
      <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.title"
          :value="item.title"
      />
    </el-select>
  </div>
</template>

<script>
import {categoriesController} from '@/app/categories/categories.controller.js'

export default {
  name: "categories-select",
  model: {event: "change", prop: "category"},
  props: {
    category: {type: String},
    label: {type: String}
  },
  emits: ['update:modelValue'],
  async created() {
    await this.getCategories()
  },
  data() {
    return {
      categories: []
    }
  },
  methods: {
    async getCategories() {
      this.categories = await categoriesController.getCategories()
    }
  }
}
</script>

<style scoped lang="scss">
.categories-select {
  &__label {
    display: block;

    margin-bottom: -8px;
    padding-left: 13px;

    position: relative;
    z-index: 3;

    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #585858;

    span {
      display: inline-block;
      padding: 0 3px;
      background-color: #fff;
    }
  }
}
</style>
<style lang="scss">
.el-select {
  width: 100%;
  &__popper.el-popper[role=tooltip] {
    box-shadow: none;
    border-radius: 9px;
    border: 1px solid #E8E8E8;
  }
  &:hover {
    .el-input__inner {
      border-color: #1454F2;
    }
  }
  .el-input {
    &.is-focus .el-input__inner {
      border-color: #1454F2;
    }
    &__inner {
      &:focus {
        border-color: #1454F2;
      }
    }
    & .el-select__caret {
      color: #585858;
    }
  }

}
.el-input {
  &__inner {
    height: 50px;

    font-family: Manrope, sans-serif;
    color: #1454F2;
    font-weight: 600;
    border: 1px solid #E8E8E8;
    border-radius: 8px;
    &:hover {
      border-color: #1454F2;
    }
    &::placeholder {
      font-weight: 400;
      color: #C4C4C4;
    }
  }
}
.el-select-dropdown {
  &__list {
    margin: 0 !important;
  }
  &__wrap {
    max-height: 344px;
  }
  &__empty {
    font-family: Manrope, sans-serif;
    font-size: 12px;
    color: #585858;
  }
  &__item {
    height: 54px;

    font-size: 14px;
    font-family: Manrope, sans-serif;
    line-height: 1;
    color: #000000;

    display: flex;
    align-items: center;

    padding: 0 14px;
    &:hover {
      background-color: #F4F7FE;
      color: #1454F2;
    }
    &.hover {
      background-color: #F4F7FE;
    }
    &.selected {
      color: #1454F2;
    }
  }
}
.el-popper {
  &__arrow {
    display: none;
  }
}
</style>
