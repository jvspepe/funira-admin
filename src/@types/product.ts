import { Timestamp } from "firebase/firestore";

export type TProduct = {
  uid: string;
  images: string[];
  name: string;
  price: number;
  category: string;
  description?: string;
  dimensions: {
    depth?: string;
    height: string;
    width: string;
  };
  rating: number;
  sales: number;
  createdAt: Timestamp;
};
