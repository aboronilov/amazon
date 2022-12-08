import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems } from "../redux/basketRedux";

const Checkout = () => {
  const items = useSelector(selectItems);
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
              {items.length === 0
                ? "Your Amazon basket is empty"
                : "Your shopping basket"}
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
                />
              )
            )}
          </div>
        </div>

        {/* Right */}
        <div className=""></div>
      </main>
    </div>
  );
};

export default Checkout;
