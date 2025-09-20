import { create } from "zustand";

export const useThemeStore = create((set) => {
    return {
        theme: localStorage.getItem("theme") || "dark",
        setTheme: (newTheme) => {
            localStorage.setItem("theme", newTheme);
            document.documentElement.setAttribute("data-theme", newTheme);
            set({ theme: newTheme });
        },
    };
});
