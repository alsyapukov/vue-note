<template>
  <div class="options">
    <div @click="changeTheme" class="change-theme"></div>
    <div 
      v-if="$route.name === 'Main'"
      @click="noteAdd" 
      class="create-note"
    >
      <div class="create-note__plus">+</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Options",
  data() {
    return {
      dark: false
    };
  },
  mounted() {
    this.initTheme();
  },
  computed: {
    ...mapGetters("notes", ["getNotes"]),
    ...mapState("notes", ["notes"])
  },
  methods: {
    ...mapActions("notes", ["noteAddAction", "notesAction"]),
    noteAdd() {
      if (!this.notes) {
        this.notesAction();
      }
      this.noteAddAction();

      this.$router.push({
        name: "Edit",
        params: {
          id: this.getNotes.length - 1
        }
      });
    },
    changeTheme() {
      this.dark = !this.dark;
      this.$localStorage.set("dark", JSON.stringify(this.dark));
      this.$emit("changeTheme", this.dark);
    },
    initTheme() {
      this.dark = JSON.parse(this.$localStorage.get("dark"));
      this.$emit("changeTheme", this.dark);
    }
  }
};
</script>

<style lang="scss" scoped>
.options {
  position: fixed;
  bottom: 100px;
  right: 100px;
  .change-theme,
  .create-note {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 1px 12px rgba(0, 0, 0, 0.6);
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0px 1px 18px rgba(0, 0, 0, 0.8);
    }
  }
  .change-theme {
    background-color: #272727;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%20width%3D%2248%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22m0%200h48v48h-48z%22%2F%3E%3Cpath%20d%3D%22m19.4673411%2011.2326905c-4.4129352%202.0784574-7.4673411%206.5661861-7.4673411%2011.7673095%200%207.1797017%205.8202983%2013%2013%2013%205.20282%200%209.6917798-3.0563989%2011.7693427-7.4716601-4.5466308%201.9925303-10.2748059.9391439-14.2570083-3.0430585-3.9809128-3.9809129-5.0349062-9.7066677-3.0449933-14.2525909z%22%20fill%3D%22%23fff%22%20stroke%3D%22%23fff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  }
  .create-note {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1dc17a;
    margin-top: 20px;

    &__plus {
      font-size: 50px;
      color: #fff;
    }
  }
}
@media screen and (max-width: 559px) {
  .options {
    bottom: 40px;
    right: 20px;
  }
}
</style>
