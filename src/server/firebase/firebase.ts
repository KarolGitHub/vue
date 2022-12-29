import firebase from "firebase/compat";
import firebaseConfig from "@/server/firebase/config";
import { getAuth } from "firebase/auth";
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = getAuth(firebaseApp);
