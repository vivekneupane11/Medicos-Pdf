import React, { useState, useEffect } from 'react'
import './_carousalTop.scss'
import {FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay, Controller, Pagination } from 'swiper';

import AuthorDateRead from '../author-date-readTime';
import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
SwiperCore.use([Autoplay]);
SwiperCore.use([Controller]);
SwiperCore.use([Pagination]);

const CarousalTop = ({ details }) => {

    const [count, setCount] = useState(0);
    const [controlledSwiper, setControlledSwiper] = useState(null);

    const newTab = (url,title) => {
        window.open(url, "_blank");
        logEventWithParams('web_news_detail_page_opened', { newsTitle: title })
    }

    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

    };

    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index % 2 == 0) {
            color = 'skyblue'
        }
        return color;
    }

    return (
        <div style={{ position: 'relative' }}>
            <Swiper
                loop={true}
                speed={800}
                // activeSlideKey="2"
                slidesPerView={1}
                centeredSlides={true}
                // autoplay={{
                //     "delay": 4000,
                //     "disableOnInteraction": false
                // }}
                navigation={{
                    nextEl: '.swiper-button-nextCT',
                    prevEl: '.swiper-button-prevCT',
                }}

                onSlideChange={({ realIndex }) => {
                    setCount(realIndex);
                }}
                className="carousalTop-sliderContainer"
        
            >
                {details?.filter((data, index) => index < 3).map((data, index) => {
                    return <SwiperSlide key={shortid.generate()} >
                        <div className='carousalTop-wrapper' style={{ backgroundImage: `url(${data['media:content'].$?.url})` }}>
                            <div className='carousalTop-wrapper-description'>

                                <h3 className='carousalTop-wrapper-description-title' onClick={() => newTab(data?.link,data?.title)}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.pubDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#fff' fontSize='12px' />
                            </div>
                        </div>
                    </SwiperSlide>
                }
                )}

                <div className="swiper-button-prevCT"><FaChevronLeft className="arrow-pointed"/></div>
                <div className="swiper-button-nextCT"> <FaChevronRight className="arrow-pointed"/></div>
            </Swiper>


            <div className='carousalTop-wrapper-Bottom '>
                {details?.filter((data, index) => index < 3).map((data, index) => (
                    <div key={shortid.generate()} className={`carousalTop-wrapper-Bottom-wrapper carousalTop-wrapper-Bottom-wrapper${index} carousalTop-wrapper-Bottom-wrapper carousalTop-wrapper-Bottom-wrapper${count == index ? "-active" : ""}`}>
                        <div className={`carousalTop-wrapper-Bottom-wrapper-Description ${(index == count) ? 'carousalTop-wrapper-Bottom-wrapper-DescriptionActive' : ''}`} >
                            <div className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper'>
                                <div className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper-number' >{index}</div>
                                <h4 className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper-heading' onClick={() => newTab(data?.link,data?.title)}>{data?.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CarousalTop
