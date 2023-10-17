"use client";

import { db } from "@/app/firebase/firebase";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
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

const WishlistPage = () => {
  const userData = useAppSelector((state) => state.games.userData);

  async function addData() {
    const docRef = doc(db, "usersData", userData.email + "&wishList");
    setDoc(
      docRef,
      { game4: { id: "12321", namespace: "ffkf;l" } },
      { merge: true }
    );
  }

  async function getUserData() {
    const docRef = doc(db, "usersData", userData.email + "&wishList");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log(docSnap.data().cart);
      console.log(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function deleteGame() {
    const cityRef = doc(db, "usersData", userData.email + "&wishList");
    await updateDoc(cityRef, {
      game2: deleteField(),
    });
  }

  return (
    <div>
      <button onClick={() => addData()}>addData</button>
      <button onClick={() => getUserData()}>get user data</button>
      <button onClick={() => deleteGame()}>delete game</button>
    </div>
  );
};

export default WishlistPage;
