import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import {
  calculateTotals,
  clearCart,
} from "../redux/basketRedux";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stipe_public_key);
import { useEffect } from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { totatlQuantity, items, total } = useSelector((state) => state.basket);
  const router = useRouter();


  const handleRedirect = async () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      const stripe = await stripePromise;

      // call backend to create a checkout session
      const checkoutSession = await axios.post("/api/create-checkout-session", {
        items: items,
        email: currentUser.email,
      });

      // redirect user to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      result.error && alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? (
                "Your Amazon basket is empty"
              ) : (
                <div className="flex justify-between">
                  <p>Your shopping basket</p>
                  <button
                    className="mt-1 md:mt-2 button cursor-pointer"
                    onClick={() => {
                      dispatch(clearCart())
                      dispatch(calculateTotals())
                    }}
                  >
                    Clear all items
                  </button>
                </div>
              )}
            </h1>
            {items.map(
              ({
                title,
                images,
                rating,
                slug,
                price,
                description,
                category,
                quantity,
              }) => (
                <CheckoutProduct
                  key={slug}
                  title={title}
                  slug={slug}
                  images={images}
                  rating={rating}
                  price={price}
                  description={description}
                  category={category}
                  quantity={quantity}
                />
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({totatlQuantity} items):
                <span className="font-bold ml-1">
                  <Currency quantity={total} currency="GBP" />
                </span>
              </h2>

              <button
                className={`button mt-2 ${
                  !isAuthenticated &&
                  "from-gray-300 to-gray-500 border-gray-200"
                }`}
                onClick={handleRedirect}
                role="link"
              >
                {!isAuthenticated ? "Login to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
