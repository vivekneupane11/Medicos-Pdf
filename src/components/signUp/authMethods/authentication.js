// import {getFirestore, doc, onSnapshot, setDoc} from 'firebase/firestore'
import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';


import { googleProvider,facebookProvider } from './authMethods';


import useLocalStorage from "../../../customHooks/useLocalStorage";
// import {getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";



export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [user, setUser] = useState("");
    const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    const [Loading, setLoading] = useState(false);
    const [preference, setPreference] = useLocalStorage("preference", null);
    const [username, setUsername] = useState(null);
    const [internetConnectivity, setInternetConnectivity] = useState(true);
    // const fire = getFirestore();
    // const auth = getAuth();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/auth'),
            import('../../../firebase/firestore')

        ])
        .then(([auth,firestore])=>{
            return{auth,firestore}
        })
    }

    

    useEffect(async() => {
        if (navigator.onLine) {
            try {
                if (user?.uid) {
                    const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
                        const docRef = doc(db,'Web-Uid-To-Username',user?.uid)
                        onSnapshot(docRef,(querySnapshot) => {
                            if (!querySnapshot.exists()) {
                                history.push('/register')
                            } else {
                                setUsername(querySnapshot?.data()?.username)
                                setUsernameLocalStorage(querySnapshot?.data()?.username, querySnapshot?.data()?.username)
                            }
                        })
                }
                else{
                   
                }
              
            } catch (error) {
            }
        }
    
        return () => {
      
        }
    }, [user?.uid, internetConnectivity])

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                username,
                setUsername,
                login: async (email, password) => {
                    try {
                        const {auth:{auth,signInWithEmailAndPassword,signOut}}=await getFirebaseAll()
                        if (email === "" || password === "") {
                            throw "Please enter credentials";
                        } else {
                               return await signInWithEmailAndPassword(auth,email, password)
                                .then((userData) => {

                                    if (userData?.user?.emailVerified) {
                                        toast.success(`You have signed in as ${userData?.user?.email}`, { theme: 'dark', hideProgressBar: true })
                                        setLoading((init) => !init);
                                    } else if (!userData?.user?.emailVerified) {
                                        signOut(auth)
                                        alert("Please verify your email", email)
                                        userData.user.sendEmailVerification();
                                        return false;
                                    }
                                }).catch((err) => {

                                    switch (err.code) {
                                        case "auth/network-request-failed":
                                            toast.error('Please check your internet connection', { theme: 'dark', hideProgressBar: true })
                                            break;
                                        case "auth/invalid-email":
                                            toast.error('Please enter a valid email', { theme: 'dark', hideProgressBar: true })
                                            break;

                                        case "auth/user-disabled":
                                            toast.error('Your account has been disabled', { theme: 'dark', hideProgressBar: true })
                                            break;
                                        case "auth/user-not-found":
                                            toast.error('User not found', { theme: 'dark', hideProgressBar: true })
                                            break;
                                        case "auth/wrong-password":
                                            toast.error('Invalid password', { theme: 'dark', hideProgressBar: true })
                                            break;
                                        default:
                                    }
                                });
                        }
                    } catch (err) {
                        switch (err.code) {

                            case "auth/email-already-exists":
                                console.log("Email is already exists in the system");
                                break;
                            case "auth/invalid-email":
                                console.log("Email is invalid");
                                break;
                            case "auth/wrong-password":
                                console.log("Email and Password do not match");
                                break;
                            case "auth/unknown":
                                console.log(
                                    "Internal Error. Please check your internet connection and try again",
                                );
                                break;
                            case "auth/user-not-found":
                                console.log(
                                    "No user found with these credentials. Please enter valid credentials or register now.",
                                );
                                break;
                            case "auth/too-many-requests":
                                console.log(
                                    "We have blocked all the requests from this device due to unusual activity. Try again later.",
                                );
                                break;
                            default:
                                console.log(err);
                        }
                    }
                },
                register: async ({ username, email, password }) => {
                    try {
                            const {auth:{auth,createUserWithEmailAndPassword}}=await getFirebaseAll()
                            const{firestore:{db,setDoc,doc}}=await getFirebaseAll()
                            createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                toast.success(`Verification link sent successfully`, { theme: 'dark', hideProgressBar: true })

                                if (userCredential?.user?.uid) {
                                   
                                        setDoc(doc(db,"Web-User-Data",username,'Additional-Details',username),
                                        {
                                            user_id: userCredential?.user?.uid,
                                            email: userCredential?.user?.email,
                                            displayName: userCredential?.user?.displayName,
                                            photoURL: userCredential?.user?.photoURL,
                                            language: '',
                                            gender: '',
                                            nickname: '',
                                            joinedDate: '',
                                            working: '',
                                            education: '',
                                            summary: '',
                                            facebook: '',
                                            instagram: '',
                                            twitter: '',
                                            username: username
                                        })
                                        .then((res) => {
                                          
                                            setDoc(doc(db,"Web-Uid-To-Username",userCredential?.user?.uid),
                                            {
                                                username: username
                                            })
                                        })
                                }
                                userCredential.user.sendEmailVerification();
                            })
                            .catch((err) => {
                                console.log("Error on registering", err.code)
                                switch (err.code) {
                                    case "auth/email-already-in-use":
                                        alert('email is already in use')
                                        break;
                                    case "auth/user-disabled":
                                        alert('user disabled')
                                        break;
                                    case "auth/user-not-found":
                                        alert('user not found')
                                        break;
                                    case "auth/wrong-password":
                                        alert('invalid password')
                                        break;
                                    default:
                                }

                            });

                        setLoading((init) => !init);
                    } catch (error) {
                        setLoading((init) => !init);

                        switch (error.code) {
                            case "auth/invalid-email":
                                console.log("Email is invalid");
                                break;
                            case "auth/weak-password":
                                console.log("Password should be at least 6 characters");
                                break;
                            case "auth/unknown":
                                console.log(
                                    "Internal Error. Please check your internet connection and try again",
                                );
                                break;
                            case "auth/email-already-in-use":
                                console.log(
                                    "The email address is already in use by another account.",
                                );
                                break;
                            case "auth/too-many-requests":
                                console.log(
                                    "We have blocked all the requests from this device due to unusual activity. Try again later.",
                                );
                                break;
                            default:

                                console.log("Auth register error", email, error);
                        }
                    }
                },
                forgetPassword: async (email) => {
                    try {
                        const {auth:{auth,sendPasswordResetEmail}}=await getFirebaseAll()
                      
                        sendPasswordResetEmail(auth,email)
                            .then(() => {
                                alert("Reset link successfully sent")
                            });
                    } catch (err) {
                        switch (err.code) {
                            case "auth/invalid-email":
                                console.log("Email is invalid");
                                break;
                            case "auth/unknown":
                                console.log(
                                    "Internal Error. Please check your internet connection and try again",
                                );
                                break;
                            case "auth/user-not-found":
                                console.log(
                                    "There is no user record corresponding to this email.",
                                );
                                break;
                            case "auth/too-many-requests":
                                console.log(
                                    "We have blocked all the requests from this device due to unusual activity. Try again later.",
                                );
                                break;
                            default:

                                console.log("Auth register error", err);
                        }
                    }
                },
                signInWithGoogle: async () => {
                    try {
                        const {auth:{auth,signInWithPopup}}=await getFirebaseAll()
                        
                            await signInWithPopup(auth,googleProvider)
                            .then((res) => {
                                console.log("GOOGLE SIGNED IN", res)
                            });
                    } catch (error) {

                        switch (error.code) {
                            case "auth/email-already-in-use":
                                alert('email is already in use')
                                break;
                            case "auth/user-disabled":
                                alert('user disabled')
                                break;
                            case "auth/user-not-found":
                                alert('user not found')
                                break;
                            case "auth/wrong-password":
                                alert('invalid password')
                                break;
                            case "auth/network-request-failed":
                                alert('Please check your internet connection')
                                break;
                            default:    
                        }
                    }
                },
                signInWithFacebook: async ()=>{
                    try{
                        const {auth:{auth,signInWithPopup}}=await getFirebaseAll()

                        await signInWithPopup(auth,facebookProvider)
                        .then((res) => {
                            console.log("User SIGNED IN", res)
                        })

                    }
                    catch (error){
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                alert('email is already in use')
                                break;
                            case "auth/user-disabled":
                                alert('user disabled')
                                break;
                            case "auth/user-not-found":
                                alert('user not found')
                                break;
                            case "auth/wrong-password":
                                alert('invalid password')
                                break;
                            case "auth/network-request-failed":
                                alert('Please check your internet connection')
                        }

                    }

                },
                logout: async () => {
                    try {
                        const {auth:{auth,signOut}}=await getFirebaseAll()

                        await signOut(auth)
                        .then((res) => {
                            console.log('LOGGED OUT')
                            setUser(null)
                            setUsername(null)
                            setUsernameLocalStorage(null)
                            setPreference(null)
                            history.push('')
                            toast.success("Logged out successfully", { theme: 'dark', hideProgressBar: true });
                        });
                      
                    } catch (err) {
                        console.log(err, "signout error");
                        switch (err.code) {
                            case "auth/unknown":
                                console.log(
                                    "Internal Error. Please check your internet connection and try again",
                                );
                                break;
                            case "auth/no-current-user":
                                console.log("No user is currently signed in.");
                                break;
                            case "auth/too-many-requests":
                                console.log(
                                    "We have blocked all the requests from this device due to unusual activity. Try again later.",
                                );
                                break;
                            case "auth/account-exists-with-different-credential":
                                console.log("An account already exists with the same email address but different signin credentials. Sign-in using a provider associated with this email address.");
                               break;
                            default:
                                console.log("Authentication Login error");
                        }
                    }
                },
            }}
        >
            {children}

        </AuthContext.Provider>
    );
};
