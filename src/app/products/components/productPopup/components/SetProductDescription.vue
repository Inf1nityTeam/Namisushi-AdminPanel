<template>
  <div class="set-product-description">


    <base-input
        :model-value="title"
        label="Наименование продукта"
        placeholder="Введите название продукта"
    />
    <base-input
        :model-value="title"
        label="Описание"
        placeholder="Введите описание продукта"
        tag="textarea"
    />
  </div>
</template>

<script>
import BaseInput from "@/app/common/BaseInput";

export default {
  name: "set-product-description",
  components: {BaseInput},
  props: {
    title: {type: String}
  }
}
</script>


