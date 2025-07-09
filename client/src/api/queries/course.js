// src/api/queries/course.js
import api from '../axiosClient'; 


// api/queries/course.js
export const getCoursesByInstructor = async (instructorId) => {
  try {
    const res = await api.get(`/instructor?instructor=${instructorId}`);
    return res || [];
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error; // rethrow other errors (e.g., network issues)
  }
};

export const getCourseById = (id) => api.get(`/course/${id}`)

export const createCourse = (data) => api.post('/course', data)

export const updateCourse = (id, data) => api.put(`/course/${id}`, data)

export const publishCourse = (id, data) =>
  api.put(`/course/${id}`, {
    ...data,
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  });
 
//uncomment this for real api

// export async function getCoursesByInstructor(instructorId) {
//   const res = await axios.get(`/api/courses/instructor/${instructorId}`);
//   return res.data||[];
// }
// export const getCourseById = (id) => api.get(`api/courses/${id}`)
//export const createCourse = (data) => api.post('api/courses/create', data)
//export const updateCourse = (id, data) => api.put(`api/courses/${id}`, data)
// export const publishCourse = (id) => api.put(`api/courses/publish/${id}`) 
 





