<template>
  <el-table
      class="general-table"
      v-loading="loading"
      :data="filteredProducts"
      :total="limit"
      style="min-height: calc(100vh - 363px); width: 100%">

    <el-table-column prop="images" width="120">
      <template #default="scope">
        <el-image
            v-if="scope.row.images?.[0]"
            style="width: 80px; height: 80px"
            :src="scope.row.images[0]"
            :preview-src-list="scope.row.images"
            :initial-index="4"
            fit="cover"/>
      </template>
    </el-table-column>

    <el-table-column
        label="Наименование"
        prop="title"/>

    <el-table-column
        label="Категория"
        prop="categories">
      <template #default="scope">
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
  props: {
    currentPage: { type: Number, required: true},
    limit: { type: Number, required: true}
  },
  created() {
    this.getProducts(this.currentPage, this.limit)
  },
  methods: {
    getProducts(page, limit) {
      productsState.loading = true

      productsController.getProducts(page, limit)
      .then(data => {
        productsState.products = data.products
        productsState.totalProductsCount = data.total
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
    filteredProducts() {
      let filteredProducts = copyDeep(this.products)

      if (this.searchData.categories.length > 0) {
        const categories = this.searchData.categories

        filteredProducts = filteredProducts.filter(product => {

          if (product.categories.length === 0) return false

          let isTruthyValue = true

          for (let i = 0; i < categories.length; ++i) {
            const category = categories[i]

            const isFalsyValue = !product.categories.some(productCategory => productCategory._id === JSON.parse(category)._id)

            if (isFalsyValue) {
              isTruthyValue = false
            }
          }

          return isTruthyValue
        })
      }


      if (this.searchData.title) {
        const title = this.searchData.title

        filteredProducts = filteredProducts.filter(product => {
          return product.title.toLowerCase().includes(title.toLowerCase())
        })
      }

      return filteredProducts
    },
    searchData() {
      return productsState.searchData
    },
    products() {
      return productsState.products
    },
    loading() {
      return productsState.loading
    }
  },
  watch: {
    async currentPage(newPage) {
      await this.getProducts(newPage, this.limit)
    }
  }
}
</script>

<style scoped lang="scss">
.general-table {
  &--actions {
    display: flex;
  }
}
</style>

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
</style>
