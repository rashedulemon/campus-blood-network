import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Hook for subscribing to a collection with real-time updates
export function useCollection(collectionName, queryConstraints = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const colRef = collection(db, collectionName);
    const q = query(colRef, ...queryConstraints);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setData(results);
      setLoading(false);
      setError(null);
    }, (err) => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, JSON.stringify(queryConstraints)]);

  return { data, loading, error };
}

// Hook for one-time fetch or mutations
export function useFirestore(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const colRef = collection(db, collectionName);

  // Add a document
  const addDocument = async (docData) => {
    setIsPending(true);
    setError(null);
    try {
      const docRef = await addDoc(colRef, {
        ...docData,
        createdAt: new Date().toISOString()
      });
      setIsPending(false);
      return docRef;
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
      throw err;
    }
  };

  // Update a document
  const updateDocument = async (id, docData) => {
    setIsPending(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, docData);
      setIsPending(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
      throw err;
    }
  };

  // Delete a document
  const deleteDocument = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      setIsPending(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
      throw err;
    }
  };

  return { addDocument, updateDocument, deleteDocument, isPending, error };
}
