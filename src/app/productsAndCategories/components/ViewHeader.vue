<template>
  <div class="view-header">
    <div class="view-header__title">{{ title }}</div>
    <div class="view-header__content">
      <div class="view-header__links">
        <router-link to="/products">Продукты</router-link>
        <router-link to="/categories">Категории</router-link>
      </div>
      <div class="product-header__add-button">
        <base-button @click="$emit('open-popup', $event)">{{ btnTitle }}</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/app/common/BaseButton";

export default {
  name: "view-header",
  components: {BaseButton},

  computed: {
    isProductsPage() {
      return this.$route.path === '/products'
    },
    title() {
      return this.isProductsPage ? 'Продукты' : 'Категории'
    },
    btnTitle() {
      return this.isProductsPage ? 'Добавить продукт' : 'Добавить категорию'
    }
  }
}
</script>


<style scoped lang="scss">
.view-header {
  &__content {
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
.view-header {
  .el-input {
    &__inner {
      border: none;
      box-shadow: 5px 5px 10px rgba(0, 74, 255, 0.05), -5px -5px 10px #FAFBFF;
    }
  }

  .router-link-exact-active {
    background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
    color: #fff !important;
  }
}
</style>
