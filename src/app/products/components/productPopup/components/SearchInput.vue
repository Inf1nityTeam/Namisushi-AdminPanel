<template>
  <div class="search-input">
    <input
      type="text"
      placeholder="Поиск по наименованию продукта"
      ref="searchInput"
      @input="$emit('update:modelValue', $event.target.value)" />
    <button type="button" @click="$refs.searchInput.focus()">
      <svg-icon :icon="require('@/assets/image/products/icon-search.svg')" />
    </button>
  </div>
</template>

<script>
import SvgIcon from "@/app/common/SvgIcon";
export default {
  props: {
    modelValue: {type: String, required: true}
  },
  components: {SvgIcon},
  model: {prop: "modelValue", event: "input"},
}
</script>

<style lang="scss">
.search-input {
  display: flex;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #FAFBFF;
  > input {
    display: block;
    width: 100%;
    height: 50px;

    padding-left: 16px;
    padding-right: 16px;

    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: 0 !important;
    outline: none;

    font-family: Manrope, sans-serif;
    color: #212121;

    &::placeholder {
      color: #C4C4C4;
    }
  }
  > button {

    background-color: #fff;
    cursor: pointer;
    border: none;

    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>