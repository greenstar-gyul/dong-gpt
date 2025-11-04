import { defineStore } from 'pinia'
import { ref } from 'vue'
import OpenAI from 'openai'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([]);
  const isLoading = ref(false);
  const selectedModel = ref('gpt-5-nano');

  // 환경변수에서 가져오기
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  // OpenAI 클라이언트 초기화
  const openai = new OpenAI({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // 테스트 전용 (실서비스는 백엔드 프록시)
  });

  // 사용 가능한 모델 목록
  const availableModels = [
    { value: 'gpt-5-nano', label: 'GPT-5 Nano' },
    { value: 'gpt-5-mini', label: 'GPT-5 Mini' },
  ];

  const sendMessage = async (content) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content
    };
    messages.value.push(userMessage);

    // 빈 assistant 메시지를 먼저 추가 (스트리밍으로 채워질 예정)
    const aiMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: '',
      model: selectedModel.value
    };
    messages.value.push(aiMessage);

    isLoading.value = true;

    try {
      const response = await openai.responses.create({
        model: selectedModel.value,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text: 'You are a helpful assistant. When providing code, always use proper markdown code blocks with language specification (e.g., ```javascript, ```python). Format your responses clearly with markdown.'
              }
            ]
          },
          ...messages.value.map(msg => ({
              role: msg.role,
              content: [
                {
                  type: msg.role === 'user' ? 'input_text' : 'output_text',
                  text: msg.content
                }
              ]
            }))
        ],
        max_output_tokens: 15000,
        stream: true
      })

      // 청크가 올 때마다 실시간으로 메시지 업데이트
      for await (const chunk of response) {
        console.log('스트리밍 청크:', chunk);

        const deltaContent = chunk.delta || '';

        if (deltaContent) {
          // Vue 반응성을 위해 배열의 마지막 요소를 직접 수정
          const lastMessage = messages.value[messages.value.length - 1];
          lastMessage.content += deltaContent;
        }

        if (chunk.model) {
          const lastMessage = messages.value[messages.value.length - 1];
          lastMessage.model = chunk.model;
        }
      }

      console.log('스트리밍 완료');

      // 응답이 없는 경우 처리
      const lastMessage = messages.value[messages.value.length - 1];
      if (lastMessage && !lastMessage.content) {
        lastMessage.content = '(응답 없음)';
      }

    } catch (error) {
      console.error('API 호출 실패:', error);

      // 이미 추가된 빈 메시지를 에러 메시지로 업데이트
      const lastMessage = messages.value[messages.value.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        lastMessage.content = '죄송합니다. 오류가 발생했습니다.';
      }
    } finally {
      isLoading.value = false;
    }
  }

  return {
    messages,
    isLoading,
    selectedModel,
    availableModels,
    sendMessage
  };
});
