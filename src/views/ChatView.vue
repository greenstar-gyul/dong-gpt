<script setup>
import ChatContainer from '../components/ChatContainer.vue'
import ChatInput from '../components/ChatInput.vue'
</script>

<template>
  <div class="chat-view">
    <div class="chat-header">
      <h1>DongGPT</h1>
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
  background-color: var(--bg-secondary);
}

.chat-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}
</style>