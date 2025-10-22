<script setup>
import { ref, watch, nextTick } from 'vue'
import ChatMessage from './ChatMessage.vue'
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
const messagesContainer = ref(null)

// 메시지가 추가될 때마다 스크롤
watch(() => chatStore.messages.length, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})
</script>

<template>
  <div class="chat-container" ref="messagesContainer">
    <div class="messages">
      <ChatMessage
        v-for="message in chatStore.messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth; /* 부드러운 스크롤 */
}

.messages {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>