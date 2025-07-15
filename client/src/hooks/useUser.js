import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { uploadAvatar, updateUser } from './../api/queries/user';
import { useAuth } from "@/hooks/useAuth";

export const useUser = (id) => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userData = session?.data;

  const uploadAvatarMutation = useMutation({
    mutationFn:
    (avatar) => uploadAvatar(id, avatar),
    onSuccess: (updatedUser) => {
      toast.success("Avatar updated!");
      queryClient.invalidateQueries(["auth", "session"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to upload avatar");
    },
  });

  const updateNameMutation = useMutation({
    mutationFn: (name) => {
      // Send the full user object, only updating the name
      if (!userData) throw new Error("No user data");
      const fullUser = {
        ...userData,
        name,
      };
      return updateUser(id, fullUser);
    },
    onSuccess: () => {
      toast.success("Name updated!");
      queryClient.invalidateQueries(["auth", "session"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update name");
    },
  });

  return {
    uploadAvatar: uploadAvatarMutation,
    updateName: updateNameMutation,
  };
};
