import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import axios from "axios";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />

      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get("https://fakestoreapi.com/products")    
    const products = response.data
 
    return { props: {
      products
    }}
  } catch (error) {
    console.log(error)
  }   
}