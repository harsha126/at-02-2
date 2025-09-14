import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Fingerprint, Loader2, Lock, Plane } from "lucide-react";
import { useAuthStore } from "../store/store.useAuthStore";
import AuthImagePattern from "../Components/AuthImagePattern";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login, isLoggingIn } = useAuthStore();

    for (const [_, value] of Object.entries(errors)) {
        toast.error(`${value.message}`);
    }

    const onSubmit = async (data) => {
        login(data);
    };

    return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-18 h-18 rounded-xl flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
                            >
                                <img src="/logo.PNG" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Welcome Back
                            </h1>
                            <p className="text-base-content/60">
                                Sign in to your account
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Service Number
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Fingerprint className="h-5 w-5 text-base-content/40 z-4" />
                                </div>
                                <input
                                    type="text"
                                    id="userId"
                                    {...register("userId", {
                                        required: "Service Number is required",
                                        pattern: {
                                            value: /^6\d{7}$/,
                                            message:
                                                "Service Number must start with 6 and be 8 digits long",
                                        },
                                    })}
                                    className={`input input-bordered w-full pl-10 ${
                                        errors.userId ? "border-red-500" : ""
                                    } focus:ring-0 focus:border-transparent`}
                                    placeholder="6XXXXXXX"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Password
                                </span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40 z-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters long",
                                        },
                                    })}
                                    className={`input input-bordered w-full pl-12 ${
                                        errors.password ? "border-red-500" : ""
                                    } focus:ring-0 focus:border-transparent`}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Pattern */}
            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={
                    "Sign in to continue your conversations and catch up with your messages."
                }
            />
        </div>
    );
};
export default LoginPage;
