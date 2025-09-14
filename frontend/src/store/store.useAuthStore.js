import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,
    setUser: (user) => set({ authUser: user }),
    clearUser: () => set({ authUser: null }),
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            set({ authUser: null, isCheckingAuth: false });
            console.error("Error checking auth:", error);
        }
    },

    signUp: async (userData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", userData);
            set({ authUser: res.data });
            toast.success("Sign up successful!");
        } catch (error) {
            set({ authUser: null });
            toast.error(error.response?.data?.message || "Error signing up");
            console.error("Error signing up:", error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging out");
            console.error("Error logging out:", error);
        } finally {
            set({ isLoggingOut: false });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", credentials);
            set({ authUser: res.data });
            toast.success("Login successful!");
        } catch (error) {
            set({ authUser: null });
            toast.error(error.response?.data?.message || "Error logging in");
            console.error("Error logging in:", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (profileData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/profile", profileData);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error updating profile"
            );
            console.error("Error updating profile:", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));
