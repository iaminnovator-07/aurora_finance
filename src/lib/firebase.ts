/**
 * Firebase client SDK — optional realtime listeners.
 * Configure VITE_FIREBASE_* in .env to enable.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAi-HGrfQ1DKNSVB5zCX7CSW5xpHVlc82I",
  authDomain: "aurora-finance-os.firebaseapp.com",
  projectId: "aurora-finance-os",
  storageBucket: "aurora-finance-os.firebasestorage.app",
  messagingSenderId: "152843013248",
  appId: "1:152843013248:web:3647b433739edec2afea65",
  measurementId: "G-7FZ2TS1GRL"
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) return null;
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseDb(): Firestore | null {
  const fb = getFirebaseApp();
  if (!fb) return null;
  if (!db) db = getFirestore(fb);
  return db;
}

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
}
