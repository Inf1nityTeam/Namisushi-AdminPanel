<template>
  <div class="pagination">
    <el-pagination
        v-model:currentPage="currentPage"
        background
        :page-sizes="[1,2,3,4,5,10, 20, 30, 40, productCount]"
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
    GET_PRODUCTS(this.currentProductsLimit, this.currentPage)
  },
  data() {
    return {
      currentPage: 1,
      currentProductsLimit:20
    }
  },
  methods: {
    changeLimitValue(val) {
      GET_PRODUCTS(val, this.currentPage)
      this.currentProductsLimit = val
      console.log('handleSizeChange' + val)
    },
    changePageValue(val) {
      GET_PRODUCTS(this.currentProductsLimit, val)
      console.log('handleCurrentChange' + val)
    },
    async openAnotherPage() {
      //this.tableHeight = document.getElementsByClassName('products')[0].clientHeight
      // this.rowCount = Math.floor((this.tableHeight - 63 - 75 - 46) / 120)
      //await GET_PRODUCTS(this.rowCount, this.currentPage)
      //this.pageCount = Math.ceil(this.productCount / this.rowCount)
    }
  },
  computed:{
    productCount(){
      return productsState.productsCount
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