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
    />

    <product-popup ref="productPopup" @update="updateTable" />

  </div>
</template>

<script>
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductPopup from "@/app/products/components/productPopup/ProductPopup";
import BasePagination from "@/app/common/BasePagination";
import ProductsSearch from "@/app/products/components/ProductsSearch";

export default {
  name: "products",
  components: {BasePagination, ProductsTable, ProductPopup, ProductsSearch },
  data() {
    return {
      page: 1,
      limit: 5
    }
  },
  methods: {
    updateSearchProductsData(data) {
      this.$refs.productsTable.updateSearchProductsData(data)
    },
    editProduct(product) {
      this.$refs.productPopup.open(product)
    },
    updateTable() {
      // this.$refs.productsTable.updateTable(product)
      console.log('lke')
    }
  },
  computed: {
    pagesCount() {
      return Math.ceil(this.totalProductsCount / this.limit)
    },
    totalProductsCount() {

    }
  }
}
</script>
