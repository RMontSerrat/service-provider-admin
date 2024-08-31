import { Order } from '@/app/types';
import useSWR, { mutate } from 'swr';

export interface ActionCallbacks {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const mockOrders: Order[] = [
  {
    id: 1,
    placed: "2024-08-21T23:30:23.827Z",
    status: "active",  // Status em português
    code: "LMZWV",
    balance: 10,
    purchaser: {
      id: 1,
      name: "Julio",
      email: "julio@gmail.com"
    },
    recipient: {
      id: 2,
      name: "Maria",
      email: "maria@gmail.com"
    },
    delivery: "enviado",  // Delivery em português
    created_at: "2024-08-22T02:30:23.828Z",
    updated_at: "2024-08-22T02:30:23.828Z",
    gift: {
      id: 9,
      title: "Gift do Julio",
      description: "description",
      image: "url",
      value: 40,
      available_quantity: 2,
      created_at: "2024-08-13T01:52:34.108Z",
      updated_at: "2024-08-22T01:37:34.557Z"
    }
  },
];

const fetchOrders = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return mockOrders;
};

export const useOrders = () => {
  const { data: orders, error } = useSWR<Order[]>('orders', fetchOrders);

  const isLoading = !orders && !error;

  const addOrder = async (newOrder: Order, callbacks?: ActionCallbacks) => {
    const { onSuccess, onError } = callbacks || {};
    try {
      mockOrders.push(newOrder);
      await mutate('orders', mockOrders, false);
      if (onSuccess) onSuccess();
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const editOrder = async (updatedOrder: Order, callbacks?: ActionCallbacks) => {
    const { onSuccess, onError } = callbacks || {};
    try {
      const ordersCopy = [...mockOrders]; 
      const index = ordersCopy.findIndex((order) => order.id === updatedOrder.id);
      if (index !== -1) {
        ordersCopy[index] = updatedOrder;
        await mutate('orders', ordersCopy, false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const deleteOrder = async (id: number, callbacks?: ActionCallbacks) => {
    const { onSuccess, onError } = callbacks || {};
    try {
      const index = mockOrders.findIndex((order) => order.id === id);
      if (index !== -1) {
        const ordersCopy = [...mockOrders];
        ordersCopy.splice(index, 1);
        await mutate('orders', ordersCopy, false);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (onError) onError(error as Error);
    }
  };

  const getOrder = (id: number): Order | undefined => {
    return orders?.find((order) => order.id === id);
  };

  return { orders, isLoading, error, addOrder, editOrder, deleteOrder, getOrder };
};