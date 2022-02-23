<template>
  <div class="products-header">
    <div class="products-header__title">{{ title }}</div>
    <div class="products-header__top">
      <div class="products-header__links">
        <router-link to="/products">Продукты</router-link>
        <router-link to="/categories">Категории</router-link>
      </div>
      <div class="product-header__add-button">
        <base-button @click="$emit('open-popup', $event)">Добавить продукт</base-button>
      </div>
    </div>
    <div class="products-header__bottom">
      <div class="products-header__bottom--item">
        <search-input @update:modelValue="updateSearchProductTitle" :model-value="searchProductTitle"/>
      </div>
      <div class="products-header__bottom--item">
        <categories-select :category="searchProductCategory" @update:modelValue="updateSearchProductCategory" />
      </div>
    </div>

  </div>
</template>

<script>
import BaseButton from "@/app/common/BaseButton";
import SearchInput from "@/app/common/SearchInput";
import CategoriesSelect from "@/app/common/CategoriesSelect";

export default {
  name: "products-header",
  components: {CategoriesSelect, SearchInput, BaseButton},
  data() {
    return {
      searchProductTitle: "",
      searchProductCategory: ""
    }
  },
  methods: {
    updateSearchProductTitle(text) {
      this.searchProductTitle = text

      const { searchProductTitle, searchProductCategory } = this
      this.$emit('update-search-product', {title: searchProductTitle, category: searchProductCategory})
    },
    updateSearchProductCategory(category) {
      this.searchProductCategory = category

      const { searchProductTitle, searchProductCategory } = this
      this.$emit('update-search-product', {title: searchProductTitle, category: searchProductCategory})
    }
  },
  computed: {
    title() {
      return this.$route.path === '/products' ? 'Продукты' : 'Категории'
    }
  }
}
</script>


<style scoped lang="scss">
.products-header {
  &__top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 27px;
  }

  &__title {
    color: #07103A;
    font-size: 20px;
    font-weight: 700;
    font-family: Raleway, sans-serif;

    margin-bottom: 15px;
  }

  &__add-btn {
    max-width: 216px;
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &__bottom {
    display: flex;
    margin: 0 -7px;
  }

  &__bottom--item {
    flex: 0 1 50%;
    padding: 0 7px;
  }

  &__links {
    display: flex;
    flex: 1 1 auto;
    > a {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      font-weight: 500;
      color: #404040;
      font-family: Raleway, sans-serif;

      border-radius: 8px;

      padding: 1px 18px;
      min-height: 38px;
      margin-right: 8px;

      font-size: 14px;
      text-decoration: none;

      transition: all 0.3s ease 0s;
    }
  }
}
</style>

<style lang="scss">
.products-header {
  .el-input {
    &__inner {
      border: none;
      box-shadow: 5px 5px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #FAFBFF;
    }
  }

  .router-link-active {
    background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
    color: #fff !important;
  }
}
</style>
