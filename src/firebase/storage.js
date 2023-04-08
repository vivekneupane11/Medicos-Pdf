import { getStorage } from "firebase/storage";
import { app } from "./app.js";

// Export initialized Firestore "DB"
export const storage = getStorage(app);

//Export just what you need
export {
    deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable
 
} from "firebase/storage";