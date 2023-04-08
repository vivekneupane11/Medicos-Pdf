import React from 'react'
import './_ourProducts.scss'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { AwesomeProducts } from '../../../../components/AwesomeProducts';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const OurProducts = ({details}) => {
  
    return (
        <div className="homePageOurProducts-container">
            <h3 className="homePageOurProducts-container-head">Some Of Our Awesome Products</h3>
            <Swiper
                loop={true}
                speed={800}  
                spaceBetween={10}
                slidesPerView={3}
                centeredSlides={true}
                  breakpoints={{
                    "200": {
                      "slidesPerView": 1,
                    },
                    "500": {
                      "slidesPerView": 1,
                    },
                    "768": {
                      "slidesPerView": 1,
                    },
                    "1026": {
                      "slidesPerView": 3,
                    }
                  }}
                navigation={{
                    nextEl: '.swiper-button-nextOp',
                    prevEl: '.swiper-button-prevOp',
                }}
                slideActiveClass={"swiper-slide-activeSlide"}
                className="homePageOurProducts-container-swiper"
               
            >
              <div className="homePageOurProducts-container-swiper-wrapper">
                  {details.map((data,index)=>(
                        <SwiperSlide key={index} className="homePageOurProducts-container-swiper-wrapper-slide">
                         
                            <AwesomeProducts awesomeProduct={data.details}/> 
          
                        </SwiperSlide>
                    ))}
              </div>
              
                   
              


                <div className="swiper-button-prevOp"><FaChevronLeft /></div>
                <div className="swiper-button-nextOp"> <FaChevronRight /></div>

            </Swiper>
            
        </div>
    )
}

export default OurProducts
