import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useDetailStore = create((set) => ({
    details: null,
    isSavingDetails: false,
    saveDetails: async (detailData) => {
        set({ isSavingDetails: true });
        try {
            const res = await axiosInstance.post("/details", detailData);
            set({ details: res.data });
            toast.success("Details saved successfully!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error saving details"
            );
            console.error("Error saving details:", error);
        } finally {
            set({ isSavingDetails: false });
        }
    },
    getDetails: async () => {
        try {
            const res = await axiosInstance.get("/details");
            set({ details: res.data });
        } catch (error) {
            if (error.response?.data?.message === "User details not found") {
                set({ details: null });
                toast.error("Please fill the details form");
                return;
            }
            toast.error(
                error.response?.data?.message === "Details Not Found" ||
                    "Error fetching details"
            );
            console.error("Error fetching details:", error);
        }
    },
}));
