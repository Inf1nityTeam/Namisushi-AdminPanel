<template>
  <button class="base-button">
    <svg-icon :src="require('@/assets/image/products/icon-check.svg')"/>
    <span>
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: "base-button"
}
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;

  background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
  border-radius: 8px;
  border: none;

  cursor: pointer;

  &:hover {
    background: #1454F2;
  }

  > span {
    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;

    text-align: center;

    color: #FFFFFF;
  }
}
</style>

<style lang="scss">
.base-button svg {
  margin-right: 10px;
}
</style>
