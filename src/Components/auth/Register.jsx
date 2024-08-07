import { userAPI } from "../API/API_URL";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginImg from "../../Assets/pexels-craytive-1456706.jpg";
import { Link, useNavigate } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [email, setEmail] = useState([]);

  useEffect(() => {
    axios
      .get(userAPI)
      .then((res) => setEmail(res.data))
      .catch((rs) => console.log(rs));
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (val) => {
    const err = {};

    if (!val.fname) {
      err.fname = "Please enter your first name";
    }
    if (!val.lname) {
      err.lname = "Please enter your last name";
    }
    if (!val.email) {
      err.email = "Please enter your email";
    }
    if (!val.password) {
      err.password = "Please enter your password";
    }
    if (!val.cpassword) {
      err.cpassword = "Please confirm your password";
    }
    if (val.password !== val.cpassword) {
      err.check = "Passwords do not match";
    }

    return err;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(input);
    setError(errors);
    const mail = email.find((e) => e.email === input.email);

    if (mail) {
      toast.error("Email Alredy Used");
    } else {
      if (Object.keys(errors).length === 0) {
        try {
          await axios.post(userAPI, input);
          toast.success("Registration successful!");
          navigate("/login");
        } catch (err) {
          toast.error("Error: " + err.message);
        }
      } else {
        toast.error("Please fill out the form correctly");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        className="flex justify-center items-center h-[100vh] m-auto absolute z-10  top-0 w-[100vw]"
        style={{ background: `url(${LoginImg})`, backgroundSize: "cover" }}
      >
        <div className="relative flex justify-center items-center w-full h-full backdrop-blur-sm p-4">
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-center md:justify-between max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col justify-center md:w-1/2 p-4">
              <h1 className="text-2xl font-bold mb-4">Register</h1>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="fname"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="First Name"
                    onChange={handleChange}
                    value={input.fname || ""}
                  />
                  {error.fname && (
                    <span className="text-red-500 text-sm">{error.fname}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="text"
                    name="lname"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Last Name"
                    onChange={handleChange}
                    value={input.lname || ""}
                  />
                  {error.lname && (
                    <span className="text-red-500 text-sm">{error.lname}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="email"
                    name="email"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Email"
                    onChange={handleChange}
                    value={input.email || ""}
                  />
                  {error.email && (
                    <span className="text-red-500 text-sm">{error.email}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="password"
                    name="password"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Password"
                    onChange={handleChange}
                    value={input.password || ""}
                  />
                  {error.password && (
                    <span className="text-red-500 text-sm">
                      {error.password}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    type="password"
                    name="cpassword"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={input.cpassword || ""}
                  />
                  {error.cpassword && (
                    <span className="text-red-500 text-sm">
                      {error.cpassword}
                    </span>
                  )}
                  {error.check && (
                    <span className="text-red-500 text-sm">{error.check}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
                  >
                    Submit
                  </button>
                  <Link
                    to={"/login"}
                    className="text-blue-500  px-4 py-2  transition-transform transform hover:scale-105"
                  >
                    Login
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
    </div>
  );
};
