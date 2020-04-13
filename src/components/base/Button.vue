<template>
  <button
    ref="btn"
    :type="type"
    class="button button__radius"
    :class="classesButton"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "button"
    },
    theme: {
      type: String,
      default: ""
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    classesButton() {
      return `button__${this.theme} ${this.isMobile ? `button__mobile-full` : null}`
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  min-width: 140px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 100;
  text-transform: uppercase;
  outline: none;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &__red,
  &__green,
  &__blue {
    border: 0px solid transparent;
    color: #fff;
  }

  &__red {
    background: #fb344c;
  }

  &__green {
    background: #10ea77;
  }

  &__blue {
    background: #33ccff;
  }

  &__radius {
    border-radius: 4px;
  }
}
.dark-theme {
  .button {
    color: #000;
  }
}
@media screen and (max-width: 559px) {
  .button {
    &__mobile-full {
      width: 100%;
    }
  }
}
</style>
