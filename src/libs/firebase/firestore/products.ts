import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  QueryNonFilterConstraint,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../config";
import { TProduct } from "@/types/product";
import getRandomNumber from "@/utils/get-random-number";

const productConverter: FirestoreDataConverter<TProduct> = {
  toFirestore(product) {
    return product;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TProduct;
  },
};

export async function createProduct(
  product: Omit<TProduct, "rating" | "sales" | "createdAt">,
) {
  try {
    await setDoc(
      doc(firestore, "products", product.uid).withConverter(productConverter),
      {
        ...product,
        rating: getRandomNumber(3, 5),
        sales: getRandomNumber(10, 100),
        createdAt: Timestamp.now(),
      },
    );
  } catch (error) {
    throw error;
  }
}

export async function getProduct(productUID: string): Promise<TProduct> {
  try {
    const product = await getDoc(
      doc(firestore, "products", productUID).withConverter(productConverter),
    );

    if (!product.exists()) {
      throw new Error("Produto não existe.");
    } else {
      return product.data();
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts(
  constraints: QueryNonFilterConstraint[] = [],
) {
  const databaseProducts: TProduct[] = [];

  let lastDocument: QueryDocumentSnapshot<TProduct>;

  let isLastDocument: boolean;

  try {
    const queryProducts = await getDocs(
      query(
        collection(firestore, "products").withConverter(productConverter),
        ...constraints,
      ),
    );

    queryProducts.forEach((product) => databaseProducts.push(product.data()));

    isLastDocument = queryProducts.size < 1;

    lastDocument = queryProducts.docs[queryProducts.size - 1];
  } catch (error) {
    throw new Error(String(error));
  }

  return { databaseProducts, lastDocument, isLastDocument };
}

export async function deleteProduct(productUID: string) {
  try {
    await deleteDoc(
      doc(firestore, "products", productUID).withConverter(productConverter),
    );
  } catch (error) {
    throw error;
  }
}
