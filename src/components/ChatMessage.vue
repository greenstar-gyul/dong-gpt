<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="message-group" :class="message.role">
    <div class="avatar user"> {{ message.role === 'user' ? '🤷' : '💡' }}</div>
    <div class="message" :class="message.role">    
      <div class="message-content">
        <!-- <div class="message-role">{{ message.role === 'user' ? '나' : message.model ? 'AI ' + message.model : 'AI' }}</div> -->
        <div class="message-text">{{ message.content }}</div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.message-group {
    display: flex;
    gap: 12px;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    animation: fadeIn 0.4s ease-out;    
}

.message-group.user{
  flex-direction: row-reverse;
}

.message {
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  min-width: 80%;
}

.message.user {
  background-color: var(--bg-user);
  align-self: flex-end;
  text-align: right;
}

.message.assistant {
  border: 2px solid var(--bg-user);
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

.user .message-text {
  text-align: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px dashed var(--bg-user);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
</style>