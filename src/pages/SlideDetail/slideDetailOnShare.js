import React, { useState, useContext, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import "./index.scss";



import { slideTrending } from '../../components/constants/mock';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import LeaveAReply from '../../pages/NewsDetail/components/leaveAReply/index';
import CategorizedSlides from './components/categorizedSlides';
import SlideDescription from './components/slideDescription';
import ImgSlider from './components/slider';
import "./index.scss";
import Loading from '../../components/loading';
// import { getDoc } from 'firebase/firestore';
const SlideDetailOnShare = () => {
    const { user } = useContext(AuthContext);
    const { slideDocId } = useParams();
    const [data, setData] = useState()
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };
    useEffect(async() => {
        let isMounted = true;
        if (isMounted) {
            if (slideDocId) {
                try {
                const { firestore: { db, getDoc,doc } } = await getFirebaseAll()

                    getDoc(doc(db,'AllSlidesDataLockDownVersions',slideDocId))
                    // firebase.firestore().collection('AllSlidesDataLockDownVersions')
                    //     .doc(slideDocId)
                    //     .get()
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
