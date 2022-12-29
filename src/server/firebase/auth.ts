import { SurePromise } from "@/interface/SurePromise";
import { Profile } from "@/interface/Profile";
import { auth } from "@/server/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { LogIn, Register } from "../../interface/Auth";

export default class Auth {
  static async login(userForm: LogIn): Promise<UserCredential> {
    const { email, password } = userForm;
    return await signInWithEmailAndPassword(auth, email, password);
  }

  static async register(registerForm: Register): Promise<UserCredential> {
    const { email, password } = registerForm;
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  static onAuthStateChanged(): void {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        // User is signed out
      }
    });
  }
}
