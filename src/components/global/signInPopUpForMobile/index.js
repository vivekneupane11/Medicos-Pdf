
import React, { useContext, useEffect, useState } from 'react';
import SocialMediaAuth from '../../signUp/authMethods/auth';
import { AuthContext } from '../../signUp/authMethods/authentication';
import { facebookProvider, googleProvider } from '../../signUp/authMethods/authMethods';
import './_signInForPopUp.scss';
import Close from '../icons/xMark';
import GoogleIcon from '../icons/SocialIcon/google';
import FacebookIcon from '../icons/SocialIcon/facebook';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SignInPopUpForMobile = ({callBack}) => {
    const { user} = useContext(AuthContext);
    const [scroll, setScroll] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const [logInState,setLogInState]=useState(false)

    const PopUp = () => {
        const winScroll=document.documentElement.scrollTop;
        const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
        const scrolled=(winScroll / height)*100;

        if ( scrolled > 20) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }

     useEffect(() => {
        window.addEventListener('scroll', PopUp);
       
         return () => {
            window.removeEventListener('scroll', PopUp);

         }
     }, [])

     useEffect(() => {
         let isMounted=true;
         if(user){
             setLogInState(true)
         }
         else{
             setLogInState(false)
         }

         return () => {
            isMounted=false;
         }
     }, [user])



     const handleOnCLick = async (provider) => {
        await SocialMediaAuth(provider).then((res) => {
         
        
        })
    }

    const clickhandlergooglehandler = () => { handleOnCLick(googleProvider) }
    const clickhandlerfacebookhandler = () => { handleOnCLick(facebookProvider) }
    const clickhandlercallback = ()=>{callBack(true);setCloseModal(true)}
    const clickhandlercallback2 = ()=>{callBack(true);setCloseModal(true)}
    const redirect=()=>{
        callBack(true);
        setCloseModal(true);
    }
    const closeModalTrue=()=>setCloseModal(true);

    return (
        
           <div className={`signInPopUpForMobile-container-wrapper ${!closeModal && !logInState && scroll?'signInPopUpForMobile-container-wrapper-show':''}`}>
           <div className={`signInPopUpForMobile-container-show`}>
               <div className='signInPopUpForMobile-container-show-top'>
                    <p className='signInPopUpForMobile-container-show-top-para'>Log in or sign up for the best experience</p>
                    <div onClick={closeModalTrue}>

                    <Close className='signInPopUpForMobile-container-show-top-close' />
                    </div>
               </div>
             
              <div className='signInPopUpForMobile-container-show-bottom-container'>
                  <div className='signInPopUpForMobile-container-show-bottom-container-left'>
                     <div className='signInPopUpForMobile-container-show-bottom-container-left-top'>
                        <button onClick={clickhandlergooglehandler} className='signInPopUpForMobile-container-show-bottom-container-left-top-google'>
                            <GoogleIcon className='signInPopUpForMobile-container-show-bottom-container-left-top-google-icon'/>
                            <span className='signInPopUpForMobile-container-show-bottom-container-left-top-google-text'>Continue with Google</span>
                        </button>
                        <button onClick={clickhandlerfacebookhandler} className='signInPopUpForMobile-container-show-bottom-container-left-top-facebook'>
                            <FacebookIcon className='signInPopUpForMobile-container-show-bottom-container-left-top-facebook-icon'/>
                            <span className='signInPopUpForMobile-container-show-bottom-container-left-top-facebook-text'>Continue with Facebook</span>
                        </button>
                     </div>
                      <div className='signInPopUpForMobile-container-show-bottom-container-left-bottom'>
                          <button className='signInPopUpForMobile-container-show-bottom-container-left-bottom-continueEmail' onClick={clickhandlercallback} >Continue with email</button>
                          <button className='signInPopUpForMobile-container-show-bottom-container-left-bottom-logIn' onClick={clickhandlercallback2} >log in</button>
                      </div>

                  </div>
                  <div className='signInPopUpForMobile-container-show-bottom-container-mid'>
                  </div>

                  <div className='signInPopUpForMobile-container-show-bottom-container-right'>
                      <LazyLoadImage src={require('../../../assets/images/qr.webp').default} alt='medicosPdf app QR picture' className='signInPopUpForMobile-container-show-bottom-container-right-qr' effect='blur'/>
                      {/* <img src={require('../../../assets/images/qr.webp').default} alt='medicosPdf app QR picture' className='signInPopUpForMobile-container-show-bottom-container-right-qr'/> */}
                      <p className='signInPopUpForMobile-container-show-bottom-container-right-text'>Get the app</p>
                  </div>
              </div>
                  
              </div>

      </div>
     
    )
}

export default SignInPopUpForMobile
