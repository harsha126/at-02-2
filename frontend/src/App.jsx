import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SettingsPage from "./Pages/SettingsPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthStore } from "./store/store.useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/store.useThemeStore";

function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div data-theme={theme} className="min-h-screen">
            <Navbar />
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={authUser ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={
                        authUser ? <ProfilePage /> : <Navigate to="/login" />
                    }
                />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </div>
    );
}

export default App;
