import React ,{useState,useEffect}from 'react';
import { FiFacebook, FiTwitter } from "react-icons/fi";

//local imports
import { Headings } from '../../../../components/global/headings';
import SocialAccountShare from '../../../../components/global/SocialAccountShare';
import { DisplayTitle } from '../../../../components/global/Titles';
import LeaveAReply from '../../../NewsDetail/components/leaveAReply';
import CommentComponent from '../commentComp';
import LongModalDescription from '../LongModalDescription';
import "./index.scss";
const SlideDescription = ({ data, user }) => {
    let shareUrl = encodeURI(`https://medicospdf.com/slideDetails/${data?.SlideName}/${data?.slideCategory}/${data?.slideSubCategory.replace(/\s|\//g, "")}`);
    let shareTitle = data?.SlideName

    const [showLongModal,setShowLongModal]=useState(false)
    const [checkShare, setCheckShare] = useState(false);

    const showModal=()=>{
        setShowLongModal(true)
    }
   

    const close=(signal)=>{
        if(signal===false){
            setShowLongModal(false)
        }
    }
    console.log('desc:',data )
    return (
        <div className="slide-description">
           
            <LongModalDescription show={showLongModal } close={close} data={data} />
            <div className="slide-description-container">
                <DisplayTitle type="display3" title={data?.SlideName} />
                <p className='paragraph'>{data?.slideTextExtract ? data?.slideTextExtract : `This is a slide about ${data?.SlideName}. It falls into ${data?.slideSubCategory} of ${data?.slideCategory}. If you want to contribute you can upload your own slide from www.medicospdf.com/uploadSlidePageMain`}</p>
                {data?.slideTextExtract?.length > 996 &&
                    <button onClick={()=>showModal()} className='slideDetail-longModalButton'>Read More</button>
                }  
                <div className="slide-description-container-bottom-container">
                    <div className="row1">
                        <div className="userInfo">
                            <img className="profilePic" src={data?.userAvatar ? data?.userAvatar : require("../../../../assets/images/slide/medicos.png").default} />
                            <div className="name">
                                <Headings type="heading5" content={data?.userEmail ? data?.userEmail.replace(/@gmail.com/g,'') : "Medicos Int'l"} />
                                {/* <p>October 01, 2019 </p> */}
                            </div>
                        </div>
                        <div className="button-container">
                            <div className="share" onClick={() => setCheckShare(!checkShare)}>
                                <Headings type="heading6" content="Share" />
                            </div>
                            <SocialAccountShare
                                title={shareTitle}
                                shareUrl={shareUrl}
                                checkShare={checkShare} />
                        </div>
                    </div>

                    <CommentComponent title={data?.SlideName} />



                    <LeaveAReply data={data} user={user} />
                </div>
            </div>
        </div>
    )
}

export default SlideDescription
