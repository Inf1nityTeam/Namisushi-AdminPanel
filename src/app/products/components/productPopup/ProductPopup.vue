<template>
  <div class="product-popup">
    <base-popup>

      <div>
        <add-product-photo/>
      </div>

      <div>
        <ingredients-tag/>
      </div>

      <div>
        <product-tag/>
      </div>

    </base-popup>
  </div>
</template>

<script>
import BasePopup from "@/app/common/BasePopup";
import AddProductPhoto from "@/app/products/components/productPopup/components/AddProductPhoto";
// Cat select
import IngredientsTag from "@/app/products/components/productPopup/components/IngredientsTag";
import ProductTag from "@/app/products/components/productPopup/components/ProductTag";

export default {
  name: "product-popup",
  components: { BasePopup, AddProductPhoto, IngredientsTag, ProductTag },
  data() {
    return {
    }
  },
}
</script>

<style scoped lang="scss">

</style>
