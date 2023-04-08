
import React, { useContext, useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';

import { useHistory } from 'react-router';
import * as Yup from 'yup';
import useLocalStorage from '../../../customHooks/useLocalStorage';
import { newTab } from '../../../functions/newTabMethod';
import SocialMediaAuth from '../../signUp/authMethods/auth';
import { AuthContext } from '../../signUp/authMethods/authentication';
import { facebookProvider, googleProvider } from '../../signUp/authMethods/authMethods';
import "./_loginmodel.scss";
// import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import ArrowLeft from '../icons/arrow_left';
import Close from '../icons/xMark';
import ExclamanationTriangle from '../icons/exclamanation_Triangle';
import FacebookIcon from '../icons/SocialIcon/facebook';
import GoogleIcon from '../icons/SocialIcon/google';
import { LazyLoadImage } from 'react-lazy-load-image-component';






export const LoginModal = ({ show, formModel }) => {
    let history = useHistory()
    const { forgetPassword, register, login, user } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [preference, setPreference] = useLocalStorage("preference", null);
    const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);


    const [showPopUpForm, setShowPopUpForm] = useState(show)

    const [showSignIn, setShowSignIn] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showSignInWithEmailForm, setShowSignInWithEmailForm] = useState(false);
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false)
    const [usernameError, setUsernameError] = useState();
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

    const handleOnCLick = async (provider) => {
       try {
           const{firestore:{doc,onSnapshot,db}}=await getFirebaseAll()
        await SocialMediaAuth(provider).then((res) => {
            console.log('CHECKING USER ID', res?.uid, usernameLocalStorage);
            if (res?.uid) {
               
                    const docRef =doc(db,'Web-Uid-To-Username',res?.uid)

                    onSnapshot(docRef,(querySnapshot) => {
               
                        if (!querySnapshot.exists()) {
                            history.push('/register')
                        } else {
                            setUsernameLocalStorage(querySnapshot?.data()?.username)
                        }
                    })
            }
        
        })
       } catch (error) {
           
       }
    }
    const renderError = (message) => <p className="login-error-msg">{message}</p>;
    const loginSubmit = async ({ values, setSubmitting, resetForm }) => {
        await login(values.email, values.password).then((res) => {
            // checkUserPreference()
        })

        setSubmitting(false)
        resetForm();
    }



    const signUpSubmit = async({ values, setSubmitting, resetForm }) => {
        try {
           const{firestore:{doc,onSnapshot,db}}=await getFirebaseAll()
            
           alert(values.username)
          
               const docRef = doc(db,'Web-User-Data',values.username,'Additional-Details',values.username)
               onSnapshot(docRef,(querySnapshot) => {
                   if (querySnapshot.exists()) {
                       setUsernameError('Username already existed')
                       setSubmitting(false)
                   } else {
                       setUsernameError(null)
                       register({ email: values.email, username: values.username, password: values.password })
                       setSubmitting(false)
                       resetForm();
                   }
               })
            
        } catch (error) {
            
        }

    }
    const forgetPasswordSubmit = ({ values, setSubmitting, resetForm }) => {
        forgetPassword(values.email)
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


    const clickhandlerform = () => formModel(false)
    const clickhandlersetshowform = () => { setShowForm(!showForm); setShowPasswordResetForm(false) }
    const clickhandlertab1 = () => newTab('https://policies.google.com/privacy?hl=en-US', 'google privacy', 'google_privacy_clicked')
    const clickhandlertab2 = () => newTab('https://policies.google.com/terms?hl=en-US', 'google terms', 'google_terms_clicked')
    const clickhandlertab3 = () => newTab('https://policies.google.com/privacy?hl=en-US', 'google privacy', 'google_privacy_clicked')
    const clickhandlertab4 = () => newTab('https://policies.google.com/terms?hl=en-US', 'google terms', 'google_terms_clicked')
    const clickhandlertab5 = () => newTab('https://policies.google.com/privacy?hl=en-US', 'google privacy', 'google_privacy_clicked')
    const clickhandlertab6 = () => newTab('https://policies.google.com/terms?hl=en-US', 'google terms', 'google_terms_clicked')
    const clickhandlersetshowpassword = () => setShowPasswordResetForm(true)
    const clickhandlerfbprovider = () => { handleOnCLick(facebookProvider) }
    const clickhandlergoogleprovider = () => { handleOnCLick(googleProvider) }
    const clickhandlersignin = () => { setShowSignInWithEmailForm(true); setShowForm(true) }
    const clickhandlersignshow = () => { setShowSignInWithEmailForm(false); setShowForm(true) }
    const clickhandlersigninshow = () => { setShowSignIn(!showSignIn); setShowForm(false) }
    const clickhandlersetshowreset = () => { setShowSignIn(!showSignIn); setShowForm(false); setShowPasswordResetForm(false) }
    const formmodalfalse=() => formModel(false)

   
    return (
        <>
            {
                show &&
                <div className={`${show ? 'loginModal-wrapper' : 'loginModal-wrapper-hide'}`}>
                    <div className="loginModal-wrapper-container">


                        <div className="loginModal-wrapper-container-left">
                            <div className="loginModal-wrapper-container-left-top">
                                <div className="loginModal-wrapper-container-left-top-logo">
                                    {/* <img src={require('../../../assets/images/medicospdf_logo.webp').default} alt='img'  className='logo' /> */}
                                    <LazyLoadImage src={require('../../../assets/images/medicospdf_logo.webp').default} alt={'img'}  className='logo' effect='blur'/> 

                                </div>
                                <div className='loginModal-wrapper-container-left-top-heading'>
                                    <p style={{ display: showSignIn ? 'none' : 'block' }}>Welcome !!!</p>
                                </div>


                            </div>
                            <div className="loginModal-wrapper-container-left-bottom">
                                <div className="loginModal-wrapper-container-left-bottom-userImage">
     


                                </div>
                                <div className="loginModal-wrapper-container-left-bottom-userLogin">
                                    <div className="loginModal-wrapper-container-left-bottom-userLogin-number">
                                        <h4 className="count">5,00,000 <span>people</span></h4>
                                        <p>are using MedicosPdf right now</p>
                                    </div>



                                </div>


                            </div>

                        </div>
                        <div className="loginModal-wrapper-container-right">
                            <div className="loginModal-wrapper-container-right-top">
                                <div onClick={formmodalfalse}> 

                                <Close className="loginModal-wrapper-container-right-top_iconClose"  />
                                </div>

                                {
                                    showForm ?
                                        <div className="loginModal-wrapper-container-right-top-back" onClick={() => { setShowForm(!showForm); setShowPasswordResetForm(false) }}>
                                            <ArrowLeft className="loginModal-wrapper-container-right-top-back-iconArrow" />
                                            <p className="loginModal-wrapper-container-right-top-back_para">Back</p>
                                        </div>
                                        :
                                        ''
                                }



                            </div>

                            {
                                showForm ?
                                    <div className="loginModal-wrapper-container-right-formContainer">

                                        {
                                            showSignInWithEmailForm ?
                                                <div className="loginModal-wrapper-container-right-formContainer-SignUpForm">
                                                    <Formik
                                                        initialValues={{
                                                            username: '',
                                                            email: '',
                                                            password: '',

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
                                                            username: Yup.string()
                                                                .trim()
                                                                .min(5, 'Must be 5 character or more')
                                                                .required('Required'),
                                                        })}
                                                        onSubmit={(values, { setSubmitting, resetForm }) => {
                                                            signUpSubmit({ values, setSubmitting, resetForm })
                                                        }}
                                                    >
                                                        {(props) => (

                                                            <form onSubmit={props.handleSubmit} className="loginModal-wrapper-container-right-formContainer-SignUpForm-form">
                                                                <h3 className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-head">Sign Up with Email</h3>
                                                                <div className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-name" >
                                                                    <label>Username</label>
                                                                    <Field
                                                                        type="text"
                                                                        name='username'
                                                                        placeholder="username"
                                                                        onChange={props.handleChange}
                                                                        value={props.values.username}
                                                                    />
                                                                    {
                                                                        usernameError &&
                                                                        <div className='error-msg-container'>
                                                                            <ExclamanationTriangle className='icon' />
                                                                            <p className='error-msg'>{usernameError}</p>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <ErrorMessage name="username" render={renderError} />
                                                                <div className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-email">
                                                                    <label>Email</label>
                                                                    <input
                                                                        type="email"
                                                                        name='email'
                                                                        placeholder="Email"
                                                                        onChange={props.handleChange}
                                                                        value={props.values.email} />
                                                                </div>
                                                                <ErrorMessage name="email" render={renderError} />
                                                                <div className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-password">
                                                                    <label>Password</label>
                                                                    <input
                                                                        type="password"
                                                                        name='password'
                                                                        placeholder="Password"
                                                                        onChange={props.handleChange}
                                                                        value={props.values.password} />
                                                                </div>
                                                                <ErrorMessage name="password" render={renderError} />

                                                                <div className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-checkContainer">
                                                                    <input
                                                                        type='checkbox'
                                                                    />
                                                                    <label>Send me updates from Medicos Pdf</label>
                                                                </div>
                                                                <button type="submit" disabled={props.isSubmitting} className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-btn">Sign Up</button>
                                                                <p className="loginModal-wrapper-container-right-formContainer-SignUpForm-form-para">
                                                                    This site is protected by reCAPTCHA and the Google
                                                                    <span onClick={() => newTab('https://policies.google.com/privacy?hl=en-US', 'google privacy', 'google_privacy_clicked')}> Privacy Policy </span>
                                                                    and
                                                                    <span onClick={() => newTab('https://policies.google.com/terms?hl=en-US', 'google terms', 'google_terms_clicked')}> Terms of Service </span>
                                                                    apply.
                                                                </p>
                                                            </form>
                                                        )}
                                                    </Formik>
                                                </div>

                                                :


                                                <div className="loginModal-wrapper-container-right-formContainer-SignInForm">
                                                    {
                                                        showPasswordResetForm ?

                                                            <div className="loginModal-wrapper-container-right-formContainer-resetPassword">
                                                                <Formik
                                                                    initialValues={{
                                                                        email: '',


                                                                    }}
                                                                    validationSchema={Yup.object({
                                                                        email: Yup.string().email('Invalid email address').required('Required'),

                                                                    })}

                                                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                                                        forgetPasswordSubmit({ values, setSubmitting, resetForm })
                                                                    }}

                                                                >
                                                                    {(props) => (
                                                                        <form onSubmit={props.handleSubmit} className="loginModal-wrapper-container-right-formContainer-resetPassword-form" >
                                                                            <h3 className="loginModal-wrapper-container-right-formContainer-resetPassword-form-head">Reset Password</h3>
                                                                            <div className="loginModal-wrapper-container-right-formContainer-resetPassword-form-email" >
                                                                                <label>Email</label>
                                                                                <Field
                                                                                    type="email"
                                                                                    name='email'
                                                                                    placeholder="Email"
                                                                                    onChange={props.handleChange}
                                                                                    value={props.values.email} />

                                                                            </div>
                                                                            <ErrorMessage name="email" render={renderError} />

                                                                            <button type="submit" disabled={props.isSubmitting} className="loginModal-wrapper-container-right-formContainer-resetPassword-form-btn" >Sign In</button>

                                                                            <p className="loginModal-wrapper-container-right-formContainer-resetPassword-form-para" >
                                                                                This site is protected by reCAPTCHA and the Google
                                                                                <span onClick={clickhandlertab5}> Privacy Policy </span>
                                                                                and
                                                                                <span onClick={clickhandlertab6}> Terms of Service </span>
                                                                                apply.
                                                                            </p>
                                                                        </form>
                                                                    )}
                                                                </Formik>
                                                            </div>
                                                            :
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
                                                                    <form onSubmit={props.handleSubmit} className="loginModal-wrapper-container-right-formContainer-SignInForm-form" >
                                                                        <h3 className="loginModal-wrapper-container-right-formContainer-SignInForm-form-head">Sign In with Email</h3>
                                                                        <div className="loginModal-wrapper-container-right-formContainer-SignInForm-form-email" >
                                                                            <label>Email</label>
                                                                            <Field
                                                                                type="email"
                                                                                name='email'
                                                                                placeholder="Email"
                                                                                onChange={props.handleChange}
                                                                                value={props.values.email} />

                                                                        </div>
                                                                        <ErrorMessage name="email" render={renderError} />

                                                                        <div className="loginModal-wrapper-container-right-formContainer-SignInForm-form-password" >
                                                                            <label>Password</label>
                                                                            <Field
                                                                                type="password"
                                                                                name='password'
                                                                                placeholder="Password"
                                                                                onChange={props.handleChange}
                                                                                value={props.values.password} />
                                                                        </div>
                                                                        <ErrorMessage name="password" render={renderError} />

                                                                        <div className="loginModal-wrapper-container-right-formContainer-SignInForm-form-checkContainer">
                                                                            <input
                                                                                type='checkbox'
                                                                            />
                                                                            <label>Send me updates from Medicos Pdf</label>
                                                                        </div>

                                                                        <button type="submit" disabled={props.isSubmitting} className="loginModal-wrapper-container-right-formContainer-SignInForm-form-btn" >Sign In</button>
                                                                        <p className="loginModal-wrapper-container-right-formContainer-SignInForm-form-resetPageLink" onClick={() => setShowPasswordResetForm(true)}>Forgot your password?</p>
                                                                        <p className="loginModal-wrapper-container-right-formContainer-SignInForm-form-para" >
                                                                            This site is protected by reCAPTCHA and the Google
                                                                            <span onClick={() => newTab('https://policies.google.com/privacy?hl=en-US', 'google privacy', 'google_privacy_clicked')}> Privacy Policy </span>
                                                                            and
                                                                            <span onClick={() => newTab('https://policies.google.com/terms?hl=en-US', 'google terms', 'google_terms_clicked')}> Terms of Service </span>
                                                                            apply.
                                                                        </p>
                                                                    </form>
                                                                )}
                                                            </Formik>
                                                    }




                                                </div>



                                        }




                                    </div>

                                    :
                                    <div className="loginModal-wrapper-container-right-main">
                                        {
                                            showSignIn ?
                                                ''
                                                :
                                                <div className="loginModal-wrapper-container-right-main-logo">
                                                    {/* <img src={require('../../../assets/images/medicospdf_logo.webp').default} alt='logo' /> */}
                                                    <LazyLoadImage src={require('../../../assets/images/medicospdf_logo.webp').default} alt={'logo'} effect='blur'/>
                                                </div>
                                        }

                                        <div className="loginModal-wrapper-container-right-main-heading">
                                            {
                                                showSignIn ?
                                                    <h3 className="loginModal-wrapper-container-right-main-heading-head2">Best Place For Medical Study Materials</h3>
                                                    :
                                                    <h3 className="loginModal-wrapper-container-right-main-heading-head1">Sign In to MedicosPdf</h3>
                                            }


                                        </div>
                                        <div className="loginModal-wrapper-container-right-main-loginMethod">

                                            <div className="loginModal-wrapper-container-right-main-loginMethod-facebook" onClick={clickhandlerfbprovider}>
                                                <FacebookIcon className='socialIcon' />
                                                <h5>Continue With Facebook</h5>

                                            </div>

                                            <div className="loginModal-wrapper-container-right-main-loginMethod-google" onClick={clickhandlergoogleprovider}>
                                                <GoogleIcon className='socialIcon' />
                                                <h5>Continue With Google</h5>

                                            </div>

                                            <div className="loginModal-wrapper-container-right-main-loginMethod-email">

                                                <p>or</p>
                                                {
                                                    showSignIn ?
                                                        <p className="email-link" onClick={clickhandlersignin}>
                                                            Sign Up With Email
                                                        </p>
                                                        :
                                                        <p className="email-link" onClick={clickhandlersignshow}>
                                                            Sign In With Email
                                                        </p>
                                                }


                                            </div>



                                        </div>
                                        {
                                            showSignIn ?
                                                <div className="loginModal-wrapper-container-right-main-checkContainer">
                                                    <div className="loginModal-wrapper-container-right-main-checkContainer-check">
                                                        <input type='checkbox' />
                                                        <label>Send me updates from Medicos PDF</label>
                                                    </div>
                                                    <p className="loginModal-wrapper-container-right-main-checkContainer-para">By signing up with MedicosPDF, you agree to our <a href='/termsandconditions'>Terms of Service</a> and <a href='/privacypolicy'>Privacy Policy</a></p>
                                                </div>
                                                :
                                                ''
                                        }


                                    </div>
                            }





                            <div className="loginModal-wrapper-container-right-bottom">
                                {
                                    showSignIn ?
                                        <div className="loginModal-wrapper-container-right-bottom-signIn">
                                            <h5> Already have an account?</h5>
                                            <p className="signIn-link" onClick={() => { setShowSignIn(!showSignIn); setShowForm(false) }}>Sign In</p>
                                        </div>
                                        :
                                        <div className="loginModal-wrapper-container-right-bottom-signup">
                                            <h5> New to Medicos Pdf?</h5>
                                            <p className="signup-link" onClick={() => { setShowSignIn(!showSignIn); setShowForm(false); setShowPasswordResetForm(false) }}>Sign Up</p>
                                        </div>
                                }





                            </div>

                        </div>

                    </div>

                </div>


            }
        </>
    )
}
