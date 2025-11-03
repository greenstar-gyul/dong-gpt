<script setup>
import { ref, nextTick } from 'vue'
import { useChatStore } from '../stores/chat'

const chatStore = useChatStore()
const inputText = ref('')
const textareaRef = ref(null)

const adjustTextareaHeight = () => {
  if (!textareaRef.value) return

  textareaRef.value.style.height = 'auto'
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
}

const sendMessage = async () => {
  if (!inputText.value.trim()) return

  let message = inputText.value;
  inputText.value = ''

  await nextTick()
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
  }

  await chatStore.sendMessage(message)
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const handleInput = () => {
  adjustTextareaHeight()
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
        ref="textareaRef"
        v-model="inputText"
        @input="handleInput"
        @keydown="handleKeydown"
        placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
        rows="1"
        :disabled="chatStore.isLoading"
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
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
}

.model-select {
  padding: 0.75rem 1rem;
  border: 2px solid #97c7f7;
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 150px;
  height: 50px;
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
    height: auto;
    min-height: 50px;
    max-height: 200px;
    padding: 12px 16px;
    border: 2px solid #97c7f7 ;
    border-radius: 8px;
    font-size: 15px;
    font-family: inherit;
    line-height: 1.5;
    outline: none;
    resize: none;
    transition: border-color 0.3s;
    overflow-y: auto;
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