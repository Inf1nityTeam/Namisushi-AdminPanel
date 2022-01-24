<template>
  <div class="products-navigation">
    <div class="products-navigation__table-setup">
      <el-input
        class="search"
        v-model="searchProduct"
        type="text"
        disabled
        size="large"
        placeholder="Поиск по наименованию продукта"
        :suffix-icon="Search"
      >
        <template #suffix>
          <img
            src="@/assets/image/products/icon-search.svg"
            style="width: 32px"
          />
        </template>
      </el-input>
      <commonSelect
        class="products-navigation-bar-select"
        @getSelectedCategories="getSelectedCategories"
        :isClearList="isClearCategoriesList"
        :currentClass="'products-navigation-bar-select'"
        :isMultiple="false"
      />
    </div>
  </div>
</template>

<script>
import {
  productsState,
  GET_PRODUCTS,
} from "@/app/product_&_category/product.state";
import {
  categoriesState,
  GET_CATEGORIES,
} from "@/app/product_&_category/category.state";
import CommonSelect from "@/app/product_&_category/components/CommonSelect.vue";

export default {
  name: "ProductsNavigationBar",
  components: { CommonSelect },
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
  data() {
    return {
      searchProduct: "",
    };
  },
};
</script>

<style lang="scss">
.products-navigation {
  height: 70px;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  box-sizing: border-box;

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
    .el-input__suffix-inner {
      margin-right: 4px;
    }
    input {
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-sizing: border-box;
      box-shadow: 5px 5px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #fafbff;
      border-radius: 8px;
      font-family: Manrope;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;

      color: #646464;

      &:hover,
      &:focus {
        border: 1px solid rgba(255, 255, 255, 0.4) !important;
        box-shadow: 5px 5px 15px rgba(0, 74, 255, 0.15), -5px -5px 10px #fafbff;
      }
    }
  }

  &-bar-select {
    .el-input__inner {
      padding-left: 16px;
    }
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
