import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const MIN_RATING = 1;
const MAX_RATING = 5;

const Product = ({ id, title, images, rating, slug, price, description, about_items, note, category, has_prime }) => {
  const firstImage = `http://127.0.0.1:8000${images[0].image}`
  
  return (
    <div className="flex flex-col relative m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 tex-xs italic text-gray-400">{category}</p>
      
      <Image src={firstImage} height={200} width={200} objectFit="contain" className="cursor-pointer" />
      
      <h4 className="my-3 cursor-pointer line-clamp-2">{title}</h4>       

      <div className="flex">
        {Array(rating).fill().map(_ => (
          <StarIcon className="h-5 text-yellow-500" />
        ))}
      </div>

      <p className="text-xs my-2 cursor-pointer">{description}</p>

      <div className="mb-5 cursor-pointer">
        <Currency quantity={price} currency="GBP" />
      </div>

      {has_prime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="https://links.papareact.com/fdw" />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button className="mt-auto button cursor-pointer">Add to Basket</button>
    </div>
  );
};

export default Product;
