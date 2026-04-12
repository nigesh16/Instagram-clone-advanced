import { FaMeta } from "react-icons/fa6";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useState } from "react";
import axios from "axios";

function Signup(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
        birthdate: "",
        name: "",
        username: "",
    });

    // handle change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // validation
    const validate = () => {
        const { identifier, password, birthdate, name, username } = formData;

        if (!identifier) {
            alert("Email or Mobile is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(identifier) && !mobileRegex.test(identifier)) {
            alert("Enter valid Email or Mobile number");
            return false;
        }

        if (!password || password.length < 6) {
            alert("Password must be at least 6 characters");
            return false;
        }

        if (!birthdate) {
            alert("Birthdate is required");
            return false;
        }

        if (!name) {
            alert("Name is required");
            return false;
        }

        if (!username || username.length < 3) {
            alert("Username must be at least 3 characters");
            return false;
        }

        return true;
    };

    // submit
    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const isEmail = formData.identifier.includes("@");

            const payload = {
                name: formData.name,
                username: formData.username,
                password: formData.password,
                birthdate: formData.birthdate,
                email: isEmail ? formData.identifier : "",
                mobile: !isEmail ? formData.identifier : "",
            };

            await axios.post("http://localhost:5000/api/auth/signup", payload);

            alert("Signup successful ✅");
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Signup failed ❌");
        }
    };


    return(
        <>
        <div className="px-8 pt-8 bg-white">
            <div className="max-w-[557px] bg-white m-auto">
                <SlArrowLeft size={25} className="mb-4 hover:bg-gray-200 p-1 rounded" onClick={()=>navigate("/login")}/>
                <span className="font-medium"><FaMeta className="inline text-[20px] pb-1 text-blue-600" /> Meta </span>
                <h1 className="text-2xl font-medium mt-2">Get started on Instagram</h1>
                <p className="mb-4">Sign up to see photos and videos from your friends.</p>

                <label className="text-[17px] font-medium">Mobile number or email</label>
                <div className="relative mb-3">
                    <input
                        id="identifier"
                        value={formData.identifier}
                        onChange={handleChange}
                        className="font-medium peer text-[16px] mt-2 w-full h-[60px] pt-3 pl-[15px] rounded-[15px] border-[1px]
                        border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none"
                        placeholder=" "
                        type="text"
                    />
                    <label className="peer-placeholder-shown:top-6 absolute top-3 left-4 text-gray-500  
                        peer-placeholder-shown:text-base font-medium text-sm peer-focus:top-3 peer-focus:text-sm transition-all">
                        Mobile number or email
                    </label>
                </div>

                <label className="text-[17px] font-medium">Password</label>
                <div className="relative mb-3">
                    <input
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="font-medium peer text-[16px] mt-2 w-full h-[60px] pt-3 pl-[15px] rounded-[15px] border-[1px]
                        border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none"
                        placeholder=" "
                        type="password"
                    />
                    <label className="peer-placeholder-shown:top-6 absolute top-3 left-4 text-gray-500  
                        peer-placeholder-shown:text-base font-medium text-sm peer-focus:top-3 peer-focus:text-sm transition-all">
                        Password
                    </label>
                </div>

                <label className="text-[17px] font-medium">Birthday</label>
                <input
                    id="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="text-gray-500 mb-3 font-medium text-[16px] mt-2 w-full h-[60px] pl-[15px] rounded-[15px] border-[1px]
                    border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none"
                    type="date"
                />

                <label className="text-[17px] font-medium ">Name</label>
                <div className="relative mb-3">
                    <input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="font-medium peer text-[16px] mt-2 w-full h-[60px] pt-3 pl-[15px] rounded-[15px] border-[1px]
                        border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none"
                        placeholder=" "
                        type="text"
                    />
                    <label className="peer-placeholder-shown:top-6 absolute top-3 left-4 text-gray-500  
                        peer-placeholder-shown:text-base font-medium text-sm peer-focus:top-3 peer-focus:text-sm transition-all">
                        Full name
                    </label>
                </div>

                <label className="text-[17px] font-medium">Username</label>
                <div className="relative mb-4">
                    <input
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="font-medium peer text-[16px] mt-2 w-full h-[60px] pt-3 pl-[15px] rounded-[15px] border-[1px]
                        border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none"
                        placeholder=" "
                        type="text"
                    />
                    <label className="peer-placeholder-shown:top-6 absolute top-3 left-4 text-gray-500  
                        peer-placeholder-shown:text-base font-medium text-sm peer-focus:top-3 peer-focus:text-sm transition-all">
                        Username
                    </label>
                </div>

                <p className="md:text-base text-[14px] mb-2 font-medium text-gray-800">People who use our service may have uploaded your contact information to Instagram. <span className="text-blue-600">Learn more</span>.</p>
                <p className="md:text-base text-[14px] mb-2 font-medium text-gray-800">By tapping Submit, you agree to create an account and to Instagram's <span className="text-blue-600">Terms</span>, 
                <span className="text-blue-600">Privacy Policy </span>and <span className="text-blue-600">Cookies Policy</span>.</p>
                <p className="md:text-base text-[14px] font-medium text-gray-800">The <span className="text-blue-600">Privacy Policy </span>describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.</p>
                
                <button
                    onClick={handleSubmit}
                    className={`active:opacity-70 text-[15px] font-medium w-full mt-6 h-[45px] text-gray-50 rounded-[20px] active:scale-[0.98] bg-blue-600 cursor-pointer hover:opacity-90 `}
                >
                    Submit
                </button>

                <button className="text-[15px] mb-7 font-medium w-full mt-3 h-[47px] text-black border-gray-400 border-[1px] rounded-[20px] cursor-pointer hover:bg-gray-100 hover:opacity-90 active:scale-[0.98] active:opacity-70"
                    onClick={()=>navigate("/login")} >Already have an account</button>
           </div>

        </div>
        <Footer/>
            
        </>
    )
}

export default Signup;