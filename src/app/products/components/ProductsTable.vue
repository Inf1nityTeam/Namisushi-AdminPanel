<template>
  <el-table
      class="general-table"
      v-loading="loading"
      :data="filteredProducts"
      :total="limit"
      empty-text="Нету продуктов"
      style="min-height: calc(100vh - 363px); width: 100%">

    <el-table-column prop="images" width="120">
      <template #default="scope">
        <el-image
            v-if="scope.row.images?.[0]"
            style="width: 80px; height: 80px"
            :src="scope.row.images[0]"
            :preview-src-list="scope.row.images"
            :initial-index="4"
            fit="contain"/>
      </template>
    </el-table-column>

    <el-table-column
        label="Наименование"
        prop="title"/>

    <el-table-column
        label="Категория"
        prop="categories">
      <template #default="scope">
        <template v-if="scope.row.categories.length === 0">-</template>
        <div v-for="(category, index) in scope.row.categories" :key="category._id">
          {{category.title}}
          <template v-if="index !== scope.row.categories.length - 1">, </template>
        </div>
      </template>
    </el-table-column>

    <el-table-column
        label="Список ингридиентов"
        prop="ingredients">
      <template #default="scope">
        <template v-if="scope.row.ingredients.length === 0">-</template>
        <span v-for="(item, index) in scope.row.ingredients" :key="item">
          {{ item }}
          <template v-if="index !== scope.row.ingredients.length - 1">, </template>
        </span>
      </template>
    </el-table-column>

    <el-table-column
        label="Вес, г"
        prop="weight"
        width="100"/>

    <el-table-column
        label="Стоимость"
        prop="cost"
        width="auto"/>

    <el-table-column
        label="Статус"
        prop="show">
      <template #default="scope">
        <el-switch
            @change="toggleBan($event, scope.row._id, scope.$index)"
            :value="scope.row.show"
            active-color="#F90D0D"
            inactive-color="#D7D7D7"
            :width="28"
            :active-value="true"
            :inactive-value="false"/>
      </template>
    </el-table-column>

    <el-table-column
        label="Действия"
        prop="show">
      <template #default="scope">
        <div class="general-table--actions">
          <base-circle-button
              icon="edit"
              @click="$emit('edit', scope.row)"/>
          <el-popconfirm
              title="Вы уверены что хотите удалить этот продукт?"
              confirm-button-text="Да"
              cancel-button-text="Нет"
              @confirm="deleteProduct(scope.row._id, scope.$index)"
          >
            <template #reference>
              <base-circle-button icon="delete" type="delete"/>
            </template>
          </el-popconfirm>
        </div>
      </template>

    </el-table-column>

  </el-table>
</template>

<script>
import {productsController} from "@/app/products/products.controller";
import BaseCircleButton from "@/app/common/BaseCircleButton";
import {copyDeep} from "@/utils/copy-deep";
import {productsState} from "@/app/products/products.state";

export default {
  name: "products-table",
  components: {BaseCircleButton},
  emits: ['edit'],
  created() {
    this.getProducts(this.currentPage)
  },
  methods: {
    getProducts(page) {
      const {limit, category} = this
      productsState.loading = true

      productsController.getProducts({limit, category, page})
      .then(() => {
        productsState.loading = false
      })
    },
    deleteProduct(id, index) {
      productsController.deleteProduct(id)
      .then(() => {
        productsState.products.splice(index, 1)
        productsState.totalProductsCount -= 1
      })
    },
    toggleBan(value, id, index) {
      productsController.toggleBan({show: value}, id)
      .then(data => {
        productsState.products[index].show = data.product.show
      })
    }
  },
  computed: {
    limit() {
      return productsState.pagination.limit
    },
    category() {
      return productsState.searchData.category
    },
    filteredProducts() {
      let filteredProducts = copyDeep(this.products)

      if (this.searchTitle) {
        const title = this.searchTitle

        filteredProducts = filteredProducts.filter(product => {
          return product.title.toLowerCase().includes(title.toLowerCase())
        })
      }

      return filteredProducts
    },
    searchTitle() {
      return productsState.searchData.title
    },
    products() {
      return productsState.products
    },
    loading() {
      return productsState.loading
    },
    currentPage() {
      return productsState.pagination.currentPage
    }
  },
}
</script>

<style lang="scss">
.general-table {
  &--actions {
    display: flex;
  }

  .el-switch {
    height: 16px;
    &__action {
      width: 12px;
      height: 12px;
      top: 50%;
      transform: translate(0, -50%);
      left: 2px;

    }
    &__core {
      border-radius: 28px;
      height: 16px;
    }
    &.is-checked .el-switch__action {
      margin-left: -13px;
    }
  }
  &.el-table {

    th {
      border-bottom: 1px solid rgba(29, 91, 243, 0.39) !important;

      font-family: Manrope, sans-serif;
      color: #6A6A6A;
      font-weight: 400;
    }
    tr {
      font-family: Manrope, sans-serif;
      color: #212121;
      font-weight: 400;
      line-height: calc(18 / 14 * 100%);
    }

    td.el-table__cell {
      > .cell {
        transition: all 0.3s ease 0s;

        word-break: normal;
        line-height: calc(18 / 14 * 100%);
      }
    }
    &.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
      color: #757575;
      background: none;
    }
  }
}
.el-table {
  &__empty-text {
    font-family: Manrope, sans-serif;
    color: #6A6A6A;
    font-weight: 400;
  }
}
</style>
