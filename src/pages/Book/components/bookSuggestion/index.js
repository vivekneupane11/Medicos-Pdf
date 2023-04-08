// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import {collection, getDocs, getFirestore,orderBy,query,limit} from 'firebase/firestore';
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
import BookCard from '../bookCard';
import BookCardPlaceholder from "../bookCardPlaceholder";
import './_bookSuggestion.scss';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';


const loadingArray = Array.apply(null, Array(5))

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const BookSuggestion = ({ details }) => {
  const { user } = useContext(AuthContext);
  const [preference, setPreference] = useLocalStorage('preference', null);
  // const firestoreDatabase = firebase.firestore();
  const [userPreferenceFaculty, setUserPreferenceFaculty] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  // const db= getFirestore();
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
  //     try {
  //       let recommendedData = [];
  //       firestoreDatabase.collection('Web-User-Data')
  //         .doc(user?.uid)
  //         .collection('User-Preference')
  //         .doc(user?.uid)
  //         .get().then((res) => {
  //           // console.log("No Preference data found",res)
  //           if (res.data()) {
  //             let faculty = res.data()?.preference.fullName;
  //             let subjects = res.data()?.preference.subjects;

  //             setUserPreferenceFaculty(faculty)
  //             subjects?.map((category, index) => {
  //               // console.log("CATEGORY",category.subjectName.replace(/\s|\/g, ""/g,""))
  //               // console.log("SUBCATEGORY",randomSubcategory(category.subjectName))
  //               firestoreDatabase.collection(`K-Books-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`)
  //                 .get()
  //                 .then((documentSnapshot) => {
  //                   if (documentSnapshot) {
  //                     documentSnapshot.forEach((doc) => {
  //                       recommendedData.push(doc.data())
  //                       // console.log("Fetched data",doc.data())
  //                     })
  //                     if (index == subjects?.length - 1) {
  //                       setRecommendedBooks(recommendedData)
  //                     }
  //                   }
  //                 })

  //             })
  //           }
  //         })

  //     } catch (err) {
  //       console.log("Error while fetching preference data", err)
  //     }
  //   }
  //   return () => {
  //     isMounted = false
  //   }
  // }, [user?.uid])



  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
    async  function fetchRecommendedData() {
        try {
          const{firestore:{db,getDocs,query,collection,orderBy,limit}}=await getFirebaseAll()
          setUserPreferenceFaculty(preference?.fullName)
          let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName
          if (preferenceCategory) {
            fetchSlidesAndBooksOrderedByNameWithLimit(`K-Books-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSubcategory(preferenceCategory)?.replace(/\s|\//g, "")}`, 'title', 10)
              .then((res) => {
                if (res?.allData) {
                  // console.log('PREFERENCES BOOKS DATA', res.allData, preferenceCategory, randomSubcategory(preferenceCategory));
                  setRecommendedBooks(res.allData)
                } else {
                  const colRef=query(collection(db,'K-Books-BasicScience-Histology'),orderBy('title'),limit(10))
                  // firebase.firestore().collection('K-Books-BasicScience-Histology')
                  //   .orderBy('title')
                  //   .limit(10)
                  //   .get()
                  getDocs(colRef)
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
            const colRef=query(collection(db,"K-Books-BasicScience-Histology"),orderBy('title'),limit(10)) 
          getDocs(colRef)
         .then((snapshot)=>{
          let recommendedData = []
          snapshot.forEach((doc) => {
            recommendedData.push(doc.data())
          })
          setRecommendedBooks(recommendedData);

         })

           // getFirestore().collection('K-Books-BasicScience-Histology')
              
            
              
              
            
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
    <div className="bookSuggestion-container">
      <h3 className="bookSuggestion-container-head">Book Suggestion of the day</h3>
      <Swiper
        loop={true}
        speed={800}
        spaceBetween={10}
        slidesPerView={4}
        slidesPerGroup={3}

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
            "slidesPerView": 3,
            "slidesPerGroup": 3,
          },
          "1026": {
            "slidesPerView": 4,
            "slidesPerGroup": 4,
          }
        }}
        navigation={{
          nextEl: '.swiper-button-nextBs',
          prevEl: '.swiper-button-prevBs',
        }}
        className="bookSuggestion-container-swiper"
      >
        {

          <div>
            {recommendedBooks.length>0?recommendedBooks?.map((data, index) => (
              <SwiperSlide key={data.title + index} className="bookSuggestion-container-swiper-slide">
                <Link
                  key={data.image + index}
                  className='links'
                  to={{
                    pathname: `/bookdetails/${data.title}`,
                    state: {
                      data: JSON.stringify(data),
                      wholeData: JSON.stringify(recommendedBooks),
                    }
                  }}>
                  {
                      <BookCard
                        image={data.image}
                        title={data.title}
                        author={data.writer}
                        rating={data.rating}
                      />
                     
                      

                  }

                </Link>
              </SwiperSlide>
            ))
            :
            loadingArray.map(()=> <SwiperSlide key={shortid.generate()} className="bookSuggestion-container-swiper-slide"  ><BookCardPlaceholder /></SwiperSlide> )
            }
          </div>

        }

        <div className="swiper-button-prevBs"><ArrowLeft className="swiperButtonArrow-bookSuggestion" /></div>
        <div className="swiper-button-nextBs"> <ArrowRight className="swiperButtonArrow-bookSuggestion" /></div>

      </Swiper>
    </div>
  )
}

export default React.memo(BookSuggestion)
