import React, { useState } from "react";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { addDays } from "date-fns";

const ProductDetail = ({ product }) => {
  const {
    images,
    title,
    rating,
    price,
    description,
    about_items,
    note,
  } = product;

  const [image, setImage] = useState(images[0].image);

  const onImageOver = (src) => {
    setImage(src);
  };

  const descriptionList = description.split(", ");
  const about = about_items.split(" / ");

  const now = new Date();
  const deliveryDate = addDays(now, 3).toDateString();

  return (
    <div className="flex flex-col lg:flex-row gap-y-3 md:gap-x-3 mt-5 md:mt-10">
      {/* left */}
      <div className="hidden lg:flex flex-col flex-grow md:flex-row">
        <div className="flex flex-row md:flex-col gap-y-2 m-2 items-center justify-start">
          {images.map(({ image }, i) => (
            <div
              className="h-10 w-10 relative rounded-lg hover:border-blue-300 border-gray-200 border-2 hover:shadow-2xl"
              key={i}
              onMouseOver={() => {
                onImageOver(image);
              }}
            >
              <Image
                src={`http://127.0.0.1:8000/${image}`}
                objectFit="contain"
                layout="fill"
                className="cursor-pointer rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="flex h-[250px] w-[250px] md:h-[300px] md:w-[300px] xl:h-[450px] xl:w-[450px] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
            objectFit="contain"
            layout="fill"
            className="cursor-pointer rounded-lg"
          />
        </div>
      </div>

      <div className="block lg:hidden">
        <Carousel animation="fade" navButtonsAlwaysVisible={true}>
          {images.map(({ image }, i) => (
            <div key={i} className="h-96 w-96">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${image}`}
                objectFit="contain"
                layout="fill"
                className="cursor-pointer rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* middle */}
      <div className="flex flex-col flex-grow px-2">
        <div className="font-medium text-xl xl:text-2xl">{title}</div>
        <div className="mt-2 md:mt-4 flex cursor-pointer">
          {Array(rating)
            .fill()
            .map((_) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <div className="mt-1 w-full border-b border-gray-400"></div>

        <div className="my-1 text-xl xl:my-3 xl:text-2xl">
          <Currency quantity={price} currency="GBP" />
        </div>
        <div className="text-xs text-gray-500">No Import Fees Deposit</div>
        <div className="flex flex-col mt-1 xl:mt-3 text-xs xl:text-sm gap-y-1 md:gap-y-2">
          {descriptionList.map((item) => {
            const itemList = item.split(" - ");
            return (
              <div key={itemList[0]} className="flex">
                <div className="min-w-[200px] md:min-w-[300px] font-bold">{itemList[0]}</div>
                <div>{itemList[1]}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-1 w-full border-b border-gray-400"></div>

        <div className="text-sm xl:text-xl font-bold mt-1 xl:mt-2">About this item</div>
        <ul>
          {about.map((item, i) => (
            <li key={i} className="list-disc list-inside text-xs xl:text-sm">
              {item}
            </li>
          ))}
        </ul>
        {note && (
          <div className="mt-1 text-xs xl:mt-5 xl:text-sm inline-block">
            <span className="font-bold">Note: </span>
            <span className="">{note}</span>
          </div>
        )}
      </div>

      {/* right */}
      <div className="border-2 border-gray-300 px-2 rounded-lg m-1 h-[40%] min-w-[15%] flex flex-col justify-between">
        <div className="text-xl md:text-2xl">
          <Currency quantity={price} currency="GBP" />
        </div>
        <div className="text-xs text-gray-500 mt-1 md:mt-2">
          No Import Fees Deposit & Shipping 
        </div>
        <div className="mt-1 md:mt-2 text-xs">
          <span>Delivery </span>
          <span className="font-bold">{deliveryDate}</span>
        </div>
        <div className="mt-1 md:mt-2 text-red-700 text-sm md:text-xl">In Stock</div>
        <button className="mt-1 md:mt-2 button cursor-pointer">Add to Basket</button>
        <div className="flex mt-1 md:mt-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clip-rule="evenodd"
            />
          </svg>
          <div className="text-xs text-blue-400 font-semibold ml-3">Secure transaction</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
