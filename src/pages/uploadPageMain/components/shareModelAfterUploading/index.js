import React, { useEffect, useState } from 'react';
// import { BiSlideshow } from 'react-icons/bi';
// import { HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi';
// import { ImCross } from 'react-icons/im';
// import { Link } from 'react-router-dom';
import {
    EmailIcon, EmailShareButton, FacebookIcon,
    FacebookMessengerIcon, FacebookMessengerShareButton,
    FacebookShareButton, TwitterIcon, TwitterShareButton
} from "react-share";
import './_shareModelAfterUpload.scss';
import CloseCircle from '../../../../components/global/icons/xMark_Circle';
import ClipboardIcon from '../../../../components/global/icons/clipboard';
import ClipboardCheck from '../../../../components/global/icons/clipboard_check';
import SlideIcon from '../../../../components/global/icons/slide_Icon';
const ShareModelAfterUpload = ({shareUrl,shareTitle}) => {

    const [showShareModal,setShowShareModal]=useState(true)

    // const [showMessage,setShowMessage]=useState(false)
    const [check,setCheck]=useState(false)
    // const [message,setMessage]=useState(null)

  
    const copyToClipBoard=(textURL)=>{
        navigator.clipboard.writeText(textURL)
        setCheck(true)
        // setShowMessage(true)
       
    
    }
   

    useEffect(() => {
       let isMounted=true;
      
            if(check && isMounted){
                setTimeout(()=>{
                    setCheck(false)
                },5000)
            }
        return () => {
          isMounted=false
        }
    }, [check===true])

    const clickhandlershare = ()=>setShowShareModal(false)
    const clickhandlercopy = () => copyToClipBoard(shareUrl)
    return (
        <>
         {
             showShareModal &&

             <div className="shareModelAfterUploading-container">
            
             <div className="shareModelAfterUploading-container-modal">
                
                     <div className="shareModelAfterUploading-container-modal-iconContainer" onClick={clickhandlershare}>
                         <CloseCircle className="shareModelAfterUploading-container-modal-iconContainer-icon" />
                     </div>
                       
                     <div className="shareModelAfterUploading-container-modal-main">
                         
                         <div className="shareModelAfterUploading-container-modal-main-top">
                             <h2 className="shareModelAfterUploading-container-modal-main-top-head">Your Slide is Uploaded!</h2>
                             <a href={shareUrl} className="shareModelAfterUploading-container-modal-main-top-para"> <SlideIcon className='icon' /> Have a look at your uploads.</a>
 
                         </div>
 
                         <div className="shareModelAfterUploading-container-modal-main-bottom">
                             <h3 className="shareModelAfterUploading-container-modal-main-bottom-head">Share your Slides with the world.</h3>
                             <div className="shareModelAfterUploading-container-modal-main-bottom-fb">
                                 <FacebookShareButton
                                     url={shareUrl}
                                     quote={shareTitle}
                                     className="shareAfterUpload-shareBtn"
                                 >
                                     <FacebookIcon size={25} round />
                                     <p>Share with facebook</p>
                                 </FacebookShareButton>
                                
                             </div>
                         
                         <div className="shareModelAfterUploading-container-modal-main-bottom-messenger">
                             <FacebookMessengerShareButton
                                     appId={process.env.REACT_APP_APP_ID}
                                     url={shareUrl}
                                     title={shareTitle}
                                     className="shareAfterUpload-shareBtn"
                                 >
                                     <FacebookMessengerIcon size={25} round />
                                     <p>Share with messenger</p>
                                 </FacebookMessengerShareButton>
                               
 
                         </div>
 
 
                         <div className="shareModelAfterUploading-container-modal-main-bottom-twitter">
                                 <TwitterShareButton
                                         url={shareUrl}
                                         title={shareTitle}
                                         className="shareAfterUpload-shareBtn"
                                     >
                                         <TwitterIcon size={25} round />
                                         <p>Share with twitter</p>
                                     </TwitterShareButton>
                                    
                         </div>
 
                         <div className="shareModelAfterUploading-container-modal-main-bottom-email">
                             <EmailShareButton
                                     body={shareUrl}
                                     subject={shareTitle}
                                     className="shareAfterUpload-shareBtn"
                                 >
                                     <EmailIcon size={25} round />
                                     <p>Share with Email</p>
                                 </EmailShareButton>
                                
                         </div>
                         <div className="shareModelAfterUploading-container-modal-main-bottom-linkShare" style={{background:check?'rgba(0, 0, 0, 0.09)':''}}>
                             {/* <p onClick={clickhandlercopy} onMouseOver={()=>setShowMessage(true)}  onMouseOut={()=> setShowMessage(false)} className="shareModelAfterUploading-container-modal-main-bottom-linkShare-para">{`copy story link ${shareUrl}`}</p>
                             <p
                              className="successContainerForCopyToClipboard"
                              style={{display:showMessage?'flex':'none'}}
                              >click to copy :
                                {
                                  message
                                }  
                              </p> */}
                               {
                                    !check?
                                    <div  onClick={ clickhandlercopy} className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container">
                                    <ClipboardIcon className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container-icon"/>
                                    <p className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container-text">Copy link</p>
                                    
                                </div>
                                :
                                <div  onClick={clickhandlercopy} className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container">
                                    <ClipboardCheck className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container-icon"/>
                                    <p className="shareModelAfterUploading-container-modal-main-bottom-linkShare-container-text">Link copied</p>
                                </div>
                            }
                     
                        </div>  
                        </div>
                   </div>
                </div> 
             </div>   
              
         }

         {/* <button onClick={()=>setShowShareModal(true)}>Click me to view pop up share model after uploading file</button> */}
        </>
      
    )
}

export default ShareModelAfterUpload
