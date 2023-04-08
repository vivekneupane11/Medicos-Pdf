import { getFirestore } from "firebase/firestore";
import { app } from "./app.js";

// Export initialized Firestore "DB"
export const db = getFirestore(app);

//Export just what you need
export {
  collection,
  query,
  where,
  orderBy,
  onSnapshot, startAfter, updateDoc,limit,
  doc,
  setDoc,
  addDoc,
  getDoc,getDocs,deleteDoc,endBefore
} from "firebase/firestore";