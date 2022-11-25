import React from "react";
import axios from "axios";
import Head from "next/head";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductFeed from "../../components/ProductFeed";

const Category = ({ products, categories }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[80%] mx-auto">
        <Banner categories={categories} />

        <ProductFeed products={products} />
      </main>
    </div>
  );
};

export default Category;

export async function getServerSideProps(context) {
  const slug = context.params.slug;

  const response = await axios.get(`http://127.0.0.1:8000/api/product-category/${slug}`);
  const products = response.data;

  const fetchCategories = await axios.get(
    "http://127.0.0.1:8000/api/categories/"
  );
  const categories = fetchCategories.data;

  return {
    props: {
      products,
      categories
    },
  };
}