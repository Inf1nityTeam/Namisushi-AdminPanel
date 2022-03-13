<template>
  <div class="products-search">
    <div class="products-search__item">
      <search-input @update:modelValue="updateTitle" :model-value="title"/>
    </div>
    <div class="products-search__item">
      <categories-select @update:modelValue="updateCategories" :model-value="categories"/>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/app/common/SearchInput";
import CategoriesSelect from "@/app/common/CategoriesSelect";

export default {
  name: "products-search",
  components: {CategoriesSelect, SearchInput},
  emits: ['update-search-products'],
  data() {
    return {
      title: "",
      categories: []
    }
  },
  methods: {
    updateTitle(text) {
      this.title = text

      const {title, categories} = this
      this.$emit('update-search-products', {title, categories})
    },
    updateCategories(items) {
      this.categories = items

      const {title, categories} = this
      this.$emit('update-search-products', {title, categories})
    }
  },
}
</script>


<style scoped lang="scss">
.products-search {
  display: flex;
  margin: 0 -7px;

  &__item {
    flex: 0 1 50%;
    padding: 0 7px;
  }
}
</style>

<style lang="scss">
.products-search {
  .categories-select {
    .el-input {
      &__inner {
        box-shadow: 5px 5px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #FAFBFF;
        border: none;
      }
    }
  }
  .el-tag {
    margin: 5px 0 5px 11px !important;
  }
}
</style>
