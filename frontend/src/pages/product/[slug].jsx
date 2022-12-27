import Head from "next/head";
import React from "react";
import Header from "../../components/Header";
import axios from "axios";
import SimilarProducts from "../../components/SimilarProducts";
import dynamic from 'next/dynamic'


const Product = ({ product, similar }) => {
  const ProductDetail = dynamic(() => import("../../components/ProductDetail"), { ssr: false })

  return (
    <div className="bg-white">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[80%] mx-auto">
        <ProductDetail product={product}/>
        <SimilarProducts similar={similar}/>       
      </main>
    </div>
  );
};

export default Product;

export async function getServerSideProps(context) { 
    const slug = context.params.slug
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${slug}`)
    const product = response.data

    const fetchSimilar = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${slug}/similar/`)
    const similar = fetchSimilar.data
  
    return {
      props: {        
        product,
        similar,
      },
    };
  }
  