<template>
  <div class="user-popup">
    <base-popup
        title="Редактирование пользователя"
        :loading="loading"
        @submit="submit"
        @close="close"
        ref="popup">
      user....
    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
// import BaseInput from "@/app/common/BaseInput";
// import {categoriesController} from "@/app/categories/categories.controller";
// import {copyDeep} from "@/utils/copy-deep";

export default {
  name: "user-popup",
  components: { BasePopup },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    submit() {
      this.loading = true
    },
    open() {
      this.$refs.popup.open()
    },
    close() {
      this.$refs.popup.close()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
