import React, { useState, useEffect, useContext } from 'react'
import './_signUp.scss'
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import "firebase/auth"
import { facebookProvider, githubProvider, googleProvider, twitterProvider } from './authMethods/authMethods'
import SocialMediaAuth from './authMethods/auth';
import { AuthContext } from './authMethods/authentication';
import PreferenceModal from '../global/preferenceModal'
import useLocalStorage from '../../customHooks/useLocalStorage';
import UserIcon from '../global/icons/user';
import GoogleIcon from '../global/icons/SocialIcon/google';
import FacebookIcon from '../global/icons/SocialIcon/facebook';
import GithubIcon from '../global/icons/SocialIcon/github';
import TwitterIcon from '../global/icons/SocialIcon/twitter';
import Envelop from '../global/icons/envelop';
import Unlock from '../global/icons/unlock';




const SignUp = () => {
    const { signInWithGoogle, register, login, user } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [preference, setPreference] = useLocalStorage("preference", null);
    const handleOnCLick = async (provider) => {
        await SocialMediaAuth(provider).then((res) => console.log("Email verification", res))
    }
    const renderError = (message) => <p className="error-msg">{message}</p>;
    const loginSubmit = async ({ values, setSubmitting, resetForm }) => {

        const res = await login(values.email, values.password).then(() => {
            if (!preference?.preference) {
                setShowModal(true);
            }
        })
        setSubmitting(false)
        resetForm();
    }

    const signUpSubmit = ({ values, setSubmitting, resetForm }) => {
        register({ email: values.email, password: values.password })
        setSubmitting(false)
        resetForm();
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (!preference?.preference) {
                setShowModal(true);
            }
        }
        return (() => {
            isMounted = false
        })
    }, [user?.uid])

    const clickhandlerfontfacebook = () => { handleOnCLick(facebookProvider) }
    const clickhandlerfontgithub = () => { handleOnCLick(githubProvider) }
    const clickhandlerfonttwitter = () => { handleOnCLick(twitterProvider) }
    const clickhandlericon1 = () => { handleOnCLick(googleProvider) }
    const clickhandlericon2 = () => { handleOnCLick(facebookProvider) }
    const clickhandlericon3 = () => { handleOnCLick(githubProvider) }
    const clickhandlericon4 = () => { handleOnCLick(twitterProvider) }
    const clickhandleroverlay = () => setToggle(!toggle)
    const clickhandleroverlaytoggle = () => setToggle(!toggle)

    return (
        <div>
            {
                showModal && <PreferenceModal />
            }
           
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
                                            <div onClick={signInWithGoogle}>

                                            <GoogleIcon className="sign-in-container-icons-icon1" />
                                            </div>
                                            <div onClick={clickhandlerfontfacebook}>

                                            <FacebookIcon className="sign-in-container-icons-icon2" />
                                            </div>
                                            <div onClick={clickhandlerfontgithub}>

                                            <GithubIcon className="sign-in-container-icons-icon3" />
                                            </div>
                                            <div onClick={clickhandlerfonttwitter}>

                                            <TwitterIcon className="sign-in-container-icons-icon4" />
                                            </div>

                                        </div>
                                        <span>or use your account</span>
                                        <div className="sign-in-container-email">
                                            <Envelop className="sign-in-container-email-icon" />
                                            <Field
                                                type="email"
                                                name='email'
                                                placeholder="Email"
                                                onChange={props.handleChange}
                                                value={props.values.email} />

                                        </div>
                                        <ErrorMessage name="email" render={renderError} />

                                        <div className="sign-in-container-password">
                                            <Unlock className="sign-in-container-password-icon" />
                                            <Field
                                                type="password"
                                                name='password'
                                                placeholder="Password"
                                                onChange={props.handleChange}
                                                value={props.values.password} />
                                        </div>
                                        <ErrorMessage name="password" render={renderError} />

                                        <Link href="/resetPage">Forgot your password?</Link>

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
                                            <div onClick={clickhandlericon1} >

                                            <GoogleIcon  className="sign-up-container-icons-icon1" />
                                            </div>
                                            <div onClick={clickhandlericon2}>

                                            <FacebookIcon className="sign-up-container-icons-icon2" />
                                            </div>
                                            <div onClick={clickhandlericon3} >

                                            <GithubIcon className="sign-up-container-icons-icon3" />
                                            </div>
                                            <div onClick={clickhandlericon4}>

                                            <TwitterIcon className="sign-up-container-icons-icon4" />
                                            </div >
                                        </div>
                                        <span>or use your email for registration</span>
                                        <div className="sign-up-container-name">
                                            <UserIcon className="sign-up-container-name-icon" />
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
                                            <Envelop className="sign-up-container-email-icon" />
                                            <input
                                                type="email"
                                                name='email'
                                                placeholder="Email"
                                                onChange={props.handleChange}
                                                value={props.values.email} />
                                        </div>
                                        <ErrorMessage name="email" render={renderError} />
                                        <div className="sign-up-container-password">
                                            <Unlock className="sign-up-container-password-icon" />
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
                                    <h1>Welcome to Medicos Pdf!</h1>
                                    <p>
                                        To keep connected with us please login with your personal info
                                    </p>
                                    <button className="overlay-btn" onClick={clickhandleroverlay} >Sign In</button>
                                </div>
                                <div className={`overlay-panel overlay-right  ${toggle ? 'overlay-right-right-active' : ''}`}>
                                    <h1>Hello, Friend!</h1>
                                    <p>KickStart your journey with Medicos Int'l</p>
                                    <button className="overlay-btn" onClick={clickhandleroverlaytoggle}>Sign Up</button>
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
