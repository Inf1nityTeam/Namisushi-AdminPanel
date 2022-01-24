<template>
  <div class="products-pagination general-pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      :pager-count="4"
      :page-sizes="[1, 2, 3, 4, 5, 10, 20, 30, 40]"
      :page-size="currentProductsLimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="productCount"
      @size-change="changeLimitValue"
      @current-change="changePageValue"
    ></el-pagination>
  </div>
</template>

<script>
import {
  GET_PRODUCTS,
  productsState,
} from "@/app/product_&_category/product.state";

export default {
  name: "ProductsPagination",
  mounted() {
    GET_PRODUCTS();
    // .then(() => {
    //   const pag = document
    //     .getElementsByClassName("products-pagination")[0]
    //     .getElementsByClassName("el-pagination__total")[0];
    //   if (pag) {
    //     pag.innerHTML = `Всего ${this.productCount}`;
    //   }
    // });
  },
  methods: {
    changeLimitValue(currentLimit) {
      productsState.currentLimit = currentLimit;
      GET_PRODUCTS();
    },
    changePageValue(currentPage) {
      productsState.currentPage = currentPage;
      GET_PRODUCTS();
    },
  },
  computed: {
    productCount() {
      return productsState.productsCount;
    },
    currentPage() {
      return productsState.currentPage;
    },
    currentProductsLimit() {
      return productsState.currentLimit;
    },
  },
  watch: {
    productCount() {},
  },
};
</script>

<style lang="scss">
.products-pagination {
  width: 100%;
}
</style>
