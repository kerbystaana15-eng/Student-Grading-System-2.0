import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC6vHMdaEqw1-04v7C9vHwi4kUdvSATf20',
  authDomain: 'student-grading-system-2.firebaseapp.com',
  projectId: 'student-grading-system-2',
  storageBucket: 'student-grading-system-2.firebasestorage.app',
  messagingSenderId: '1054448677688',
  appId: '1:1054448677688:web:133f437a9a8538a87987cd',
  measurementId: 'G-F7ZBWGKPXX',
}

const app = initializeApp(firebaseConfig)
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null
const db = getFirestore(app)

export { app, analytics, db }
