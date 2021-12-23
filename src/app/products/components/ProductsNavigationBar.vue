<template>
  <div class="products-navigation">

    <div class="products-navigation__title">Продукты</div>

    <div class="products-navigation__setup">
      <el-select placeholder="Выберите категорию">
        <el-option
            v-for="(item, i) in categoriesList"
            :key="i"
            :label="item.title"
            :value="item.title"
        >
        </el-option>
      </el-select>

      <el-button class="products-navigation__btn products-navigation__btn--long">Новый продукт</el-button>

      <el-button class="products-navigation__btn products-navigation__btn--small">
        <img src="@/assets/image/products/settings.svg">
      </el-button>

    </div>

  </div>
</template>

<script>
import {categoriesState, GET_CATEGORIES} from "@/app/products/category.state";

export default {
  name: "ProductsNavigationBar",
  mounted() {
    GET_CATEGORIES()
  },
  computed:{
    categoriesList(){
      return categoriesState.categoriesList
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

    &--long {
      font-family: Ubuntu;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      color: #FFFFFF;
      width: 142px;
      background: #004AFF;
      margin-right: 15px;
    }

    &--small {
      background: rgba(0, 74, 255, 0.5);
      width: 36px;
    }
  }
}
</style>