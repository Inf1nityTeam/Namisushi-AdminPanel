<template>
  <div class="products-search">
    <div class="products-search__item">
      <search-input @update:modelValue="updateSearchProductsTitle" :model-value="searchProductsTitle"/>
    </div>
    <div class="products-search__item">
      <categories-select :category="searchProductsCategory" @update:modelValue="updateSearchProductsCategory"/>
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
      searchProductsTitle: "",
      searchProductsCategory: ""
    }
  },
  methods: {
    updateSearchProductsTitle(text) {
      this.searchProductsTitle = text

      const {searchProductsTitle, searchProductsCategory} = this
      this.$emit('update-search-products', {title: searchProductsTitle, category: searchProductsCategory})
    },
    updateSearchProductsCategory(category) {
      this.searchProductsCategory = category

      const {searchProductsTitle, searchProductsCategory} = this
      this.$emit('update-search-products', {title: searchProductsTitle, category: searchProductsCategory})
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
}
</style>
