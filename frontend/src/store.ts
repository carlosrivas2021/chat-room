import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
      conversationId: ''
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    selectConversation(state, newConversationId) {
      state.conversationId = newConversationId
    }
  },
  getters: {
    getConversation: (state) => state.conversationId
  }
})

export default store
