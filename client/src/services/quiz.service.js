import api from './api';

export const generateQuiz = async ({ text, question_count, difficulty }) => {
  const response = await api.post('/quiz/generate', {
    text,
    question_count: parseInt(question_count, 10),
    difficulty
  });
  return response.data;
};
