//import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState, Suspense } from 'react';
import LazyLoad from 'react-lazyload';
import {  useParams } from "react-router-dom";
import useViewsCount from "../../components/customHooks/viewsCount";
import SEO from '../../components/global/SEO';
import LazyLoadingComponentLoader from "../../components/lazyLoadingLoaderComponent";
//LOCAL IMPORTS
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { logEventWithParams } from "../../functions/commonMethod";
import filterSlideSubCategory from '../../functions/filterSlideSubCategory';
import { addUserVisited } from "../../functions/firebaseMethod";
import Loadable from 'react-loadable';


import "./index.scss";
import { SliderPlaceholder } from "./components/sliderPlaceholder";
import LoadingSearchAnimation from "../../components/LoadingSearch";
const SocialShareForMobile = Loadable({
    loader: () => import('../../components/SocialShareForMobile'),
    loading() {
        return <div className="loading">Loading...</div>
    }
});
const ImgSlider = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/slider")));
const CategorizedSlides = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/categorizedSlides")));
const SlideDescription = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/slideDescription")));



const SlideDetail = () => {
    const { slideDocId, slideCategory, slideSubCategory } = useParams();
    let ShareUrl;
    const { user } = useContext(AuthContext);
    const [slide, setSlide] = useState([])

    const viewCount = useViewsCount(slideDocId)
    const db = getFirestore();

    const activeData = (data) => {
        setSlide(data)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // USER FOR ANALYTICS
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            logEventWithParams("web_slide_details_page_visited", { title: slideDocId })
        }
        return (() => {
            isMounted = false;
        })
    }, [])

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            console.log('Working')

     
                try {
                    // firebase.firestore().collection(`K-Slides-${(slideCategory).replace(/\s|\/g, ""/g, "")}-${(slideSubCategory).replace(/\s|\//g, "")}`)
                    //     .doc(slideDocId)
                    const docRef = doc(db, `K-Slides-${(slideCategory).replace(/\s|\/g, ""/g, "")}-${(slideSubCategory).replace(/\s|\//g, "")}`, slideDocId)
                    onSnapshot(docRef, (res) => {
                        if (res) {
                            if (user?.uid && res?.data()) {
                                addUserVisited(user?.uid, 'slide', res?.data()?.SlideName, res?.data()?.slideCategory, res?.data()?.slideSubCategory)
                            }
                            // console.log('CURRENT SLIDE ', res.data());
                            setSlide(res?.data())
                            ShareUrl = encodeURI(`https://medicospdf.com/slidedetails/${slide?.SlideName}/${slide?.slideCategory}/${filterSlideSubCategory(slide?.slideSubCategory)}`)
                        }
                    })
                    console.log('slideDetails check')
                } catch (error) {
                    console.log("Error while fetching single slide", error);
                }
            
        }
        return () => {
            isMounted = false;
        }
    }, [slideDocId, slideSubCategory, slideCategory])






    const slideStructuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": slide?.SlideName,
        "description": slide?.slideTextExtract,
        "provider": {
            "@type": "Organization",
            "name": slide?.username ? slide?.username : 'Medicos International',
            "sameAs": "https://medicospdf.com"
        }
    }


    return (
        <div className="slide-detail-page-wrapper">
            <SEO title={slide?.SlideName? slide?.SlideName : 'MedicosPDF slide details'} description={ slide?.SlideName + slide?.slideSubCategory + slide?.slideCategory + slide?.slideTextExtract}/>
            {/* <script type="application/ld+json">
                {JSON.stringify(slideStructuredData)} 
            </script>  
              <SEO image={slide?.slideImages[0]} title='MedicosPDF Slide page' description={user + slide?.SlideName + slide?.slideTags?.toString() + slide?.slideTextExtract + slide?.userEmail + slide?.slideSubCategory + slide?.slideCategory} />  */}
            {

                <div>
                     {user ?
                        <SocialShareForMobile shareUrl={ShareUrl} />
                        : 
                        ''
                    } 
                  { 
                   slide?.SlideName ? <>
                                <Suspense fallback={<div className="suspenseLoading"><LoadingSearchAnimation /></div>}>

                    <ImgSlider images={slide} user={user} viewCount={viewCount} /> 
                    </Suspense>
                      <LazyLoad height={200} offset={50}>
                      <Suspense fallback={<div className="suspenseLoading"><LoadingSearchAnimation /></div>}>

                            <SlideDescription data={slide} user={user} viewCount={viewCount} />
                            </Suspense>

                    </LazyLoad></>:
                    <SliderPlaceholder/> }
                   
                    {
                        slide?.SlideName &&
                        <LazyLoad height={200} offset={100}>
                                          <Suspense fallback={<div className="suspenseLoading"><Loading /></div>}>

                                <CategorizedSlides user={user} data={slide} activeData={activeData} />
                                </Suspense>

                        </LazyLoad>
                    } 

                    {
                        slide?.slideTextExtract &&

                        <div className='slideDetail-currentSlide-description'>
                            <h3 className='slideDetail-currentSlide-description-head'> {slide?.SlideName?.split("-", 1)[0]}</h3>
                            <p className='slideDetail-currentSlide-description-para'> {slide?.slideTextExtract}</p>
                        </div>

                    }

                </div>

            }
        </div>
    )
}
export default React.memo(SlideDetail)
