import React, { useState ,useEffect,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagramSquare, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import "./_registermodal.scss";

import { AiOutlineClose } from 'react-icons/ai';
import firebase from "firebase";

export const RegisterModel = () => {

    return (

       <div className="registerModal-wrapper">
            <div className="registerModal-wrapper-container">
            <div className="exit">
                    <AiOutlineClose/>

            </div>
                
                <div className="registerModal-wrapper-container-left">
                    <div className="registerModal-wrapper-container-left-top">
                        <div className="registerModal-wrapper-container-left-top-logo">
                        <img src={require("../../../assets/images/medicospdf_logo.png")?.default} style={{ width: 179, height: 50 }} />

                        </div>
                       
                    

                    </div>
                    <div className="registerModal-wrapper-container-left-bottom">
                        <div className="registerModal-wrapper-container-left-bottom-userImage">
                        <div className="registerModal-wrapper-container-left-bottom-userImage-container">
                                    <img className="registerModal-wrapper-container-left-bottom-userImage-container-one" src={require("../../../assets/images/profile2.png")?.default} />
                                    <img className="registerModal-wrapper-container-left-bottom-userImage-container-two" src={require("../../../assets/images/profile3.png")?.default} />
                                    <img className="registerModal-wrapper-container-left-bottom-userImage-container-three" src={require("../../../assets/images/profile1.png")?.default} />
                                </div>
                            

                        </div>
                        <div className="registerModal-wrapper-container-left-bottom-userLogin">
                            <div className="registerModal-wrapper-container-left-bottom-userLogin-number">
                            <h4 className="count">123322 <h4>people</h4></h4>
                            <p>browsing medicosPdf right now</p>
                            </div>

                        

                        </div>
                    

                    </div>

                </div>
                <div className="registerModal-wrapper-container-right">
                    <div className="exit">
                        <AiOutlineClose/>

                    </div>
                   
                    
                    <div className="registerModal-wrapper-container-right-main">
                        <div className="registerModal-wrapper-container-right-main-heading">
                        <h3>Best Choice Of Medical Field</h3>
                        
                    
                        </div>
                        <div className="registerModal-wrapper-container-right-main-loginMethod">
                            <div className="registerModal-wrapper-container-right-main-loginMethod-facebook" >
                            <FontAwesomeIcon  icon={faFacebook} />
                            <h5>Sign Up  With Facebook</h5>
                
                            </div>

                            <div className="registerModal-wrapper-container-right-main-loginMethod-google">
                            <FontAwesomeIcon  icon={faGoogle} />
                            <h5>Sign Up With Google</h5>
                
                            </div>

                            <div className="registerModal-wrapper-container-right-main-loginMethod-email">
                           
                            <p>or</p>
                            <p className="email-link">
                            Sign Up With Email 
                            </p>
                
                            </div>
                            
                        </div>

                        <div className="registerModal-wrapper-container-right-main-terms"> 
                            <p>By sign up the MedicosPdf you agree to our <a href="#">Terms and Conditions</a> and <a href="#"> Privacy Policy</a></p> 

                        </div>

                
                    </div>
                    <div className="registerModal-wrapper-container-right-bottom">
                        <div className="registerModal-wrapper-container-right-bottom-signup">
                        <h5> Already have an Account?</h5>
                        <p className="signup-link">Sign In</p>
                        
              
                        </div>

              
                    </div>
              
                </div>

            </div>
            
        </div>
    )
}
