import React from "react";
import Carousel from 'react-material-ui-carousel'
import Link from "next/link";
import NextLink from "next/link";

const Banner = ({ categories }) => {
  return (
    <div className="relative cursor-pointer">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
      <Carousel animation="fade">
        {categories.map((item) => (
          <NextLink
            key={item.id}
            href={`/category/${item.slug}`}
            passHref
          >
            <Link>
              <img
                src={item.image}
                alt={item.name}
              />
            </Link>
          </NextLink>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
