import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const {loginUser, signInWithGoogle} = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      await loginUser(data.email, data.password);
      alert("login successfull")
      navigate("/")
    } catch (error) {
      setMessage("Please provide a valid email and password") 
       console.error(error)
    }
  }

  const handleGoogleSignIn = async () => {
    //google sign in logic
    try {
      await signInWithGoogle()
      alert("Login Succeesful")
      navigate("/")
    } catch (error) {
      alert("Please provide a valid email and password") 
       console.error(error)
    }
    
  }


  return (
    <div className="h-[780px]  flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input*/}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {/* password input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter YourPassword "
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 tx-xs italic mb-3">{message}</p>
          )}
          {/* Login Button */}
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          Haven't an account? Please
          <Link className="text-blue-500 hover:text-blue-700" to="/register">
            {" "}
            Register
          </Link>
        </p>
        {/* google sign In */}
        <div className="mt-4">
          <button 
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 book Store. All right reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
