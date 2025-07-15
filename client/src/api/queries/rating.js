import api from '../axiosClient';

export async function getRatingsByCourseId(courseId) {
  const { data } = await api.get(`/ratings/course/${courseId}`);
  return data;
}
