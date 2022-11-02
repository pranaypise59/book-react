import { db } from '../firebase-config';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';

const bookCollectionRef = collection(db, 'books');
const backupCollectionRef = collection(db, 'backup');

class BookDataService {
  addBackup = (newBackup) => {
    return addDoc(backupCollectionRef, newBackup);
  };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, 'books', id);
    return updateDoc(bookDoc, updatedBook);
  };

  getAllBooks = () => {
    return getDocs(bookCollectionRef);
  };

  getBackupBooks = () => {
    return getDocs(backupCollectionRef);
  };

  getBook = (id) => {
    const bookDoc = doc(db, 'books', id);
    return getDoc(bookDoc);
  };
}

export default new BookDataService();