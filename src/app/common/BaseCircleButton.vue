<template>
  <button class="base-circle-button">
    <img src="@/assets/image/products/icon-check.svg" alt="">
  </button>
</template>

<script>
export default {
  name: "base-circle-button"
}
</script>

<style scoped lang="scss">
.base-circle-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
  border-radius: 8px;
  border: none;

  cursor: pointer;

  &:hover {
    background: #1454F2;
  }

}
</style>
