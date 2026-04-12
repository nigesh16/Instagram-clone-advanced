import { FaInstagram } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { RiYoutubeLine } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { BsSearch } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { HiMiniBars3 } from "react-icons/hi2";
import { BsBoxes } from "react-icons/bs";

import suggestions from "../data/suggestion.jsx";
import posts from "../data/posts.jsx";
import PostCard from "../components/PostCard.jsx";
import Stories from "../components/Stories.jsx";
import BottomNavbar from "../components/BottomNavbar.jsx";
import TopNavbar from "../components/TopNavbar.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Home(){
    const [showMenu, setShowMenu] = useState(false);

    const [followedUsers, setFollowedUsers] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            const currentTime = Date.now() / 1000;

            if (payload.exp < currentTime) {
                localStorage.removeItem("token");
                navigate("/login");
            }

        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
        }

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <div className="md:hidden"><TopNavbar /></div>
            <div className="flex w-screen bg-white h-screen overflow-y-auto">
                {/* Navbar */}
                <div className="sticky top-0 hidden md:block w-[20%] lg:w-[15%] h-screen">
                    <div className="h-32 bg-white pt-6 pl-6">
                        <FaInstagram size={25}/>
                    </div>
                    <div className="pl-3 group flex flex-col gap-4 w-[70px] hover:w-[220px] transition-all duration-300 p-2 overflow-hidden">
                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <MdHomeFilled size={30}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Home
                        </span>
                    </div>

                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <RiYoutubeLine size={30}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Reels
                        </span>
                    </div>

                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <LiaTelegramPlane size={30}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Messages
                        </span>
                    </div>

                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <BsSearch size={25}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Search
                        </span>
                    </div>

                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <FaRegHeart size={25}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Notifications
                        </span>
                    </div>

                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <IoAddSharp size={30}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Create
                        </span>
                    </div>
                    <div className="relative flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <IoPersonCircleSharp size={30}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Profile
                        </span>
                    </div>
                    
                    <div className=" relative">
                        {/* MORE BUTTON */}
                        <div 
                            onClick={() => setShowMenu(prev => !prev)}
                            className="mt-12 flex items-center p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                        >
                            <HiMiniBars3 size={30}/>
                            <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                More
                            </span>
                        </div>
                        {showMenu && (
                            <div className="absolute left-[60px] bottom-12 bg-white shadow-md rounded-lg w-[120px] z-50 border-[1px] border-gray-200">
                                <div 
                                    onClick={handleLogout}
                                    className="p-2 pl-5 text-[16px] hover:bg-gray-100 cursor-pointer text-red-500"
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" relative flex items-center  p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                        <BsBoxes size={25}/>
                        <span className="absolute left-[60px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                            Also from meta
                        </span>
                    </div>
                    </div>
                </div>
                {/* Main */}
                <div className="flex-1 min-w-0">
                    <Stories />
                    <div className="flex flex-col gap-5 w-full max-w-[450px] mx-auto bg-white md:mt-4">
                            {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                            ))}
                    </div>      
                    <div className="h-20"></div>  
                    <div className="block md:hidden p-0 m-0"><BottomNavbar/> </div>
                </div>
                {/* Suggestions */}
                <div className="bg-white hidden lg:block lg:w-[42%] h-screen pl-24 pt-10">
                    <div className="flex flex-col gap-4 w-[290px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                    <img
                                        src="https://randomuser.me/api/portraits/men/9.jpg"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                    />
                                    <div>
                                            <p className="text-sm font-semibold cursor-pointer">
                                            _onx77_
                                            </p>
                                            <p className="text-[12px] text-gray-600">
                                                nigesh
                                            </p>
                                    </div>
                                </div>
                                <button className="text-blue-600 text-[13px] font-semibold hover:text-blue-800">
                                    Switch
                                </button>
                            </div>
                        <div className="mt-2 mb-1 flex items-center justify-between font-medium">
                            <p className="text-[13.5px]">Suggested for you</p>
                            <p className="text-[13px] hover:opacity-60 cursor-pointer">See all</p>
                        </div>
                        {suggestions.map((user) => {
                            const isFollowing = followedUsers[user.id];

                            return (
                                <div key={user.id} className="flex items-center justify-between">

                                <div className="flex items-center gap-3">
                                    <img
                                    src={user.profilePic}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    />
                                    <div>
                                    <p className="text-sm font-semibold cursor-pointer">
                                        {user.username}
                                    </p>
                                    <p className="text-[12px] text-gray-600">
                                        Suggested for you
                                    </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                    setFollowedUsers(prev => ({
                                        ...prev,
                                        [user.id]: !prev[user.id]
                                    }))
                                    }
                                    className={`text-[13px] font-semibold ${
                                    isFollowing
                                        ? "text-gray-400 hover:text-gray-500"
                                        : "text-blue-600 hover:text-blue-800"
                                    }`}
                                >
                                    {isFollowing ? "Following" : "Follow"}
                                </button>

                                </div>
                            );
                            })}
                        </div>
                        <p className="text-[13px] text-gray-500 mt-8">About.Help.Press.API.Jobs.Privacy.Terms.</p>
                        <p className="text-[13px] text-gray-500">Locations.Language.Meta Verified</p>
                        <p className="text-[13px] text-gray-500 mt-4">© 2026 INSTAGRAM FROM META</p>
                </div>
             </div>
        </>
    )
}

export default Home