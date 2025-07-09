// src/api/queries/course.js
import api from '../axiosClient'; 

export const createCourse = (data) => api.post('/course', data)

export const getCourseById = (id) => api.get(`/course/${id}`)

export const updateCourse = (id, data) => api.put(`/course/${id}`, data)

export const publishCourse = (id, data) =>
  api.put(`/course/${id}`, {
    ...data,
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  });
 
//uncomment this for real api
//export const createCourse = (data) => api.post('api/courses/create', data)
//export const updateCourse = (id, data) => api.put(`api/courses/${id}`, data)
// export const publishCourse = (id) => api.put(`api/courses/publish/${id}`) 
// export const getCourseById = (id) => api.get(`api/courses/${id}`)
 





