import { create } from "zustand";

export const useThemeStore = create((set) => {
    return {
        theme: localStorage.getItem("theme") || "cyberpunk",
        setTheme: (newTheme) => {
            localStorage.setItem("theme", newTheme);
            set({ theme: newTheme });
        },
    };
});
