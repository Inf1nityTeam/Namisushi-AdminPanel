<template>
  <div class="products">
    <products-search />

    <div class="products__table">
      <products-table
          ref="productsTable"
          :current-page="page"
          :limit="limit"
          @edit="editProduct"
      />
    </div>

    <base-pagination
        :model-value="page"
        :total="totalProductsCount"
        :pages="pagesCount"
        @update:modelValue="page = $event"
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
  data() {
    return {
      page: 1
    }
  },
  methods: {
    editProduct(product) {
      this.$refs.productPopup.open(product)
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
      return productsState.limit
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
