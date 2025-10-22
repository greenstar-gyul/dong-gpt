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
        placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
        rows="1"
      />
      <button class="send-button" @click="sendMessage" :disabled="!inputText.trim()">
       ➤ </button>
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
    min-height: 50px;
    max-height: 150px;
    padding: 12px 16px;
    border: 2px solid #97c7f7 ;
    border-radius: 8px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    resize: none;
    transition: border-color 0.3s;
    overflow-y: auto;
}

textarea:focus {
  outline: none;
  border-color: var(--accent-color);
}

button {
  width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #97c7f7 0%, var(--accent-color) 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

button:hover:not(:disabled) {
  background-color: var(--accent-hover);
}

button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>