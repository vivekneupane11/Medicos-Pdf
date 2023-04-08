import React, { useContext, useEffect, useCallback, useState } from 'react'
import './_slideTrendingProfile.scss'
import firebase from "firebase";

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import SlideCard from '../../../SlideDetail/components/slideCard';
import Loading from '../../../../components/loading';
import { slideCategories } from '../../../../constants/Book/BookCategories';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import shortid from "shortid";
SwiperCore.use([Autoplay]);


const SlideTrendingProfile = ({ details, showTitle = true }) => {
  return (
    <>
      <div className="slideTrendingProfile-container">
        <div>
          {details.length > 0 ?
            <Swiper
              loop={true}
              speed={800}
              spaceBetween={10}
              slidesPerView={3}
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
                }
              }}
              navigation={{
                nextEl: '.swiper-button-nextttt',
                prevEl: '.swiper-button-prevvvv',
              }}
              className="slideTrendingProfile-container-swiperContainer"
            >
              {details.filter((data, index) => index < 4).map((data, index) => (

                <SwiperSlide key={shortid.generate()} className="slideTrendingProfile-container-swiperContainer-slide">
                  <SlideCard
                    title={data.slideCategory}
                    description={data.SlideName}
                    images={data.slideImages}
                    wholeDatas={details}
                    datas={data}
                  />
                </SwiperSlide>

              ))}
              <div className="swiper-button-prevvvv"><FaChevronLeft className="arrow-pointed" /></div>
              <div className="swiper-button-nextttt"><FaChevronRight className="arrow-pointed" /></div>

            </Swiper>
            :
            <div className="slide-trendingProfile-loading-wrapper">
              <Loading />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default SlideTrendingProfile
