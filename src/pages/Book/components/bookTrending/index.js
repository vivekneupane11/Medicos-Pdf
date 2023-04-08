//  import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { collection, getDocs, getFirestore, limit, orderBy, query } from "firebase/firestore";
//import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import shortid from  "shortid";
//local imports
// import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import { bookCategories } from '../../../../constants/Book/BookCategories';
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import { fetchSlidesAndBooksOrderedByNameWithLimit } from "../../../../functions/firebaseMethod";
import BookStackCard from '../bookStackCard';
import { BookStackCardPlaceholderPlaceholder } from "../bookStackCardPlaceholder";
import './_bookTrending.scss';
import ArrowRight from "../../../../components/global/icons/arrow_right";
import ArrowLeft from "../../../../components/global/icons/arrow_left";


const loadingArray=Array.apply(null,Array(5))


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const BookTrending = ({ showTitle = true, profile = false, details = {} }) => {
  const { user } = useContext(AuthContext);
  const [preference, setPreference] = useLocalStorage('preference', null);
  // const db = getFirestore();
  const [userPreferenceFaculty, setUserPreferenceFaculty] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const getFirebaseAll=()=>{
    return Promise.all([
      import('../../../../firebase/firestore')
    ])
    .then(([firestore])=>{
      return {firestore}
    })
  }

  const randomSubcategory = useCallback(category => {

    let filtered = bookCategories.filter(
      bookCategory => bookCategory.category === category,
    );
    // console.log("filtered data", filtered);

    let subCategories = filtered[0]?.subCategories;
    // let randomInteger = Math.floor(Math.random() * (subCategories?.length - 1));

    // console.log(category, randomInteger, subCategories[randomInteger]);
    return subCategories[Math.floor(Math.random() * (subCategories?.length - 1))]
      .category;
  }, []
  )



  // useEffect(() => {
  //   let isMounted = true
  //   if (isMounted) {
  //     if (user?.uid) {
  //       try {

  //         let recommendedData = [];
  //         firestoreDatabase.collection('Web-User-Data')
  //           .doc(user?.uid)
  //           .collection('User-Preference')
  //           .doc(user?.uid)
  //           .get().then((res) => {
  //             // console.log("No Preference data found",res)
  //             if (res.data()) {
  //               let faculty = res.data()?.preference.fullName;
  //               let subjects = res.data()?.preference.subjects;
  //               // console.log("This is user preferences", res.data())

  //               setUserPreferenceFaculty(faculty)
  //               subjects?.map((category, index) => {

  //                 firestoreDatabase.collection(`K-Books-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`)
  //                   .get()
  //                   .then((documentSnapshot) => {
  //                     if (documentSnapshot) {
  //                       documentSnapshot.forEach((doc) => {
  //                         recommendedData.push(doc.data())



  //                       })
  //                       // console.log("mapping ended",subjects);
  //                       if (index == subjects?.length - 1) {

  //                         setRecommendedBooks(recommendedData)
  //                       }
  //                     }
  //                   })

  //               })
  //             } else {
  //               fetchSlidesAndBooksOrderedByName(`K-Books-BasicScience-Anatomy`, 'title').then((res) => {
  //                 if (isMounted) {
  //                   setDetails(() => res);
  //                 }
  //               })

  //             }
  //           })

  //       } catch (err) {
  //         console.log("Error while fetching preference data", err)
  //       }
  //     } else {
  //       fetchSlidesAndBooksOrderedByName(`K-Books-BasicScience-Anatomy`, 'title').then((res) => {
  //         if (isMounted) {
  //           setDetails(() => res);
  //         }
  //       })

  //     }
  //   }

  //   return () => {
  //     isMounted = false
  //   }
  // }, [])



  useEffect(() => {
    let isMounted = true
    if (isMounted) {

     async function fetchRecommendedData() {
        try {
          const {firestore:{db,query,collection,orderBy,limit,getDocs}}=await getFirebaseAll()
          setUserPreferenceFaculty(preference?.fullName)
          let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName
          if (preferenceCategory) {
            fetchSlidesAndBooksOrderedByNameWithLimit(`K-Books-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSubcategory(preferenceCategory)?.replace(/\s|\//g, "")}`, 'title', 10)
              .then((res) => {
                if (res?.allData) {
                  // console.log('PREFERENCES BOOKS DATA', res.allData, preferenceCategory, randomSubcategory(preferenceCategory));
                  setRecommendedBooks(res.allData)
                } else {
                  const colRef=query(collection(db,'K-Books-BasicScience-Anatomy'),
                  orderBy('title'),
                  limit(10))
                  getDocs(colRef)
                  // firebase.firestore().collection('K-Books-BasicScience-Anatomy')
                  //   .orderBy('title')
                  //   .limit(10)
                  //   .get()
                    .then((res) => {
                      let recommendedData = []
                      res.forEach((doc) => {
                        recommendedData.push(doc.data())
                      })
                      setRecommendedBooks(recommendedData);
                    })
                }
              })
          } else {
            const colRef = query(collection(db,'K-Books-BasicScience-Anatomy'),
            orderBy('title'),
            limit(10))
            getDocs(colRef)
            // firebase.firestore().collection('K-Books-BasicScience-Anatomy')
            //   .orderBy('title')
            //   .limit(10)
            //   .get()
              .then((res) => {
          
                let recommendedData = []
                res.forEach((doc) => {
                  recommendedData.push(doc.data())
                })
                setRecommendedBooks(recommendedData);
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

  }, [user?.uid, preference?.length, preference?.fullName, preference?.subjects])



  return (
    <>
      <div className="bookTrending-container">
        {showTitle && <h3 className="bookTrending-container-head">{!userPreferenceFaculty ? "Book Trending" : `Books For You`}</h3>}
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
            nextEl: '.swiper-button-nextBt',
            prevEl: '.swiper-button-prevBt',
          }}
          className="bookTrending-container-swiper"
        >
          {

            <div>
              { recommendedBooks.length> 0 ? recommendedBooks?.map((data, index) => (
                <SwiperSlide key={data.title + index} className="bookTrending-container-swiper-slide">
                  <Link
                    key={data?.image + index}
                    className="links"
                    to={{
                      pathname: `/bookdetails/${data?.title}`,
                      state: {
                        data: JSON.stringify(data),
                        wholeData: JSON.stringify(recommendedBooks),
                      }
                    }}>
                    
              
                        <BookStackCard
                          data={data}
                          bookImage={data?.image}
                          title={data?.title}
                          authorInfo={data?.writer}
                          rating={data?.rating}
                          views={"100 Views"}
                        /> 
                     
                    

                  </Link>
                </SwiperSlide>

              ))
            : loadingArray.map(()=>   <SwiperSlide key={shortid.generate()}  className="bookTrending-container-swiper-slide"><BookStackCardPlaceholderPlaceholder /></SwiperSlide>   )
            }
            </div>

          }


          <div className="swiper-button-prevBt"><ArrowLeft className="arrow-pointed" /></div>
          <div className="swiper-button-nextBt"> <ArrowRight className="arrow-pointed" /></div>


        </Swiper>

      </div>

    </>
  )
}
export default React.memo(BookTrending)
