import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Particlesbg } from "./Particlesbg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmPassword = () => {
    setConfirmShowPassword((prev) => !prev);
  };

  // console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    // console.log("inside submit");
    e.preventDefault();

    const { email, password, confirmPassword } = userData;

    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log(userData, "clg");
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const dataRes = await fetchData.json();
        // console.log(dataRes);

        const getbill = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/getbill`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        const getbillRes = await getbill.json();

        if (dataRes.alert && getbillRes) {
          toast("Successfully Created");
          setTimeout(() => {
            navigate("/final");
          }, 1000);
        } else {
          toast("Not Valid email");
        }
      } else if (password !== confirmPassword) {
        toast("password does not match"); // after done by backend to send userData
      }
    } else {
      toast("Please fill all fields"); // after done by backend to send userData
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black  backdrop-blur-3xl h-screen">
      <Particlesbg />
      <div className="py-1 md:py-2 w-full m-auto max-w-sm flex flex-col h-full overflow-hidden items-center justify-center">
        <div className="z-50">
          <div>
            <form className="w-full py-3" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-white">
                Email:{" "}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
              />

              <label htmlFor="password" className="text-white">
                Password:{" "}
              </label>
              <div className="flex bg-slate-200 rounded -py-1 items-center mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
                />

                {showPassword ? (
                  <span
                    className="text-2xl text-slate-700 p-2 cursor-pointer"
                    onClick={handlePassword}
                  >
                    <BiHide />
                  </span>
                ) : (
                  <span
                    className="text-2xl text-slate-700 p-2 cursor-pointer"
                    onClick={handlePassword}
                  >
                    <BiShow />
                  </span>
                )}
              </div>

              <label htmlFor="confirmPassword" className="text-white">
                Confirm Password:{" "}
              </label>
              <div className="flex bg-slate-200 rounded items-center mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
                />

                {showConfirmPassword ? (
                  <span
                    className="text-2xl text-slate-700 p-2 cursor-pointer"
                    onClick={handleConfirmPassword}
                  >
                    <BiHide />
                  </span>
                ) : (
                  <span
                    className="text-2xl text-slate-700 p-2 cursor-pointer"
                    onClick={handleConfirmPassword}
                  >
                    <BiShow />
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button className="text-white w-1/2 rounded py-2  m-2 my-7 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
