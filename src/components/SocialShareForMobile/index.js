import React,{useState,useEffect} from 'react'
import './_socialShareForMobile.scss'
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,

} from "react-share";

const SocialShareForMobile =({shareUrl,title}) => {
    const [scroll, setScroll] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
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
             <p>Share Now</p>
             <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="shareBtn"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <FacebookMessengerShareButton
                    appId={process.env.REACT_APP_APP_ID}
                    url={shareUrl}
                    title={title}
                    className="shareBtn"
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="shareBtn"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <EmailShareButton
                    body={shareUrl}
                    subject={title}
                    className="shareBtn"
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
        </div>

        }
        
        </>
       
    )
}

export default SocialShareForMobile
