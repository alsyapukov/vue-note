<template>
  <li class="note">
    <div class="note__title">
      <span v-if="note.title">{{ note.title }}</span>
      <span v-else>Unnamed title</span>
    </div>
    <div class="note__todo">
      <TodoList :todos="note.todos"/>
    </div>
    <div class="note__options">
      <div class="note__edit">
        <Button theme="green" :isMobile="true" @click="editRoute">Edit</Button>
      </div>
      <div class="note__remove">
        <Button theme="red" :isMobile="true" @click="modalRemove = !modalRemove">Remove</Button>
      </div>
    </div>

    <Modal v-model="modalRemove">
      <div slot="header">Attention!</div>
      <div>Are you sure you want to remove the note {{ note.title }}?</div>
      <div slot="footer">
        <div class="modal__otions">
          <div class="options__item">
            <Button theme="red" @click="noteRemoveAction(index)">Remove</Button>
          </div>
          <div class="options__item">
            <Button theme="green" @click="modalRemove = !modalRemove">Cancel</Button>
          </div>
        </div>
      </div>
    </Modal>

  </li>
</template>

<script>
import TodoList from './TodoList'
import Button from '@/components/base/Button'
import Modal from '@/components/base/Modal'
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    TodoList,
    Button,
    Modal
  },
  data() {
    return {
      modalRemove: false
    };
  },
  methods: {
    ...mapActions("notes", ["noteRemoveAction"]),
    editRoute() {
      this.$router.push({
        name: 'Edit',
        params: {
          id: this.index
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.note {
  min-height: 100px;
  padding: 20px;
  background-color: #ececec;
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
  
  &__title {
    font-size: 20px;
  }

  &__todo {
    margin-top: 20px;
  }

  &__options {
    display: flex;
    margin-top: 20px;
  }
  &__remove {
    margin-left: 10px;
  }
}
.modal {
  &__otions {
    display: flex;
    justify-content: center;
    .options {
      &__item{
        margin-left: 20px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
.dark-theme {
  .note {
    background-color: #272727;
    color: #fff;
  }
}
@media screen and (max-width: 559px) {
  .note {
    &__options {
      flex-direction: column;
    }
    &__remove {
      margin-left: 0;
      margin-top: 10px;
    }
  }
}
</style>
