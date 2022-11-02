import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhdq2lkvGNey65BxSH_dv_ntEHOQpJZMM',
  authDomain: 'reactjsassignment-2543c.firebaseapp.com',
  projectId: 'reactjsassignment-2543c',
  storageBucket: 'reactjsassignment-2543c.appspot.com',
  messagingSenderId: '784057745702',
  appId: '1:784057745702:web:22278742636863f45881e7',
  measurementId: 'G-DVTKFZ7K3S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
