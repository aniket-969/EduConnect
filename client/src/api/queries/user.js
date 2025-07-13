import api from "../axiosClient";

const BASE = "/users";

export const uploadAvatar  = (id, avatar) => {
    console.log(id,avatar)
    const formData = new FormData();
  formData.append("avatar", avatar);
      return api.patch(
    `${BASE}/${id}/avatar`,
    formData,
    {
    
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
};
