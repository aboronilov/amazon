import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";

import {
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../redux/basketRedux";

const CheckoutProduct = ({
  title,
  images,
  rating,
  slug,
  price,
  description,
  quantity,
}) => {
  const descriptionList = description.split(", ").slice(0, 3);
  const dispatch = useDispatch();

  const [qty, setQty] = useState(quantity);

  const handleQuantity = (type) => {
    if (type === "dec") {
      qty > 1 && setQty(qty - 1);
      dispatch(decrease({ slug }));
    } else {
      setQty(qty + 1);
      dispatch(increase({ slug }));
    }
    dispatch(calculateTotals());
  };

  const removeItemFromBasket = () => {
    dispatch(removeItem(slug));
    dispatch(calculateTotals());
  };

  const router = useRouter();

  return (
    <div className="grid grid-cols-7 shadow shadow-slate-300 relative p-1">
      <div
        className="h-40 relative cursor-pointer"
        onClick={() => router.push(`product/${slug}`)}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`}
          //   width={200}
          //   height={200}
          objectFit="contain"
          layout="fill"
        />
      </div>

      <div className="col-span-3 mx-5">
        <p
          className="text-sm md:text-base line-clamp-2 cursor-pointer"
          onClick={() => router.push(`product/${slug}`)}
        >
          {title}
        </p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p
          className="text-xs my-2 cursor-pointer"
          onClick={() => router.push(`product/${slug}`)}
        >
          {descriptionList.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </p>
        <p
          className="text-xs md:text-sm text-blue-500 cursor-pointer"
          onClick={removeItemFromBasket}
        >
          Remove item
        </p>
      </div>

      <div className="my-auto font-semibold text-xs md:text-sm">
        <Currency quantity={price} currency="GBP" />
      </div>

      <div className="my-auto flex gap-x-1 items-center text-xs md:text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer"
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

        <div className="border border-gray-300 px-2 shadow-md rounded-md">
          {qty}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer"
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

      <div className="my-auto font-bold text-xs md:text-sm">
        <Currency quantity={qty * price} currency="GBP" />
      </div>
    </div>
  );
};

export default CheckoutProduct;
