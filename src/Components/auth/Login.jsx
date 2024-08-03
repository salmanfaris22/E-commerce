import { userAPI } from "../API/API_URL";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../Assets/pexels-craytive-1456706.jpg";

const Login = () => {
  const Navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = {};

    try {
      const response = await axios.get(userAPI);
      const user = response.data.find(
        (user) => user.email === credentials.email
      );

      if (user) {
        if (user.password === credentials.password) {
          toast.success("Login successful!");
          localStorage.setItem("id",user.id)
          localStorage.setItem("name",user.fname)
          Navigate("/")
          window.location.reload();
        } else {
          validation.password = "Incorrect password";
          toast.error("Incorrect password");
        }
      } else {
        validation.email = "Email not found";
        validation.password = "Incorrect password";
        toast.error("Somethin Went Wrong");
     
     
      }
    } catch (error) {
      toast.error("Error: " + error);
    }

    setErrors(validation);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] m-auto absolute z-10  top-0 w-[100vw]"
      style={{ background: `url(${LoginImg})`, backgroundSize: 'cover' }}
    >
       <ToastContainer />
      <div className="relative flex justify-center items-center h-full w-full backdrop-blur-sm p-4">
        <div className="absolute inset-0 bg-black opacity-50 z-0"
       
        ></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-center md:justify-between max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col justify-center md:w-1/2 p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <input
                  name="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-md p-2"
                  value={credentials.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  name="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-md p-2"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                >
                  Submit
                </button>
                <Link to={"/register"}>
                  <div className="text-blue-500 hover:underline cursor-pointer">
                    Register
                  </div>
                </Link>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 flex justify-center items-center p-4">
            <img
              src={LoginImg}
              alt="Login Illustration"
              className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
