import api from "../axiosClient";

//used fake api as response of real api is nested infinte
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
  const payload = {
    ...data,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedOn: null,
  };
  const response = await axiosClient.post(`/instructor`, payload);
  return response.data;
};

//delete a course
export const deleteCourse = async (id) => {
  const response = await axiosClient.delete(`/instructor/${id}`);
  return response;
};

// PUT (update) a course
export const updateCourse = async (id, data) => {
  console.log("updated course data",data);
  const payload = {
    ...data,
    
    updatedAt: new Date().toISOString(),
  };
  console.log("updated draft",payload)
  const response = await axiosClient.put(`/instructor/${id}`, payload);
  return response.data;
};

// PATCH to publish a course
export const publishCourse = async (id, data = {}) => {
  const payload = {
    ...data,
    status: "PUBLISHED",
    publishedOn: new Date().toISOString(),
  };

  const response = await axiosClient.put(`/instructor/${id}`, payload);
  return response.data;
};
//fake api end



//real api as per backend but gives nested infinite response

//  export async function getCoursesByInstructor(instructorId) {
//    const res = await axios.get(`/courses/instructor/${instructorId}`);
//    return res.data||[];
//  }

//  export const getCourseById = async(id) => await api.get(`/courses/${id}`)

//  export const createCourse = async(data) => {
//    console.log("Creating course with data:", data);
//    return(
//      await api.post('/courses/create', data)

//    )
//  }

// export const deleteCourse = async (id) => {
//   const response = await api.delete(`/courses/${id}`);
//   return response;
// };

//  export const updateCourse = async(id, data) =>await api.put(`/courses/${id}`, data)
//  export const publishCourse =async (id) =>await api.put(`/courses/publish/${id}`)

export async function fetchStudentCourses(userId) {
  return;
  if (!userId) {
    throw new Error("No userId provided");
  }
  try {
    const { data } = await api.get(`/students/${userId}/courses`);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchRecommendedCourses(userId) {
  return;
  if (!userId) {
    throw new Error("No userId provided");
  }
  try {
    const { data } = await api.get(`/students/${userId}/recommended-courses`);
    return;
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
  return {};
  const params = {
    ...(search ? { search } : {}),
    ...(category && category !== "All" ? { category } : {}),
    ...(level && level !== "All" ? { level } : {}),
    ...(sortBy ? { sortBy } : {}),
    page,
    size,
  };

  const { data } = await api.get("/courses", { params });
  return data;
}
