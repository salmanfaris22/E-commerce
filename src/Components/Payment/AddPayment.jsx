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
            const GetOrders = res.data.orders || {};

            
            if (GetOrders[item.id]) {
              
                const existingItem = GetOrders[item.id];
                existingItem.qty += qty;
                existingItem.qtyPrice += price;
                existingItem.paymentMethord = Payment;
                existingItem.size = size;
                existingItem.userInfo = useInfo;
                existingItem.date = date;
            } else {
               
                GetOrders[item.id] = newItem;
            }

         
            await axios.patch(`${userAPI}/${user}`, { orders: GetOrders });
           
          
        } catch (err) {
            console.log("Order time error:", err);
        }
    } else {
        toast.warning("Please Log in");
    }
};

export const CancelOrder = async (item) => {
    try {
        const user = localStorage.getItem("id");
        if (!user) {
            toast.warning("Please Log in");
            return;
        }

        const response = await axios.get(`${userAPI}/${user}`);
        const currentCart = response.data.orders;

        if (!currentCart || !currentCart[item.id]) {
            toast.warning("Item not found in your orders");
            return;
        }

        
        // eslint-disable-next-line no-unused-vars
        const { [item.id]: removed, ...remainingItems } = currentCart;

       
        await axios.patch(`${userAPI}/${user}`, { orders: remainingItems });

        
        toast.success("Order has been canceled");
    } catch (error) {
        console.error("Error canceling the order:", error);
        toast.error("Failed to cancel the order");
    }
};
