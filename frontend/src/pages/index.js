import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import axios from "axios";
import dynamic from 'next/dynamic'

export default function Home({ products, categories }) {
  const CategoryBanner = dynamic(() => import('../components/Banner'), { ssr: false })
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Boronilov Amazon</title>
        <link rel="shortcut icon" href="/Amazon-logo-meaning.jpg" />
      </Head>

      <Header />

      <main className="max-w-full md:max-w-[85%] mx-auto">
        <CategoryBanner categories={categories} />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/`);
  const products = response.data;

  const fetchCategories = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/`
  );
  const categories = fetchCategories.data;

  return {
    props: {
      products,
      categories,
    },
  };
}

// ToDo:
// - quantity of products - from cart?
// - social auth
// при переходе с одной страницы товара на другую не обнуляется кол-во