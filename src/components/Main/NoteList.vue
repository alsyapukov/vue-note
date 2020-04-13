<template>
  <ul class="note-list" v-if="getNotes && getNotes.length">
    <Note v-for="(note, i) in getNotes" :key="i" :note="note" :index="i" />
  </ul>
  <div v-else class="note-list__empty">
    <p>You don't have any notes yet!</p>
    <p>Click on the plus circle and create a note :)</p>
  </div>
</template>

<script>
import Note from "./Note";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Note
  },
  data() {
    return {};
  },
  mounted() {
    this.notesAction();
  },
  computed: {
    ...mapGetters("notes", ["getNotes"])
  },
  methods: {
    ...mapActions("notes", ["notesAction"])
  }
};
</script>

<style lang="scss" scoped>
.note-list {
  display: flex;
  flex-direction: column;
  &__empty {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 22px;
    line-height: 36px;
  }
}
</style>
