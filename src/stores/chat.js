import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  
  // 환경변수에서 가져오기
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
  const API_URL = import.meta.env.VITE_API_URL
  
  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content
    }
    messages.value.push(userMessage)
    
    isLoading.value = true
    
    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'gpt-5-nano',
          messages: messages.value.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.choices[0].message.content,
        model: response.data.model
      }
      messages.value.push(aiMessage)

      console.log('API 응답:', response.data);
      
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
    sendMessage
  }
})