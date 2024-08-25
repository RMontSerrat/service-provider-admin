'use client';

import { useParams } from "next/navigation";
import ProductForm from "../../components/products/ProductForm";
import { useProducts } from "./useProducts";
import Layout from "../shared/Layout";

const NewProductPage = () => {
  const { productId } = useParams();
  const { getProduct, isLoading } = useProducts();
  const product = getProduct(productId[0]);
  
  const initialData = {
    id: product?.id || "",
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    image: product?.image || "",
    file: product?.file || null,
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <Layout>
      <Layout.Header>
        <Layout.BackButton />
        <Layout.Title>Editar Gift Card</Layout.Title>
      </Layout.Header>
      <Layout.Container>
        <ProductForm initialData={initialData} />
      </Layout.Container>
    </Layout>
  )
};

export default NewProductPage;