import { MdHomeFilled } from "react-icons/md";
import { RiYoutubeLine } from "react-icons/ri";
import { LiaTelegramPlane } from "react-icons/lia";
import { BsSearch } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BottomNavbar() {

  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center py-3 z-50">
        
        <MdHomeFilled size={24} className="cursor-pointer" />
        <BsSearch size={20} className="cursor-pointer" />
        <RiYoutubeLine size={25} className="cursor-pointer" />
        <IoAddSharp size={28} className="cursor-pointer hidden sm:block" />
        <LiaTelegramPlane size={24} className="cursor-pointer" />

        {/* PROFILE CLICK → OPEN CONFIRM */}
        <IoPersonCircleSharp 
          size={25} 
          className="cursor-pointer" 
          onClick={() => setShowConfirm(true)}
        />
      </div>

      {/* MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          
          <div className="bg-white rounded-xl w-[300px] p-5 text-center shadow-lg">
            
            <h2 className="text-lg font-semibold mb-2">Logout</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-between gap-3">
              
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default BottomNavbar;