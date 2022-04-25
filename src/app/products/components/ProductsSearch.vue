<template>
  <div class="products-search">
    <div class="products-search__item">
      <search-input @update:modelValue="searchByTitle" :model-value="title"/>
    </div>
    <div class="products-search__item">
      <categories-select
          @update:modelValue="searchByCategory"
          :model-value="category"
          :is-multiple-mode="false"
      />
    </div>
  </div>
</template>

<script>
import SearchInput from "@/app/common/SearchInput";
import CategoriesSelect from "@/app/common/CategoriesSelect";
import {productsState} from "@/app/products/products.state";
import {debounce} from "@/utils/debounce";

export default {
  name: "products-search",
  components: {CategoriesSelect, SearchInput},
  methods: {
    searchByTitle(title) {
      productsState.searchData.title = title
      this.changeFilteredProductByTitle(title)
    },
    changeFilteredProductByTitle: debounce(function(title) {
      const products = JSON.parse(JSON.stringify(this.allProducts))
      productsState.products.filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(title.toLowerCase())
      })
    }, 300),

    searchByCategory(category) {
      const products = JSON.parse(JSON.stringify(this.allProducts))
      productsState.searchData.category = category

      if (category === '') {
        productsState.products.filteredProducts = JSON.parse(JSON.stringify(this.allProducts))
        return
      }

      productsState.products.filteredProducts = products.filter(product => {
        return product.categories.some(productCategory => productCategory._id === category)
      })
    }
  },
  watch: {

  },
  computed: {
    allProducts() {
      return productsState.products.allProducts
    },
    title() {
      return productsState.searchData.title
    },
    category() {
      return productsState.searchData.category
    }
  }
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
