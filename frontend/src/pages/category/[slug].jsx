import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Category = ({ categoryProducts }) => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>Category: {slug}</div>;
};

export default Category;

export async function getServerSideProps(context) {
  const response = await axios.get("http://127.0.0.1:8000/api/categories/");
  const categoryProducts = response.data;

  return {
    props: {
      categoryProducts,
    },
  };
}
