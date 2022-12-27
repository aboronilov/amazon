import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Image from "next/image";
import { useRouter } from "next/router";

const OrderProduct = ({
  image,
  isActive,
  delivery_date,
  price,
  quantity,
  title,
  slug,
  description,
  rating
}) => {
  const descriptionList = description.split(", ").slice(0, 3);
  const router = useRouter();

  return (
    <div className="grid grid-cols-8 shadow shadow-slate-300 relative p-1 my-5">
      <div
        className="h-40 relative cursor-pointer"
        onClick={() => router.push(`product/${slug}`)}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
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
        <div className="flex mt-2 md:mb-0">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p
          className="text-xs mt-3 cursor-pointer line-clamp-3"
          onClick={() => router.push(`product/${slug}`)}
        >
          {descriptionList.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </p>
      </div>

      <div className="my-auto font-semibold text-xs md:text-sm">
        <Currency quantity={price} currency="GBP" />
      </div>

      <div className="my-auto flex items-center text-xs md:text-sm">

        <div className="border border-gray-300 px-2 shadow-md rounded-md">
          x{quantity}
        </div>

      </div>

      <div className="my-auto font-bold text-xs md:text-sm">
        <Currency quantity={quantity * price} currency="GBP" />
      </div>

      <div className="flex flex-col items-center justify-center text-xs md:text-sm gap-y-1">
        {isActive ? (
            <p className="text-blue-500">Expected:</p>
        ) : (
            <p className="text-blue-500">Delivered:</p>
        )}
        <p className="font-semibold text-[0.62rem] md:text-[0.85rem] lg:text-sm text-center">{delivery_date}</p>
      </div>
    </div>
  );
};

export default OrderProduct;
