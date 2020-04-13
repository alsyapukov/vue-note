<template>
  <div class="note" v-if="noteModify">
    <div class="note__title">
      <TextBox v-model="note.title" title="Title of the note" @input="changeTitle" />
    </div>
    <div class="note__todos">
      <div class="note__todos-title">Your todos</div>
      <Todo
        v-for="(todo, i) in note.todos"
        @remove="removeTodo($event)"
        :key="i"
        :index="i"
        :todo="todo"
        :edit="true"
        @change="changeTodo"
        @cache="cacheTodo"
      />
      <Button class="todos__add" :isMobile="true" theme="blue" @click="addTodo">Add todo</Button>
    </div>

    <div class="note__options">
      <div class="options">
        <div class="options__item">
          <template v-if="undoMode">
            <Button theme="red" :isMobile="true" @click="undo">Undo</Button>
          </template>
          <template v-else>
            <Button theme="blue" :isMobile="true" ref="redo" @click="redo">Redo</Button>
          </template>
        </div>
        <div class="options__item">
          <Button
            theme="green"
            :isMobile="true"
            @click="modalCancelEdit = !modalCancelEdit"
          >Cancel edit</Button>
        </div>
        <div class="options__item">
          <Button theme="green" :isMobile="true" @click="saveNote">Save</Button>
        </div>
        <div class="options__item">
          <Button theme="red" :isMobile="true" @click="modalRemove = !modalRemove">Remove</Button>
        </div>
      </div>
    </div>

    <Modal v-model="modalRemove">
      <div slot="header">Attention!</div>
      <div>Are you sure you want to remove the note "{{ note.title }}" ?</div>
      <div slot="footer">
        <div class="modal__otions">
          <div class="options__item">
            <Button theme="red" @click="removeNote">Remove</Button>
          </div>
          <div class="options__item">
            <Button theme="green" @click="modalRemove = !modalRemove">Cancel</Button>
          </div>
        </div>
      </div>
    </Modal>

    <Modal v-model="modalCancelEdit">
      <div slot="header">Attention!</div>
      <div>Are you sure you want to cancel editing the note "{{ note.title }}" ?</div>
      <div slot="footer">
        <div class="modal__otions">
          <div class="options__item">
            <Button theme="red" @click="leaveToMain">Cancel edit</Button>
          </div>
          <div class="options__item">
            <Button theme="blue" @click="modalCancelEdit = !modalCancelEdit">Cancel</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import TextBox from "@/components/base/TextBox";
import Todo from "@/components/Main/Todo";
import Button from "@/components/base/Button";
import Modal from "@/components/base/Modal";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    TextBox,
    Todo,
    Button,
    Modal
  },
  data() {
    return {
      modalRemove: false,
      modalCancelEdit: false,
      noteModify: {},
      cacheValue: {},
      undoMode: true
    };
  },
  mounted() {
    this.notesAction();
    this.noteModify = this.getNotes[this.id];
    this.cacheValue = this.getNotes[this.id];
  },
  watch: {
    "note.title"(val, oVal) {
      this.cacheSave({
        title: oVal,
        todos: this.note.todos
      });
    },
    "note.todos": {
      deep: true,
      handler(val, oVal) {
        if (val && oVal && val.length != oVal.length) {
          this.cacheSave({
            title: this.note.title,
            todos: oVal
          });
        }
      }
    }
  },
  computed: {
    ...mapGetters('notes', ['getNotes']),
    note() {
      // Хак для того чтобы watch нормально следил computed
      return JSON.parse(JSON.stringify(this.noteModify));
    }
  },
  methods: {
    ...mapActions('notes', ['notesAction', 'noteSaveAction', 'noteRemoveAction']),
    undo() {
      let newNote = this.note;
      this.noteModify = this.cacheValue;
      this.cacheSave(newNote);
      this.undoMode = false;
    },
    redo() {
      let newNote = this.cacheValue;
      this.cacheSave(this.note);
      this.noteModify = newNote;
      this.undoMode = true;
    },
    cacheSave(val) {
      this.cacheValue = val;
    },
    changeTitle(e) {
      this.noteModify.title = e;
    },
    
    cacheTodo(e) {
      this.cacheSave(this.note);
      this.$set(this.cacheValue.todos, e.index, e.todo);
    },
    changeTodo(e) {
      this.$set(this.noteModify.todos, e.index, e.todo);
    },
    addTodo() {
      this.noteModify.todos.push({
        title: null,
        value: false
      });
    },
    removeTodo(index) {
      this.$delete(this.noteModify.todos, index);
    },

    leaveToMain() {
      this.$router.push({
        name: "Main"
      });
    },
    saveNote() {
      this.noteSaveAction({
        index: this.id,
        note: this.note
      });
      this.leaveToMain();
    },
    removeNote() {
      this.noteRemoveAction(this.id);
      this.leaveToMain();
    }
  }
};
</script>

<style lang="scss" scoped>
.dark-theme {
  .note {
    background-color: #272727;
  }
}
.note {
  background-color: #ececec;
  padding: 20px;
  min-height: 600px;
  width: 100%;

  &__todos {
    margin-top: 30px;
  }

  &__options {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 40px;
    .options {
      display: flex;
      justify-content: center;
      &__item {
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
.modal {
  &__otions {
    display: flex;
    justify-content: center;
    .options {
      &__item {
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .note {
    &__options {
      width: 100%;

      .options {
        width: 100%;
        flex-direction: column;
        align-items: center;

        &__item {
          margin-left: 0;
          margin-top: 10px;

          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 559px) {
  .note {
    &__options {
      .options {
        align-items: stretch;
      }
    }
  }
}
</style>
