import {
    Eye,
    EyeOff,
    User,
    Lock,
    Fingerprint,
    Loader2,
    Plane,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/store.useAuthStore";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { isSigningUp, signUp } = useAuthStore();
    for (const [_, value] of Object.entries(errors)) {
        toast.error(`${value.message}`);
    }

    const handleSubmitForm = (data) => {
        signUp(data);
    };

    return (
        <div className="h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* LOGO*/}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                            >
                                <Plane className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">
                                Create Account
                            </h1>
                            <p className="text-base-content/60">
                                Get started with your account
                            </p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleSubmitForm)}
                        className=" space-y-6"
                    >
                        <div className="form-control mb-3">
                            <div className="flex justify-between mb-1">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Service Number
                                    </span>
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Fingerprint className="size-5 text-base-content/40 z-4" />
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

                        <div className="form-control mb-3">
                            <div className="flex justify-between mb-1">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Full Name
                                    </span>
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40 z-4" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    {...register("fullName", {
                                        required: "Full Name is required",
                                    })}
                                    className={`input input-bordered w-full pl-10 ${
                                        errors.fullName ? "border-red-500" : ""
                                    } focus:ring-0 focus:border-transparent`}
                                    placeholder="Full Name"
                                />
                            </div>
                        </div>
                        <div className="form-control mb-3">
                            <div className="flex justify-between mb-1">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Password
                                    </span>
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40 z-4" />
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
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40 z-4" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40 z-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <AuthImagePattern
                title="Join our community"
                subtitle="Create an account to unlock all features"
            />
        </div>
    );
};

export default SignUpPage;
