import React, { useState, useEffect } from 'react';
import { BsChevronRight } from "react-icons/bs";
import firebase from 'firebase';
import { DisplayTitle } from '../../../../components/global/Titles';
import { Link } from 'react-router-dom';
import "./index.scss";

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import SlideCard from '../../../SlideDetail/components/slideCard';
SwiperCore.use([Autoplay]);

const CategorizedSlides = ({ details, activeData, user }) => {
  const [userUploaded, setUserUploaded] = useState([])

  const handleChange = (data) => {
    activeData(data)
  }

  useEffect(() => {
    let isMounted = true;
    try {
      firebase.firestore().collection('UserUploadedSlides')
        .doc(user?.uid)
        .collection('slides')
        .onSnapshot((querySnapshot) => {
          if (querySnapshot && isMounted) {
            let userUploadedData = []
            querySnapshot.forEach((doc) => {
              userUploadedData.push(doc.data())
            })
            console.log('User Uploaded', userUploadedData)
            setUserUploaded(userUploadedData)
          }
        })
    } catch (error) {
      console.log('Error fetching user uploaded slide', error);
    }
    return () => {
      isMounted = false
    }
  }, [user?.uid])


  return (
    <div className="categorized-slide">
      <div className="categorized-slide-container">
        <div className="categorized-slide-container-top">
          <div className="categorized-slide-container-top-head">
            <DisplayTitle type="display4" title={`More Slides From ${details[0]?.slideCategory}`} />
          </div>
          {/*
            TODO SEE ALL SLIDE NAVIGATION
           <Link
            className="slide-links"
            style={{ textDecoration: 'none' }}
            to={{

              pathname: '/uploadedSlides',
              state: {
                uploadData: JSON.stringify(userUploaded),

              }
            }}>
            <div className="button">
              <h6 >{`See All`}</h6>
              <BsChevronRight className="icon" />
            </div>
          </Link> */}

        </div>
        {/* {
          userUploaded.length > 0 ?
            <Swiper
              loop={true}
              speed={800}
              spaceBetween={60}
              slidesPerView={4}
              autoplay={{
                "delay": 6000,
                "disableOnInteraction": false
              }}

              breakpoints={{
                "200": {
                  "slidesPerView": 1,
                },
                "500": {
                  "slidesPerView": 2,
                },
                "768": {
                  "slidesPerView": 2,
                },
                "1026": {
                  "slidesPerView": 3,
                }


              }}
              navigation={{
                nextEl: '.swiper-button-nextCs',
                prevEl: '.swiper-button-prevCs',
              }}
              className="categorized-slide-container-swiper"
            >
              {userUploaded?.filter((data, index) => index < 3).map((data, index) => (
                <SwiperSlide key={index} onClick={() => handleChange(data)} className="categorized-slide-container-swiper-slide">
                  <SlideCard
                    title={data.slideCategory}
                    description={data.SlideName}
                    images={data.slideImages}
                    wholeDatas={userUploaded}
                    datas={data}
                  />

                </SwiperSlide>
              ))}
              <div className="swiper-button-prevCs"><FaChevronLeft /></div>
              <div className="swiper-button-nextCs"><FaChevronRight /></div>

            </Swiper>
            :
            <Swiper
              loop={true}
              speed={800}
              spaceBetween={60}
              slidesPerView={4}
              autoplay={{
                "delay": 6000,
                "disableOnInteraction": false
              }}

              breakpoints={{
                "200": {
                  "slidesPerView": 1,
                },
                "500": {
                  "slidesPerView": 2,
                },
                "768": {
                  "slidesPerView": 2,
                },
                "1026": {
                  "slidesPerView": 3,
                }


              }}
              navigation={{
                nextEl: '.swiper-button-nextCs',
                prevEl: '.swiper-button-prevCs',
              }}
              className="categorized-slide-container-swiper"
            >
              {details?.filter((data, index) => index < 3).map((data, index) => (
                <SwiperSlide key={index} onClick={() => handleChange(data)} className="categorized-slide-container-swiper-slide">
                  <SlideCard
                    title={data.slideCategory}
                    description={data.SlideName}
                    images={data.slideImages}
                    wholeDatas={details}
                    datas={data}
                  />

                </SwiperSlide>
              ))}
              <div className="swiper-button-prevCs"><FaChevronLeft /></div>
              <div className="swiper-button-nextCs"><FaChevronRight /></div>

            </Swiper>
        } */}

        <Swiper
          loop={true}
          speed={800}
          spaceBetween={60}
          slidesPerView={4}
          autoplay={{
            "delay": 6000,
            "disableOnInteraction": false
          }}

          breakpoints={{
            "200": {
              "slidesPerView": 1,
            },
            "500": {
              "slidesPerView": 2,
            },
            "768": {
              "slidesPerView": 2,
            },
            "1026": {
              "slidesPerView": 3,
            }


          }}
          navigation={{
            nextEl: '.swiper-button-nextCs',
            prevEl: '.swiper-button-prevCs',
          }}
          className="categorized-slide-container-swiper"
        >
          {details?.filter((data, index) => index < 3).map((data, index) => (
            <SwiperSlide key={index} onClick={() => handleChange(data)} className="categorized-slide-container-swiper-slide">
              <SlideCard
                title={data.slideCategory}
                description={data.SlideName}
                images={data.slideImages}
                wholeDatas={details}
                datas={data}
              />

            </SwiperSlide>
          ))}
          <div className="swiper-button-prevCs"><FaChevronLeft /></div>
          <div className="swiper-button-nextCs"><FaChevronRight /></div>

        </Swiper>
      </div>
    </div>
  )
}

export default CategorizedSlides
