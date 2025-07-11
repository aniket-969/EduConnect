import api from "../axiosClient";

const BASE = "/users";

export const uploadAvatar  = (id, avatar) => {
  return api.patch(`${BASE}/${id}/avatar`, avatar, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
