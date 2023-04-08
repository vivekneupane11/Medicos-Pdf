import firebase from "firebase";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import { bookCategories } from '../../../../constants/Book/BookCategories';
import BookCard from '../bookCard';
import './_bookSuggestion.scss';



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const BookSuggestion = ({ details }) => {
  const { user } = useContext(AuthContext);
  const firestoreDatabase = firebase.firestore();
  const [userPreferenceFaculty, setUserPreferenceFaculty] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);


  const randomSubcategory = useCallback(category => {
    let filtered = bookCategories.filter(
      bookCategory => bookCategory.category == category,
    );
    
    let subCategories = filtered[0]?.subCategories;
    let randomInteger = Math.floor(Math.random() * (subCategories?.length - 1));
 
    // console.log(category, randomInteger, subCategories[randomInteger]);
    return subCategories[Math.floor(Math.random() * (subCategories?.length - 1))]
      .category;
  }, []
  )


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
                // console.log("CATEGORY",category.subjectName.replace(/\s|\/g, ""/g,""))
                // console.log("SUBCATEGORY",randomSubcategory(category.subjectName))
                firestoreDatabase.collection(`K-Books-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`)
                  .get()
                  .then((documentSnapshot) => {
                    if (documentSnapshot) {
                      documentSnapshot.forEach((doc) => {
                        recommendedData.push(doc.data())
                        // console.log("Fetched data",doc.data())
                      })
                      if (index == subjects?.length - 1) {
                        setRecommendedBooks(recommendedData)
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
    <div className="bookSuggestion-container">
      <h3 className="bookSuggestion-container-head">Book Suggestion of the day</h3>
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
            "slidesPerView": 2,
          },
          "768": {
            "slidesPerView": 3,
          },
          "1026": {
            "slidesPerView": 4,
          }
        }}
        navigation={{
          nextEl: '.swiper-button-nextBs',
          prevEl: '.swiper-button-prevBs',
        }}
        className="bookSuggestion-container-swiper"
      >
        {
          userPreferenceFaculty ?
            <div>
              {recommendedBooks?.reverse()?.map((data, index) => (
                <SwiperSlide key={data.title + index} className="bookSuggestion-container-swiper-slide">
                  <Link
                    key={data.image + index}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: `/bookDetails/${data.title}`,
                      state: {
                        data: JSON.stringify(data),
                        wholeData: JSON.stringify(recommendedBooks),
                      }
                    }}>
                    <BookCard
                      image={data.image}
                      title={data.title}
                      author={data.writer}
                      rating={data.rating}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </div>
            :
            <div>
              {
                details?.length > 0 ?
                  <div>
                    {details?.map((data,index) => (
                      <SwiperSlide key={index} className="bookSuggestion-container-swiper-slide">
                        <Link
                          key={data.image + data.id}
                          style={{ textDecoration: 'none' }}
                          to={{
                            pathname: `/bookDetails/${data.title}`,
                            state: {
                              data: JSON.stringify(data),
                              wholeData: JSON.stringify(details),
                            }
                          }}>
                          <BookCard
                            image={data.image}
                            title={data.title}
                            author={data.writer}
                            rating={data.rating}
                          />
                        </Link>


                      </SwiperSlide>
                    ))}
                  </div>
                  :
                  <div className="loadingContainerBookSuggestion">
                  <Loading />
                  </div>
              }
            </div>
        }

        <div className="swiper-button-prevBs"><FaChevronLeft className="swiperButtonArrow-bookSuggestion"/></div>
        <div className="swiper-button-nextBs"> <FaChevronRight className="swiperButtonArrow-bookSuggestion"/></div>

      </Swiper>
    </div>
  )
}

export default BookSuggestion
