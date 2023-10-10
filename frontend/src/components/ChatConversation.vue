<template>
  <div v-if="!result" class="overflow-auto hover:overflow-scroll w-1/5">
    <div v-show="loading">Loading..</div>
  </div>
  <div class="w-full px-5 flex flex-col justify-between">
    <div v-if="result" class="flex flex-col mt-5 overflow-auto hover:overflow-scroll">
      <div v-for="(message, id) in result.messages" :key="id">
        <div v-if="senderId === message.sender.id" class="flex justify-end mb-4">
          <div
            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
          >
            {{ message.body }} {{ message.sender.username }}
          </div>
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>
        <div v-if="senderId != message.sender.id" class="flex justify-start mb-4">
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div
            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
          >
            {{ message.body }} {{ message.sender.username }}
          </div>
        </div>
      </div>
      <div v-for="(message, id) in newMessage" :key="id">
        <div v-if="senderId === message.sender.id" class="flex justify-end mb-4">
          <div
            class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
          >
            {{ message.body }} {{ message.sender.username }}
          </div>
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>
        <div v-if="senderId != message.sender.id" class="flex justify-start mb-4">
          <img
            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
            class="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div
            class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
          >
            {{ message.body }} {{ message.sender.username }}
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
      <input
        class="w-full bg-gray-300 py-5 px-3 rounded-xl"
        type="text"
        v-model="messageToSend"
        placeholder="type your message here..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script setup>
import gql from 'graphql-tag'
import { watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useQuery, useSubscription, useMutation } from '@vue/apollo-composable'

const store = useStore()
const conversationId = computed(() => store.getters['getConversation'])
const messageToSend = ref('')
const newMessage = ref([])
const props = defineProps(['user'])
const senderId = props.user.id

const Messages = gql`
  query Messages($conversationId: String) {
    messages(conversationId: $conversationId) {
      body
      createdAt
      id
      sender {
        id
        username
      }
    }
  }
`

const { result, loading, error, refetch } = useQuery(Messages, {
  conversationId: conversationId.value
})

const Subscription = gql`
  subscription Subscription($conversationId: String) {
    messageSent(conversationId: $conversationId) {
      body
      createdAt
      id
      sender {
        id
        username
      }
    }
  }
`

const {
  result: messageSent,
  loading: subscriptionLoading,
  error: subscriptionError
} = useSubscription(Subscription, () => ({
  conversationId: conversationId.value
}))

const Mutation = gql`
  mutation SendMessage($conversationId: String, $senderId: String, $body: String) {
    sendMessage(conversationId: $conversationId, senderId: $senderId, body: $body)
  }
`

const { mutate } = useMutation(Mutation)

const sendMessage = async () => {
  try {
    await mutate({
      conversationId: conversationId.value,
      senderId,
      body: messageToSend.value
    })
  } catch (e) {
    console.log('ChatConversation: ', e)
  }
}

watch(messageSent, (data) => {
  newMessage.value.push(data.messageSent)
})

watch(conversationId, (newConversationId) => {
  newMessage.value = []
  refetch({ conversationId: newConversationId })
})
</script>
