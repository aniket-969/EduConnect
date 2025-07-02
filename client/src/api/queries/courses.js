//import api from "../axiosClient";

// export const saveDraftCourse = (data) => {

//   return api.post("/instructor/courses/draft", data);
// };

export const saveDraftCourse = async (data) => {
  console.log("Simulating draft save:", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Draft saved (mock)" });
    }, 1000);
  });
};
