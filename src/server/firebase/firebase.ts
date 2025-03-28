import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "@/server/firebase/config";
// firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default auth;
