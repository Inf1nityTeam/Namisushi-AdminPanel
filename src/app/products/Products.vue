<template>
  <div class="products">
    <products-search />

    <div class="products__table">
      <products-table
          ref="productsTable"
          @edit="editProduct"
      />
    </div>

    <base-pagination
        :model-value="currentPage"
        :total="totalProductsCount"
        :pages="pagesCount"
        @update:modelValue="setNewPage"
    />

    <product-popup ref="productPopup" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import BasePagination from "@/app/common/BasePagination";
import ProductsSearch from "@/app/products/components/ProductsSearch";
import {productsState} from "@/app/products/products.state";

export default {
  name: "products",
  components: {BasePagination, ProductsTable, ProductPopup, ProductsSearch },
  methods: {
    editProduct(product) {
      this.$refs.productPopup.open(product)
    },
    setNewPage(page) {
      productsState.pagination.currentPage = page
      this.updateTable(page)
    },
    updateTable(newPage) {
      this.$refs.productsTable.getProducts(newPage)
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.totalProductsCount / this.limit)
    },
    totalProductsCount() {
      return productsState.totalProductsCount
    },
    limit() {
      return productsState.pagination.limit
    },
    currentPage() {
      return productsState.pagination.currentPage
    }
  }
}
</script>

<style scoped lang="scss">
.products {
  &__table {
    margin-top: 20px;
    margin-bottom: 25px;
  }
}
</style>
