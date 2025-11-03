<script setup>
import { computed } from 'vue'
import { marked } from '@/utils/markdown'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const renderedContent = computed(() => {
  // assistant 메시지만 마크다운 렌더링
  if (props.message.role === 'assistant') {
    return marked.parse(props.message.content)
  }
  return props.message.content
})
</script>

<template>
  <div class="message-group" :class="message.role">
    <div class="avatar user"> {{ message.role === 'user' ? '🤷' : '💡' }}</div>
    <div class="message-content">
      <div v-if="message.role === 'assistant'" class="message-text" v-html="renderedContent"></div>
      <div v-else class="message-text">{{ renderedContent }}</div>
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
  border-radius: 18px;
  align-self: flex-end;
  text-align: right;
}

.message.assistant {
  border: 2px solid var(--bg-user);
  background-color: var(--bg-assistant);
  align-self: flex-start;
  width: 100%;
}

.message-content {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
}

.message-group.user .message-content {
  background-color: rgba(0, 0, 0, 0.08);
}

.message-role {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.message-text {
  color: var(--text-primary);
  line-height: 1.6;
  word-break: break-word;
}

.user .message-text {
  text-align: left;
  white-space: pre-wrap;
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

/* 마크다운 스타일링 */
.message-text :deep(pre) {
  background-color: #0d1117;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.5rem 0;
}

.message-text :deep(pre code) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  background: none;
}

.message-text :deep(:not(pre) > code) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  color: #e83e8c;
}

.message-text :deep(p) {
  margin: 0.5rem 0;
}

.message-text :deep(p:first-child) {
  margin-top: 0;
}

.message-text :deep(p:last-child) {
  margin-bottom: 0;
}

.message-text :deep(ul, ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.message-text :deep(li) {
  margin: 0.25rem 0;
}

.message-text :deep(blockquote) {
  border-left: 3px solid var(--border-color);
  padding-left: 1rem;
  margin: 0.5rem 0;
  color: var(--text-secondary);
}

.message-text :deep(a) {
  color: var(--accent-color);
  text-decoration: none;
}

.message-text :deep(a:hover) {
  text-decoration: underline;
}
</style>
