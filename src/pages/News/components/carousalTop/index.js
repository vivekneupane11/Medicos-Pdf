import React, { useState } from 'react'
import './_carousalTop.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay, Controller, Pagination } from 'swiper';

import AuthorDateRead from '../author-date-readTime';
// import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';
SwiperCore.use([Autoplay]);
SwiperCore.use([Controller]);
SwiperCore.use([Pagination]);

const CarousalTop = ({ details }) => {

    const [count, setCount] = useState(0);
    // const [controlledSwiper, setControlledSwiper] = useState(null);

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

                                <h3 className='carousalTop-wrapper-description-title' onClick={() => newTab(data?.link,data?.title,'web_news_detail_page_opened')}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.pubDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#fff' fontSize='12px' />
                            </div>
                        </div>
                    </SwiperSlide>
                }
                )}

                <div className="swiper-button-prevCT"><ArrowLeft className="arrow-pointed"/></div>
                <div className="swiper-button-nextCT"> <ArrowRight className="arrow-pointed"/></div>
            </Swiper>


            <div className='carousalTop-wrapper-Bottom '>
                {details?.filter((data, index) => index < 3).map((data, index) => (
                    <div key={shortid.generate()} className={`carousalTop-wrapper-Bottom-wrapper carousalTop-wrapper-Bottom-wrapper${index} carousalTop-wrapper-Bottom-wrapper carousalTop-wrapper-Bottom-wrapper${count === index ? "-active" : ""}`}>
                        <div className={`carousalTop-wrapper-Bottom-wrapper-Description ${(index === count) ? 'carousalTop-wrapper-Bottom-wrapper-DescriptionActive' : ''}`} >
                            <div className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper'>
                                <div className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper-number' >{index}</div>
                                <h4 className='carousalTop-wrapper-Bottom-wrapper-Description-wrapper-heading' onClick={() => newTab(data?.link,data?.title,'web_news_detail_page_opened')}>{data?.title}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default React.memo(CarousalTop)
