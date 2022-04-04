<template>
  <label class="login-input" :class="{focused, error: hasError}">
    <div class="login-input__icon">
      <slot/>
    </div>
    <input
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="focused = true"
        @blur="focused = false"
        :type="type"
        :placeholder="placeholder"
        autocomplete="off"
        class="input"
    >
    <span v-if="error" class="login-input__error">{{error}}</span>
  </label>
</template>

<script>
export default {
  name: "login-input",
  model: {event: 'input', prop: 'modelValue'},
  data() {
    return {
      focused: false
    }
  },
  props: {
    type: {type: String, default: 'text'},
    error: {type: String},
    hasError: {type: Boolean, default: false},
    modelValue: {type: String},
    placeholder: {type: String}
  }
}
</script>

<style lang="scss">
.login-input {
  display: flex;
  position: relative;

  padding-left: 12px;
  border-bottom: 1px solid #8A8A8A;

  transition: border-bottom-color 0.3s ease 0s;
  &.focused {
    border-bottom-color: #384673;
    .login-input__icon {
      path {
        fill: #384673;
      }
    }
  }
  &.focused {
    border-bottom-color: #384673;
    .login-input__icon {
      path {
        fill: #384673;
      }
    }
  }
  &.error {
    border-bottom-color: #F90D0D;
    .login-input__icon {
      path {
        fill: #F90D0D;
      }
    }
  }
  .input {
    display: block;
    border: none;
    outline: none;
    color: #676767;
    font-family: "Raleway", sans-serif;
    font-size: 18px;

    min-height: 51px;
    width: 100%;
    border-radius: 0 !important;

    @media (max-width: $md1+px) {
      font-size: 16px;
    }

    &::placeholder {
      font-size: 18px;
      color: #676767;
      @media (max-width: $md1+px) {
        font-size: 16px;
      }
    }
  }
  &__error {
    font-family: "Raleway", sans-serif;
    color: #F90D0D;

    position: absolute;
    bottom: -22px;
    left: 0;
  }
  &__icon {
    margin-right: 24px;
    align-self: center;

    cursor: pointer;
    svg {
      height: 28px;
      width: 28px;
      @media (max-width: $md1+px) {
        height: 24px;
        width: 24px;
      }
      @media (any-hover: hover) {
        &:hover {
          path {
            fill: #384673;
          }
        }
      }
    }
    path {
      transition: fill 0.3s ease 0s;
    }

    @media (max-width: $md1+px) {
      margin-right: 16px;
    }
  }

}
</style>
