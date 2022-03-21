<template>
  <div class="products-search">
    <div class="products-search__item">
      <search-input @update:modelValue="updateTitle" :model-value="title"/>
    </div>
    <div class="products-search__item">
      <categories-select
          @update:modelValue="updateCategories"
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
import {productsController} from "@/app/products/products.controller";

export default {
  name: "products-search",
  components: {CategoriesSelect, SearchInput},
  methods: {
    updateTitle(title) {
      productsState.searchData.title = title
    },
    async updateCategories(category) {
      productsState.searchData.category = category
      await this.updateTableByCategory(category)
    },
    async updateTableByCategory(category) {
      productsState.loading = true
      productsState.pagination.currentPage = 1

      const {currentPage: page, limit} = productsState.pagination

      await productsController.getProducts({category, limit, page})
          .then(() => {
            productsState.loading = false
          })
    }
  },
  computed: {
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
