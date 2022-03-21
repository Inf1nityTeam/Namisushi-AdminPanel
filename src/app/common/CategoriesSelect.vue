<template>
  <div class="categories-select">
    <span v-if="label" class="categories-select__label"><span>{{label}}</span></span>
    <el-select
        :multiple="isMultipleMode"
        :clearable="!isMultipleMode"
        :model-value="modelValue"
        no-data-text="Нет доступных категорий"
        placeholder="Выберите категорию"
        @change="$emit('update:modelValue', $event)"
    >
      <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.title"
          :value="item._id"
      />
    </el-select>
  </div>
</template>

<script>
import {categoriesController} from '@/app/categories/categories.controller.js'

export default {
  name: "categories-select",
  model: {event: "change", prop: "modelValue"},
  props: {
    modelValue: {type: [Array, String]},
    label: {type: String},
    isMultipleMode: {type: Boolean, default: true}
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
  line-height: 50px !important;
  &__popper.el-popper[role=tooltip] {
    box-shadow: none;
    border-radius: 9px;
    overflow: hidden;
    border: 1px solid #E8E8E8;
  }
  &__tags {
    left: 5px;
  }
  &__caret {
    path {
      fill: #585858;
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
  &__tags-text {
    overflow: hidden;
    margin-right: 5px;
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
    min-height: 50px;

    font-family: Manrope, sans-serif;
    color: #1454F2;
    font-weight: 600;
    border: 1px solid #E8E8E8;
    border-radius: 8px;
    padding: 0 16px;
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
      background-color: transparent;
    }
    &.selected {
      color: #1454F2 !important;
      background-color: #F4F7FE !important;
    }
  }
}
.el-popper {
  &__arrow {
    display: none;
  }
}

.el-tag {
  margin: 8px 0 3px 11px !important;

  background-color: #fff !important;
  border: 1px solid #E8E8E8 !important;

  font-size: 14px;
  font-family: Manrope, sans-serif;
  color: #585858;

  &--small {
    height: 33px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &__close {
    height: 20px !important;
    width: 20px !important;

    line-height: 20px !important;
    position: static !important;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease 0s;
    @media (any-hover: hover) {
      &:hover {
        background-color: #1454F2 !important;
      }
    }
    svg {
      margin: 0 !important;
    }
  }
}
</style>
