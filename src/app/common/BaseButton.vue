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

  cursor: pointer;
  overflow: hidden;

  background-color: #1454F2;
  padding: 0 47px;
  &::after {
    content: "";
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    transition: opacity 0.3s ease;

    background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);

    opacity: 1;
  }
  > span {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
  }
  @media (any-hover: hover) {
    &:hover {
      &::after {
        opacity: 0;
      }
    }
  }

  &.outline {
    > span {
      font-weight: 400;
    }
    background-color: #fff;
    @media (any-hover: hover) {
      &:hover {
        border: 1px solid #1454F2;
        > span {
          color: #1454F2;
        }
      }
    }
  }
  > span {
    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;

    text-align: center;
    transition: color 0.3s ease 0s;

    color: #FFFFFF;
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
