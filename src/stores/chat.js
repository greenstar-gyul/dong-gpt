import { defineStore } from 'pinia'
import { ref } from 'vue'
import OpenAI from 'openai'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const selectedModel = ref('gpt-5-nano')

  // 환경변수에서 가져오기
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

  // OpenAI 클라이언트 초기화
  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // 테스트 전용 (실서비스는 백엔드 프록시)
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
      const response = await openai.responses.create({
        model: selectedModel.value,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: 'You are a helpful assistant. When providing code, always use proper markdown code blocks with language specification (e.g., ```javascript, ```python). Format your responses clearly with markdown.'
              }
            ]
          },
          ...messages.value.map(msg => ({
            role: msg.role,
            content: [
              {
                type: 'text',
                text: msg.content
              }
            ]
          }))
        ],
        max_output_tokens: 15000 // ✅ 응답 토큰 제한 (필요시 조정)
      })

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          response.output?.[0]?.content?.[0]?.text ??
          response.output_text ??
          '(응답 없음)',
        model: response.model
      }
      messages.value.push(aiMessage)

      console.log('API 응답:', response)
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
