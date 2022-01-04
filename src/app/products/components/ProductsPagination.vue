<template>
  <div class="pagination">
    <el-pagination
        v-model:currentPage="currentPage"
        background
        :page-sizes="[1,2,3,4,5,10, 20, 30, 40]"
        :page-size="currentProductsLimit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="productCount"
        @size-change="changeLimitValue"
        @current-change="changePageValue"
    ></el-pagination>
  </div>
</template>

<script>
import {GET_PRODUCTS, productsState} from "@/app/products/product.state";

export default {
  name: "ProductsPagination",
  mounted() {
    GET_PRODUCTS()
  },
  methods: {
    changeLimitValue(currentLimit) {
      productsState.currentLimit = currentLimit
      GET_PRODUCTS()
    },
    changePageValue(currentPage) {
      productsState.currentPage = currentPage
      GET_PRODUCTS()
    },
  },
  computed:{
    productCount(){
      return productsState.productsCount
    },
    currentPage(){
      return productsState.currentPage
    },
    currentProductsLimit(){
      return productsState.currentLimit
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  //position: absolute;
  //bottom: 0;
  width: 100%;
}
</style>