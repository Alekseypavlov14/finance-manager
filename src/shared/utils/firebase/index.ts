import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { env } from '../env'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env('DB_API_KEY'),
  authDomain: env('DB_AUTH_DOMAIN'),
  projectId: env('DB_PROJECT_ID'),
  storageBucket: env('DB_STORAGE_BUCKET'),
  messagingSenderId: env('DB_MESSAGING_SENDER_ID'),
  appId: env('DB_APP_ID'),
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export { FirebaseRepository } from './firebase.repository'