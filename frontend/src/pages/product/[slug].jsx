import Head from "next/head";
import React from "react";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import axios from "axios";
import ProductDetail from "../../components/ProductDetail";

const Product = ({ product }) => {
  return (
    <div className="bg-white">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[80%] mx-auto">
        <ProductDetail product={product}/>       
      </main>
    </div>
  );
};

export default Product;

export async function getServerSideProps(context) { 
    const slug = context.params.slug
    const response = await axios.get(`http://127.0.0.1:8000/api/product/${slug}`)
    const product = response.data
  
    return {
      props: {        
        product
      },
    };
  }
  