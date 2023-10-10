<template>
  <div class="h-screen flex flex-col">
    <div class="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div class="font-semibold text-2xl">Chat-room</div>
      <div
        class="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
      >
        {{ store.state.user.username.substring(0, 2) }}
      </div>
    </div>

    <div class="flex flex-1 bg-gray-100 overflow-auto">
      <UserList :user="headers" />
      <ChatConversation :user="headers" />
    </div>
  </div>
</template>

<script setup>
import UserList from './UserList.vue'
import ChatConversation from './ChatConversation.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()
const router = useRouter()
const headers = route.query

if (!store.state.user?.id) {
  router.push({ name: 'AccessView' })
}
</script>
