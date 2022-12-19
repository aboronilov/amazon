import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectItems,
  selectTotal,
} from "../redux/basketRedux";

const CheckoutProduct = ({
  title,
  images,
  rating,
  slug,
  price,
  description,
  category,
  quantity,
  // setQuantity,
}) => {
  const descriptionList = description.split(", ").slice(0, 3);
  const dispatch = useDispatch();

  const [qty, setQty] = useState(quantity);

  const handleQuantity = (type) => {
    if (type === "dec") {
      qty > 1 && setQty(qty - 1);
    } else {
      setQty(qty + 1);
    }
  };

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

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ slug }));
  };
  return (
    <div className="grid grid-cols-8 shadow shadow-slate-300 relative p-1">
      <div className="h-40 relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`}
          //   width={200}
          //   height={200}
          objectFit="contain"
          layout="fill"
        />
      </div>

      <div className="col-span-3 mx-5">
        <p className="text-sm md:text-base line-clamp-2">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2">
          {descriptionList.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </p>
        {/* <Currency quantity={price} currency="GBP" /> */}
      </div>

      <div className="my-auto font-semibold text-xs md:text-sm">
        <Currency quantity={price} currency="GBP" />
      </div>

      <div className="my-auto flex gap-x-1 items-center text-xs md:text-sm">
        x
        <div className="border border-gray-300 px-2 shadow-md rounded-md">
          {qty}
        </div>
      </div>

      <div className="my-auto font-bold text-xs md:text-sm">
        <Currency quantity={qty * price} currency="GBP" />
      </div>

      <div className="my-auto mx-auto cursor-pointer ">
        {/* <button className="button mt-auto" onClick={addItemToBasket}>Add to Basket</button> */}
        {/* <button className="button mt-auto" onClick={removeItemFromBasket}>
          Remove from Basket
        </button> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5"
          onClick={removeItemFromBasket}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default CheckoutProduct;
