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
    };
    dispatch(addToBasket(product));
  };

  return (
    <>
      <div className="flex flex-col relative m-5 bg-white z-30 p-10">
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

          <div className="mb-5 cursor-pointer">
            <Currency quantity={price} currency="GBP" />
          </div>
        </Link>

        <button
          className="mt-auto button cursor-pointer"
          onClick={addItemToBasket}
        >
          Add to Basket
        </button>
      </div>
    </>
  );
};

export default Product;
