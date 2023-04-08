import { getAuth } from "firebase/auth";
import { app } from "./app.js";

// Export initialized Firestore "auth"
export const auth = getAuth(app);

//Export just what you need
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,sendPasswordResetEmail,signOut,onAuthStateChanged
} from "firebase/auth";