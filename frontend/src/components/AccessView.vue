<template>
  <input
    class="w-full bg-gray-300 py-5 px-3 rounded-xl"
    type="text"
    v-model="user"
    placeholder="type your message here..."
  />
  <button @click="login">Login</button>
</template>

<script setup>
import gql from 'graphql-tag'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'

const route = useRoute()
const router = useRouter()
const store = useStore()
const user = ref('')

const Mutation = gql`
  mutation CreateUsername($username: String!) {
    createUsername(username: $username) {
      id
      username
    }
  }
`

const { mutate } = useMutation(Mutation)

const createOrGetUser = async (username) => {
  try {
    const response = await mutate({
      username
    })
    return response
  } catch (e) {
    console.log('AccessView: ', e)
  }
}
const login = async () => {
  const { data } = await createOrGetUser(user.value)

  router.push({
    path: '/home',
    query: { id: data.createUsername.id, username: data.createUsername.username }
  })
}
</script>
