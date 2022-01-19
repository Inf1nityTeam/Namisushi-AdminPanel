<template>
  <el-table :data="productList"
            style="min-height: calc(100vh - 210px); width: 100%;">

    <el-table-column :prop="columnImg[0].prop"
                     :width="columnImg[0].width">
      <template #default="scope">
        <ProductPicture :img-path="`https://dev.namisushi.dn.ua${scope.row.images[0]}`"/>
      </template>
    </el-table-column>

    <el-table-column v-for="(column, i) in columns"
                     :key=i
                     :prop="column.prop"
                     :label="column.label"
                     class="table-row"
                     :width="column.width">
    </el-table-column>

    <el-table-column :prop="columnsWithBtn[0].prop"
                     :label="columnsWithBtn[0].label"
                     class="table-row"
                     :width="columnsWithBtn[0].width">
      <template #default="scope">
        <el-switch :value="scope.row.show"
                   active-color="#13ce66"
                   inactive-color="#ff4949" :width="28"
                   :active-value="true"
                   :inactive-value="false"
                   @change="changeProductStatus(scope.row)"/>
      </template>
    </el-table-column>

    <el-table-column :prop="columnsWithBtn[1].prop"
                     :label="columnsWithBtn[1].label"
                     class="table-row"
                     :width="columnsWithBtn[1].width">
      <template #default="scope">
        <el-button class="table-btn table-btn--blue" @click="clickHandler(scope.row)">
          <img src="@/assets/image/products/icons-actions.svg"></el-button>
        <el-button class="table-btn table-btn--red">
          <img src="@/assets/image/products/archive.svg">
        </el-button>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import {tableColumns} from '@/app/products/table.config'
import {productsState, UPDATE_PRODUCT_STATUS} from "@/app/products/product.state";
import ProductPicture from "@/app/products/components/ProductPicture";

export default {
  name: "ProductsTable",
  components: {ProductPicture},
  computed: {
    columns() {
      return tableColumns.filter((el) => el.prop !== 'show' && el.prop !== 'actions' && el.prop !== 'images')
    },
    columnsWithBtn() {
      return tableColumns.filter((el) => el.prop === 'show' || el.prop === 'actions')
    },
    columnImg() {
      return tableColumns.filter((el) => el.prop === 'images')
    },
    productList() {
      const mas = productsState.productsList.map((el) => {
        const currrentCategory = el.categories[0]?el.categories[0].title:"Роллы"
        return {...el, categories: currrentCategory }
      })
      //console.log(mas)
      return mas
    },
  },
  methods: {
    async changeProductStatus(currentProduct) {
      await UPDATE_PRODUCT_STATUS(currentProduct)
    },
    clickHandler(val) {
      console.log(val)
    },
  },
}
</script>

<style scoped lang="scss">
.table-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 24px;
  }

  &--blue {
    background: rgba(0, 74, 255, 0.5);
  }

  &--red {
    background: rgba(255, 88, 88, 0.5);
  }
}
</style>