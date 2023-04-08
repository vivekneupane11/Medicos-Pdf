import React,{useState,useEffect} from 'react'
import './_socialShareForMobile.scss'
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton

} from "react-share";
import FacebookIcon from '../global/icons/SocialIcon/facebook';
import MessengerIcon from '../global/icons/SocialIcon/messenger';
import TwitterIcon from '../global/icons/SocialIcon/twitter';
import Envelop from '../global/icons/envelop';

const SocialShareForMobile =({shareUrl,title}) => {
    const [scroll, setScroll] = useState(false);
    const [closeModal] = useState(false);
    const PopUp = () => {
        const winScroll=document.documentElement.scrollTop;
        const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
        const scrolled=(winScroll / height)*100;
        if (scrolled > 10) {
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

    return (
        <>
        {
             !closeModal &&
             <div className={`socialShareForMObile-container ${scroll ? "social-active" : ""}`}>
             <p className='socialShareForMObile-container-para'>Share Now</p>
             <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="shareBtnFB"
                >
                    <FacebookIcon size={16} className='shareBtnFB-icon'/>
                </FacebookShareButton>

                <FacebookMessengerShareButton
                    appId={process.env.REACT_APP_APP_ID}
                    url={shareUrl}
                    title={title}
                    className="shareBtnM"
                >
                    <MessengerIcon  size={16} className="shareBtnM-icon"/>
                </FacebookMessengerShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="shareBtnTW"
                >
                    <TwitterIcon size={16}  className="shareBtnTW-icon"/>
                </TwitterShareButton>

                <EmailShareButton
                    body={shareUrl}
                    subject={title}
                    className="shareBtnE"
                    
                >
                    <Envelop size={16}  className="shareBtnE-icon"/>
                </EmailShareButton>
        </div>

        }
        
        </>
       
    )
}

export default SocialShareForMobile
