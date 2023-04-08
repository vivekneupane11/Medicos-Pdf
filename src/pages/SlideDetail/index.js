import firebase from "firebase";
import React, { useContext, useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";

//LOCAL IMPORTS
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import SocialShareForMobile from '../../components/SocialShareForMobile';
import CategorizedSlides from './components/categorizedSlides';
import SlideDescription from './components/slideDescription';
import ImgSlider from './components/slider';
import "./index.scss";


const SlideDetail = () => {
    const { slideDocId, slideCategory, slideSubCategory } = useParams();
    let ShareUrl;
    const { user } = useContext(AuthContext);
    const [slide, setSlide] = useState()
    const [wholeSlides, setWholeSlides] = useState([])

    const activeData = (data) => {
        setSlide(data)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
          
            // console.log("This is parameter",`+++K-Slides-${(slideCategory).replace(/\s|\/g, ""/g, "")}-${(slideSubCategory).replace(/\s|\//g, "")}-${slideDocId}`);
            try {
                firebase.firestore().collection(`K-Slides-${(slideCategory).replace(/\s|\/g, ""/g, "")}-${(slideSubCategory).replace(/\s|\//g, "")}`)
                    .doc(slideDocId)
                    .onSnapshot((res) => {
                   
                        if (res) {
                            setSlide(res.data())
                            ShareUrl= encodeURI(`https://medicospdf.com/slideDetails/${slide?.SlideName}/${slide?.slideCategory}/${slide?.slideSubCategory.replace(/\s|\//g, "")}`)
                        }
                    })
            } catch (error) {
                console.log("Error while fetching single slide", error);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [slideDocId, slideSubCategory, slideCategory])

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firebase.firestore().collection(`K-Slides-${(slideCategory).replace(/\s|\/g, ""/g, "")}-${(slideSubCategory).replace(/\s|\//g, "")}`)
                    .get()
                    .then((querySnapShot) => {
                        if (querySnapShot) {
                            let wholeSlidesData = [];
                            querySnapShot.forEach((doc) => {
                                wholeSlidesData.push(doc.data())
                            })
                            setWholeSlides(wholeSlidesData);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching categorized slides", error);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [slideDocId, slideSubCategory, slideCategory])

    return (
        <div className="slide-detail-page-wrapper">
            {
                slide && wholeSlides?.length > 0 ?
                    <div>
                        <SocialShareForMobile shareUrl={ShareUrl}/>
                        <ImgSlider images={slide} user={user} />
                        <SlideDescription data={slide} user={user} />
                        <CategorizedSlides user={user} details={wholeSlides} activeData={activeData} />
                    </div>
                    :
                    <div className="slide-detail-page-loading-wrapper">
                        <Loading />
                    </div>
            }
        </div>
    )
}

export default SlideDetail
