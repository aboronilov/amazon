import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Link from "next/link";

const Product = ({
  title,
  images,
  rating,
  slug,
  price,
  description,
  category,
}) => {
  const firstImage = `http://127.0.0.1:8000${images[0].image}`;

  return (
    <Link href={`/product/${slug}`}>
      <div className="flex flex-col relative m-5 bg-white z-30 p-10">
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
            .map((_) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>

        <div className="text-xs my-2 cursor-pointer line-clamp-2">{description}</div>

        <div className="mb-5 cursor-pointer">
          <Currency quantity={price} currency="GBP" />
        </div>

        <button className="mt-auto button cursor-pointer">Add to Basket</button>
      </div>
    </Link>
  );
};

export default Product;
