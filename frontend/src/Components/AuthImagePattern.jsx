import { useEffect } from "react";
import { useAuthStore } from "../store/store.useAuthStore";
import { chunkArray } from "../lib/utis";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import AuthScreenSkeleton from "./Skeletons/AuthScreenSkeleton";

const AuthImagePattern = ({ title, subtitle }) => {
    const {
        getLandingPageImages,
        landingPageImages,
        isLandingPageImagesLoading,
        authUser,
    } = useAuthStore();

    // landingpageimages = []
    // divide them in to chucks of 5

    useEffect(() => {
        if (landingPageImages.length == 0) getLandingPageImages();
    }, [getLandingPageImages, landingPageImages.length]);

    const chunkedImages = [];
    for (let i = 0; i < landingPageImages.length; i += 5) {
        chunkedImages.push(landingPageImages.slice(i, i + 5));
    }

    if (isLandingPageImagesLoading) {
        return <AuthScreenSkeleton />;
    }

    return (
        <div
            className={` ${
                authUser ? "" : "hidden "
            }lg:flex items-center justify-center bg-base-200 p-12`}
        >
            <div
                className="mt-[10vh] h-[80vh] text-center overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
                <div className="flex flex-col items-center">
                    {chunkArray(landingPageImages, 5).map((chunk, index) => (
                        <div
                            key={index}
                            className="carousel rounded-box h-50 my-8"
                        >
                            {chunk.map((image, imgIndex) =>
                                image ? (
                                    <div
                                        className="carousel-item"
                                        key={imgIndex}
                                    >
                                        <img
                                            key={imgIndex}
                                            src={image}
                                            alt={`Landing Page ${imgIndex}`}
                                        />
                                    </div>
                                ) : (
                                    <div className="carousel-item">
                                        <div className="h-50 flex flex-col items-center justify-center bg-base-300 w-80">
                                            <a
                                                className="link"
                                                onClick={() => {
                                                    if (!authUser) {
                                                        toast.error(
                                                            "Please login to view more images"
                                                        );
                                                    }
                                                }}
                                            >
                                                View more
                                            </a>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;
