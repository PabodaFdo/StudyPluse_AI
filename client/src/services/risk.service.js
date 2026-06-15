import api from './api';

const predictRisk = async (payload) => {
  const response = await api.post('/risk/predict', payload);
  return response.data;
};

export const riskService = {
  predictRisk,
};
