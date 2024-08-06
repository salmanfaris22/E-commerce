import axios from "axios";
import { useEffect, useState } from "react";
import { userAPI } from "../../../../Components/API/API_URL";
import { HandleDelet } from "../buttonFunction/Delete";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function users() {
      try {
        const res = await axios.get(userAPI);
        const use = res.data.filter((e) => e.admin !== true);
        setUser(use);
      } catch (err) {
        console.log(err, "Admin userErr");
      }
    }
    users();
  }, []);

  async function deleteUSer(e) {
    try {
      await HandleDelet(e);
      const res = await axios.get(userAPI);
      const use = res.data.filter((e) => e.admin !== true);
      setUser(use);
      toast.success("Deleted user successfully!");
    } catch (err) {
      console.log("Something went wrong");
    }
  }

  return (
    <div className="  bg-gray-100 h-[100vh] p-6">
      <ToastContainer />
      <div className="ml-[100px] ">
      <div className="flex flex-col gap-6 mt-4">
        {user.map((e, i) => (
          <div
            key={e.id}
            className="hover:scale-105 grid grid-cols-1 md:grid-cols-3  transition-transform transform gap-4 p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center font-semibold">
              <span className="mr-3">{i + 1}</span>
              <span>{e.fname}</span> <span className="ml-1">{e.lname}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              {e.email}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-end gap-2">
             
              <button
                className="bg-red-500 text-white rounded-lg p-2 md:w-auto w-full"
                onClick={() => deleteUSer(e)}
              >
                Delete
              </button>
              <Link to={`/UserInfo/${e.id}`}>
              <button className="bg-blue-500 text-white p-2 rounded-lg md:w-auto w-full">
                More Information
              </button>
              </Link>
              
              <button className="bg-white text-black rounded-lg p-2 border md:w-auto w-full">
                Make Admin
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default UserDetails;
