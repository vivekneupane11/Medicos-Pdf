import firebase from "firebase";
import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import shortid from "shortid";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import { slideCategories } from '../../../../constants/Book/BookCategories';
import SlideCard from '../../../SlideDetail/components/slideCard';
import './_slideTrending.scss';

SwiperCore.use([Autoplay]);


const SlideTrending = ({ details,showTitle=true }) => {
  const { user } = useContext(AuthContext);
  const firestoreDatabase = firebase.firestore();
  const [userPreferenceFaculty, setUserPreferenceFaculty] = useState(null);
  const [recommendedSlides, setRecommendedSlides] = useState([]);

  const randomSubcategory = category => {
    let filtered = slideCategories.filter(
      slideCategory => slideCategory.category == category,
    );
    let subCategories = filtered[0].subCategories;
    let randomInteger = Math.floor(Math.random() * (subCategories?.length - 1));
 
    return subCategories[Math.floor(Math.random() * (subCategories?.length - 1))]
      .category;
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        let recommendedData = [];
        firestoreDatabase.collection('Web-User-Data')
          .doc(user?.uid)
          .collection('User-Preference')
          .doc(user?.uid)
          .get().then((res) => {
            // console.log("No Preference data found",res)
            if (res.data()) {
              let faculty = res.data()?.preference.fullName;
              let subjects = res.data()?.preference.subjects;
            
              setUserPreferenceFaculty(faculty)
              subjects?.map((category, index) => {
          
                firestoreDatabase.collection(`K-Slides-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`)
                  .get()
                  .then((documentSnapshot) => {
                    if (documentSnapshot) {
                      documentSnapshot.forEach((doc) => {
                        recommendedData.push(doc.data())
                        // console.log("Fetched data",doc.data())
                      })
                      if (index == subjects?.length - 1) {
                        setRecommendedSlides(recommendedData)
                      }
                    }
                  })

              })
            }
          })

      } catch (err) {
        console.log("Error while fetching preference data", err)
      }
    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])


  return (
    <>

      <div className="slideTrending-container">
        {showTitle && <h3 className="slideTrending-container-head">{!userPreferenceFaculty ? "Trending" : `For ${userPreferenceFaculty}`}</h3>}
        {
          userPreferenceFaculty ?
            <div>
              {recommendedSlides.length > 0 ?
                <Swiper
                  loop={true}
                  speed={800}
                  spaceBetween={5}
                  slidesPerView={4}
                  // autoplay={{
                  //   "delay": 6000,
                  //   "disableOnInteraction": false
                  // }}

                  breakpoints={{
                    "200": {
                      "slidesPerView": 1,
                    },
                    "500": {
                      "slidesPerView": 1,
                    },
                    "725": {
                      "slidesPerView": 2,
                    },
                    "768": {
                      "slidesPerView": 2,
                    },
                    "1024": {
                      "slidesPerView": 3,
                    },
                    "1250": {
                      "slidesPerView": 4,
                    }
                  }}
                  navigation={{
                    nextEl: '.swiper-button-nexttt',
                    prevEl: '.swiper-button-prevvv',
                  }}
                  className="slideTrending-container-swiperContainer"
                >
                  {recommendedSlides.map((data, index) => (

                    <SwiperSlide key={shortid.generate()} className="slideTrending-container-swiperContainer-slide">
                      <SlideCard
                        title={data.SlideName}
                        description={data.SlideName}
                        images={data.slideImages}
                        wholeDatas={recommendedSlides}
                        datas={data}
                      />
                    </SwiperSlide>

                  ))}

                  <div className="swiper-button-prevvv"><FaChevronLeft className="arrow-pointed" /></div>
                  <div className="swiper-button-nexttt"><FaChevronRight className="arrow-pointed" /></div>



                </Swiper>
                :
                <div className="slide-trending-loading-wrapper">
                  <Loading />
                </div>
              }
            </div>

            :
            <div>
              {details.length > 0 ?
                <Swiper
                  loop={true}
                  speed={800}
                  spaceBetween={10}
                  slidesPerView={4}
                  // autoplay={{
                  //   "delay": 6000,
                  //   "disableOnInteraction": false
                  // }}

                  breakpoints={{
                    "200": {
                      "slidesPerView": 1,
                    },
                    "500": {
                      "slidesPerView": 1,
                    },
                    "725": {
                      "slidesPerView": 2,
                    },
                    "768": {
                      "slidesPerView": 2,
                    },
                    "1024": {
                      "slidesPerView": 3,
                    },
                    "1250": {
                      "slidesPerView": 4,
                    }
                  }}
                  navigation={{
                    nextEl: '.swiper-button-nexttt',
                    prevEl: '.swiper-button-prevvv',
                  }}
                  className="slideTrending-container-swiperContainer"
                >
                  {details.filter((data, index) => index < 4).map((data, index) => (

                    <SwiperSlide key={shortid.generate()} className="slideTrending-container-swiperContainer-slide">
                      <SlideCard
                        title={data.slideCategory}
                        description={data.SlideName}
                        images={data.slideImages}
                        wholeDatas={details}
                        datas={data}
                      />
                    </SwiperSlide>

                  ))}
                  <div className="swiper-button-prevvv"><FaChevronLeft className="arrow-pointed" /></div>
                  <div className="swiper-button-nexttt"><FaChevronRight className="arrow-pointed" /></div>

                </Swiper>
                :
                <div className="slide-trending-loading-wrapper">
                  <Loading />
                </div>
              }
            </div>

        }
      </div>
    </>
  )
}

export default React.memo( SlideTrending)
