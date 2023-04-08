// import firebase from 'firebase/compat';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

import ShareModal from '../../../../components/global/shareModal';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import useLocalStorage from '../../../../customHooks/useLocalStorage';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import { fetchSlidesAndBooksOrderedByNameWithLimit } from '../../../../functions/firebaseMethod';
import randomSlideSubCategory from '../../../../functions/randomSlideSubCategory';
import RecentSlideCard from '../recentSlideCard';
import './_slideRecentSlide.scss';



import Loadable from 'react-loadable';
import SlideRecentPlaceholder from '../recentPlaceholder';
import shortid from 'shortid';
// import { collection,  getDocs, getFirestore, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';


const LoadableLoginModal = Loadable({
  loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
  loading() {
    return <div>Loading...</div>
  }
});
SwiperCore.use([Autoplay]);
const SlideRecentSlides = () => {
  const { user,username } = useContext(AuthContext)
  // const [checkShare, setCheckShare] = useState(false);
  const [showFormModel, setShowFormModel] = useState(false)
  // const [count, setCount] = useState(null);
  const [recentSlides, setRecentSlides] = useState([]);
  const [preference] = useLocalStorage('preference', null);
  const [showShare, setShowShare] = useState(false)
  const [callbackData, setCallBackData] = useState(null)
  const loadingArray = Array.apply(null, Array(10));

  // const db=getFirestore();
  const getFirebaseAll = () => {
    return Promise.all([
      import('../../../../firebase/firestore')
    ]).then(([ firestore]) => {
      return { firestore };
    });
  };


  // const removeUnderscore = (str) => {
  //   var i, frags = str.split('_');
  //   for (i = 0; i < frags.length; i++) {
  //     frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  //   }
  //   return frags.join(' ');
  // }





  useEffect(() => {
    let isMounted = true

    if (isMounted) {
     async function fetchRecommendedData() {
        try {
          const {firestore:{db,query,collection,where,orderBy,limit,onSnapshot,getDocs}}=await getFirebaseAll()
          if (username) {
            // firebase.firestore().collection('Web-User-Data')
            //   .doc(username)
            //   .collection('User-Visited')
            //   .where('type', '==', 'slide')
            //   .orderBy('createdAt', 'desc')
            //   .limit(1)
              const colRef=query(collection(db,'Web-User-Data',username,'User-Visited' ),
              where('type', '==', 'slide'),
              orderBy('createdAt', 'desc'),
              limit(1))
              onSnapshot(colRef,(querySnapshot) => {
                if (querySnapshot.size >= 1) {
                  console.log('RECENT SLIDE DATA', querySnapshot?.docs[0]?.data())
                  const colref=collection(db,`K-Slides-${querySnapshot?.docs[0]?.data()?.category?.replace(/\s|\//g, "")}-${filterSlideSubCategory(querySnapshot?.docs[0]?.data()?.subCategory)}`)
                  getDocs(colref)
                  // firebase.firestore()
                  //   .collection(`K-Slides-${querySnapshot?.docs[0]?.data()?.category?.replace(/\s|\//g, "")}-${filterSlideSubCategory(querySnapshot?.docs[0]?.data()?.subCategory)}`)
                  //   .get()
                    .then(res => {
                      if (!res?.empty) {
                        console.log('RECENT SLIDE DATA', querySnapshot?.docs[0]?.data()?.category?.replace(/\s|\//g, ""), filterSlideSubCategory(querySnapshot?.docs[0]?.data()?.subCategory))
                        let recentSlidesData = []
                        res.forEach((doc) => {
                          recentSlidesData.push(doc.data())
                        })
                        setRecentSlides(recentSlidesData)
                      }
                    })
                } else {
                  console.log('USER PREFERENCES', preference)
                  let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName
                  preferenceCategory = preferenceCategory ? preferenceCategory : 'Basic Science'
                  fetchSlidesAndBooksOrderedByNameWithLimit(`K-Slides-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSlideSubCategory(preferenceCategory)}`, 'SlideName', 10)
                    .then((res) => {
                      if (res?.allData?.length) {
                        console.log('PREFERENCES DATA', res.allData);
                        setRecentSlides(res?.allData)
                      }
                    })
                }
              })
          } else {
            fetchSlidesAndBooksOrderedByNameWithLimit(`K-Slides-BasicScience-Anatomy`, 'SlideName', 10)
              .then((res) => {
                if (res?.allData?.length) {
                  console.log('PREFERENCES DATA', res.allData);
                  setRecentSlides(res?.allData)
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
  }, [ preference, username])

  const FormModel = useCallback(
    (dontShow) => {

      if (dontShow === false) {
        setShowFormModel(false)


      }
    },
    [],
  )
  const showModal = useCallback(
    (show) => {

      if (show === true) {
        setShowFormModel(true)

      }
    },
    [],
  )

  useEffect(() => {
    let isMounted = true
    if (isMounted && user?.uid) {
      setShowFormModel(false)

    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])

  const showShareModal = useCallback(
    (show, data) => {

      if (show === true && data) {
        setShowShare(true)
        setCallBackData(data)
      }
    },
    [],
  )
  const cancelShare = useCallback(
    (show) => {

      if (show === false) {
        setShowShare(false)

      }
    },
    [],
  )


  // const clickhandlersetshowform2 = () => setShowFormModel(true)
  return (
    <>
      <LoadableLoginModal show={showFormModel} formModel={FormModel} />

      <ShareModal
        url={encodeURI(`https://medicospdf.com/slidedetails/${callbackData?.SlideName}/${callbackData?.slideCategory}/${filterSlideSubCategory(callbackData?.slideSubCategory)}`)}
        appId={process.env.REACT_APP_ID}
        title={callbackData?.SlideName}
        image={callbackData?.slideImages[0]}
        show={showShare}
        cancel={cancelShare}
      />
      <div className="slideRecentSlide-container">

        <h3 className="slideRecentSlide-container-head">You may like</h3>
        <Swiper
          loop={true}
          speed={800}
          spaceBetween={20}
          slidesPerView={3}
          slidesPerGroup={3}
          // autoplay={{
          //     "delay": 3000,
          //     "disableOnInteraction": false
          //   }} 
     
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
            "768": {
              "slidesPerView": 2,
              "slidesPerGroup": 2,
            },
            "1026": {
              "slidesPerView": 3,
              "slidesPerGroup": 3,
            }
          }}
          navigation={{
            nextEl: '.swiper-button-nextR',
            prevEl: '.swiper-button-prevR',
          }}
          className="slideRecentSlide-container-swiperContainer"
        >
          {
            recentSlides?.length > 0 ?
              recentSlides.map((data, index) => (
                <SwiperSlide key={index} className="slideRecentSlide-container-swiperContainer-slide">
                  <RecentSlideCard
                    data={data}
                    showModal={showModal}
                    showShareModal={showShareModal}
                  />

                </SwiperSlide>

              ))
              :
              loadingArray.map(() => {
                return <SwiperSlide key={shortid.generate()} className="slideRecentSlide-container-swiperContainer-slide">
                  <SlideRecentPlaceholder />
                </SwiperSlide>

              })

          }
          <div className="swiper-button-prevR"><ArrowLeft className='slideRecentSlides-arrowIcon' /></div>
          <div className="swiper-button-nextR"><ArrowRight className='slideRecentSlides-arrowIcon' /></div>
        </Swiper>

      </div>
    </>
  )
}
export default React.memo(SlideRecentSlides)
