<template>
  <div class="checkbox">
    <input
      class="checkbox__input"
      type="checkbox"
      :disabled="disabled"
      v-model="isChecked"
    />
    <label class="checkbox__text">{{ title }}</label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: false
    };
  },
  mounted() {
    if(this.$attrs.value) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  },
  watch: {
    '$attrs.value'(val) {
      this.isChecked = val;
    },
    isChecked(val) {
      this.valueChange(val);
    },
  },
  methods: {
    valueChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  
  &__input {
    width: 16px;
    height: 16px;
  }
  &__text {
    margin-left: 10px;
  }
}
</style>
