import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
 

  const transactionCollectionRef = collection(db, "transactions");

   const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userId", "==", userID),
        orderBy("createdAt"),
      );

      // real-time subscription
      const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        setTransactions(docs);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTransactions();
  });

  return { transactions };
};
