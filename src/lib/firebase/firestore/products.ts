import {
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
import { TProduct } from "@/@types/product";
import { converter, getRandomNumber } from "@/lib/utils";
import { deleteImage } from "../storage/upload-image";

export async function createProduct(
  product: Omit<TProduct, "rating" | "sales" | "createdAt">,
) {
  try {
    await setDoc(
      doc(firestore, "products", product.uid).withConverter(
        converter<TProduct>(),
      ),
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
      doc(firestore, "products", productUID).withConverter(
        converter<TProduct>(),
      ),
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
        collection(firestore, "products").withConverter(converter<TProduct>()),
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

export async function deleteProduct(product: TProduct) {
  try {
    await Promise.all([
      deleteDoc(
        doc(firestore, "products", product.uid).withConverter(
          converter<TProduct>(),
        ),
      ),
      product.images.map((image) => deleteImage(image)),
    ]);
  } catch (error) {
    throw error;
  }
}
