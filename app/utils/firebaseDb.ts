import { db } from "@/app/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  deleteField,
  FieldValue,
} from "firebase/firestore";

async function addToWishlist(
  userEmail: string,
  id: string,
  namespace: string,
  title: string
) {
  const docRef = doc(db, "usersData", userEmail + "&wishList");
  setDoc(
    docRef,
    { [title]: { id: id, namespace: namespace } },
    { merge: true }
  );
}

async function addToCart(
  userEmail: string,
  id: string,
  namespace: string,
  title: string
) {
  const docRef = doc(db, "usersData", userEmail + "&cart");
  setDoc(
    docRef,
    { [title]: { id: id, namespace: namespace } },
    { merge: true }
  );
}

export { addToWishlist, addToCart };
