import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadAvatar } from './../api/queries/user';


export const useUser = (id) => {
  const queryClient = useQueryClient();

  const uploadAvatarMutation = useMutation(
    (file) => uploadAvatar(id, file),
    {
      onSuccess: (updatedUser) => {
    
        toast.success("Avatar updated!");

        queryClient.invalidateQueries(["auth", "session"]);
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to upload avatar");
      },
    }
  );

  return {
    uploadAvatar: uploadAvatarMutation,
  
  };
};
