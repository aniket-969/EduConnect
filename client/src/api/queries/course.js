// src/api/queries/course.js
import api from '../axiosClient'; 


// api/queries/course.js
export const getCoursesByInstructor = async (instructorId) => {
  try {
    const res = await fetch(`https://686a6e5ee559eba9086ff356.mockapi.io/api/instructor?instructor=${encodeURIComponent(instructorId)}`);

    if (!res.ok) {
      if (res.status === 404) {
        return [];
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data || [];
  } catch (error) {
    throw error; // rethrow other errors (e.g., network issues)
  }
};


export const getCourseById = async(id) => await fetch(`https://686a6e5ee559eba9086ff356.mockapi.io/api/course/${id}`)

export const createCourse =async (data) => await fetch('https://686a6e5ee559eba9086ff356.mockapi.io/api/instructor', data)

export const updateCourse = async(id, data) => await fetch(`https://686a6e5ee559eba9086ff356.mockapi.io/api/course/${id}`, data)

export const publishCourse = async(id, data) =>
  await fetch(`https://686a6e5ee559eba9086ff356.mockapi.io/api/course/${id}`, {
    ...data,
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  });
 
//uncomment this for real api

// export async function getCoursesByInstructor(instructorId) {
//   const res = await axios.get(`/courses/instructor/${instructorId}`);
//   return res.data||[];
// }
// export const getCourseById = (id) => api.get(`/courses/${id}`)
// export const createCourse = (data) => {
//   console.log("Creating course with data:", data);
//   return(
//     api.post('/courses/create', data)

//   )
// }
// export const updateCourse = (id, data) => api.put(`/courses/${id}`, data)
// export const publishCourse = (id) => api.put(`/courses/publish/${id}`) 
 





