import React from "react";
import { chunkArray } from "../../lib/utis";
import { useAuthStore } from "../../store/store.useAuthStore";

const AuthScreenSkeleton = () => {
    const { authUser } = useAuthStore();
    const temp = Array(9).fill(null);
    return (
        <div className={`${authUser ? "" : "hidden"} lg:flex items-center justify-center bg-base-200 p-12`}>
            <div
                className="mt-[10vh] h-[80vh] text-center overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <h2 className="skeleton h-8 w-1/2 mx-auto mb-4"></h2>
                <p className="text-base-content/60 skeleton h-4 w-1/3 mx-auto"></p>
                <div className="flex flex-col items-center">
                    {chunkArray(temp, 3).map((chunk, index) => (
                        <div
                            key={index}
                            className="carousel rounded-box h-50 my-8"
                        >
                            {chunk.map((image, imgIndex) => (
                                <div className="carousel-item" key={imgIndex}>
                                    <div className="skeleton h-50 w-80"></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthScreenSkeleton;
