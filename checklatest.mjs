import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const colRef = collection(db, 'news');
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) {
    console.log("No news found.");
  } else {
    const doc = snap.docs[0];
    const data = doc.data();
    console.log("--- LATEST NEWS ---");
    console.log("Title:", data.title);
    console.log("slug:", data.slug);
    console.log("URL:", `http://localhost:3000/Read-full-news/${data.slug}`);
    console.log("-------------------");
  }
  process.exit(0);
}
run();
