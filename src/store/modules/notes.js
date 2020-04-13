import Vue from 'vue'

const state = {
  notes: []
}

const getters = {
  getNotes: state => {
    if (!state.notes) return []
    return state.notes
  }
}

const actions = {
  notesAction({ commit }) {
    const notes = JSON.parse(Vue.localStorage.get('notes'));
    if(!notes) Vue.localStorage.set('notes', JSON.stringify([]));

    commit('notesMutate', JSON.parse(Vue.localStorage.get('notes')));
  },
  noteSaveAction({ commit }, {index, note}) {
    commit('noteSaveMutate', {index, note});
    commit('noteSetLocalStorageMutate');
  },
  noteAddAction({ commit }) {
    commit('noteAddMutate', noteSimple);
    commit('noteSetLocalStorageMutate');
  },
  noteRemoveAction({ commit }, index) {
    commit('noteRemoveMutate', index);
    commit('noteSetLocalStorageMutate');
  }
}

const mutations = {
  noteSetLocalStorageMutate() {
    Vue.localStorage.set('notes', JSON.stringify(state.notes));
  },
  notesMutate(state, value) {
    state.notes = value;
  },
  noteSaveMutate(state, value) {
    Vue.set(state.notes , value.index, value.note)
  },
  noteAddMutate(state, value) {
    state.notes.push(value)
  },
  noteRemoveMutate(state, value) {
    Vue.delete(state.notes , value)
  },
}

const noteSimple = {
  title: null,
  todos: [
    {
      title: null,
      value: false
    }
  ]
}

export default {
  namespaced: true,
  namespace: 'notes',
  state,
  getters,
  actions,
  mutations
}
