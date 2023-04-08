import React, { useEffect, useState } from 'react';
import { newTab } from '../../functions/newTabMethod';
import './_socialAccounts.scss';
import Close from '../global/icons/xMark';
import FacebookIcon from '../global/icons/SocialIcon/facebook';
import InstagramIcon from '../global/icons/SocialIcon/instagram';
import TwitterIcon from '../global/icons/SocialIcon/twitter';
import LinkedinIcon from '../global/icons/SocialIcon/linkedin';
import PiIntrestIcon from '../global/icons/SocialIcon/piIntrest';

const SocialAccounts = ({ show, cancel}) => {

    const [check,setCheck]=useState(false)

    
    useEffect(() => {
        let isMounted=true;
       
         if(check){
             setTimeout(()=>{
                 setCheck(false)
             },5000)
         }
 
         return () => {
           isMounted=false
         }
     }, [check===true])
     const handelclose=() => cancel(false)


    return (
        <div className={`SocialAccounts-Container ${show ? 'SocialAccounts-Container-fadeIn' : 'SocialAccounts-Container-fadeOut'}`}>
            <div className="SocialAccounts-Container-wrapper">

                <div className="SocialAccounts-Container-wrapper-top">
                    <h3 className="SocialAccounts-Container-wrapper-top-head">Connect with Medicos</h3>
                    <div onClick={handelclose}>

                    <Close className="SocialAccounts-Container-wrapper-top-icon"/>
                    </div>
                        
                    
                </div>

                <div className="SocialAccounts-Container-wrapper-shareBtnContainer">
                    <div
                        onClick={()=>newTab('https://www.facebook.com/Medicos.int7/')}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                        style={{ color: '#3c5997' }}
                    >
                        <FacebookIcon color={'#3c5997'} className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div>

                    <div
                        onClick={()=>newTab('https://www.instagram.com/medicos.international/')}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                    >
                        <InstagramIcon  className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div>

                    <div
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                        onClick={()=>newTab('https://twitter.com/medicosint7')}
                    >
                        <TwitterIcon  className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div>

                    {/* <div
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                        onClick={()=>newTab()}
                    >
                        <AiOutlineMail size={40} style={{ color: '#7f7f7f' }} className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div> */}
                    {/* <div
                        onClick={()=>newTab()}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                    >
                        <FaViber size={40} style={{ color: '#7c529f' }} className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div> */}


                    <div
                        onClick={()=>newTab('https://www.linkedin.com/company/medicosnpl/')}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                    >
                        <LinkedinIcon className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div>
                    {/* <div
                        onClick={()=>newTab('https://www.youtube.com/channel/UCjPxl-Mpqkilfsmv9yT5ZvQ')}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                    >
                        <YoutubeIcon size={40} style={{ color: '#FF0000' }} className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div> */}
               

                    <div
                     onClick={()=>newTab(' http://www.pinterest.com/Medicosinternational')}
                        className="SocialAccounts-Container-wrapper-shareBtnContainer-btn"
                    >
                        <PiIntrestIcon className="SocialAccounts-Container-wrapper-shareBtnContainer-btn-icon" />
                    </div>

                </div>

            </div>

        </div>

    )
}

export default SocialAccounts
