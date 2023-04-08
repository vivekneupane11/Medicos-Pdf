import React, { useState,useEffect } from 'react'
import './_shareModal.scss'
import {

    FacebookShareButton,
    FacebookMessengerShareButton,
    EmailShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    ViberShareButton,

} from "react-share";
import CloseCircle from '../icons/xMark_Circle';
import ClipboardIcon from '../icons/clipboard';
import ClipboardCheck from '../icons/clipboard_check';
import FacebookIcon from '../icons/SocialIcon/facebook';
import MessengerIcon from '../icons/SocialIcon/messenger';
import TwitterIcon from '../icons/SocialIcon/twitter';
import EmailIcon from '../icons/SocialIcon/gmail';
import LinkedinIcon from '../icons/SocialIcon/linkedin';
import TelegramIcon from '../icons/SocialIcon/telegram';
import WhatsAppIcon from '../icons/SocialIcon/whatsapp';
import PiIntrestIcon from '../icons/SocialIcon/piIntrest';
import ViberIcon from '../icons/SocialIcon/viber';


const ShareModal = ({ url, title,  image, show, cancel }) => {

    let appId='822492691593209';
    const [check,setCheck]=useState(false)

    const copyToClipBoard=(textURL)=>{
        navigator.clipboard.writeText(textURL)
        setCheck(true)
    }
    const clipboardCopy=()=>copyToClipBoard(url);

    useEffect(() => {
        let isMounted=true;
       
         if(check & isMounted){
             setTimeout(()=>{
                 setCheck(false)
             },5000)
         }
 
         return () => {
           isMounted=false
         }
     }, [check===true])
const handelCancel=() => cancel(false)

    return (
        <div className={`ShareModalForAll-Container ${show ? 'ShareModalForAll-Container-fadeIn' : 'ShareModalForAll-Container-fadeOut'}`}>
            <div className="ShareModalForAll-Container-wrapper">

                <div className="ShareModalForAll-Container-wrapper-top">
                    <h3 className="ShareModalForAll-Container-wrapper-top-head">Share</h3>
                    <div onClick={handelCancel}>

                    <CloseCircle className="ShareModalForAll-Container-wrapper-top-icon"/>
                    </div>
                </div>

                <div className="ShareModalForAll-Container-wrapper-shareBtnContainer">
                    <FacebookShareButton
                        url={url}
                        quote={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                        
                    >
                        <FacebookIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" color={'#3c5997'} />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                        appId={appId}
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <MessengerIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" />
                    </FacebookMessengerShareButton>

                    <TwitterShareButton
                        
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"

                    >
                        <TwitterIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" color={'#05abed'}  />
                    </TwitterShareButton>

                    <EmailShareButton
                        body={url}
                        subject={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"

                    >
                        <EmailIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" />
                    </EmailShareButton>
                    <ViberShareButton
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <ViberIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" />
                    </ViberShareButton>


                    <LinkedinShareButton
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <LinkedinIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" color={'#037fb1'} />
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <TelegramIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" />
                    </TelegramShareButton>
                    <WhatsappShareButton
                        url={url}
                        title={title?.split("-", 1)[0]}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <WhatsAppIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" />
                    </WhatsappShareButton>


                    <PinterestShareButton
                        url={url}
                        media={image}
                        className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn"
                    >
                        <PiIntrestIcon className="ShareModalForAll-Container-wrapper-shareBtnContainer-btn-icon" color={'#cb2128'} />
                    </PinterestShareButton>

                </div>

                <div className='shareModalForAll-copyContainer'>
                    {
                        !check?
                        <div className='shareModalForAll-copyContainer-iconContainer' onClick={clipboardCopy}>
                           <ClipboardIcon className='shareModalForAll-copyContainer-iconContainer-icon'/>
                     </div>
                     :
                     <div className='shareModalForAll-copyContainer-iconContainer' onClick={clipboardCopy}>
                        <ClipboardCheck className='shareModalForAll-copyContainer-iconContainer-icon'/>
                     </div>
                    }

                    {
                        check?
                         <p>Copied</p>
                         :
                         <p>Copy Link</p>
                    }
                     
                </div>

            </div>

        </div>

    )
}
export default React.memo(ShareModal) ;
 