<template>
  <label class="base-input"
         :class="{'base-input__error': error}">

    <span v-if="label" class="base-input__label">
      <span>{{label}}</span>
    </span>
    <component
        :is="tag"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
    ></component>
    <span v-if="error && typeof error === 'string'" class="error">{{error}}</span>
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
    error: { type: [Boolean, String], default: false },
    tag: { type: String, default: 'input'}
  }
}
</script>

<style scoped lang="scss">
.base-input {
  display: block;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 26px;
  }

  &__error {
    .label, .error {
      color: #F32B2A!important;
    }
    input {
      border-color: #F32B2A!important;
    }
  }

  &__label {
    display: block;

    margin-bottom: -8px;
    padding-left: 13px;

    color: #585858;

    span {
      display: inline-block;
      padding: 0 3px;
      background-color: #fff;

      font-size: 12px;
      color: #585858;
      font-family: Manrope, sans-serif;

      position: relative;
      z-index: 3;
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

  input,
  textarea {
    width: 100%;

    border: 1px solid #E8E8E8;
    outline: none;
    box-sizing: border-box;
    border-radius: 8px;

    font-family: Manrope, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;

    color: #585858;

    &::placeholder {
      font-family: Manrope, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;

      color: #C4C4C4;
    }
    &:focus {
      border-color: #1454F2;
    }
  }
  input {
    height: 50px;
    padding-left: 16px;
    padding-right: 16px;
  }
  textarea {
    height: 120px;
    padding: 16px;
    resize: none;
  }
}
</style>
