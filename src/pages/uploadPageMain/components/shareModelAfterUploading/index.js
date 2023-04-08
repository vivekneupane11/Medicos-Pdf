import React,{useState,useEffect} from 'react'
import './_shareModelAfterUpload.scss'
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
import { ImCross } from 'react-icons/im';
const ShareModelAfterUpload = ({shareUrl,shareTitle}) => {

    const [showShareModal,setShowShareModal]=useState(true)

    const [showMessage,setShowMessage]=useState(false)
    const [check,setCheck]=useState(false)
    const [message,setMessage]=useState(null)

  
    const copyToClipBoard=(textURL)=>{
        navigator.clipboard.writeText(textURL)
        setCheck(true)
        // setShowMessage(true)
       
    
    }
   

    useEffect(() => {
       let isMounted=true;
      
        if(check){
            setMessage('Copied')

            setTimeout(()=>{
                setCheck(false)

            },5000)
        }
        else
         setMessage('')

        return () => {
          isMounted=false
        }
    }, [check===true])

    return (
        <>
         {
             showShareModal &&

             <div className="shareModelAfterUploading-container">
            
             <div className="shareModelAfterUploading-container-modal">
                
                     <div className="shareModelAfterUploading-container-modal-iconContainer">
                         <ImCross className="shareModelAfterUploading-container-modal-iconContainer-icon" onClick={()=>setShowShareModal(false)}/>
                     </div>
                       
                     <div className="shareModelAfterUploading-container-modal-main">
                         
                         <div className="shareModelAfterUploading-container-modal-main-top">
                             <h2 className="shareModelAfterUploading-container-modal-main-top-head">Your Slide is Uploaded!</h2>
                             <p className="shareModelAfterUploading-container-modal-main-top-para">Do you want your Slides to be read by others.</p>
 
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
                         <div className="shareModelAfterUploading-container-modal-main-bottom-linkShare">
                             <p onClick={() => copyToClipBoard(shareUrl)} onMouseOver={()=>setShowMessage(true)}  onMouseOut={()=> setShowMessage(false)} className="shareModelAfterUploading-container-modal-main-bottom-linkShare-para">{`copy story link ${shareUrl}`}</p>
                             <p
                              className="successContainerForCopyToClipboard"
                              style={{display:showMessage?'flex':'none'}}
                              >click to copy :
                                {
                                  message
                                }  
                              </p>

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
