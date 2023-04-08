import React, { useState, useContext, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import firebase from "firebase";
import "./index.scss";



import { slideTrending } from '../../components/constants/mock';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import LeaveAReply from '../../pages/NewsDetail/components/leaveAReply/index';
import CategorizedSlides from './components/categorizedSlides';
import SlideDescription from './components/slideDescription';
import ImgSlider from './components/slider';
import "./index.scss";
import Loading from '../../components/loading';
const SlideDetailOnShare = () => {
    const { user } = useContext(AuthContext);
    const { slideDocId } = useParams();
    const [data, setData] = useState()
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (slideDocId) {
                try {
                    firebase.firestore().collection('AllSlidesDataLockDownVersions')
                        .doc(slideDocId)
                        .get()
                        .then((doc) => {
                            setData(doc.data())
                         
                        })
                } catch (error) {
                    console.log("Error while fetching slide detail");
                }
            }
        }
        return () => {
            isMounted = false
        }
    }, [slideDocId])
  

    return (
        <div className="slide-detail-page-wrapper">
            {
                data ?
                    <div>
                        <ImgSlider images={data} />
                        <SlideDescription data={data} user={user} />
                    </div>
                    :
                    <div className="slide-detail-loading-wrapper">
                        <Loading />
                    </div>
            }
        </div>
    )
}

export default SlideDetailOnShare
