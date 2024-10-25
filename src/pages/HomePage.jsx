import React from 'react'
import DashTop from '../components/DashTop'
import lappyImage from '../assets/LappyImage.png';
import lapbottom from '../assets/lapbottom.png';
import screenCapture from '../assets/screenCapture.png';
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return <>
  <DashTop />
  <div className="max-w-[1950px] mx-auto">
  <div className="w-11/12  mx-auto flex flex-col items-center justify-center py-36 gap-10">
      <div className="w-full py-5 flex flex-col items-center justify-center text-center gap-8">
          <h1 className=' font-Tiempos text-7xl'>
            Make Smart Moves Based <br /> on Intelligent <span className='text-[#0E6BA8]'>Data Analysis</span>
          </h1>
          <p className="font-Helvetica text-2xl">Dive deep into app analytics for informed decision-making.</p>
      </div>
      <button className="px-10 py-3 bg-[#0E6BA8] text-xl font-semibold rounded-full text-[#FFFFFF]"
      onClick={()=>{navigate('/login')}}>Register Now</button>
  </div>
  <div className="max-w-[1950px] mx-auto flex flex-col items-center justify-center relative">
    <div className="w-1/2 bg-black absolute top-2 h-3/4 overflow-y-auto no-scrollbar rounded-2xl border-8 border-[#E0E0E0] shadow-custom3">
      <img src={screenCapture} alt="" />
    </div>
    <div className=" w-1/3 h-3 py-2 bg-[#1C1F24] absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex place-items-center justify-center">
      <div className="w-11/12 lap-gradient mx-auto h-4"></div>
    </div>
    <div className="absolute top-3/4 mt-2 mb-12">
      <img src={lapbottom} alt="" />
    </div>
    <div className="w-full mt-10 py-80 bg-gradient-to-r from-blue-500 to-blue-900">
    </div>
  </div>
</div>
</>
}

export default HomePage