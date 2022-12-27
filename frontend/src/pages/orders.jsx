import React from "react";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";
import OrderProduct from "../components/OrderProduct";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showActive, setShowActive] = useState(true);
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  orders.map((item) => {
    const paymentDateSplit = item.payment_date.split("-");
    const paymentDate = new Date(
      paymentDateSplit[0],
      paymentDateSplit[1] - 1,
      paymentDateSplit[2]
    );
    const deliveryDate = addDays(paymentDate, 3);
    const today = new Date();    
    
    item.isActive = deliveryDate > today;
    item.delivery_date = deliveryDate.toDateString();
  });

  console.log(orders)

  const filteredOrders = orders.filter((item) => item.isActive === showActive);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your orders
        </h1>

        <div className="flex gap-x-5">
          {showActive ? (
            <button
              className="cursor-pointer border-b border-yellow-400 font-semibold"
              onClick={() => setShowActive(true)}
            >
              Active
            </button>
          ) : (
            <button
              className="cursor-pointer focus:border-b focus:border-yellow-400 focus:font-semibold"
              onClick={() => setShowActive(true)}
            >
              Active
            </button>
          )}
          <button
            className="cursor-pointer focus:border-b focus:border-yellow-400 focus:font-semibold"
            onClick={() => setShowActive(false)}
          >
            Archive
          </button>
        </div>

        {filteredOrders.map(
          ({
            id,
            image,
            isActive,
            delivery_date,
            price,
            quantity,
            title,
            slug,
            description,
            rating
          }) => (
            <OrderProduct
              key={id}
              image={image}
              isActive={isActive}
              delivery_date={delivery_date}
              price={price}
              quantity={quantity}
              title={title}
              slug={slug}
              description={description}
              rating={rating}
            />
          )
        )}
      </main>
    </div>
  );
};

export default Orders;
