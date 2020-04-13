<template>
  <li class="todo">
    <div class="todo__edit edit" v-if="edit">
      <div class="edit__textbox">
        <CheckBox v-model="todo.value" @input="changeTodo" />
        <TextBox v-model="todo.title" @input="changeTodo" />
      </div>
      <div class="edit__options">
        <Button theme="red" @click="$emit('remove', index)">Remove</Button>
      </div>
    </div>

    <div class="todo__default" v-else>
      <CheckBox
        v-model="todo.value"
        :disabled="true"
        :title="todo.title ? todo.title : 'Unnamed todo'"
      />
    </div>
  </li>
</template>

<script>
import CheckBox from "@/components/base/CheckBox";
import TextBox from "@/components/base/TextBox";
import Button from "@/components/base/Button";

export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    todo: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "todo.value"(val, oldVal) {
      this.cacheTodo({
        title: this.todo.title,
        value: oldVal
      });
    },
    "todo.title"(val, oldVal) {
      this.cacheTodo({
        title: oldVal,
        value: this.todo.value
      });
    }
  },
  methods: {
    changeTodo(e) {
      this.$emit("change", {
        index: this.index,
        todo: this.todo
      });
    },
    cacheTodo(val) {
      this.$emit("cache", { 
        index: this.index,
        todo: val
      });
    }
  },
  components: {
    CheckBox,
    TextBox,
    Button
  }
};
</script>

<style lang="scss" scoped>
.todo {
  margin-top: 10px;

  &:first-child {
    margin: 0;
  }

  &__remove {
    margin-left: 20px;
  }
}
.edit {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  &__textbox {
    display: flex;
    flex-grow: 1;
  }
  &__options {
    margin-left: 20px;
  }
}
@media screen and (max-width: 767px) {
  .edit {
    flex-direction: column;
    align-items: stretch;
      &__options {
        margin-left: 0;
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
      }
  }
}
</style>
