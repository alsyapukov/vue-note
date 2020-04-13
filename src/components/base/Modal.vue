<template>
  <transition name="modal--fade">
    <div class="modal" v-if="view">
      <div class="modal__wrap">
        <div class="modal__header">
          <slot name="header" />
        </div>

        <div class="modal__body">
          <slot />
        </div>

        <div class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    theme: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      view: false
    };
  },
  destroyed() {
    document.body.style.overflow = null;
  },
  watch: {
    "$attrs.value"(val) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    }
  },
  methods: {
    hide() {
      this.view = false;
      this.$emit("hide");
      document.body.style.overflow = null;
    },
    show() {
      this.view = true;
      this.$emit("show");
      document.body.style.overflow = "hidden";
    },
    toggle(val) {
      if (val) {
        this.hide();
      } else {
        this.show();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.2);

  &__wrap {
    background-color: #fff;
    position: relative;
  }

  &__header {
    padding: 20px;
  }
  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
  &__body {
    padding: 20px;
  }
}
.dark-theme {
  .modal {
    background: rgba(255, 255, 255, 0.1);
    &__wrap {
      background-color: #272727;
    }
  }
}
@media screen and (min-width: 560px) {
  .modal--fade-enter-active,
  .modal--fade-leave-active {
    opacity: 1;
    transition: opacity .3s;
  }
  .modal--fade-enter,
  .modal--fade-leave-to {
    opacity: 0;
  }
  .modal {
    &__wrap {
      min-width: 500px;
      max-width: 700px;
      min-height: 200px;
      max-height: calc(100vh - 200px);
    }
  }
}
@media screen and (max-width: 559px) {
  .modal--fade-enter-active,
  .modal--fade-leave-active {
    transform: translateX(0%);
    transition: transform .3s ease-in;
  }
  .modal--fade-enter,
  .modal--fade-leave-to {
    transform: translateX(100%);
  }
  .modal {
    &__wrap {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
