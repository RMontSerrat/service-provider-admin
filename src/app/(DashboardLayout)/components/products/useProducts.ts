import useSWR, { mutate } from 'swr';

export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  file: File | null;
}

export interface ActionCallbacks {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: 'Produto 1',
    image: 'https://cdn.giftup.app/web-assets/voucher-templates/15075ece-3241-4653-81d2-a11f748ab52c.png',
    price: 29.99,
    description: 'Descrição do Produto 1. Este é um excelente produto com alta qualidade.',
    file: null,
  },
  {
    id: "2",
    name: 'Produto 2',
    image: 'https://cdn.giftup.app/web-assets/voucher-templates/071a8a5b-3bf1-4422-a130-dfd19a5a1a9b.png',
    price: 49.99,
    description: 'Descrição do Produto 2. Este produto é conhecido por sua durabilidade.',
    file: null,
  },
  {
    id: "3",
    name: 'Produto 3',
    image: 'https://cdn.giftup.app/web-assets/voucher-templates/15075ece-3241-4653-81d2-a11f748ab52c.png',
    price: 19.99,
    description: 'Descrição do Produto 3. Um produto acessível e de boa qualidade.',
    file: null,
  },
  {
    id: "4",
    name: 'Produto 4',
    image: 'https://cdn.giftup.app/web-assets/voucher-templates/071a8a5b-3bf1-4422-a130-dfd19a5a1a9b.png',
    price: 99.99,
    description: 'Descrição do Produto 4. Produto premium com as melhores características.',
    file: null,
  },
];

// Simula um endpoint que retorna a lista de produtos
const fetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulando um tempo de carregamento
  return mockProducts;
};

export const useProducts = () => {
  const { data: products, error } = useSWR<Product[]>('products', fetchProducts);

  const isLoading = !products && !error;

  const addProduct = async (newProduct: Product, callbacks?: ActionCallbacks) => {
    console.log('entrou add')
    const { onSuccess, onError } = callbacks || {};
    try {
      mockProducts.push(newProduct);
      await mutate('products', mockProducts, false);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const editProduct = async (updatedProduct: Product, callbacks?: ActionCallbacks) => {
    const { onSuccess, onError } = callbacks || {};
    try {
      const productsCopy = [...mockProducts]; 
      const index = productsCopy.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        productsCopy[index] = updatedProduct;
        await mutate('products', productsCopy, false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const deleteProduct = async (id: string, callbacks?: ActionCallbacks) => {
    const { onSuccess, onError } = callbacks || {};
    try {
      const index = mockProducts.findIndex((product) => product.id === id);
      if (index !== -1) {
        const productsCopy = [...mockProducts];
        productsCopy.splice(index, 1);
        await mutate('products', productsCopy, false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return products?.find((product) => product.id === id);
  };

  return { products, isLoading, error, addProduct, editProduct, deleteProduct, getProduct };
};