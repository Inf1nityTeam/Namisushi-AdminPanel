<template>
  <button :type="type" :class="['base-button', className]">
    <svg-icon v-if="iconSrc" :icon="iconSrc"/>
    <span>
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: "base-button",
  props: {
    iconSrc: {type: String, default: null},
    type: {type: String, default: "button"},
    className: {type: String, default: ""}
  },
}
</script>

<style scoped lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;

  position: relative;

  border-radius: 8px;
  border: none;
  outline: none;

  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.3s ease 0s;
  background-color: #1454F2;
  padding: 0 47px;
  font-family: Manrope, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  text-align: center;

  color: #FFFFFF;
  @media (any-hover: hover) {
    &:hover {
      background-color: #5E8CFF;
    }
  }
  &:active {
      background-color: #033ED2;
  }
  &.outline {
    font-weight: 400;
    background-color: #fff;
    @media (any-hover: hover) {
      &:hover {
        border: 1px solid #1454F2;
        color: #1454F2;
      }
    }
  }
}
</style>

<style lang="scss">
.base-button {
  svg {
    margin-right: 10px;
    position: relative;
    z-index: 3;
  }

  .el-icon {
    margin-right: 10px;
  }
}
</style>
