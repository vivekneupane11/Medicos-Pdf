import firebase from "firebase";
import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

//local imports
import { googleProvider } from './authMethods';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [user, setUser] = useState("");
    const [Loading, setLoading] = useState(false);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        if (email == "" || password == "") {
                            throw "Please enter credentials";
                        } else {
                            return await firebase.auth()
                                .signInWithEmailAndPassword(email, password)
                                .then((userData) => {

                                    if (userData?.user?.emailVerified) {
                                        toast.success(`You have signed in as ${userData?.user?.email}`)
                                        // toast.success("Login successful")
                                        setLoading((init) => !init);
                                    } else if (!userData?.user?.emailVerified) {
                                        firebase.auth().signOut();

                                        alert("Please verify your email", email)
                                        userData.user.sendEmailVerification();
                                        return false;
                                    }
                                }).catch((err) => {

                                    switch (err.code) {
                                        case "auth/network-request-failed":
                                            alert('Please check your internet connection')
                                            break;
                                        case "auth/invalid-email":
                                            alert('invalid email')
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
                                    }
                                });
                        }
                    } catch (err) {
                        // return alert(err)
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
                register: async ({ email, password }) => {
                    try {
                        firebase
                            .auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then((userCredential) => {
                                alert('Verification link sent successfully')

                                if (userCredential?.user?.uid) {
                                    firebase.firestore().collection("Web-User-Data")
                                        .doc(userCredential?.user?.uid)
                                        .collection('Additional-Details')
                                        .doc(userCredential?.user?.uid)
                                        .set({
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
                                            twitter: ''
                                        })
                                        .then((res) => {
                                            // alert("Saved Successfully")
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
                        // alert(`Email ${email.length}`)
                        firebase.auth().sendPasswordResetEmail(email)
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
                        await firebase.auth().signInWithPopup(googleProvider)
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
                        }
                    }
                },
                logout: async () => {
                    try {
                        await firebase.auth().signOut().then((res) => {

                            history.push('')
                            toast.success("Logged out successfully");
                        });
                        // await AsyncStorage.setItem("userinfo", JSON.stringify(0));
                        // setLoading(false);
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
                            default:
                                // console.log(err);
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
