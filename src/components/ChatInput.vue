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
      <select
        v-model="chatStore.selectedModel"
        :disabled="chatStore.isLoading"
        class="model-select"
      >
        <option
          v-for="model in chatStore.availableModels"
          :key="model.value"
          :value="model.value"
        >
          {{ model.label }}
        </option>
      </select>
      <textarea
        v-model="inputText"
        @keydown="handleKeydown"
        placeholder="메시지를 입력하세요..."
        rows="1"
        :disabled="chatStore.isLoading"
      />
      <button @click="sendMessage" :disabled="!inputText.trim() || chatStore.isLoading">
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
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  width: 100%;
}

.model-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;
  height: 44px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  padding-right: 2.5rem;
}

.model-select:hover:not(:disabled) {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.model-select:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.model-select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--bg-secondary);
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