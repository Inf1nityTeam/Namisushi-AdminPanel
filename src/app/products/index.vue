<template>
  <div class="products">

    <ProductsNavigationBar/>

    <ProductsTable/>

    <div class="pagination">
      <el-pagination layout="prev, pager, next" background
                     :current-page="currentPage"
                     :default-current-page="currentPage"
                     :total="productCount"
                     :page-count="pageCount"
                     :page-size="rowCount"
                     @current-change="openAnotherPage">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {GET_CURRENT_PRODUCT_LIST, GET_PRODUCTS, productsState} from "@/app/products/product.state";
import ProductsTable from "@/app/products/components/ProductsTable";
import ProductsNavigationBar from "@/app/products/components/ProductsNavigationBar";

export default {
  components: {ProductsNavigationBar, ProductsTable},
  computed: {
    productCount() {
      return productsState.productsCount
    }
  },
  mounted() {
    GET_PRODUCTS()
    this.openAnotherPage()
    window.addEventListener('resize', () => {
      this.openAnotherPage()
    })
  },
  data() {
    return {
      currentPage: 1,
      tableHeight: 0,
      pageCount: 0,
      rowCount: 0,
      startIndex: 0,
      endIndex: 0,
    }
  },
  methods: {
    openAnotherPage(currentPage) {
      this.currentPage = currentPage || 1
      this.tableHeight = document.getElementsByClassName('products')[0].clientHeight
      this.rowCount = Math.floor((this.tableHeight - 63 - 75 - 46) / 120)
      this.startIndex = (this.currentPage - 1) * this.rowCount
      this.endIndex = this.startIndex + this.rowCount
      this.pageCount = Math.ceil(this.productCount / this.rowCount)
      GET_CURRENT_PRODUCT_LIST(this.startIndex,this.endIndex)
    }
  }
}
</script>

<style scoped lang="scss">
.products {
  height: 100%;
  position: relative;


  .pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

}
</style>
