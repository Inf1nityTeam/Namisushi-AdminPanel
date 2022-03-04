<template>
  <div class="products">
    <products-search @update-search-products="updateSearchProductsData" />
    <base-pagination
        :model-value="page"
        :total="totalProductsCount"
        :pages="pagesCount"
        @update:modelValue="page = $event"
    />

    <products-table
        ref="productsTable"
        :current-page="page"
        :limit="limit"
        @edit="editProduct"
        @set-products-count="setProductsCount"
    />

    <product-popup ref="productPopup" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import BasePagination from "@/app/common/BasePagination";
import ProductsSearch from "@/app/products/components/ProductsSearch";

export default {
  name: "products",
  components: {ProductsSearch, BasePagination, ProductsTable, ProductPopup },
  data() {
    return {
      page: 1,
      totalProductsCount: 0,
      limit: 5
    }
  },
  methods: {
    updateSearchProductsData(productsInfo) {
      this.$refs.productsTable.updateSearchProductsData(productsInfo)
    },
    setProductsCount(productsCount) {
      this.totalProductsCount = productsCount
    },
    editProduct(product) {
      this.$refs.productPopup.open(product)
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.totalProductsCount / this.limit)
    }
  }
}
</script>
