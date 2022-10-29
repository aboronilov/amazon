import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const MIN_RATING = 1;
const MAX_RATING = 5;

const Product = ({ id, title, price, description, category, image }) => {
  const rating = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  
  return (
    <div className="flex flex-col relative m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 tex-xs italic text-gray-400">{category}</p>
      
      <Image src={image} height={200} width={200} objectFit="contain" />
      
      <h4 className="my-3">{title}</h4>       

      <div className="flex">
        {Array(MAX_RATING).fill().map(_ => (
          <StarIcon className="h-5 text-yellow-500" />
        ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;
