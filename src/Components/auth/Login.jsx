import { userAPI } from "../API/API_URL";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = {};

    try {
      const response = await axios.get(userAPI);
      const user = response.data.find(user => user.email === credentials.email);

      if (user) {
        if (user.password === credentials.password) {
          alert("Login successful!");
        } else {
          validation.password = "Incorrect password";
        }
      } else {
        validation.email = "Email not found";
        validation.password = "Incorrect password";
      }
    } catch (error) {
      console.log("Error: " + error);
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
    <div className="flex justify-center items-center h-[100vh] m-auto">
      <div className="grid grid-cols-2 h-[500px] m-auto shadow shadow-black">
        <form
          className="h-[500px] m-auto w-[400px] flex flex-col items-center justify-evenly"
          onSubmit={handleSubmit}
        >
          <div>Welcome</div>
          <div className="flex flex-col gap-4">
            <input
              name="email"
              placeholder="Email"
              className="border"
              value={credentials.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}

            <input
              name="password"
              placeholder="Password"
              className="border"
              type="password"
              value={credentials.password}
              onChange={handleChange}
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="h-[500px] m-auto">kjhj</div>
      </div>
    </div>
  );
};

export default Login;
