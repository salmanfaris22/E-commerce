import axios from "axios";
import { userAPI } from "../API/API_URL";
import { Bounce, toast } from "react-toastify";
export const handleAddCart = async (item) => {
  const user = localStorage.getItem("id");
  if (user) {
    try {
      const response = await axios.get(`${userAPI}/${user}`);
      const currentCart = response.data.cart;

      const updatedCart = {
        ...currentCart,
        [item.id]: item,
      };

      await axios.patch(`${userAPI}/${user}`, { cart: updatedCart });

      toast("🦄 Item successfully added to cart!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.warning("Something went Wrong");
      console.error("Error adding to cart:", error);
    }
  } else {
    toast.warning("pleas Logine");
  }
};

export const handleRemovecart = async (item) => {
  try {
    const user = localStorage.getItem("id");

    const response = await axios.get(`${userAPI}/${user}`);
    const currentCart = response.data.cart;

    // eslint-disable-next-line no-unused-vars
    const { [item.id]: Remove, ...snew } = currentCart;

    await axios.patch(`${userAPI}/${user}`, { cart: snew });

    console.log("Item successfully added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
