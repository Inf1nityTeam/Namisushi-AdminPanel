<template>
  <el-table
      class="general-table"
      v-loading="loading"
      :data="filteredProducts"
      :total="total"
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
        <div v-for="category in scope.row.categories" :key="category._id">
          {{category.title}}
        </div>
      </template>
    </el-table-column>

    <el-table-column
        label="Список ингридиентов"
        prop="ingredients">
      <template #default="scope">
        <span v-for="item in scope.row.ingredients" :key="item">
          {{ item }},
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
          <base-circle-button
              icon="delete"
              type="delete"
              @click="deleteProduct(scope.row._id, scope.$index)"/>
        </div>
      </template>

    </el-table-column>

  </el-table>
</template>

<script>
import {productsController} from "@/app/products/products.controller";
import BaseCircleButton from "@/app/common/BaseCircleButton";
import {copyDeep} from "@/utils/copy-deep";

export default {
  name: "products-table",
  components: {BaseCircleButton},
  data() {
    return {
      loading: false,
      products: [],
      total: 0,
      searchProductTitle: "",
      searchProductCategory: ""
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    updateSearchProductData({title, category}) {
      this.searchProductTitle = title
      this.searchProductCategory = category
    },
    async getProducts() {
      const data = await productsController.getProducts()

      this.products = data.products
      this.total = data.total
    },
    async deleteProduct(id, index) {
      await productsController.deleteProduct(id)
      this.products.splice(index, 1)
    }
  },
  computed: {
    filteredProducts() {
      let filteredProducts = copyDeep(this.products)

      if (this.searchProductCategory) {
        filteredProducts = filteredProducts.filter(product => {

          if (product.categories.length === 0) return false

          return product.categories.some(category => {
            return category.title.toLowerCase() === this.searchProductCategory.toLowerCase()
          })
        })
      }

      if (this.searchProductTitle) {
        filteredProducts = filteredProducts.filter(product => {
          return product.title.toLowerCase().includes(this.searchProductTitle.toLowerCase())
        })
      }

      return filteredProducts
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
      top: 1px;
      left: 2px;

    }
    &__core {
      border-radius: 28px;
      height: 16px;
    }
    &.is-checked .el-switch__action {
      margin-left: -14px;
    }
  }
}
</style>
