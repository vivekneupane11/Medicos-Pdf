
import React, { useState, useEffect, useContext } from 'react'
import './_signUp.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';

import { faFacebook, faTwitter, faInstagramSquare, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'
// import fire from '../firebase'
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import firebase from "firebase";
import "firebase/auth"
import { facebookProvider, githubProvider, googleProvider, twitterProvider } from './authMethods/authMethods'
import SocialMediaAuth from './authMethods/auth';
import { AuthContext } from './authMethods/authentication';
import { BiLogIn } from 'react-icons/bi'
import PreferenceModal from '../global/preferenceModal'




const SignUp = () => {
    const { signInWithGoogle, register, login, user } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const handleOnCLick = async (provider) => {
        await SocialMediaAuth(provider).then((res) => console.log("Email verification", res))
    }
    const renderError = (message) => <p className="error-msg">{message}</p>;
    const loginSubmit = async ({ values, setSubmitting, resetForm }) => {
       
        const res = await login(values.email, values.password).then(() => {
            checkUserPreference()
        })
        setSubmitting(false)
        resetForm();
    }

    const signUpSubmit = ({ values, setSubmitting, resetForm }) => {
        register({ email: values.email, password: values.password })
        setSubmitting(false)
        resetForm();
    }
    function checkUserPreference() {
     
        if (user?.uid) {
            try {
                firebase.firestore().collection('Web-User-Data')
                    .doc(user?.uid)
                    .collection('User-Preference')
                    .doc(user?.uid)
                    .get()
                    .then((res) => {
                      
                        if (!res.data()) {
                            setShowModal(true);
                        }
                    })
            } catch (err) {
                alert("Error while fetching user preferences", err)
            }
        }
    }
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            checkUserPreference()
        }
        return (() => {
            isMounted = false
        })
    }, [user?.uid])


    return (
        <div>
            {
                showModal && <PreferenceModal />
            }
            <ToastContainer
                position="top-right"
            />
            <div className='fragmentContainer'>
                <div className="WholeContainer">
                    <div className='WholeContainer-wrapper'>
                        <div className={`formContainer sign-in-container ${toggle ? 'sign-in-container-right-active' : ''} `}>

                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',

                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                    password: Yup.string()
                                        .required('Required'),
                                })}

                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    loginSubmit({ values, setSubmitting, resetForm })
                                }}
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit} >
                                        <h1>Sign in</h1>
                                        <div className="sign-in-container-icons">
                                            <FontAwesomeIcon onClick={signInWithGoogle} icon={faGoogle} className="sign-in-container-icons-icon1" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(facebookProvider) }} icon={faFacebook} className="sign-in-container-icons-icon2" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(githubProvider) }} icon={faGithub} className="sign-in-container-icons-icon3" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(twitterProvider) }} icon={faTwitter} className="sign-in-container-icons-icon4" />

                                        </div>
                                        <span>or use your account</span>
                                        <div className="sign-in-container-email">
                                            <FontAwesomeIcon icon={faEnvelope} className="sign-in-container-email-icon" />
                                            <Field
                                                type="email"
                                                name='email'
                                                placeholder="Email"
                                                onChange={props.handleChange}
                                                value={props.values.email} />

                                        </div>
                                        <ErrorMessage name="email" render={renderError} />

                                        <div className="sign-in-container-password">
                                            <FontAwesomeIcon icon={faUnlock} className="sign-in-container-password-icon" />
                                            <Field
                                                type="password"
                                                name='password'
                                                placeholder="Password"
                                                onChange={props.handleChange}
                                                value={props.values.password} />
                                        </div>
                                        <ErrorMessage name="password" render={renderError} />

                                        <a href="/resetPage">Forgot your password?</a>

                                        <button type="submit" disabled={props.isSubmitting} >Sign In</button>
                                    </form>
                                )}
                            </Formik>


                        </div>


                        <div className={`formContainer sign-up-container ${toggle ? 'sign-up-container-right-active' : ''} `}>

                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email address').required('Required'),
                                    password: Yup.string()
                                        .min(6, 'Must be 6 characters or more')
                                        .matches(
                                            /^(?=.*[A-Z])/,
                                            "Must have One Uppercase Character"
                                        )
                                        .matches(
                                            /^(?=.*[0-9])/,
                                            " Must have One number"
                                        )
                                        .matches(
                                            /^(?=.*[!@#\$%\^&\*])/,
                                            " Must have One special case Character"
                                        )
                                        .required('Required'),
                                    name: Yup.string()
                                        .min(5, 'Must be 5 character or more')
                                        .required('Required'),
                                })}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    signUpSubmit({ values, setSubmitting, resetForm })
                                }}
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit}>
                                        <h1>Create Account</h1>
                                        <div className="sign-up-container-icons">
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(googleProvider) }} icon={faGoogle} className="sign-up-container-icons-icon1" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(facebookProvider) }} icon={faFacebook} className="sign-up-container-icons-icon2" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(githubProvider) }} icon={faGithub} className="sign-up-container-icons-icon3" />
                                            <FontAwesomeIcon onClick={() => { handleOnCLick(twitterProvider) }} icon={faTwitter} className="sign-up-container-icons-icon4" />
                                        </div>
                                        <span>or use your email for registration</span>
                                        <div className="sign-up-container-name">
                                            <FontAwesomeIcon icon={faUser} className="sign-up-container-name-icon" />
                                            <Field
                                                type="text"
                                                name='name'
                                                placeholder="Name"
                                                onChange={props.handleChange}
                                                value={props.values.name}
                                            />
                                        </div>
                                        <ErrorMessage name="name" render={renderError} />
                                        <div className="sign-up-container-email">
                                            <FontAwesomeIcon icon={faEnvelope} className="sign-up-container-email-icon" />
                                            <input
                                                type="email"
                                                name='email'
                                                placeholder="Email"
                                                onChange={props.handleChange}
                                                value={props.values.email} />
                                        </div>
                                        <ErrorMessage name="email" render={renderError} />
                                        <div className="sign-up-container-password">
                                            <FontAwesomeIcon icon={faUnlock} className="sign-up-container-password-icon" />
                                            <input
                                                type="password"
                                                name='password'
                                                placeholder="Password"
                                                onChange={props.handleChange}
                                                value={props.values.password} />
                                        </div>
                                        <ErrorMessage name="password" render={renderError} />

                                        <button type="submit" disabled={props.isSubmitting}>Sign Up</button>
                                    </form>
                                )}
                            </Formik>
                        </div>

                        <div className={`overlay-container ${toggle ? 'overlay-container-right-active' : ''}`}>

                            <div className={`overlay ${toggle ? 'overlay-right-active' : ''}`}>
                                <div className={`overlay-panel overlay-left ${toggle ? 'overlay-left-right-active' : ''}`}>
                                    <h1>Welcome Back!</h1>
                                    <p>
                                        To keep connected with us please login with your personal info
                                    </p>
                                    <button className="overlay-btn" onClick={() => setToggle(!toggle)} >Sign In</button>
                                </div>
                                <div className={`overlay-panel overlay-right  ${toggle ? 'overlay-right-right-active' : ''}`}>
                                    <h1>Hello, Friend!</h1>
                                    <p>KickStart your journey with Medicos Int'l</p>
                                    <button className="overlay-btn" onClick={() => setToggle(!toggle)}>Sign Up</button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp
