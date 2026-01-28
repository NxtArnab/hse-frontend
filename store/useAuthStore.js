import { create } from "zustand";
import {
  getCurrentUser,
  login as loginAPI,
  logout as logoutAPI,
  signup as signupAPI,
} from "@/services/auth.services";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  verify: async () => {
    set({ loading: true });

    try {
      const response = await getCurrentUser();
      const user = response?.data;

      if (!user) {
        throw new Error("User not found");
      }

      set({
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  login: async (userData = {}) => {
    try {
      // Call login API with correct object structure
      await loginAPI({ email: userData.email, password: userData.password });

      // Fetch current user after successful login
      const response = await getCurrentUser();
      const user = response?.data;

      if (!user) {
        throw new Error("User not found");
      }

      set({
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      // Re-throw error so the component can handle it
      throw error;
    }
  },
  signup: async (userData) => {
    set({ loading: true });
    try {
      await signupAPI(userData);
      // Automatically login after signup if needed, or just return
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await logoutAPI();

      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
      throw error;
    }
  },
}));

export default useAuthStore;
