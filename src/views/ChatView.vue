<script setup>
import ChatContainer from '../components/ChatContainer.vue'
import ChatInput from '../components/ChatInput.vue'
</script>

<template>
  <div class="chat-view">
    <div class="chat-header">
      <h1>DongGPT ✈️</h1>
    </div>
    <ChatContainer />
    <ChatInput />
  </div>
</template>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-primary);
}

.chat-header {
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(135deg, #7cb9f5 0%, var(--bg-secondary) 100%);
}

.chat-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--bg-primary);
}
</style>