import api from './api';

const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

export const noteService = {
  getNotes,
};
