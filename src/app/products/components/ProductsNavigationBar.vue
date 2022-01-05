<template>
  <div class="products-navigation">

    <div class="products-navigation__title">Продукты</div>

    <div class="products-navigation__setup">

      <el-select v-model=activeCategoryTitle
                 placeholder="Выберите категорию"
                 @change="changeCurrentCategory">
        <el-option
            v-for="(item, i) in categoriesList"
            :key="i"
            :label="item.title"
            :value="item.title"
        >
        </el-option>
      </el-select>

      <ProductsModalWindow/>

      <el-button class="products-navigation__btn products-navigation__btn--small">
        <img src="@/assets/image/products/settings.svg">
      </el-button>

    </div>

  </div>
</template>

<script>
import {productsState, GET_PRODUCTS} from "@/app/products/product.state";
import {categoriesState, GET_CATEGORIES} from "@/app/products/category.state";
import ProductsModalWindow from "@/app/products/modalWindow/ProductsModalWindow";

export default {
  name: "ProductsNavigationBar",
  components: {ProductsModalWindow},
  mounted() {
    GET_CATEGORIES()
  },
  computed: {
    categoriesList() {
      return categoriesState.categoriesList
    }
  },
  data() {
    return {
      activeCategoryTitle: null
    }
  },
  methods: {
    changeCurrentCategory(categoryTitle) {
      const activeCategory = this.categoriesList.filter(el => el.title === categoryTitle)[0]
      this.activeCategoryTitle = activeCategory.title
      productsState.activeCategoryId = activeCategory._id
      productsState.currentPage = 1
      GET_PRODUCTS()
    }
  }
}
</script>

<style scoped lang="scss">

.products-navigation {
  height: 63px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

  &__setup {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
  }

  &__title {
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #060E2E;
    margin-left: 9px;
  }

  &__btn {
    height: 36px;
    border-radius: 8px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    > img {
      width: 20px;
    }

    &--small {
      background: rgba(0, 74, 255, 0.5);
      width: 36px;
    }
  }
}
</style>