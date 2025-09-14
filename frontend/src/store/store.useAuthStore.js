import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isLoggingOut: false,
    onlineUsers: [],
    socket: null,

    setUser: (user) => set({ authUser: user }),

    clearUser: () => set({ authUser: null }),

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
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
            get().connectSocket();
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
            const res = await axiosInstance.put(
                "/auth/update-profile",
                profileData
            );
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

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        if (get().socket) return;
        const socket = io(SERVER_URL, {
            query: { userId: authUser.userId },
        });
        socket.connect();
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
        socket.on("getOnlineUsers", (users) => {
            set({ onlineUsers: users });
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
            console.log("Socket disconnected manually");
        }
    },

    setSocket: (socket) => set({ socket }),
}));
