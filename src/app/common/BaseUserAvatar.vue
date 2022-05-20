<template>
  <div class="base-user-avatar"
       v-html="userAvatar"/>
</template>

<script>
import {toSvg} from "jdenticon";

export default {
  name: "base-user-avatar",
  props: {
    avatar: { type: String, required: true },
    size: { type: Number, default: 36 }
  },
  computed: {
    userAvatar: function () {
      return toSvg(this.avatar, this.size)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-user-avatar {
  width: max-content;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #062D4E;
  border-radius: 50%;

  background-color: #FFFFFF;
}
</style>
