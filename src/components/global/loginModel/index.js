import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase";
import "firebase/auth";
import { ErrorMessage, Field, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

//local imports
import SocialMediaAuth from '../../signUp/authMethods/auth';
import { AuthContext } from '../../signUp/authMethods/authentication';
import { facebookProvider, googleProvider } from '../../signUp/authMethods/authMethods';
import "./_loginmodel.scss";




export const LoginModal = ({ show, formModel }) => {



    const { forgetPassword, register, login, user } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const [showPopUpForm, setShowPopUpForm] = useState(show)

    const [showSignIn, setShowSignIn] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showSignInWithEmailForm, setShowSignInWithEmailForm] = useState(false);
    const [showPasswordResetForm, setShowPasswordResetForm] = useState(false)

    const handleOnCLick = async (provider) => {
        await SocialMediaAuth(provider).then((res) => {
         
            if (res?.uid) {
                firebase.firestore().collection("Web-User-Data")
                    .doc(res?.uid)
                    .collection('Additional-Details')
                    .doc(res?.uid)
                    .set({
                        user_id: res?.uid,
                        email: res?.email,
                        displayName: res?.displayName,
                        photoURL: res?.photoURL,
                        language: '',
                        gender: '',
                        nickname: '',
                        joinedDate: '',
                        working: '',
                        education: '',
                        summary: '',
                        facebook:'',
                        instagram:'',
                        twitter:''
                    })
                    .then((res) => {
                        // alert("Saved Successfully")
                    })
            }
        })
    }
    const renderError = (message) => <p className="error-msg">{message}</p>;
    const loginSubmit = async ({ values, setSubmitting, resetForm }) => {
        await login(values.email, values.password).then((res) => {
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
    const forgetPasswordSubmit = ({ values, setSubmitting, resetForm }) => {
        // alert(`This is email ${values.email}`)
        forgetPassword(values.email)
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


    const newTab = (url) => {
        window.open(
            url, "_blank");
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
            />
            {
                show ?
                    <div className={`${show ? 'loginModal-wrapper' : 'loginModal-wrapper-hide'}`}>
                        <div className="loginModal-wrapper-container">


                            <div className="loginModal-wrapper-container-left">
                                <div className="loginModal-wrapper-container-left-top">
                                    <div className="loginModal-wrapper-container-left-top-logo">
                                        <img src={require("../../../assets/images/medicospdf_logo.png")?.default} style={{ width: 179, height: 38 }} />

                                    </div>
                                    <div className='loginModal-wrapper-container-left-top-heading'>
                                        <p style={{ display: showSignIn ? 'none' : 'block' }}>Welcome Back!!!</p>
                                    </div>


                                </div>
                                <div className="loginModal-wrapper-container-left-bottom">
                                    <div className="loginModal-wrapper-container-left-bottom-userImage">
                                        <div className="loginModal-wrapper-container-left-bottom-userImage-container">
                                            <img className="loginModal-wrapper-container-left-bottom-userImage-container-one" src={require("../../../assets//images/appIcon/dm_logo.jpg")?.default} />
                                            <img className="loginModal-wrapper-container-left-bottom-userImage-container-two" src={require("../../../assets/images/appIcon/ECG.png")?.default} />
                                            <img className="loginModal-wrapper-container-left-bottom-userImage-container-three" src={require("../../../assets/images/appIcon/pdf.png")?.default} />

                                        </div>


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
                                    <AiOutlineClose className="loginModal-wrapper-container-right-top_iconClose" onClick={() => formModel(false)} />

                                    {
                                        showForm ?
                                            <div className="loginModal-wrapper-container-right-top-back" onClick={() => { setShowForm(!showForm); setShowPasswordResetForm(false) }}>
                                                <MdKeyboardArrowLeft className="loginModal-wrapper-container-right-top-back-iconArrow" />
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
                                                                name: '',
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
                                                                name: Yup.string()
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
                                                                        <label>Name</label>
                                                                        <Field
                                                                            type="text"
                                                                            name='name'
                                                                            placeholder="Name"
                                                                            onChange={props.handleChange}
                                                                            value={props.values.name}
                                                                        />
                                                                    </div>
                                                                    <ErrorMessage name="name" render={renderError} />
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
                                                                        <span onClick={() => newTab('https://policies.google.com/privacy?hl=en-US')}> Privacy Policy </span>
                                                                        and
                                                                        <span onClick={() => newTab('https://policies.google.com/terms?hl=en-US')}> Terms of Service </span>
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
                                                                                    <span onClick={() => newTab('https://policies.google.com/privacy?hl=en-US')}> Privacy Policy </span>
                                                                                    and
                                                                                    <span onClick={() => newTab('https://policies.google.com/terms?hl=en-US')}> Terms of Service </span>
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
                                                                                <span onClick={() => newTab('https://policies.google.com/privacy?hl=en-US')}> Privacy Policy </span>
                                                                                and
                                                                                <span onClick={() => newTab('https://policies.google.com/terms?hl=en-US')}> Terms of Service </span>
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
                                                        <img src={require("../../../assets/images/medicospdf_logo.png").default} alt='logo' />
                                                    </div>
                                            }

                                            <div className="loginModal-wrapper-container-right-main-heading">
                                                {
                                                    showSignIn ?
                                                        <h3 className="loginModal-wrapper-container-right-main-heading-head2">The world's most fascinating library</h3>
                                                        :
                                                        <h3 className="loginModal-wrapper-container-right-main-heading-head1">Sign In to MedicosPdf</h3>
                                                }


                                            </div>
                                            <div className="loginModal-wrapper-container-right-main-loginMethod">

                                                <div className="loginModal-wrapper-container-right-main-loginMethod-facebook" onClick={() => { handleOnCLick(facebookProvider) }}>
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                    <h5>Continue With Facebook</h5>

                                                </div>

                                                <div className="loginModal-wrapper-container-right-main-loginMethod-google" onClick={() => { handleOnCLick(googleProvider) }}>
                                                    <FontAwesomeIcon icon={faGoogle} />
                                                    <h5>Continue With Google</h5>

                                                </div>

                                                <div className="loginModal-wrapper-container-right-main-loginMethod-email">

                                                    <p>or</p>
                                                    {
                                                        showSignIn ?
                                                            <p className="email-link" onClick={() => { setShowSignInWithEmailForm(true); setShowForm(true) }}>
                                                                Sign Up With Email
                                                            </p>
                                                            :
                                                            <p className="email-link" onClick={() => { setShowSignInWithEmailForm(false); setShowForm(true) }}>
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
                                                        <p className="loginModal-wrapper-container-right-main-checkContainer-para">By signing up with MedicosPDF, you agree to our <a href='/TermsAndConditions'>Terms of Service</a> and <a href='/PrivacyPolicy'>Privacy Policy</a></p>
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
                    :
                    ''
            }
        </>
    )
}
