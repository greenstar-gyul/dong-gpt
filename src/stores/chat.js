import { defineStore } from 'pinia'
import { ref } from 'vue'
import OpenAI from 'openai'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const selectedModel = ref('gpt-5-nano')

  // 환경변수에서 가져오기
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
  // const BASE_URL = import.meta.env.VITE_API_URL

  // OpenAI 클라이언트 초기화
  const openai = new OpenAI({
    apiKey: API_KEY,
    // baseURL: BASE_URL,
    dangerouslyAllowBrowser: true
  })

  // 사용 가능한 모델 목록
  const availableModels = [
    { value: 'gpt-5-nano', label: 'GPT-5 Nano' },
    { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  ]

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content
    }
    messages.value.push(userMessage)

    isLoading.value = true

    try {
      const response = await openai.chat.completions.create({
        model: selectedModel.value,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant. When providing code, always use proper markdown code blocks with language specification (e.g., ```javascript, ```python). Format your responses clearly with markdown.'
          },
          ...messages.value.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ]
      })

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.choices[0].message.content,
        model: response.model
      }
      messages.value.push(aiMessage)

      console.log('API 응답:', response);

    } catch (error) {
      console.error('API 호출 실패:', error)
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다.'
      }
      messages.value.push(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  return {
    messages,
    isLoading,
    selectedModel,
    availableModels,
    sendMessage
  }
})
