import firebase from "firebase";

export const facebookProvider=new firebase.auth.FacebookAuthProvider();
export const twitterProvider=new firebase.auth.TwitterAuthProvider();
export const githubProvider=new firebase.auth.GithubAuthProvider();
export const googleProvider=new firebase.auth.GoogleAuthProvider();
