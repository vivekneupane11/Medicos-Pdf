import firebaseConfig from "../index";
import { initializeApp, getApp, getApps } from "firebase/app";

const setupFirebase = () => {
  if (getApps.length===0) return getApp();
  return initializeApp( /* Your Firebase Config */);
};

export const app = setupFirebase();