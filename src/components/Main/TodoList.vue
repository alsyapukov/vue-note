<template>
  <ul class="todo-list">
    <Todo v-for="(todo, i) in todosFilter" :key="i" :todo="todo" :index="i" />
  </ul>
</template>

<script>
import Todo from '@/components/Main/Todo'

export default {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  components: {
    Todo
  },
  data() {
    return {};
  },
  computed: {
    todosFilter() {
      return this.todos.filter((todo, i) => i <= 2);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
}
</style>
