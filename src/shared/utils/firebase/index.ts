import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { env } from '../env'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env('VITE_DB_API_KEY'),
  authDomain: env('VITE_DB_AUTH_DOMAIN'),
  projectId: env('VITE_DB_PROJECT_ID'),
  storageBucket: env('VITE_DB_STORAGE_BUCKET'),
  messagingSenderId: env('VITE_DB_MESSAGING_SENDER_ID'),
  appId: env('VITE_DB_APP_ID'),
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export { FirebaseRepository } from './firebase.repository'