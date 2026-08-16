import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isChecking: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const reply = await axiosInstance.get("/auth/check");

      set({ authUser: reply.data });
    } catch (error) {
      console.log(error)
      set({ authUser: null });
    } finally {
      set({ isChecking: false });
    }
  },
}));