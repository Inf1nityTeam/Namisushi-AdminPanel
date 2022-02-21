<template>
  <div class="base-input-number">
    <span
        v-if="label"
        class="base-input-number__label"
    >
      <span>{{ label }}</span>
    </span>
    <div class="base-input-number__item">
      <button
          type="button"
          :disabled="disableDecreaseButton"
          class="base-input-number__decrease"
          @click="$emit('update:modelValue', modelValue - step)"
      >
        <el-icon>
          <minus/>
        </el-icon>
      </button>
      <input
          type="number"
          ref="input"
          :value="modelValue"
          @change="changeValue"
      />
      <button
          type="button"
          :disabled="disableIncreaseButton"
          class="base-input-number__increase"
          @click="$emit('update:modelValue', modelValue + step)"
      >
        <el-icon>
          <plus/>
        </el-icon>
      </button>
    </div>
  </div>
</template>

<script>
import {Plus, Minus} from '@element-plus/icons-vue'
export default {
  name: "base-input-number",
  components: {Plus, Minus},
  model: {event: "change", prop: "modelValue"},
  props: {
    modelValue: {type: Number},
    step: {type: Number, default: 1},
    label: {type: String},
    min: {type: Number, default: -Infinity},
    max: {type: Number, default: Infinity}
  },
  methods: {
    changeValue($event) {
      const value = +$event.target.value
      if (value > this.max) {
        this.$emit('update:modelValue', 100)
      } else if (value < this.min) {
        this.$emit('update:modelValue', 0)
      }
      this.$nextTick(() => {
        this.$refs.input.value = String(this.modelValue)
      })
    }
  },
  computed: {
    disableIncreaseButton() {
      return this.modelValue >= this.max
    },
    disableDecreaseButton() {
      return this.modelValue <= this.min
    },
  },
  emits: ['update:modelValue']
}
</script>


<style scoped lang="scss">
.base-input-number {
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  input[type="number"]:hover,
  input[type="number"]:focus {
    -moz-appearance: number-input;
  }

  width: 204px;

  &__label {
    display: block;
    margin-bottom: -8px;
    padding-left: 13px;
    position: relative;
    z-index: 3;

    span {
      display: inline-block;
      padding: 0 3px;

      background-color: #fff;

      position: relative;
      z-index: 5;

      font-size: 12px;
      color: #585858;
      font-family: Manrope, sans-serif;
    }
  }

  &__item {
    padding: 0 12px;
    width: 100%;
    height: 50px;
    display: flex;

    border: 1px solid #E8E8E8;
    input {
      height: 100%;
      width: 100%;
      border: none;
      outline: none;
      padding: 0 12px;
      text-align: center;
    }
  }

  &__decrease,
  &__increase {
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;

    border: none;
    cursor: pointer;

    flex: 0 0 24px;
    height: 24px;

    border-radius: 6px;

    background-color: rgba(106, 106, 106, 0.26);
    transition: background-color 0.3s ease 0s;

    &:disabled {
      cursor: not-allowed;
    }

    &:not(:disabled) {
      @media (any-hover: hover) {
        &:hover {
          background-color: #1454F2;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.base-input-number {
  .el-icon {
    color: #fff;
  }
}
</style>
