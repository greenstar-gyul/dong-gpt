<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

// marked 설정
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true
})

const renderedContent = computed(() => {
  return marked(props.message.content)
})
</script>

<template>
  <div class="message" :class="message.role">
    <div class="message-content">
      <div class="message-text" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  padding: 1rem;
}

.message.user {
  background-color: var(--bg-user);
  border-radius: 18px;
  align-self: flex-end;
  max-width: 70%;
}

.message.assistant {
  align-self: flex-start;
  width: 100%;
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
  line-height: 1.6;
  word-break: break-word;
}

/* 마크다운 스타일링 */
.message-text :deep(pre) {
  background-color: #0d1117;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.5rem 0;
}

.message-text :deep(code) {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
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