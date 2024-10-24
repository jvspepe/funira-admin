import {
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomNumber(min?: number, max?: number) {
  if (min && max) return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.floor(Math.random());
}

export function converter<T>(): FirestoreDataConverter<T> {
  return {
    toFirestore: (data: PartialWithFieldValue<T>) => data ?? {},
    fromFirestore: (
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ) => snapshot.data(options) as T,
  };
}
