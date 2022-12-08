import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../redux/basketRedux";

const CheckoutProduct = ({
    title,
    images,
    rating,
    slug,
    price,
    description,
    category,
}) => {
  const descriptionList = description.split(", ").slice(0, 3);
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    const product = {
        title,
        images,
        rating,
        slug,
        price,
        description,
        category,
    }
    dispatch(addToBasket(product))
  }

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({slug}))
  }
  return (
    <div className="grid grid-cols-5 shadow shadow-slate-300">
      <div className="my-auto">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`}
          width={200}
          height={200}
          objectFit="contain"
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
        <Currency quantity={price} currency="GBP" />
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button mt-auto" onClick={addItemToBasket}>Add to Basket</button>
        <button className="button mt-auto" onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
