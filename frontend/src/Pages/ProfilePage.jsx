import { useState } from "react";
import {
    Building2,
    Calendar,
    Camera,
    Fingerprint,
    Hash,
    House,
    MapPin,
    Phone,
    School,
    TableProperties,
    User,
    Wallpaper,
} from "lucide-react";
import { useAuthStore } from "../store/store.useAuthStore";
import { useForm } from "react-hook-form";
import { useDetailStore } from "../store/store.useDetailStore";
import { useEffect } from "react";

const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
};

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    console.log(authUser);
    const { details, isSavingDetails, saveDetails, getDetails } =
        useDetailStore();
    const [selectedImg, setSelectedImg] = useState({
        oldPic: null,
        profilePic: null,
    });
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            trade: details?.trade || "",
            dob: formatDate(details?.dob),
            dod: formatDate(details?.dod),
            dom: formatDate(details?.dom),
            lastPosting: details?.lastPosting || "",
            company: details?.company || "",
            designation: details?.designation || "",
            placeOfWork: details?.placeOfWork || "",
            phoneNumber: details?.phoneNumber || "",
            wifeName: details?.wifeName || "",
            children: details?.children || "",
            homeTown: details?.homeTown || "",
            address: details?.address || "",
        },
    });

    useEffect(() => {
        getDetails();
    }, [getDetails]);

    useEffect(() => {
        if (details) {
            reset({
                trade: details.trade || "",
                dob: formatDate(details?.dob),
                dod: formatDate(details?.dod),
                dom: formatDate(details?.dom),
                lastPosting: details.lastPosting || "",
                company: details.company || "",
                designation: details.designation || "",
                placeOfWork: details.placeOfWork || "",
                phoneNumber: details.phoneNumber || "",
                wifeName: details.wifeName || "",
                children: details.children || "",
                homeTown: details.homeTown || "",
                address: details.address || "",
            });
        }
    }, [details, reset]);

    const handleImageUpload = async (e, isOldPic) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            if (isOldPic) {
                setSelectedImg((prev) => ({ ...prev, oldPic: reader.result }));
                await updateProfile({ oldPic: reader.result }, isOldPic);
                return;
            }
            setSelectedImg((prev) => ({ ...prev, profilePic: reader.result }));
            await updateProfile({ profilePic: reader.result }, isOldPic);
        };
    };

    const onSubmit = async (data) => {
        await saveDetails(data);
        await getDetails();
        setIsEditing(false);
    };

    const handleCancel = () => {
        reset();
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold ">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 ">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img
                                    src={
                                        selectedImg.oldPic ||
                                        authUser.oldPic ||
                                        "/avatar.png"
                                    }
                                    alt="Profile"
                                    className="size-32 rounded-full object-cover border-4 "
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className={`
                                    absolute bottom-0 right-0 
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer 
                                    transition-all duration-200
                                    ${
                                        isUpdatingProfile.oldPic
                                            ? "animate-pulse pointer-events-none"
                                            : ""
                                    }`}
                                >
                                    <Camera className="w-5 h-5 text-base-200" />
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(event) =>
                                            handleImageUpload(event, true)
                                        }
                                        disabled={isUpdatingProfile.oldPic}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-zinc-400 text-center">
                                {isUpdatingProfile.oldPic
                                    ? "Uploading..."
                                    : "Click the camera icon to update your Old photo"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <img
                                    src={
                                        selectedImg.profilePic ||
                                        authUser.profilePic ||
                                        "/avatar.png"
                                    }
                                    alt="Profile"
                                    className="size-32 rounded-full object-cover border-4 "
                                />
                                <label
                                    htmlFor="avatar-upload-profile"
                                    className={`
                                    absolute bottom-0 right-0 
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer 
                                    transition-all duration-200
                                    ${
                                        isUpdatingProfile.profilePic
                                            ? "animate-pulse pointer-events-none"
                                            : ""
                                    }`}
                                >
                                    <Camera className="w-5 h-5 text-base-200" />
                                    <input
                                        type="file"
                                        id="avatar-upload-profile"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(event) =>
                                            handleImageUpload(event, false)
                                        }
                                        disabled={isUpdatingProfile.profilePic}
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-zinc-400 text-center">
                                {isUpdatingProfile.profilePic
                                    ? "Uploading..."
                                    : "Click the camera icon to update your new photo"}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </div>
                                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                        {authUser?.fullName}
                                    </p>
                                </div>

                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Fingerprint className="w-4 h-4" />
                                        Service Number
                                    </div>
                                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                        {authUser?.userId}
                                    </p>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-white-700 mb-4 divider">
                                Service Details
                            </h2>

                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <User className="w-4 h-4 z-4" />
                                        Trade
                                    </div>
                                    <input
                                        type="text"
                                        id="trade"
                                        {...register("trade", {
                                            required: "Trade is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.trade ? "border-red-500" : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="Trade"
                                        readOnly={!isEditing}
                                    />
                                    {errors.trade && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.trade.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date of Birth
                                    </div>
                                    <input
                                        type="date"
                                        id="dob"
                                        {...register("dob", {
                                            required:
                                                "Date of Birth is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.dob ? "border-red-500" : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        readOnly={!isEditing}
                                    />
                                    {errors.dob && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dob.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 z-4" />
                                        Date Of Death
                                    </div>
                                    <input
                                        type="date"
                                        id="dod"
                                        {...register("dod", {
                                            required:
                                                "Date Of Death is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.dod ? "border-red-500" : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        readOnly={!isEditing}
                                    />
                                    {errors.dod && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dod.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 z-4" />
                                        Last Posting
                                    </div>
                                    <input
                                        type="text"
                                        id="lastPosting"
                                        {...register("lastPosting", {
                                            required:
                                                "Last Posting is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.lastPosting
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="Ahemdabad"
                                        readOnly={!isEditing}
                                    />
                                    {errors.lastPosting && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.lastPosting.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-white-700 mb-4 divider">
                                Work Details
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Building2 className="w-4 h-4 z-4" />
                                        Company Name
                                    </div>
                                    <input
                                        type="text"
                                        id="company"
                                        {...register("company", {
                                            required: "Company is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.company
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="6XXXXXXX"
                                        readOnly={!isEditing}
                                    />
                                    {errors.company && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.company.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Wallpaper className="w-4 h-4" />
                                        Designation
                                    </div>
                                    <input
                                        type="text"
                                        id="designation"
                                        {...register("designation", {
                                            required: "Designation is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.designation
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="6XXXXXXX"
                                        readOnly={!isEditing}
                                    />
                                    {errors.designation && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.designation.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <School className="w-4 h-4 z-4" />
                                        Place Of Work
                                    </div>
                                    <input
                                        type="text"
                                        id="placeOfWork"
                                        {...register("placeOfWork", {
                                            required:
                                                "Place Of Work is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.placeOfWork
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="Hyderabad"
                                        readOnly={!isEditing}
                                    />
                                    {errors.placeOfWork && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.placeOfWork.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Phone Number
                                    </div>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        {...register("phoneNumber", {
                                            required:
                                                "Phone Number is required",
                                            pattern: {
                                                value: /^\d{10}$/,
                                                message:
                                                    "Phone Number must be 10 digits long",
                                            },
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.phoneNumber
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="6XXXXXXX"
                                        readOnly={!isEditing}
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phoneNumber.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-white-700 mb-4 divider">
                                Personal Details
                            </h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 z-4" />
                                        Date Of Marriage
                                    </div>
                                    <input
                                        type="date"
                                        id="dom"
                                        {...register("dom", {
                                            required:
                                                "Date Of Marriage is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.dom ? "border-red-500" : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        readOnly={!isEditing}
                                    />
                                    {errors.dom && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.dom.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Wife Name
                                    </div>
                                    <input
                                        type="text"
                                        id="wifeName"
                                        {...register("wifeName", {
                                            required: "Wife Name is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.wifeName
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="Rose"
                                        readOnly={!isEditing}
                                    />
                                    {errors.wifeName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.wifeName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <Hash className="w-4 h-4" />
                                        Children
                                    </div>
                                    <input
                                        type="text"
                                        id="children"
                                        {...register("children", {
                                            required: "Children is required",
                                            pattern: {
                                                value: /^\d+$/,
                                                message:
                                                    "Children must be a number",
                                            },
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.children
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="4"
                                        readOnly={!isEditing}
                                    />
                                    {errors.children && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.children.message}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                                        <House className="w-4 h-4 z-4" />
                                        Home Town
                                    </div>
                                    <input
                                        type="text"
                                        id="homeTown"
                                        {...register("homeTown", {
                                            required: "Home Town is required",
                                        })}
                                        className={`input input-bordered w-full pl-3 ${
                                            errors.homeTown
                                                ? "border-red-500"
                                                : ""
                                        } focus:ring-0 focus:border-transparent`}
                                        placeholder="home Town"
                                        readOnly={!isEditing}
                                    />
                                    {errors.homeTown && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.homeTown.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1.5 flex-1">
                                <div className="text-sm text-zinc-400 flex items-center gap-2">
                                    <TableProperties className="w-4 h-4" />
                                    Address
                                </div>
                                <textarea
                                    type="textarea"
                                    id="address"
                                    {...register("address", {
                                        required: "Address is required",
                                    })}
                                    className={`textarea input-bordered w-full pl-3 ${
                                        errors.address ? "border-red-500" : ""
                                    } focus:ring-0 focus:border-transparent`}
                                    placeholder="Address"
                                    readOnly={!isEditing}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-outline"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isSavingDetails}
                                    >
                                        {isSavingDetails
                                            ? "Submitting..."
                                            : "Submit"}
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="btn btn-primary"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium  mb-4">
                            Account Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfilePage;
