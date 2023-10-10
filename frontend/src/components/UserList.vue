<template>
  <div v-if="!result" class="overflow-auto hover:overflow-scroll w-1/5">
    <div v-show="loading">Loading..</div>
  </div>
  <div v-if="result" class="overflow-auto hover:overflow-scroll w-1/5">
    <!-- {{ result }} -->
    <div
      class="flex flex-row py-4 px-2 justify-center items-center border-b-2"
      v-for="(user, id) in result.searchUsers"
      :key="id"
      @click="getConversation(user.id)"
    >
      <div
        class="bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center border-r-2"
      >
        {{ user.username.substring(0, 2) }}
      </div>
      <div class="w-full mx-8">
        <div class="text-lg font-semibold">
          {{ user.username }}
        </div>
      </div>
    </div>
  </div>
  <p v-else-if="error">error: {{ error }}</p>
</template>

<script setup>
import gql from 'graphql-tag'
import { useStore } from 'vuex'
import { useQuery, useMutation } from '@vue/apollo-composable'

const store = useStore()
const props = defineProps(['user'])
const userId = props.user.id

const SearchUsers = gql`
  query SearchUsers($userId: String!) {
    searchUsers(userId: $userId) {
      id
      username
    }
  }
`

const { result, loading, error } = useQuery(SearchUsers, { userId })

const Mutation = gql`
  mutation CreateConversation($participantIds: [String]) {
    createConversation(participantIds: $participantIds) {
      id
      members {
        id
        username
      }
    }
  }
`

const { mutate } = useMutation(Mutation)

const getConversation = async (id) => {
  try {
    const response = await mutate({
      participantIds: [userId, id]
    })
    store.commit('selectConversation', response.data.createConversation.id)
  } catch (e) {
    console.log('UserList: ', e)
  }
}
</script>
