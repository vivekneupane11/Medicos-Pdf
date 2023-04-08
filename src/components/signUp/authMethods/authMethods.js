import {FacebookAuthProvider,TwitterAuthProvider,GithubAuthProvider,GoogleAuthProvider} from 'firebase/auth'
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider=new FacebookAuthProvider();
export const twitterProvider=new TwitterAuthProvider();
export const githubProvider=new GithubAuthProvider();