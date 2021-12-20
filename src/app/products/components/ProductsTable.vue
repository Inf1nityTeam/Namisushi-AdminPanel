<template>
  <el-table :data="productList"
            max-height="calc(100% - 140px)"
            style="max-width: 100%;">

    <el-table-column v-for="(column, i) in columns"
                     :key=i
                     :prop="column.prop"
                     :label="column.label"
                     class="table-row"
                     :width="column.width">
    </el-table-column>

    <el-table-column v-for="(column, i) in columnsWithBtn"
                     :key=i
                     :prop="column.prop"
                     :label="column.label"
                     class="table-row"
                     :width="column.width">

      <el-switch v-if="column.prop === 'status'"
                 v-model="val"
                 active-color="#13ce66"
                 inactive-color="#ff4949" :width="28"
                 active-value="100"
                 inactive-value="0"/>

      <template v-else>
        <el-button class="table-btn table-btn--blue">
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
import {productsState} from "@/app/products/product.state";

export default {
  name: "ProductsTable",
  computed: {
    columns() {
      return tableColumns.filter((el) => el.prop !== 'status' && el.prop !== 'actions')
    },
    columnsWithBtn() {
      return tableColumns.filter((el) => el.prop === 'status' || el.prop === 'actions')
    },
    productList() {
      return productsState.currentProducts
    }
  },
  data() {
    return {
      val: 100
    }
  }
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