import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6jUHn_5STRnE4jsNqjSQhXWdApjmFQUw",
  authDomain: "unnamed-522b2.firebaseapp.com",
  projectId: "unnamed-522b2",
  storageBucket: "unnamed-522b2.appspot.com",
  messagingSenderId: "99982117887",
  appId: "1:99982117887:web:81ff0ed4f5d64457ddf5ca",
  measurementId: "G-TGZYFR0G0T",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export default db;
