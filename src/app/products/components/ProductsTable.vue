<template>
  <div class="table" v-if="filteredProducts.length !== 0">
      <div class="table__title"></div>
      <div class="table__title">Наименование</div>
      <div class="table__title">Описание</div>
      <div class="table__title">Категория</div>
      <div class="table__title">Список ингридиентов</div>
      <div class="table__title">Вес, г</div>
      <div class="table__title">Стоимость, ₽</div>
      <div class="table__title">Статус</div>
      <div class="table__title"></div>
    <template v-for="(product, index) in filteredProducts" :key="product._id">
      <div class="table__image">
        <el-image
            v-if="product.images?.[0]"
            style="width: 110px; height: 80px"
            :src="product.images[0]"
            :preview-src-list="product.images"
            :initial-index="4"
            fit="contain"/>
      </div>
      <div class="table__text">{{ product.title }}</div>
      <div class="table__text">{{ product.description }}</div>
      <div class="table__text">
        <template v-if="product.categories.length === 0">-</template>
        <div v-for="(category, index) in product.categories" :key="category._id">
          {{category.title}}<template v-if="index !== product.categories.length - 1">, </template>
        </div>
      </div>
      <div class="table__text">
        <template v-if="product.ingredients.length === 0">-</template>
        <template v-for="(ingredient, index) in product.ingredients" :key="ingredient">
          {{ ingredient }}<template v-if="index !== product.ingredients.length - 1">, </template>
        </template>
      </div>
      <div class="table__text">{{ product.weight }}</div>
      <div class="table__text">{{ product.cost }}</div>
      <div class="table__status">
        <el-switch
            :value="product.visible"
            @change="toggleStatus(product._id, product.visible, index)"
            active-color="#F90D0D"
            inactive-color="#D7D7D7"
            :width="28"
            :active-value="true"
            :inactive-value="false"/>
      </div>
      <div class="table__actions">
        <base-circle-button
            icon="edit"
            @click="$emit('edit', product)"/>
        <el-popconfirm
            title="Вы уверены что хотите удалить этот продукт?"
            confirm-button-text="Да"
            cancel-button-text="Нет"
        >
          <template #reference>
            <base-circle-button @click="deleteProduct(product._id, index)" icon="delete" type="delete"/>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </div>
</template>

<script>
import {productsController} from "@/app/products/products.controller";
import BaseCircleButton from "@/app/common/BaseCircleButton";
import {productsState} from "@/app/products/products.state";

export default {
  name: "products-table",
  components: {BaseCircleButton},
  emits: ['edit'],
  created() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      productsState.loading = true
      productsController.getProducts()
          .then(() => {
            productsState.loading = false
          })
    },
    deleteProduct(id, index) {
      productsController.deleteProduct(id)
      .then(() => {
        productsState.products.splice(index, 1)
      })
    },
    toggleStatus(id, status, index) {
      productsController.toggleStatus(id, {visible: !status})
      .then(data => {
        productsState.products[index].visible = data.product.visible
      })
    },
  },
  computed: {
    products() {
      return productsState.products
    },
    filteredProducts() {
      let filteredProducts = JSON.parse(JSON.stringify(this.products))

      if (this.category !== "") {
        filteredProducts = filteredProducts.filter(product => {
          return product.categories.some(productCategory => productCategory._id === this.category)
        })
      }

      if (this.title !== "") {
        filteredProducts = filteredProducts.filter(product => {
          return product.title.toLowerCase().includes(this.title.toLowerCase())
        })
      }

      return filteredProducts
    },
    loading() {
      return productsState.loading
    },
    title() {
      return productsState.searchData.title
    },
    category() {
      return productsState.searchData.category
    }
  },
}
</script>

<style lang="scss" scoped>
.table {
  display: grid;
  grid-template-columns: 110px 2fr 4fr 2fr 2fr 1fr 1fr 1fr 1fr;

  &__title {
    font-family: Manrope, sans-serif;
    color: #6A6A6A;
    font-size: 12px;
    font-weight: 400;

    padding: 14px 14px 10px;
    border-bottom: 1px solid rgba(29, 91, 243, 0.39);
  }

  &__text {
    padding: 26px 14px;

    font-size: 14px;
    font-family: Manrope, sans-serif;
    color: #212121;
    font-weight: 400;
    line-height: calc(18 / 14 * 100%);
  }

  &__actions {
    display: flex;
    padding: 16px 14px;
  }
  &__image {
    padding: 26px 0 16px;
  }
  &__status {
    padding: 26px 14px 16px;
  }
}
</style>

<style lang="scss">
.table {
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
  .el-loading-spinner {
    top: 0 !important;
    margin: 0 !important;
  }
}
</style>
