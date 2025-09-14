import React, { useEffect } from "react";
import { useChatStore } from "../store/store.useChatStore";
import { useAuthStore } from "../store/store.useAuthStore";
import { useNavigate } from "react-router-dom";

const AllUsersPage = () => {
    const { getUsers, users, setSelectedUser } = useChatStore();
    const { authUser } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="min-h-screen pt-20 bg-base-400 w-screen">
            <div className=" mx-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center ">
                {users.map((user) => (
                    <div
                        key={user.userId}
                        class="card bg-base-300 w-80 shadow-sm m-4 p-4"
                    >
                        <figure>
                            <div className="chat-image avatar">
                                <div className="w-50 h-50 rounded-full border">
                                    <img
                                        src={user.profilePic || "./avatar.png"}
                                        alt="Shoes"
                                        className=" avatar chat-image h-30 w-30 object-cover"
                                    />
                                </div>
                            </div>
                        </figure>
                        <div class="card-body text-center">
                            <h2 class="card-title text-center mx-auto">
                                {user.fullName}
                            </h2>
                            <p>
                                {user.userId === authUser.userId
                                    ? "This is you"
                                    : user.userId}
                            </p>
                            <div class="card-actions justify-center">
                                <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        navigate("/");
                                    }}
                                >
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsersPage;
