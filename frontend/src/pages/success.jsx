import React from "react";
import Header from "../components/Header";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart, removeItem, calculateTotals } from "../redux/basketRedux";

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((store) => store.basket);

  const createOrders = async (item) => {
    try {
      const accessToken = localStorage.getItem("token");
      const orderCreation = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });      
      const response = await orderCreation.post("/api/order/", { item });
      if (response.status === 201) {
        dispatch(removeItem(item.slug))
        dispatch(calculateTotals())
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOrders = () => {
    items.forEach((item) => createOrders(item));    
    router.push("/orders");
    // dispatch(clearCart());
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            items have been delivered. You can track your order's status on the
            special page (link below)
          </p>
          <button className="button mt-8" onClick={handleOrders}>
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
