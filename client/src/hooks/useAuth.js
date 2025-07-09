import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  loginUser,
  logOut as apiLogOut,
  fetchSession,
} from "@/api/queries/auth";
import { toast } from "react-toastify";

const FAKE_STUDENT = {
  id: "stu_00123",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  role: "student",
  avatarUrl: "https://i.pravatar.cc/150?img=47",
  enrolledCourses: [
    { courseId: "c101", title: "Intro to React", progress: 0.42 },
    { courseId: "c202", title: "Advanced JavaScript", progress: 0.18 },
  ],
  preferences: { theme: "dark", notifications: true },
  lastLogin: "2025-06-23T14:32:00.000Z",
};

const FAKE_INSTRUCTOR = {
  id: "d2af7dae-8cd0-448f-8a1a-ddb8e435a5e9",
  name: "kavana",
  email: "kavana@gmail.com",
  role: "instructor",
  avatarUrl: "https://i.pravatar.cc/150?img=18",
  preferences: { theme: "dark", notifications: true },
  lastLogin: "2025-06-23T14:32:00.000Z",
};


export const useAuth = () => {
  const isDev = "development";

  if (isDev) {
    return {
      session: {
        isLoading: false,
        data: FAKE_INSTRUCTOR,
      },
    };
  }
  const queryClient = useQueryClient();

  // — Session
  const sessionQuery = useQuery({
    queryKey: ["auth", "session"],
    queryFn: fetchSession,
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to fetch session");
    },
  });

  // — Register
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error("Registration failed:", err);
    },
  });

  // — Login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("session", JSON.stringify(data));
      queryClient.setQueryData(["auth", "session"], data);
      toast.success("Login successful!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Invalid credentials");
      console.error("Login error:", err);
    },
  });

  // — Logout
  const logoutMutation = useMutation({
    mutationFn: apiLogOut,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "session"], null);
      localStorage.removeItem("session");
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout failed");
      console.error("Logout error:", err);
    },
  });

  return {
    session: sessionQuery,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
  };
};
