<template>
      <base-pagination
          :model-value="currentPage"
          :total="totalProductsCount"
          :pages="pagesCount"
          @update:modelValue="setNewPage"
      />
</template>

<script>
import {productsState} from "@/app/products/products.state";
import BasePagination from "@/app/common/BasePagination";

export default {
  name: "products-pagination",
  components: {BasePagination},
  methods: {
    setNewPage(page) {
      productsState.pagination.currentPage = page
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

</style>
