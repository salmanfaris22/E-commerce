import { Color } from "../Home/Color";
import { userAPI } from "../API/API_URL";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const Validate = (val) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const errors = Validate(input);
    setError(errors);

    if (Object.keys(errors).length === 0) {
      axios
        .post(userAPI, input)
        .then(() => {
          toast.success("Registration successful!");
        })
        .catch((err) => {
          toast.error("Error: " + err.message);
        });
    } else {
      toast.error("Please fill out the form correctly");
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-center items-center h-[100vh] m-auto">
        <div className="grid grid-cols-2 h-[500px] m-auto shadow shadow-black">
          <form
            className="h-[500px] m-auto w-[400px] flex flex-col items-center justify-evenly"
            style={{ background: Color.primary }}
            onSubmit={onSubmit}
          >
            <div>Welcome</div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="fname"
                className="border"
                placeholder="First Name"
                onChange={handleChange}
                value={input.fname || ""}
              />
              {error.fname && <span className="text-red-500">{error.fname}</span>}

              <input
                type="text"
                name="lname"
                className="border"
                placeholder="Last Name"
                onChange={handleChange}
                value={input.lname || ""}
              />
              {error.lname && <span className="text-red-500">{error.lname}</span>}

              <input
                type="email"
                name="email"
                className="border"
                placeholder="Email"
                onChange={handleChange}
                value={input.email || ""}
              />
              {error.email && <span className="text-red-500">{error.email}</span>}

              <input
                type="password"
                name="password"
                className="border"
                placeholder="Password"
                onChange={handleChange}
                value={input.password || ""}
              />
              {error.password && <span className="text-red-500">{error.password}</span>}

              <input
                type="password"
                name="cpassword"
                className="border"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={input.cpassword || ""}
              />
              {error.cpassword && <span className="text-red-500">{error.cpassword}</span>}
              {error.check && <span className="text-red-500">{error.check}</span>}
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="h-[500px] m-auto">kjhj</div>
        </div>
      </div>
    </div>
  );
};
