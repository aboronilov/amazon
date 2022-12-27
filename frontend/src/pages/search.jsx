import axios from "axios";
import Head from "next/head";
import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import Link from "next/link";

const Search = ({ products }) => {
  return (
    <div className="bg-white">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[70%] mx-auto">        
        <div className="text-2xl uppercase font-semibold mb-3">Results</div>
        {products.length > 0 ? (
          products.map(({ id, title, images, rating, price, description, slug }) => (
          <Link href={`/product/${slug}`}>
            <div className="flex flex-col cursor-pointer" key={id}>
              <div className="flex flex-row items-start mb-2 border-2 border-gray-100">
                <div className="flex relative min-w-[150px] md:min-w-[250px] lg:min-w-[350px] xl:min-w-[450px] w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] ">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${images[0].image}`}
                    objectFit="contain"
                    layout="fill"
                    className="cursor-pointer rounded-lg"
                  />
                </div>
                <div className="flex flex-col p-1 h-[100px] md:h-[200px] lg:h-[300px] border-l-2 border-gray-100">
                  <div className="text-sm md:text-base lg:text-xl line-clamp-1 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
                    {title}
                  </div>
                  <div className="mt-2 flex">
                    {Array(rating)
                      .fill()
                      .map((_) => (
                        <StarIcon className="h-5 text-yellow-500" />
                      ))}
                  </div>
                  <div className="my-1 text-xl">
                    <Currency quantity={price} currency="GBP" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 line-clamp-1 sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
                    {description}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))) : (
          <div className="">No products found. Try different search conditions</div>
        )}
      </main>
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const fetchProducts = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/`);
  const data = fetchProducts.data;
  const search = context.query.q.toLowerCase();
  const filterProducts = (item) => {
    if (
      item.category.toLowerCase().includes(search) ||
      item.title.toLowerCase().includes(search) ||
      item.title.toLowerCase().includes(search)
    ) {
      return true;
    }
  };
  const products = data.filter(filterProducts);

  return {
    props: {
      products,
    },
  };
}
