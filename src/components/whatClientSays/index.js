import React from 'react'
import './_whatClientSays.scss'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


  
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const WhatClientSays = ({ details }) => {
    
    return (

        <div className="whatClientsSay-container">
            <h3  className="whatClientsSay-container-heading">What clients say</h3>
            <Swiper
                loop={true}
                speed={1000}
                slidesPerView={1}
                centeredSlides={true}
                navigation={{
                    nextEl: '.swiper-button-nextW',
                    prevEl: '.swiper-button-prevW',
                }}
              
                className="whatClientsSay-container-swiper"
            >
                {details.map(data => (
                    <SwiperSlide key={data.id}>
                        <div className="whatClientsSay-container-sliderContainer">
                            <h3  className="whatClientsSay-container-sliderContainer-clientName">{data.clientName}</h3>

                            <div className="whatClientsSay-container-sliderContainer-bottom">
                                <div  className="whatClientsSay-container-sliderContainer-bottom-left">
                                    <div className="whatClientsSay-container-sliderContainer-bottom-left-dot"> <h3 style={{ color: `${data.color}` }}>• • •</h3></div>
                                    <p className="whatClientsSay-container-sliderContainer-bottom-left-clientQuote">{data.quote}</p>
                                    <button  className="whatClientsSay-container-sliderContainer-bottom-left-btn" style={{ backgroundColor: `${data.color}` }}>Read More</button>
                                </div>
                                <div  className="whatClientsSay-container-sliderContainer-bottom-right">
                                    <img  src={data.clientImage} alt="client" />
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}


                <div className="swiper-button-prevW"><FaChevronLeft /></div>
                <div className="swiper-button-nextW"> <FaChevronRight /></div>

            </Swiper>
        </div>

    )
}

export default WhatClientSays
