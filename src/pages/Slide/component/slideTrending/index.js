// import firebase from "firebase/compat";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import {getFirestore,where,collection,limit,orderBy,query,onSnapshot,getDocs} from 'firebase/firestore'
import React, { useContext, useEffect, useState,Suspense } from 'react';
import shortid from "shortid";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';



//Local imports
// import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import { fetchSlidesAndBooksOrderedByNameWithLimit } from "../../../../functions/firebaseMethod";
import randomSlideSubCategory from '../../../../functions/randomSlideSubCategory';

import './_slideTrending.scss';

import Loadable from 'react-loadable';
import { SlideCardPlaceholder } from "../slideCardPlaceholder";
import LazyLoadingComponentLoader from '../../../../components/lazyLoadingLoaderComponent';
import Loading from '../../../../components/loading';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import { async } from '@firebase/util';
// import { array } from "yup/lib/locale";


SwiperCore.use([Autoplay]);

const SlideCard = React.lazy(() => LazyLoadingComponentLoader(() => import("../../../SlideDetail/components/slideCard")));


const loadingArray=Array.apply(null,Array(5))


const LoadableLoginModal = Loadable({
  loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
  loading() {
    return <div>Loading...</div>
  }
});
const LoadableShareModal = Loadable({
  loader: () => import('../../../../components/global/shareModal'),
  loading() {
    return <div>Loading...</div>
  }
});

const SlideTrending = ({ showTitle = true }) => {
  const { user ,username} = useContext(AuthContext);
  const [preference] = useLocalStorage('preference', null);
  // const firestoreDatabase = firebase.firestore();
  const [recommendedSlides, setRecommendedSlides] = useState();
  const [showFormModel, setShowFormModel] = useState(false)
  // const [details, setDetails] = useState([])

  const [showShare, setShowShare] = useState(false)
  const [callbackData, setCallBackData] = useState(null)
  // const db = getFirestore();
  const getFirebaseAll=()=>{
    return Promise.all([
      import('../../../../firebase/firestore')
    ])
    .then(([firestore])=>{
      return{firestore}
    })
  }



  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
     async function fetchRecommendedData() {
        try {
          const {firestore:{db,query,collection,where,orderBy,onSnapshot,getDocs,limit}}=await getFirebaseAll()
          if (username) {
            // firebase.firestore().collection('Web-User-Data')
            //   .doc(username)
            //   .collection('User-Visited')
            //   .where('type', '==', 'slide')
            //   .orderBy('createdAt', 'desc')
            //   .limit(4)
              const colRef =query(collection(db,'Web-User-Data',username,'User-Visited'),
              where('type', '==', 'slide'),
              orderBy('createdAt', 'desc'),
              limit(4))
              onSnapshot(colRef,(querySnapshot) => {
                if (querySnapshot.size >= 1) {
                  console.log('RECENT SLIDE DATA', randomSlideSubCategory(querySnapshot?.docs[0]?.data()?.category))
                  // firebase.firestore()
                  //   .collection(`K-Slides-${querySnapshot?.docs[0]?.data()?.category?.replace(/\s|\//g, "")}-${randomSlideSubCategory(querySnapshot?.docs[0]?.data()?.category)}`)
                  //   .get()
                    const colRef=collection(db,`K-Slides-${querySnapshot?.docs[0]?.data()?.category?.replace(/\s|\//g, "")}-${randomSlideSubCategory(querySnapshot?.docs[0]?.data()?.category)}`)
                    getDocs(colRef)
                    .then(res => {
                      if (!res?.empty) {
                        let recommendedSlidesData = []
                        res.forEach((doc) => {
                          recommendedSlidesData.push(doc.data())
                        })
                        setRecommendedSlides(recommendedSlidesData)
                      }
                    })
                } else {
                  let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName
                  preferenceCategory = preferenceCategory ? preferenceCategory : 'Basic Science'
                  console.log('SLIDE PREFERENCE CATEGORY', preferenceCategory);
                  fetchSlidesAndBooksOrderedByNameWithLimit(`K-Slides-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSlideSubCategory(preferenceCategory)}`, 'SlideName', 10)
                    .then((res) => {
                      if (res?.allData?.length) {
                        console.log('USER PREFERENCES', preferenceCategory?.replace(/\s|\//g, ""), randomSlideSubCategory(preferenceCategory))
                        console.log('PREFERENCES DATA', res.allData);
                        setRecommendedSlides(res.allData)
                      }
                    })
                }
              })
          } else {
            console.log('USER PREFERENCES', preference)
            let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName
            console.log('SLIDE PREFERENCE CATEGORY', preferenceCategory);
            preferenceCategory = preferenceCategory ? preferenceCategory : 'Basic Science'
            fetchSlidesAndBooksOrderedByNameWithLimit(`K-Slides-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSlideSubCategory(preferenceCategory)}`, 'SlideName', 10)
              .then((res) => {
                if (res?.allData?.length) {
                  // console.log('PREFERENCES DATA', res.allData);
                  setRecommendedSlides(res.allData)
                }
              })
          }

        } catch (error) {
          console.log('Error fetching recommended data', error);
        }
      }

      fetchRecommendedData()
    }
    return () => {
      isMounted = false
    }

  }, [preference?.length, preference, username])


  const FormModel = (dontShow) => {

    if (dontShow === false) {
      setShowFormModel(false)
    }
  }

  const showModal = (show) => {

    if (show === true) {
      setShowFormModel(true)

    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted && user?.uid) {
      setShowFormModel(false)

    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])

  const showShareModal = (show, data) => {

    if (show === true && data) {
      setShowShare(true)
      setCallBackData(data)
    }
  }

  const cancelShare = (show) => {
    if (show === false) {
      setShowShare(false)

    }
  }


  return (
    <>
      <LoadableLoginModal show={showFormModel} formModel={FormModel} />
      <LoadableShareModal
        url={encodeURI(`https://medicospdf.com/slidedetails/${callbackData?.SlideName}/${callbackData?.slideCategory}/${callbackData?.slideSubCategory.replace(/\s|\//g, "")}`)}
        appId={process.env.REACT_APP_ID}
        title={callbackData?.SlideName}
        image={callbackData?.slideImages[0]}
        show={showShare}
        cancel={cancelShare}
      />

      <div className="slideTrending-container">
        {showTitle && <h3 className="slideTrending-container-head">{`Slides For You`}</h3>}
        {
          <Swiper
            loop={true}
            speed={800}
            spaceBetween={10}
            slidesPerView={4}
            slidesPerGroup={3}
            loop={true}      
     
            navigation={true}
       

            breakpoints={{
              "200": {
                "slidesPerView": 1,
                "slidesPerGroup": 1,
              },
              "500": {
                "slidesPerView": 1,
                "slidesPerGroup": 1,
              },
              "725": {
                "slidesPerView": 2,
                "slidesPerGroup": 2,
              },
              "768": {
                "slidesPerView": 2,
                "slidesPerGroup": 2,
              },
              "1024": {
                "slidesPerView": 3,
                "slidesPerGroup": 3,
              },
              "1250": {
                "slidesPerView": 4,
                "slidesPerGroup": 4,
              }
            }}
            navigation={{
              nextEl: '.swiper-button-nexttt',
              prevEl: '.swiper-button-prevvv',
            }}
            className="slideTrending-container-swiperContainer"
          >
            {
              recommendedSlides?.length ?
              <>
                {
                  recommendedSlides?.map((data, index) => {
                    return <SwiperSlide key={shortid.generate()} className="slideTrending-container-swiperContainer-slide">
                      {
                        data?.slideCategory ?
                        <Suspense fallback={<div className='suspenseLoading'><SlideCardPlaceholder /></div>}>

                          <SlideCard
                            title={data?.slideCategory}
                            title2={data?.slideSubCategory}
                            description={data?.SlideName}
                            images={data?.slideImages}
                            wholeDatas={recommendedSlides}
                            datas={data}
                            showModal={showModal}
                            showShareModal={showShareModal}

                          />
                          </Suspense>
                           :
                          <SlideCardPlaceholder />
                      }
                    </SwiperSlide>

                  }
                  )}
              </>
              :
              <>
              {
                loadingArray?.map((data, index) => {
                  return <SwiperSlide key={shortid.generate()} className="slideTrending-container-swiperContainer-slide">
                        <SlideCardPlaceholder />
                  </SwiperSlide>

                }
                )}
            </>
            }

            <div className="swiper-button-prevvv"><ArrowLeft className="arrow-pointed" /></div>
            <div className="swiper-button-nexttt"><ArrowRight className="arrow-pointed" /></div>
          </Swiper>

        }



      </div>
    </>
  )
}

export default React.memo(SlideTrending)



