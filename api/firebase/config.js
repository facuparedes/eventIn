//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { setLogLevel } from "@firebase/firestore";
import { initializeFirestore } from "@firebase/firestore";
import { LogBox } from "react-native";
LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists should never be nested']);
// setLogLevel('debug')

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
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
//const analytics = getAnalytics(app);
export default db;
