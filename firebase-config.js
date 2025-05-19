import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCjAt-02I_z61wZpNg0VJu3NKJMHvFaJgc',
  authDomain: 'veggievision-f56a0.firebaseapp.com',
  projectId: 'veggievision-f56a0',
  storageBucket: 'veggievision-f56a0.appspot.com', // <- Corregido: era ".app" y debe ser ".app**spot.com**"
  messagingSenderId: '940125839882',
  appId: '1:940125839882:web:731f54a3d67f46a596b5f3',
  measurementId: 'G-PD9PX2PV9Y'
};

// Inicializa la app una sola vez
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
