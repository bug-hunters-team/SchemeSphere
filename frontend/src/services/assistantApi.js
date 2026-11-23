import { apiRequest } from './authApi';

export function askAssistant(question, language) {
  return apiRequest('/assistant/chat', { question, language });
}
