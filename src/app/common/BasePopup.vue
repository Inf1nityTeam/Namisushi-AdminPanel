<template>
  <div class="base-popup">
    <el-dialog
        v-model="visible"
        width="462px"
        center>
      <template #title>
        <div class="base-popup__header">
          <img src="@/assets/image/products/modal-icon-edit.svg" alt=""/>
          <span>{{ title }}</span>
        </div>
      </template>

      <div class="base-popup__content"
           v-loading="loading">
        <slot/>
      </div>

      <template #footer>
        <div class="base-popup__footer">
          <base-button @click="clickSubmit">Сохранить</base-button>
        </div>
      </template>

    </el-dialog>
  </div>
</template>

<script>
import BaseButton from "@/app/common/BaseButton";

export default {
  name: "base-popup",
  components: { BaseButton },
  props: {
    title: { type: String },
    loading: { type: Boolean, default: true }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    visible(val) {
      if (!val) this.$emit('close')
    }
  },
  methods: {
    clickSubmit($event) {
      this.$emit('submit', $event)
    },
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.base-popup {

  &--dialog {

  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;

    > span {
      font-family: Manrope, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      color: #121212;
    }
  }

}
</style>
