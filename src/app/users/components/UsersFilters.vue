<template>
  <div class="users-filters"
       :class="{ 'users-filters--focus': isFocus }">
    <div class="users-filters__item">
      <input type="text"
             @focus="isFocus = true"
             @blur="isFocus = false"
             placeholder="Поиск по имени и e-mail">
    </div>
    <div class="users-filters__item">
      <input type="text"
             @focus="isFocus = true"
             @blur="isFocus = false"
             placeholder="Поиск по номеру телефона">
    </div>
    <div class="users-filters__item">
      <input type="text"
             @focus="isFocus = true"
             @blur="isFocus = false"
             placeholder="Поиск по адресу">
    </div>
  </div>
</template>

<script>
export default {
  name: "users-filters",
  data() {
    return {
      isFocus: false
    }
  }
}
</script>


<style lang="scss">
.users-filters {
  margin-top: 16px!important;
  margin-bottom: 16px!important;

  display: flex;
  align-items: center;

  padding-left: 16px!important;
  padding-right: 16px!important;
  box-sizing: border-box;

  width: 100%;
  max-width: 1200px;
  height: 50px;

  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;

  transition: 200ms;

  &:hover, &.users-filters--focus {
    border-color: #1857F3;
  }

  &__item {
    border-right: 1px solid #E3E3E3;
    min-width: 260px;
    &:last-child {
      border-right: none;
    }
    > input {
      width: 100%;
      border: none;
      padding-left: 16px;

      font-family: Manrope, sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #6A6A6A;

      &:hover {
        &::placeholder {
          color: #1857F3;
        }
      }

      &::placeholder {
        font-family: Manrope, sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #C4C4C4;
        transition: 200ms;
      }

    }
  }

}
</style>
