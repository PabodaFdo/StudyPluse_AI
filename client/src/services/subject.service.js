import api from './api';

const getSubjects = async () => {
  const response = await api.get('/subjects');
  return response.data;
};

const getSubjectAnalytics = async (subjectId) => {
  const response = await api.get(`/subjects/${subjectId}/analytics`);
  return response.data;
};

const getOverallAnalytics = async () => {
  const response = await api.get(`/subjects/analytics/overall`);
  return response.data;
};

export const subjectService = {
  getSubjects,
  getSubjectAnalytics,
  getOverallAnalytics,
};
