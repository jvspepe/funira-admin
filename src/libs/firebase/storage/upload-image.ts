import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config";

export async function uploadImage(url: string, image: File) {
  try {
    const data = await uploadBytes(ref(storage, url), image);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getImageURL(ref: StorageReference): Promise<string> {
  try {
    const URLs = await getDownloadURL(ref);
    return URLs;
  } catch (error) {
    throw error;
  }
}
