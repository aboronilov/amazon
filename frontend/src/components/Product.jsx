import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToBasket } from "../redux/basketRedux";

const Product = ({
  title,
  images,
  rating,
  slug,
  price,
  description,
  category,
}) => {
  const firstImage = `${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      title,
      images,
      rating,
      slug,
      price,
      description,
      category,
      quantity,
      // setQuantity,
    };
    dispatch(addToBasket(product));
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col relative m-5 bg-white z-30 p-10">
      <div className="">
        <Link href={`/product/${slug}`}>
          <div className="absolute top-2 right-2 tex-xs italic text-gray-400">
            {category}
          </div>

          <div className="h-[200px] relative">
            <Image
              src={firstImage}
              // height={200}
              // width={200}
              objectFit="contain"
              layout="fill"
              className="cursor-pointer"
            />
          </div>

          <h4 className="my-3 cursor-pointer line-clamp-2">{title}</h4>

          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={i} className="h-5 text-yellow-500" />
              ))}
          </div>

          <div className="text-xs my-2 cursor-pointer line-clamp-2">
            {description}
          </div>
        </Link>

        <div className="mb-5 flex justify-between">
          <Currency quantity={price} currency="GBP" />

          <div className="flex gap-x-1 items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => handleQuantity("dec")}
            >
              <path
                fill-rule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>

            <div className="border border-gray-300 px-2 shadow-md text-xs md:text-sm rounded-md">
              {quantity}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => handleQuantity("inc")}
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <button
        className="mt-auto button cursor-pointer"
        onClick={addItemToBasket}
      >
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
