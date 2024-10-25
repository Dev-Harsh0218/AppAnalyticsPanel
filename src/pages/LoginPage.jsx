import React, { useState } from "react";
import top_icon from "../assets/appstore-PhotoRoom.png";
import DashTop from "../components/DashTop";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const isDisabled = !email || !password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = new URL("https://aatracker.appanalytics.in/statApp/v1/login");
      url.searchParams.append("email", email);
      url.searchParams.append("password", password);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const jsonResponse = await response.json();
      localStorage.setItem("token", jsonResponse.token);

      if (response.ok) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('There was an error logging in:', error.message);
      toast.error('An error occurred while logging in');
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <DashTop />
      <div className="w-11/12 mx-auto mt-14 flex items-center justify-center">
        <div className="lg:w-4/12 lg:min-w-[550px] md:w-9/12 bg-white mx-auto flex flex-col items-center gap-10 pb-10 shadow-custom2">
          <div className="flex items-center gap-5 mt-10">
            <div className="w-10 h-16 bg-[#252525] rounded-md flex flex-col items-center justify-around py-1">
              <div className="h-1 w-2/6 rounded-2xl bg-white mx-auto"></div>
              <div className="w-4/5 py-1 bg-white flex items-center justify-center">
                <img className="w-full h-full" src={top_icon} alt="" />
              </div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="">
              <h1 className="sm:text-4xl text-2xl">
                App <span className="font-bold">Analytics</span>
              </h1>
            </div>
          </div>
          <div className="w-full mt-2 px-8 flex flex-col items-start justify-center">
            <form onSubmit={handleSubmit} className="w-full">
              <h1 className="font-bold text-lg">Email ID</h1>
              <input
                className="w-full border-2 mt-4 border-black focus:outline-none placeholder:text-3xl py-5 px-4 text-3xl rounded-2xl"
                type="text"
                autoComplete="email"
                placeholder="Enter Email ID here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1 className="mt-7 font-bold text-lg">Password</h1>
              <input
                className="w-full border-2 mt-4 border-black focus:outline-none placeholder:text-3xl py-5 px-4 text-3xl rounded-2xl"
                type="password"
                autoComplete="current-password"
                placeholder="Enter Password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h1 className="mt-3 font-bold underline underline-offset-4">Forgot password</h1>
              <div className="w-full mt-14 flex item-center justify-center">
                <button
                  type="submit"
                  className={`w-full rounded-2xl py-6 ${isDisabled ? 'bg-gray-400' : 'bg-[#0E6BA8]'} text-white`}
                  disabled={isDisabled}
                >Log in</button>
              </div>
            </form>
            <div className="bg-white w-full flex items-center justify-center mt-2">
              <p className="text-xl">Not registered?<span className="font-bold ml-2">Sign up</span></p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
