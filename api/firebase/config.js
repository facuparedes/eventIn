//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { setLogLevel } from "@firebase/firestore";
import { initializeFirestore } from "@firebase/firestore";
import { LogBox } from "react-native";
import * as _var from '../vars';
LogBox.ignoreLogs(['Setting a timer', 'VirtualizedLists should never be nested']);
// setLogLevel('debug')

const firebaseConfig = {
  apiKey: _var.API_KEY,
  authDomain: _var.AUTH_DOMAIN,
  projectId: _var.PROJECT_ID,
  storageBucket: _var.STORAGE_BUCKET,
  messagingSenderId: _var.MESSAGING_SENDER_ID,
  appId: _var.APP_ID,
  measurementId: _var.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, { experimentalForceLongPolling: true });
//const analytics = getAnalytics(app);
export default db;
