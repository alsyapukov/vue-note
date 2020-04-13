<template>
  <div class="textbox">
    <p class="textbox__title" v-if="title">{{ title }}</p>
    <input class="textbox__inner" :type="type" v-model.lazy="value" placeholder="Input text" />
  </div>
</template>

<script>
export default {
  name: "TextBox",
  props: {
    title: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      value: null
    };
  },
  mounted() {
    if (this.$attrs.value) {
      this.value = this.$attrs.value;
    }
  },
  watch: {
    "$attrs.value"(val) {
      this.value = val;
    },
    value(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.textbox {
  width: 100%;
  &__title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  &__inner {
    outline: none;
    appearance: none;
    width: 100%;
    border: 1px solid transparent;
    padding: 10px 20px;
    height: 48px;
    font-size: 16px;
    background: #fff;
    border-radius: 4px;
    transition: box-shadow 0.3s;

    &:focus {
      box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.2);
    }
  }
}
.dark-theme {
  .textbox {
    width: 100%;
    &__title {
      font-size: 16px;
      margin-bottom: 10px;
    }
    &__inner {
      background-color: #383838;
      color: #fff;
    }
  }
}
</style>
