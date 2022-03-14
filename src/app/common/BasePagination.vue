<template>
  <div class="pagination" v-if="pages">
    <button
        type="button"
        @click="goToPrev"
        class="pagination__control pagination__control--prev"
        :class="{ 'pagination__control--active': isPrevControlsActive}"
    >
      <svg-icon :icon="require('@/assets/image/base-icons/icon-arrow.svg')"/>
    </button>
    <ul class="pagination__list">
      <li
          v-for="page in pagination"
          class="pagination__item"
          :key="page"
      >
        <span v-if="page === null">...</span>
        <button
            v-else
            @click="$emit('update:modelValue', page)"
            class="pagination__page"
            :class="{'pagination__page--active': page === modelValue}"
        >
          {{ page }}
        </button>
      </li>

    </ul>
    <button
        type="button"
        @click="goToNext"
        class="pagination__control pagination__control--next"
        :class="{ 'pagination__control--active': isNextControlsActive}"
    >
      <svg-icon :icon="require('@/assets/image/base-icons/icon-arrow.svg')"/>
    </button>
    <div class="pagination__total">Всего: {{ total }}</div>
  </div>
</template>

<script>
import SvgIcon from "@/app/common/SvgIcon";

export default {
  name: 'base-pagination',
  components: {SvgIcon},
  props: {
    pages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    rangeSize: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      required: true
    },
  },
  emits: ['update:modelValue'],
  computed: {
    pagination() {
      const res = [];
      const minPaginationElems = 5 + this.rangeSize * 2;

      let rangeStart = this.pages <= minPaginationElems ? 1 : this.modelValue - this.rangeSize;
      let rangeEnd = this.pages <= minPaginationElems ? this.pages : this.modelValue + this.rangeSize;

      rangeEnd = rangeEnd > this.pages ? this.pages : rangeEnd;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;

      if (this.pages > minPaginationElems) {
        const isStartBoundaryReached = rangeStart - 1 < 3;
        const isEndBoundaryReached = this.pages - rangeEnd < 3;

        if (isStartBoundaryReached) {
          rangeEnd = minPaginationElems - 2;
          for (let i = 1; i < rangeStart; i++) {
            res.push(i);
          }
        } else {
          res.push(1);
          res.push(null);
        }

        if (isEndBoundaryReached) {
          rangeStart = this.pages - (minPaginationElems - 3);
          for (let i = rangeStart; i <= this.pages; i++) {
            res.push(i);
          }
        } else {
          for (let i = rangeStart; i <= rangeEnd; i++) {
            res.push(i);
          }
          res.push(null);
          res.push(this.pages);
        }
      } else {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          res.push(i);
        }
      }
      return res;
    },
    isPrevControlsActive() {
      return this.modelValue > 1;
    },
    isNextControlsActive() {
      return this.modelValue < this.pages;
    }
  },

  methods: {
    goToPrev() {
      if (this.isPrevControlsActive) {
        this.$emit('update:modelValue', this.modelValue - 1);
      }
    },

    goToNext() {
      if (this.isNextControlsActive) {
        this.$emit('update:modelValue', this.modelValue + 1);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 20px;
  border-top: 1px solid #F0F0F0;
  &__list {
    display: inline-flex;
  }

  &__item {
    &:not(:last-child) {
      margin-right: 2px;
    }

    > span {
      display: inline-block;
      line-height: 28px;
      margin: 0 13px;
    }
  }

  &__control {
    padding: 0;
    margin: 0;

    border: none;
    line-height: 1;

    cursor: not-allowed;
    background: none;

    display: inline-flex;
    align-items: center;

    &--prev {
      margin-right: 18px;
    }

    &--next {
      margin-left: 18px;
      transform: rotate(180deg);
    }

    &--active {
      cursor: pointer;
    }
  }

  &__page {
    padding: 2px;
    min-height: 28px;
    min-width: 28px;

    border-radius: 50%;
    background: none;
    border: none;

    cursor: pointer;
    font-family: Manrope, sans-serif;
    font-weight: 400;
    font-size: 12px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    &--active {
      color: #fff;
      background: linear-gradient(180deg, #719DF2 0%, #1454F2 100%);
    }
    @media (any-hover: hover) {
      &:hover:not(&--active) {
        color: #1454F2;
      }
    }
  }

  &__total {
    font-family: Manrope, sans-serif;
    font-size: 12px;
    color: #212121;

    margin-left: 35px;
  }
}
</style>

<style lang="scss">
.pagination {
  &__control {
    &--active {
      @media (any-hover: hover) {
        &:hover {
          path {
            fill: #1454F2;
          }
        }
      }
    }
  }
}
</style>
