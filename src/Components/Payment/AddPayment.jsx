import axios from "axios";
import { toast } from "react-toastify";
import { userAPI } from "../API/API_URL";

export const PaymentAdd = async (item, qty, price, Payment, size, useInfo) => {
    const user = localStorage.getItem("id");
    if (user) {
        try {
            const date = new Date();
            const newItem = {
                ...item,
                qty: qty,
                qtyPrice: price,
                paymentMethord: Payment,
                size: size,
                userInfo: useInfo,
                status: "pending",
                userId: user,
                date: date
            };

            const res = await axios.get(`${userAPI}/${user}`);
            const currentOrders = res.data.orders || [];

            const updatedOrders = [...currentOrders, newItem];

            await axios.patch(`${userAPI}/${user}`, { orders: updatedOrders });

            console.log("Order added:", newItem);
            toast.success("Thanks for ordering!");
        } catch (err) {
            console.error("Order processing error:", err);
            toast.error("Failed to process the order. Please try again.");
        }
    } else {
        toast.warning("Please log in.");
    }
};
export const CancelOrder = async (item, i) => {
  try {
      const user = localStorage.getItem("id");
      if (!user) {
          toast.warning("Please log in to cancel your order.");
          return;
      }

      const response = await axios.get(`${userAPI}/${user}`);
      const currentOrders = response.data.orders || [];

      // Filter out the item to be removed by its index
      const updatedOrders = currentOrders.filter((order, index) => index !== i);

      // Update the orders in the database
      await axios.patch(`${userAPI}/${user}`, { orders: updatedOrders });

      console.log("Order canceled:", item);
      toast.success("Order canceled successfully.");
  } catch (error) {
      console.error("Error canceling the order:", error);
      toast.error("Failed to cancel the order. Please try again.");
  }
};