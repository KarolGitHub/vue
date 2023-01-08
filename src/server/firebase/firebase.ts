import firebase from "firebase/compat";
import firebaseConfig from "@/server/firebase/config";
import { getAuth } from "firebase/auth";
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);
export default auth;
