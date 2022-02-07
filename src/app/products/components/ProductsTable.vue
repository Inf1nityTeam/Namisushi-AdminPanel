<template>
  <el-table
      class="general-table"
      v-loading="loading"
      :data="products"
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
            active-color="#13ce66"
            inactive-color="#ff4949"
            :width="28"
            :active-value="true"
            :inactive-value="false"/>
      </template>
    </el-table-column>

    <el-table-column
        label="Действия"
        prop="show">

    </el-table-column>

  </el-table>
</template>

<script>
import {productsController} from "@/app/products/products.controller";

export default {
  name: "products-table",
  data() {
    return {
      loading: false,
      products: [],
      total: 0
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      const data = await productsController.getProducts()
      console.log(data)
      this.products = data.products
      this.total = data.total
    }
  }
}
</script>

<style scoped lang="scss">

</style>
