import { Link } from "react-router-dom";
import { BookImage, Info, LogOut, Settings, User, Users } from "lucide-react";
import { useAuthStore } from "../store/store.useAuthStore";

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
        >
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className="size-9 flex items-center justify-center">
                                <img src="/logo.PNG" />
                            </div>
                            <h1 className="text-lg font-bold">AT 02</h1>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={"/settings"}
                            className={`btn btn-sm gap-2 transition-colors`}
                        >
                            <Settings className="w-4 h-4" />
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                        <Link
                            to={"/about"}
                            className={`btn btn-sm gap-2 transition-colors`}
                        >
                            <Info className="w-4 h-4" />
                            <span className="hidden sm:inline">About</span>
                        </Link>

                        {authUser && (
                            <>
                                <Link
                                    to={"/gallery"}
                                    className={`btn btn-sm gap-2`}
                                >
                                    <BookImage className="size-5" />
                                    <span className="hidden sm:inline">
                                        Gallery
                                    </span>
                                </Link>
                                <Link
                                    to={"/users"}
                                    className={`btn btn-sm gap-2`}
                                >
                                    <Users className="size-5" />
                                    <span className="hidden sm:inline">
                                        Users
                                    </span>
                                </Link>
                                <Link
                                    to={"/profile"}
                                    className={`btn btn-sm gap-2`}
                                >
                                    <User className="size-5" />
                                    <span className="hidden sm:inline">
                                        Profile
                                    </span>
                                </Link>

                                <button
                                    className="flex gap-2 items-center"
                                    onClick={logout}
                                >
                                    <LogOut className="size-5" />
                                    <span className="hidden sm:inline">
                                        Logout
                                    </span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
