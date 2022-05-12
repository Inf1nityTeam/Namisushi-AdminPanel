<template>
  <a v-if="isLink" class="base-circle-button" :class="type">
    <svg-icon :src="srcIcon"/>
  </a>
  <button v-else class="base-circle-button"
          :class="type">
    <svg-icon :src="srcIcon"/>
  </button>
</template>

<script>
import SvgIcon from "@/app/common/SvgIcon";

const iconsMap = new Map()
    .set('check', require('@/assets/image/base-icons/icon-check.svg'))
    .set('edit', require('@/assets/image/base-icons/icon-edit.svg'))
    .set('delete', require('@/assets/image/base-icons/icon-delete.svg'))

export default {
  name: "base-circle-button",
  components: {SvgIcon},
  props: {
    icon: {type: String, default: null},
    type: {type: String, default: null},
    isLink: {type: Boolean, default: false}
  },
  computed: {
    srcIcon() {
      const icon = iconsMap.get(this.icon)
      return icon ? icon : this.icon
    }
  }
}
</script>

<style scoped lang="scss">
.base-circle-button {
  margin: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  background: #1454F2;
  border-radius: 8px;
  border: none;

  cursor: pointer;
  transition: 200ms;

  &.delete {
    background: rgba(255, 88, 88, 0.8);

    &:hover {
      background: rgba(255, 88, 88, 0.5);
    }
  }

  &:hover {
    background: #7AA0FF;
  }

}
</style>
