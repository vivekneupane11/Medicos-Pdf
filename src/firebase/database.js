import { getDatabase } from "firebase/database";
import { app } from "./app.js";

// Export initialized Firestore "DB"
export const database = getDatabase(app);

//Export just what you need
export {
    off, onValue,ref,set,update
 
} from "firebase/database";