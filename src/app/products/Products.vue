<template>
  <div class="products">
    <div class="products__header">
      <div class="products__header--top">
        <div class="products__header--top-add-btn">
          <base-button @click="openProductPopup">Добавить продукт</base-button>
        </div>
      </div>
      <div class="products__header--bottom">
        <div class="products__header--bottom-item">
          <search-input @update:modelValue="searchProduct" :model-value="searchProductTitle" />
        </div>
        <div class="products__header--bottom-item"></div>
      </div>

    </div>
    <products-table ref="productsTable" />


    <product-popup ref="productPopup" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import SearchInput from "@/app/products/components/SearchInput";
import BaseButton from "@/app/common/BaseButton";

export default {
  name: "products",
  components: {BaseButton, SearchInput, ProductsTable, ProductPopup },
  data() {
    return {
      searchProductTitle: ""
    }
  },
  methods: {
    openProductPopup() {
      this.$refs.productPopup.open()
    },
    searchProduct(title) {
      this.$refs.productsTable.searchProduct(title)
    }
  }
}
</script>

<style scoped lang="scss">
.products {
  &__header {
    &--top {
      margin-bottom: 27px;
    }
    &--top-add-btn {
      max-width: 216px;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    &--bottom {
      display: flex;
      margin: 0 -7px;
    }
    &--bottom-item {
      flex: 0 1 50%;
      padding: 0 7px;
    }
  }
}
</style>
