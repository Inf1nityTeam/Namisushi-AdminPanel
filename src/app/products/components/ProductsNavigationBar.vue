<template>
  <div class="products-navigation">
    <div class="products-navigation__title">Продукты</div>

    <div class="products-navigation__btn-setup">
      <div>
        <ProductsBtn
          :btnConfig="{ title: 'Продукты', height: '38px', width: '103px' }"
        />
        <ProductsBtn
          :btnConfig="{
            title: 'Категории',
            height: '38px',
            width: '107px',
            isNotActive: true,
          }"
        />
      </div>

      <ProductsModalWindow />
    </div>

    <div class="products-navigation__table-setup">
      <el-input
        size="large"
        placeholder="Please Input"
        :suffix-icon="Search"
      ></el-input>
      <CategoriesSelect
        class="products-navigation-bar-select"
        @getSelectedCategories="getSelectedCategories"
        :isClearList="isClearCategoriesList"
        :currentClass="'products-navigation-bar-select'"
        :isMultiple="false"
      />
    </div>
    <!-- <el-select
      v-model="activeCategoryTitle"
      placeholder="Выберите категорию"
      @change="changeCurrentCategory"
    >
      <el-option
        v-for="(item, i) in categoriesList"
        :key="i"
        :label="item.title"
        :value="item.title"
      >
      </el-option>
    </el-select> -->
  </div>
</template>

<script>
import { productsState, GET_PRODUCTS } from "@/app/products/product.state";
import { categoriesState, GET_CATEGORIES } from "@/app/products/category.state";
import ProductsModalWindow from "@/app/products/modalWindow/ProductsModalWindow";
import ProductsBtn from "@/app/products/ProductsBtn.vue";
import CategoriesSelect from "@/app/products/modalWindow/components/CategoriesSelect";

export default {
  name: "ProductsNavigationBar",
  components: { ProductsModalWindow, ProductsBtn, CategoriesSelect },
  mounted() {
    GET_CATEGORIES();
  },
  computed: {
    categoriesList() {
      return categoriesState.categoriesList;
    },
  },
  methods: {
    getSelectedCategories(val) {
      productsState.activeCategoryId = val[0];
      productsState.currentPage = 1;
      GET_PRODUCTS();
    },
  },
};
</script>

<style lang="scss">
.products-navigation {
  height: 180px;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  box-sizing: border-box;

  &__btn-setup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    width: 100%;

    > div:first-child {
      display: flex;
      gap: 20px;
    }
  }
  &__table-setup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-input,
    .el-select {
      width: calc(50% - 7px);
    }
    .el-input__inner {
      min-height: 50px !important;
    }
    .el-select {
      > div {
        > div {
          width: 100% !important;
        }
      }
    }
  }

  &-bar-select {
    .el-input__inner {
      padding-left: 16px;
    }
  }

  &__title {
    font-family: Raleway;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    color: #07103a;
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
