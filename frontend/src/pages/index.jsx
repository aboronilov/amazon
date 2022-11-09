import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import axios from "axios";

export default function Home({ products, categories }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Boronilov Amazon</title>
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[85%] mx-auto">
        <Banner categories={categories} />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await axios.get("http://127.0.0.1:8000/api/product/");
  const products = response.data;

  const fetchCategories = await axios.get(
    "http://127.0.0.1:8000/api/categories/"
  );
  const categories = fetchCategories.data;

  return {
    props: {
      products,
      categories,
    },
  };
}
