import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";

const SimilarProducts = ({ similar }) => {
  const router = useRouter();
  return (
    <div className="ml-1 md:ml-0">
      <div className="mt-5 md:mt-10 text-sm md:text-lg font-bold">
        Best sellers in {similar[0].category} category
      </div>
      <div className="border-b border-gray-400 w-full mb-5"></div>
      <div className="flex gap-x-10">
        {similar.map(({ images, title, rating, price, id, slug }) => (
          <div
            key={id}
            className="cursor-pointer w-20 lg:w-40"
            onClick={() => {
              router.push(`/product/${slug}`);              
            }}
          >
            <div className="relative w-20 lg:w-40 h-20 lg:h-40">
              <Image
                alt="product"
                src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`}
                objectFit="contain"
                layout="fill"
              />
            </div>
            <div className="text-xs md:text-sm line-clamp-4 text-cyan-600 hover:text-yellow-600">
              {title}
            </div>
            <div className="flex">
              {Array(rating)
                .fill()
                .map((_) => (
                  <StarIcon className="h-5 text-yellow-500" />
                ))}
            </div>
            <Currency quantity={price} currency="GBP" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
