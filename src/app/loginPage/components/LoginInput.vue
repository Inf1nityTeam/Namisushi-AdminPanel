<template>
  <label class="login-input">
    <div class="login-input__icon">
      <slot/>
    </div>
    <input
        @input="$emit('update:modelValue', $event.target.value)"
        :type="type"
        :placeholder="placeholder"
        autocomplete="off"
        class="input"
    >
  </label>
</template>

<script>
export default {
  name: "login-input",
  model: {event: 'input', prop: 'modelValue'},
  props: {
    type: {type: String, default: 'text'},
    modelValue: {type: String},
    placeholder: {type: String}
  }
}
</script>

<style lang="scss">
.login-input {
  display: flex;

  padding-left: 12px;
  border-bottom: 1px solid #8A8A8A;

  .input {
    font-family: "Raleway", sans-serif;
    display: block;
    border: none;
    width: 100%;
    color: #676767;
    outline: none;
    font-size: 18px;
    min-height: 51px;
    border-radius: 0 !important;

    &::placeholder {
      font-size: 18px;
      color: #676767;
    }
  }

  &__icon {
    margin-right: 24px;
    align-self: center;
  }

}
</style>
