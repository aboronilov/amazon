import React from "react";
import Product from "./Product";
import axios from "axios";

const ProductFeed = ({ products }) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-28 mx-auto">
      {products
        .map(({ id, title, rating, slug, price, description, about_items, note, category, images, has_prime }) => (
          <Product
            key={id}
            id={id}
            images={images}
            title={title}
            rating={rating}
            slug={slug}
            price={price}
            description={description}
            about_items={about_items}
            note={note}            
            category={category}
            has_prime={has_prime}
          />
        ))}

    </div>
  );
};

export default ProductFeed;
