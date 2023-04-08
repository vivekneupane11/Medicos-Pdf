import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';

//local imports

import ShareModal from '../../../../components/global/shareModal';
import { DisplayTitle } from '../../../../components/global/Titles';
import Loading from '../../../../components/loading';
// import Slide from '../../../Slide';
import SlideCard from '../../../SlideDetail/components/slideCard';
import "./index.scss";

import Loadable from 'react-loadable';
// import { collection, getDocs, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import { async } from '@firebase/util';
SwiperCore.use([Autoplay]);




const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div>Loading...</div>
    }
  });

const CategorizedSlides = ({ data,  user }) => {
  const { username} = useContext(AuthContext);

  const [recommendedData, setRecommendedData] = useState([]);
  const [ userUploaded,setUserUploaded] = useState([])
  const [showFormModel, setShowFormModel] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [callbackData, setCallBackData] = useState(null);

  // const db =getFirestore();
  const getFirebaseAll = () => {
    return Promise.all([
      import('../../../../firebase/firestore'),
    ]).then(([ firestore]) => {
      return { firestore };
    });
  };
  async function fetchRelevantData(text, array) {
    let finalData = [];
    //removing special characters because it gives issues while comparing string
    let words = text.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]\s|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]|[0-9][0-9][a-z][a-z]|[0-9]/g, '').trim().split(' ')
    // console.log('FETCHING RELEVANT DATA', words)
    //SEARCHING RELEVANT DATA WITHIN SUB CATEGORY
    //maps every word from the slide name 
    words.map((word) => {
      // console.log('WORD', word)
      //maps the main slide's category related data to fetch data that includes slide title's splitted words
      array.map((arrayData) => {
        if (finalData?.length > 0 && arrayData?.SlideName.toLowerCase().includes(word.toLowerCase())) {
          //filter the repeated data while mapping
          let filteredData = finalData?.filter((res) => res?.SlideName === arrayData?.SlideName)
          if (filteredData?.length === 0) {
            finalData.push(arrayData)
          }
        } else if (arrayData?.SlideName.toLowerCase().includes(word.toLowerCase())) {
          finalData.push(arrayData)
        }
      })
    })
    //SEARCHING RELEVANT DATA WITHIN CATEGORY
    const { firestore: { db, onSnapshot,orderBy,query,collection,where,getDocs,limit } } = await getFirebaseAll()
    if (finalData?.length <= 1) {
      //  firebase.firestore()
      //   .collection(`AllSlidesDataLockDownVersions`)
      //   .where('slideCategory', '==', data?.slideCategory)
      //   .get()

       const colRef = query(collection(db,`AllSlidesDataLockDownVersions`),
      where('slideCategory', '==', data?.slideCategory))
      getDocs(colRef)

        .then((querySnapshot) => {
          let categoryData = [];
          querySnapshot.forEach((doc) => {
            categoryData.push(doc.data())
          })
          console.log('category data', categoryData?.length);
          words.map((word) => {
            // console.log('MAPPING CATEGORY', word)
            //maps the main slide's category related data to fetch data that includes slide title's splitted words
            categoryData.map((categoryDataSlide) => {
              if (finalData?.length > 0 && categoryDataSlide?.SlideName.toLowerCase().includes(word.toLowerCase())) {
                //filter the repeated data while mapping
                let filteredData = finalData?.filter((res) => res?.SlideName === categoryDataSlide?.SlideName)
                if (filteredData?.length === 0 && finalData?.length < 20) {
                  finalData.push(categoryDataSlide)
                }
              } else if (categoryDataSlide?.SlideName.toLowerCase().includes(word.toLowerCase())) {
                finalData.push(categoryDataSlide)
              }
            })
          })
          //IF NO ANY RELEVANT DATA FOUND IN BETWEEN CATEGORY AND SUB CATEGORY
          if (finalData?.length <= 1) {
            let limitData = [
              categoryData[Math.floor(Math.random() * categoryData?.length)],
              categoryData[Math.floor(Math.random() * categoryData?.length)],
              categoryData[Math.floor(Math.random() * categoryData?.length)],
              categoryData[Math.floor(Math.random() * categoryData?.length)],
              categoryData[Math.floor(Math.random() * categoryData?.length)],
              categoryData[Math.floor(Math.random() * categoryData?.length)]
            ]
            return limitData
          } else {
            return finalData;
          }
          // console.log('Relevant data', finalData)
        })
    } else {
      // console.log('Relevant data', finalData)
      return finalData;
    }
  }
  useEffect(async() => {
    let isMounted = true;
    try {
      const { firestore: { db, onSnapshot,collection } } = await getFirebaseAll()

if(username){
  const colRef = collection(db,'UserUploadedSlides',username,'slides')
  // firebase.firestore().collection('UserUploadedSlides')
  //   .doc(username)
  //   .collection('slides')
    onSnapshot(colRef,(querySnapshot) => {
      if (querySnapshot && isMounted) {
        let userUploadedData = []
        querySnapshot.forEach((doc) => {
          userUploadedData.push(doc.data())
        })

        setUserUploaded(userUploadedData)
      }
    })
}
    } catch (error) {
      console.log('Error fetching user uploaded slide', error);
    }
    return () => {
      isMounted = false
    }
  }, [username])

  useEffect(async() => {
    let isMounted = true;
    if (isMounted) {
      try {
        const { firestore: { db, onSnapshot,collection } } = await getFirebaseAll()

        if (data?.SlideName) {
          const colRef = collection(db,`K-Slides-${(data?.slideCategory).replace(/\s|\/g, ""/g, "")}-${(data?.slideSubCategory).replace(/\s|\//g, "")}`)
          // firebase.firestore()
          //   .collection(`K-Slides-${(data?.slideCategory).replace(/\s|\/g, ""/g, "")}-${(data?.slideSubCategory).replace(/\s|\//g, "")}`)
            onSnapshot(colRef ,async (querySnapshot) => {
              let subCategoryData = [];
              querySnapshot.forEach((doc) => {
                subCategoryData.push(doc.data())
              })
              await fetchRelevantData(data?.SlideName?.trim(), subCategoryData).then((res) => {
                console.log('RECOMMENDED DATA', res?.length, subCategoryData?.length)
                if (res?.length > 1) {
                  setRecommendedData(res.filter((resData) => resData?.SlideName !== data?.SlideName))
                } else {
                  setRecommendedData(subCategoryData.filter((resData) => resData?.SlideName !== data?.SlideName))
                }
              })
            })
        }
      } catch (error) {
        console.log("Error while fetching single slide", error);
      }
    }
    return () => {

    }
  }, [data?.SlideName,data?.slideCategory,data?.slideSubCategory])



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
    if (user?.uid) {
      setShowFormModel(false)

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

  return (
    <div className="categorized-slide">
      <div className="categorized-slide-container">
        <LoadableLoginModal show={showFormModel} formModel={FormModel} />
        {
          callbackData &&
          <ShareModal
            url={encodeURI(`https://medicospdf.com/slidedetails/${callbackData?.SlideName}/${callbackData?.slideCategory}/${filterSlideSubCategory(callbackData?.slideSubCategory)}`)}
            appId={process.env.REACT_APP_ID}
            title={callbackData?.SlideName}
            image={callbackData?.slideImages[0]}
            show={showShare}
            cancel={cancelShare}
          />
        }
        <div className="categorized-slide-container-top">

          <div className="categorized-slide-container-top-head">
         {
           data?.slideCategory ?<DisplayTitle type="display4" title={`More Slides From ${data?.slideCategory}`} /> : <DisplayTitle type="display4" title={`More Slides`}/>
         }   
          </div>
          {/*
            TODO SEE ALL SLIDE NAVIGATION
           <Link
            className="slide-links"
            style={{ textDecoration: 'none' }}
            to={{

              pathname: '/uploadedslides',
              state: {
                uploadData: JSON.stringify(userUploaded),

              }
            }}>
            <div className="button">
              <h6 >{`See All`}</h6>
            </div>
          </Link> */}

        </div>
        {
          recommendedData?.length > 0 ?
            <Swiper
              loop={true}
              speed={800}
              spaceBetween={60}
              slidesPerView={4}
              slidesPerGroup={4}

              // autoplay={{
              //   "delay": 6000,
              //   "disableOnInteraction": false
              // }}

              breakpoints={{
                "200": {
                  "slidesPerView": 1,
                  "slidesPerGroup": 1,
                },
                "500": {
                  "slidesPerView": 2,
                  "slidesPerGroup": 2,
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
                nextEl: '.swiper-button-nextCs',
                prevEl: '.swiper-button-prevCs',
              }}
              className="categorized-slide-container-swiper"
            >
              {
                recommendedData?.map((slide, index) => {
                  return <SwiperSlide key={index} className="categorized-slide-container-swiper-slide">
                    <SlideCard
                      title={slide?.slideCategory}
                      title2={slide?.slideSubCategory}
                      description={slide?.SlideName}
                      images={slide?.slideImages}
                      datas={slide}
                      showModal={showModal}
                      showShareModal={showShareModal}
                    />
                  </SwiperSlide>
                }
                )
              }
              <div className="swiper-button-prevCs"><ArrowLeft className='slide-category-arrow' /></div>
              <div className="swiper-button-nextCs"><ArrowRight className="slide-category-arrow" /></div>
            </Swiper>
            :
            <div className='loading-container'>
              <Loading />
            </div>
        }
      </div>
    </div>
  )
}

export default React.memo(CategorizedSlides)
