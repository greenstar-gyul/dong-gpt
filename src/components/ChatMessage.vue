<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="message" :class="message.role">
    <div class="message-content">
      <div class="message-role">{{ message.role === 'user' ? '나' : message.model ? 'AI ' + message.model : 'AI' }}</div>
      <div class="message-text">{{ message.content }}</div>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  padding: 1rem;
  border-radius: 8px;
}

.message.user {
  background-color: var(--bg-user);
  align-self: flex-end;
}

.message.assistant {
  background-color: var(--bg-assistant);
  align-self: flex-start;
}

.message-content {
  width: 100%;
}

.message-role {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.message-text {
  color: var(--text-primary);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>