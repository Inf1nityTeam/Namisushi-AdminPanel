<template>
  <div class="send-sms-popup">
    <base-popup
        title="SMS-рассылка"
        :loading="loading"
        @submit="submit"
        @close="close"
        ref="popup">
      sms....
    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
// import BaseInput from "@/app/common/BaseInput";
// import {categoriesController} from "@/app/categories/categories.controller";
// import {copyDeep} from "@/utils/copy-deep";

export default {
  name: "send-sms-popup",
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
