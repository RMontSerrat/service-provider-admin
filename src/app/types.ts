export type User = {
  id: number;
  name: string;
  email: string;
};

export type Gift = {
  id: number;
  title: string;
  description: string;
  image: string;
  value: number;
  available_quantity: number;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: number;
  placed: string;
  status: string;
  code: string;
  balance: number;
  purchaser: User;
  recipient: User;
  delivery: string;
  created_at: string;
  updated_at: string;
  gift: Gift;
};

export type Status = 'active' | 'used';
export type Delivery = 'sent' | 'pending';