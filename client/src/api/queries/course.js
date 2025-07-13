
import api from '../axiosClient'; 


//fake api start
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://686a6e5ee559eba9086ff356.mockapi.io/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// GET all courses by instructor
export const getCoursesByInstructor = async (instructorId) => {
  try {
    const response = await axiosClient.get(`/instructor`, {
      params: { instructor: instructorId },
    });
    return response.data || [];
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

// GET a single course by ID
export const getCourseById = async (id) => {
  const response = await axiosClient.get(`/instructor/${id}`);
  console.log(response.data, "course data");
  return response.data;
};

// POST a new course
export const createCourse = async (data) => {
    console.log(data, "created course data");
  const response = await axiosClient.post(`/instructor`, data);
  return response.data;
};

// PUT (update) a course
export const updateCourse = async (id, data) => {
  const response = await axiosClient.put(`/course/${id}`, data);
  return response.data;
};

// PATCH to publish a course
export const publishCourse = async (id, data = {}) => {
  const payload = {
    ...data,
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  }

  const response = await axiosClient.put(`/course/${id}`, payload);
  return response.data;
};

//fake api end


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

export async function fetchCourseCatalog({
  search,
  category,
  level,
  sortBy,
  page = 1,
  size = 10,
}) {
  return {}
  const params = {
    ...(search ? { search } : {}),
    ...(category && category !== 'All' ? { category } : {}),
    ...(level    && level    !== 'All' ? { level }    : {}),
    ...(sortBy   ? { sortBy } : {}),
    page,
    size,
  };

  const { data } = await api.get('/courses', { params });
  return data;
}


 









