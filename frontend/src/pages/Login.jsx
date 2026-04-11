import { useState } from "react"
import instaLogo from "../assets/insta-LOGO.png"
import pic from "../assets/Insta-pic.webp"
import meta from "../assets/meta.png"
import {useNavigate} from "react-router-dom"
import Footer from "../components/Footer.jsx"

function Login (){
    const navigate = useNavigate()

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const loginValid = username.length >= 1 && password.length >= 6;


    return(
        <>
        <div className="flex h-[98vh] lg:h-[95vh] w-full bg-white">
            {/* Left Half */}
            <div className=" w-[130%] hidden lg:block border-gray-300 border-r-2 border-b-[1px]">
                <div className="bg-white h-[20%]">
                    <img className="w-20 pt-14 ml-14" src={instaLogo} alt="Instagram_logo" />
                </div>
                <div className="text-center h-[20%] pt-5 pl-[9vw] pr-[6vw] justify-center">
                    <h1 className="text-[2.8vw] xl:text-[2.5vw]">See everyday moments from your 
                    <span className="instaText"> close friends</span>.</h1>
                </div>
                <div className="h-[60%] text-center">
                    <img className="w-[430px] inline-block" src={pic} alt="image" />
                </div>
            </div>
            {/* Right Half */}
            <div className="bg-white w-screen min-w-[350px] border-gray-300 border-b-[1px] lg:pt-[55px] ">
                <div className="lg:hidden h-[130px] border-b-[1px] border-gray-300 text-center">
                    <img className="w-[75px] inline pt-8" src={instaLogo} alt="" />
                </div>
                <div className=" max-w-[645px] h-[75%] mx-auto px-[45px] pt-[55px]">
                    <h4 className="text-[17px] font-medium">Log into Instagram</h4>
                    <div className="relative">
                        <input id="username" value={username} onChange={(e)=>setUsername(e.target.value)}
                         className="font-medium peer text-[16px] mt-5 w-full h-[60px] pt-3 pl-[15px] rounded-[15px] border-[1px]
                         border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none" placeholder=" " type="text" />
                         <label htmlFor="username" className="peer-placeholder-shown:top-9 absolute top-6 left-4 text-gray-500  
                         peer-placeholder-shown:text-base font-medium text-sm peer-focus:top-6 peer-focus:text-sm transition-all">Mobile number, username or email</label>
                    </div>
                    <div className="relative">
                        <input id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        className="font-medium peer text-[16px] pt-3 pl-[15px] mt-3 w-full h-[60px] rounded-[15px] border-[1px]
                        border-gray-300 hover:border-gray-500 focus:border-gray-500 outline-none" type="password" placeholder=" "/>
                        <label htmlFor="password" className="peer-placeholder-shown:top-7 absolute top-4 left-4 font-medium text-gray-500 
                         peer-placeholder-shown:text-base text-sm peer-focus:top-4 peer-focus:text-sm transition-all ">Password</label>
                    
                    </div>
                    
                    <button disabled={!loginValid} className={`active:opacity-70 text-[15px] font-medium w-full mt-6 h-[45px] text-gray-50 rounded-[20px] active:scale-[0.98] ${loginValid ? "bg-blue-600 cursor-pointer" : "bg-blue-300 cursor-not-allowed"} `}
                    onClick={()=>console.log("userName : "+username+"\npassword : "+password)}>Log in</button>
                    <button className="text-[15px] font-medium w-full mt-3 h-[47px] rounded-[20px] hover:bg-gray-100 active:scale-[0.99] active:opacity-65 cursor-pointer">Forgot Password?</button>
                    <button className="text-[15px] font-medium w-full mt-12 h-[47px] text-blue-600 border-blue-500 border-[1px] rounded-[20px] cursor-pointer hover:bg-gray-100 active:scale-[0.98] active:opacity-70"
                    onClick={()=>navigate('/signup')}>Create new account</button>
                    <div className="pt-[18px] font-medium text-[17px] w-full text-center"><img className="w-5 inline" src={meta} alt="" /> Meta</div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Login