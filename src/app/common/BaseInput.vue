<template>
  <label class="base-input"
         :class="{'base-input__error': error}">

    <div v-if="label" class="base-input__label">
      <div class="label">{{label}}</div>
      <div v-if="error && typeof error === 'string'" class="error">{{error}}</div>
    </div>

    <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)">
  </label>
</template>

<script>
export default {
  name: 'base-input',
  model: { prop: 'modelValue', event: 'input' },
  props: {
    modelValue: { type: String },
    label: { type: String },
    placeholder: { type: String, default: 'Please input' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    error: { type: [Boolean, String], default: false }
  }
}
</script>

<style scoped lang="scss">
.base-input {
  display: block;
  margin-top: 12px;
  margin-bottom: 12px;

  &__error {
    .label, .error {
      color: #F32B2A!important;
    }
    input {
      border-color: #F32B2A!important;
    }
  }

  &__label {
    padding-top: 4px;
    padding-bottom: 4px;

    display: flex;
    width: 100%;

    font-family: Rubik, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #7B7B7B;

    .error {
      margin-left: auto;
    }
  }

  > span {
    font-family: Rubik, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #7B7B7B;
  }

  input {
    padding-left: 20px;
    padding-right: 20px;

    width: 100%;
    height: 56px;

    border: 1px solid #E7E7E7;
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Rubik, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;

    color: #3D3D3D;

    &::placeholder {
      font-family: Rubik, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;

      color: #BDBCC8;
    }

    &:focus {
      border-color: #0AB258;
    }

  }

}
</style>
