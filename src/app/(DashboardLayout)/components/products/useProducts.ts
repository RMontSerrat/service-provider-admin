import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  image: File;
  description: string;
  price: number;
}

export const useProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simula um tempo de carregamento
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock data
        const mockProducts = [
          {
            id: 1,
            name: 'Produto 1',
            image: 'https://picsum.photos/seed/p1/100/100',
            price: 29.99,
            description: 'Descrição do Produto 1. Este é um excelente produto com alta qualidade.',
          },
          {
            id: 2,
            name: 'Produto 2',
            image: 'https://picsum.photos/seed/p2/100/100',
            price: 49.99,
            description: 'Descrição do Produto 2. Este produto é conhecido por sua durabilidade.',
          },
          {
            id: 3,
            name: 'Produto 3',
            image: 'https://picsum.photos/seed/p3/100/100',
            price: 19.99,
            description: 'Descrição do Produto 3. Um produto acessível e de boa qualidade.',
          },
          {
            id: 4,
            name: 'Produto 4',
            image: 'https://picsum.photos/seed/p4/100/100',
            price: 99.99,
            description: 'Descrição do Produto 4. Produto premium com as melhores características.',
          },
        ] as Product[];

        setData(mockProducts);
      } catch (err) {
        setError(new Error('Failed to fetch products'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, isLoading, error };
};