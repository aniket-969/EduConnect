
import api from '../axiosClient'; 

export const createCourse = (data) => api.post('/course', data)

export const getCourseById = (id) => api.get(`/course/${id}`)

export const updateCourse = (id, data) => api.put(`/course/${id}`, data)

export const publishCourse = (id, data) =>
  api.put(`/course/${id}`, {
    ...data,
    status: "Published",
    publishedAt: new Date().toISOString(),
  });

 
export async function fetchStudentCourses(userId) {
  return 
  if (!userId) {
    throw new Error('No userId provided');
  }
  try {
    const { data } = await api.get(`/students/${userId}/courses`);
    return data;
  } catch (err) {
   
    throw err;
  }
}

export async function fetchRecommendedCourses(userId) {
  return
  if (!userId) {
    throw new Error('No userId provided');
  }
  try {
    const { data } = await api.get(`/students/${userId}/recommended-courses`);
    return
    return data;
  } catch (err) {
    throw err;
  }
}

