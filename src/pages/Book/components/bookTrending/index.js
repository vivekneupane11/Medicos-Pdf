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
import BookStackCard from '../bookStackCard';
import './_bookTrending.scss';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const BookTrending = ({ details, showTitle=true, profile=false }) => {
  const { user } = useContext(AuthContext);
  const firestoreDatabase = firebase.firestore();
  const [userPreferenceFaculty, setUserPreferenceFaculty] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const randomSubcategory = useCallback(category => {

    let filtered = bookCategories.filter(
      bookCategory => bookCategory.category == category,
    );
    // console.log("filtered data", filtered);

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
      if (user?.uid) {
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
                // console.log("This is user preferences", res.data())
         
                setUserPreferenceFaculty(faculty)
                subjects?.map((category, index) => {
                
                  firestoreDatabase.collection(`K-Books-${(category?.subjectName).replace(/\s|\/g, ""/g, "")}-${(randomSubcategory(category?.subjectName)).replace(/\s|\//g, "")}`)
                    .get()
                    .then((documentSnapshot) => {
                      if (documentSnapshot) {
                        documentSnapshot.forEach((doc) => {
                          recommendedData.push(doc.data())
                   


                        })
                        // console.log("mapping ended",subjects);
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
    }
   
    return () => {
      isMounted = false
    }
  }, [user?.uid])



  return (
    <>
      <div className="bookTrending-container">
      {showTitle && <h3 className="bookTrending-container-head">{!userPreferenceFaculty ? "Book Trending" : `For ${userPreferenceFaculty}`}</h3>}
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
            userPreferenceFaculty && !profile ?
              <div>
                {
                  recommendedBooks?.length > 0 ?
                    <div>
                      {recommendedBooks?.map((data, index) => (
                        <SwiperSlide key={data.title + index} className="bookTrending-container-swiper-slide">
                          <Link
                            key={data.image + index}
                            style={{ textDecoration: 'none' }}
                            to={{
                              pathname: `/bookDetails/${data?.title}`,
                              state: {
                                data: JSON.stringify(data),
                                wholeData: JSON.stringify(recommendedBooks),
                              }
                            }}>
                            <BookStackCard
                              data={data}
                              bookImage={data.image}
                              title={data.title}
                              authorInfo={data.writer}
                              rating={data.rating}
                              views={"100 Views"}
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </div>
                    :
                    <div className='loadingContainerBookTrending'>
                      <Loading />
                    </div>
                }
              </div>
              :
              <div>
                {
                  details?.length > 0 ?
              
                    <div>
                      {details.map((data, index) => (
                      
                        <SwiperSlide key={index} className="bookTrending-container-swiper-slide">
                          <Link
                            key={data.image + data.id}
                            style={{ textDecoration: 'none' }}
                            to={{
                              pathname: `/bookDetails/${data?.title}`,
                              state: {
                                data: JSON.stringify(data),
                                wholeData: JSON.stringify(details),
                              }
                            }}>
                            <BookStackCard
                              data={data}
                              bookImage={data.image}
                              title={data.title}
                              authorInfo={data.writer}
                              rating={data.rating}
                              views={data.views}
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </div>
                    :
                    <div className='loadingContainerBookTrending'>
                      <Loading />
                    </div>
                }
              </div>
          }


          <div className="swiper-button-prevBt"><FaChevronLeft className="arrow-pointed"/></div>
          <div className="swiper-button-nextBt"> <FaChevronRight className="arrow-pointed"/></div>


        </Swiper>
      </div>

    </>
  )
}

export default React.memo( BookTrending)
