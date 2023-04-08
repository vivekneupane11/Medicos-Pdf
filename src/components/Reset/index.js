import React from 'react'
import resetimage from '../../images/reset.svg';
// import background from '../../images/error.jpg';
import './_reset.scss';
import { FaEnvelope } from "react-icons/fa";
import { Button } from '../global/button';
import { Formik,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import  firebase from "firebase";
import "firebase/auth"

export const ResetPassword = () => {

    return (
        
            <div className="reset">
                <div className="reset-card">
                    <div className="reset-card-top">
                    <img src={resetimage}></img>
                    <h5>Reset Password</h5>
                    </div>

                    <Formik
                    initialValues={{ 
                        email:'',
                        }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        })}

                    onSubmit={(values,{setSubmitting,resetForm}) => {

                        
                           firebase
                           .auth()
                           .sendPasswordResetEmail(values.email)
                           .then(res=>{console.log(res)})
                           .catch ((err)=>{
                            switch(err.code){
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
                            
                            setSubmitting(false)
                            resetForm();
                           
                               
                        
                      }}
                        >
                            {(props)=>(
                                 <form onSubmit={props.handleSubmit} className="reset-card-bottom">
                                 <p>Enter your email to reset password</p>
          
                                  <div className="reset-card-bottom-input">
                                        <FaEnvelope/>
                                        <Field  
                                        type="email" 
                                        name='email'
                                        placeholder="Email address"
                                        onChange={props.handleChange} 
                                        value={props.values.email}
                                        /> 
                                  </div>
                                 <button type="submit" disabled={props.isSubmitting}>SEND</button>
          
                              </form>
                            )}

                      </Formik>      

                   

                </div>
               
                
            </div>
    )
}
