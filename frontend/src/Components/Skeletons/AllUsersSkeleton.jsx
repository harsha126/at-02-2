import React from "react";

const AllUsersPageSkeleton = () => {
    return (
        <div className="min-h-screen pt-20 bg-base-400 w-screen">
            <div className="mx-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center">
                {[...Array(8)].map((_, idx) => (
                    <div
                        key={idx}
                        className="card bg-base-300 w-80 shadow-sm m-4 p-4 animate-pulse"
                    >
                        <figure>
                            <div className="chat-image avatar">
                                <div className="w-50 h-50 rounded-full border bg-gray-300" />
                            </div>
                        </figure>
                        <div className="card-body text-center">
                            <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
                            <div className="card-actions justify-center">
                                <div className="btn btn-primary opacity-50 cursor-not-allowed">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsersPageSkeleton;
