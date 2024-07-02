import {
  FirestoreDataConverter,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { TCategory } from "@/types/category";
import { firestore } from "@/libs/firebase/config";

const categoryConverter: FirestoreDataConverter<TCategory> = {
  toFirestore(category) {
    return category;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as TCategory;
  },
};

export async function createCategory(categoryData: Omit<TCategory, "uid">) {
  const uid = nanoid(21);

  try {
    await setDoc(
      doc(firestore, "categories", uid).withConverter(categoryConverter),
      {
        uid,
        ...categoryData,
      },
    );
  } catch (error) {
    throw new Error(String(error));
  }
}

export async function getAllCategories() {
  const dataCollection: TCategory[] = [];
  const collectionReference = query(
    collection(firestore, "categories"),
    orderBy("label", "asc"),
  );
  try {
    const data = await getDocs(
      collectionReference.withConverter(categoryConverter),
    );

    data.forEach((item) => {
      if (!item.exists()) return;
      dataCollection.push(item.data());
    });

    return dataCollection;
  } catch (error) {
    throw new Error(String(error));
  }
}
