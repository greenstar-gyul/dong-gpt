<script setup>
import { ref } from 'vue'
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
const inputText = ref('')

const sendMessage = async () => {
  if (!inputText.value.trim()) return
  
  let message = inputText.value;
  inputText.value = ''
  
  await chatStore.sendMessage(message)
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="chat-input">
    <div class="input-container">
      <textarea
        v-model="inputText"
        @keydown="handleKeydown"
        placeholder="메시지를 입력하세요..."
        rows="1"
      />
      <button @click="sendMessage" :disabled="!inputText.trim()">
        전송
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-input {
  padding: 1rem 2rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
}

.input-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
}

textarea {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  min-height: 44px;
  max-height: 200px;
}

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

button {
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>