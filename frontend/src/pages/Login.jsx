import instaLogo from "../assets/insta-LOGO.png"
import pic from "../assets/Insta-pic.webp"

function Login (){
    return(
        <>
        <div className="flex h-[95vh] w-[100vw]">
            <div className="h-[100%] w-[130%] hidden lg:block border-gray-300 border-r-2 border-b-[1px]">
                <div className="bg-white h-[20%]">
                    <img className="w-20 pt-14 ml-14" src={instaLogo} alt="Instagram_logo" />
                </div>
                <div className="text-center h-[20%] pt-5 pl-[9vw] pr-[6vw] justify-center">
                    <h1 className="text-[2.8vw] xl:text-[2.4vw]">See everyday moments from your 
                    <span className="yeah"> close friends</span>.</h1>
                </div>
                <div className="h-[60%] text-center">
                    <img className="w-[430px] inline-block" src={pic} alt="image" />
                </div>
            </div>
            <div className="bg-white h-screen lg:h-[100%] w-screen min-w-[400px]">

            </div>

        </div>
        
        </>
    )
}
export default Login