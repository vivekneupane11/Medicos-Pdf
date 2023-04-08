import { faGrinAlt, faGrinStars, faMeh, faSadCry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import 'firebase/firestore';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

//local imports
import InputLabel from '../global/inputLabel';
import './_feedback.scss';

const Feedback = () => {

    const [toggle, setToggle] = useState(false)
    const [checkp,setCheckp]=useState(false)
    const [checkd,setCheckd]=useState(true)

    return (
        <>

            <button className="feedback-btn" onClick={()=>setToggle(!toggle)}>feedback</button>
            <div className={`feedback-container ${toggle?'feedback-container-true':'feedback-container'}`}>

                <div className="feedback-container-rating">
                    <div className="feedback-container-rating-headContainer">
                      <h4 className="feedback-container-rating-headContainer-head">Would you like to rate this app?</h4>
                      <IoClose className="feedback-container-rating-headContainer-icon" onClick={()=>setToggle(false)}/>
                    </div>
                   
                    <div className="feedback-container-rating-icon">
                            <div className="feedback-container-rating-icon-emo">
                                <div className="feedback-container-rating-icon-emo-first">
                                  <FontAwesomeIcon icon={faSadCry} size='2x' className="feedback-container-rating-icon-emo-first-cry"/>
                                  <span  className="feedback-container-rating-icon-emo-first-label">very bad</span>
                                </div>
                               
                                <FontAwesomeIcon icon={faMeh} size='2x' className="feedback-container-rating-icon-emo-sad" />
                                <FontAwesomeIcon icon={faGrinAlt}  size='2x' className="feedback-container-rating-icon-emo-happy"/>
                                <div className="feedback-container-rating-icon-emo-last">
                                    <FontAwesomeIcon icon={faGrinStars} size='2x' className="feedback-container-rating-icon-emo-last-love"/>
                                    <span className="feedback-container-rating-icon-emo-last-label">very good</span>
                                </div>
                               
                            </div>
                        
                   </div>
                </div>

                <div className="feedback-container-recommend">
                    <h4 className="feedback-container-recommend-head">Would you recommend our app to others?</h4>
                    <div className="feedback-container-recommend-btn">
                         <button className={`feedback-container-recommend-btn-primary ${checkp?'feedback-container-recommend-btn-primaryActive':''}`} onClick={()=>{setCheckp(!checkp);setCheckd(!checkp)}}>Yes</button>
                         <button className={`feedback-container-recommend-btn-danger ${checkd?'':'feedback-container-recommend-btn-dangerActive'}`} onClick={()=>{setCheckd(!checkd);setCheckp(!checkd)}}>No</button>
                    </div>
                   
                </div>
               
                <Formik
                    initialValues={{ 
                        email:'',
                        subject:'',
                        message:''
                        }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values,{setSubmitting,resetForm}) => {
                      
                            // console.log(values)
                            const fireStore=firebase.firestore().collection("Feedback");
                            fireStore.add(values);
                            setSubmitting(false)
                            resetForm();
                            setToggle(!toggle);
                            toast.success('Thank you for your feedback.')
                               
                        
                      }}
                        >
                       {(props) => (
                            <form className="feedback-container-form" onSubmit={props.handleSubmit}>
                                <div className="feedback-container-form-email">
                                    <InputLabel text='Email' className="feedback-container-form-email-label"/>
                                    <Field
                                    type="email" 
                                    name="email"
                                    placeholder='Enter your Email' 
                                    onChange={props.handleChange}
                                    value={props.values.email}
                                    required
                                    />
                        
                                </div>
                            
                                <div className="feedback-container-form-subject">
                                        <InputLabel text='subject' className="feedback-container-form-subject-label"/>
                                        <Field
                                        type="text" 
                                        name="subject"
                                        placeholder='Enter your Subject'
                                        onChange={props.handleChange}
                                        value={props.values.subject}
                                        required
                                        />
                                    
                                </div>
                                
                                <div className="feedback-container-form-message">
                                    <InputLabel text='message' className="feedback-container-form-message-label"/>
                                    <Field
                                    as='textarea' 
                                    name="message"
                                    placeholder='Enter your Message'
                                    onChange={props.handleChange}
                                    value={props.values.message}
                                    required
                                    />
                                    
                                </div>

                                <button type="submit" className="feedback-container-form-btn" disabled={props.isSubmitting} >Submit</button>
                        </form>
                    )}
                </Formik>

            </div>
        </>
    )
}

export default Feedback
