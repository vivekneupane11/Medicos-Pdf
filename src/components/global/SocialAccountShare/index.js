import React,{useState} from 'react'
import './_socialAccountShare.scss'
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
const SocialAccountShare = ({checkShare,shareUrl,title}) => {
  
    return (

            <div className={`sharePopUp ${checkShare ? 'sharePopUpActive' : ''}`}>
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
    )
}

export default SocialAccountShare
