//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { setLogLevel } from "@firebase/firestore";
import { initializeFirestore } from "@firebase/firestore";
import { LogBox } from "react-native";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from "@env";
LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists should never be nested']);
// setLogLevel('debug')

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId:PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId:MESSAGING_SENDER_ID,
  appId:APP_ID,
  measurementId:MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
//const analytics = getAnalytics(app);
export default db;
