import React from 'react';
import top_icon from "../assets/appstore-PhotoRoom.png"
import { useNavigate } from 'react-router-dom';

const DashTop = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogInOut = () => {
        if (token) {
            // Perform logout action
            localStorage.removeItem('token');
            navigate('/login'); // Redirect to login page after logout
        } else {
            // Redirect to login page if not logged in
            navigate('/login');
        }
    }
    return (
        <div className="w-full mx-auto bg-[#0E6BA8] bg-opacity-20 py-5 px-10 flex flex-wrap items-center lg:gap-0 gap-4 justify-between rounded-b-2xl">
            <div className="sm:w-4/6 md:4/6 w-full flex items-center gap-5 hover:cursor-pointer"
            onClick={(e)=>{navigate('/')}}>
                <div className="w-10 h-16 bg-[#252525] rounded-md flex flex-col items-center justify-around py-1">
                    <div className="h-1 w-2/6 rounded-2xl bg-white mx-auto"></div>
                    <div className="w-4/5 py-1 bg-white flex items-center justify-center">
                        <img className="w-full h-full" src={top_icon} alt="" />
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="">
                    <h1 className='sm:text-4xl text-2xl'>App <span className="font-bold">Analytics</span></h1>
                </div>
            </div>
            <div className="text-xl font-semibold text-[#0E6BA8] md:mt-0 lg:mt-0 hover:cursor-pointer flex items-center justify-between gap-5">
                {token ? (
                    <>
                        <p onClick={(e)=>{navigate('/dashboard')}}>Dashboard</p>
                        <p onClick={handleLogInOut}>Log Out</p>

                    </>
                ) : (
                    <>
                        <p onClick={handleLogInOut}>Log In</p>
                        <button className="px-10 py-3 bg-[#0E6BA8] rounded-full text-[#FFFFFF]">Register</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default DashTop;
