<template>
  <div class="base-popup">
    <el-dialog
        class="base-popup--dialog"
        v-model="visible"
        title="Добавить продукт"
        width="462px"
        center>
      <template #title>
        <div class="base-popup__header">
          <img src="@/assets/image/products/modal-icon-edit.svg" alt=""/>
          <span>Добавить продукт</span>
        </div>
      </template>

      <div class="base-popup__content">
        <slot/>
      </div>

      <template #footer>
        <div class="base-popup__footer">
          <base-button/>
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
  data() {
    return {
      visible: true
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
