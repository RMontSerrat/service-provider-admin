'use client';

import ProductForm from "../../components/products/ProductForm";
import Layout from '../shared/Layout';

const NewProductPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Layout.BackButton />
        <Layout.Title>Adicionar Gift Card</Layout.Title>
      </Layout.Header>
      <Layout.Container>
        <ProductForm />
      </Layout.Container>
    </Layout>
  )
};

export default NewProductPage;