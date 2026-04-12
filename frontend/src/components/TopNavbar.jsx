import { BsSearch } from "react-icons/bs";
import instaText from "../assets/insta-Text.jpg"
import { FaRegHeart } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";

function TopNavbar() {
  return (
    <div className="w-full bg-white border-b border-b-gray-100 px-3 py-2 flex items-center justify-between gap-5">

      {/* Logo */}
      <div>
            <img className="w-28" src={instaText}></img>
      </div>
      

      {/* Search */}
      <div className="flex gap-3">
        <IoAddSharp size={30} className=""/>
        <FaRegHeart size={23} className="mt-[3px]"/>
      </div>
      
    </div>
  );
}

export default TopNavbar;