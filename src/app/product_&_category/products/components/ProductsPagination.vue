<template>
  <div class="products-pagination">
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
  background: #fff;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  box-shadow: 10px 10px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #fafbff;
  border-radius: 0 0 8px 8px;

  .el-pager {
    .number {
      box-sizing: border-box;
      width: 20px;
      height: 28px;
      text-align: center;
      font-family: Manrope;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #212121;
      transition: 0.1ms;
    }

    .active {
      color: #fff;
      border-radius: 50%;
      border: none;
      background: linear-gradient(210.51deg, #709df3 5.3%, #1757f3 90.07%);
    }
  }
  .el-pagination {
    --el-pagination-button-width: 28px;
  }
}
</style>
