import React from 'react'
import './_exploreMoreSlider.scss'
import { FaChevronRight } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Slider from '../../../../components/global/slider';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const ExploreMoreSlider = ({ ExploreSliderDetails, slidesPerView }) => {
    return (
        <div className="ExploreMoreSlider-container">
            <h5 className="ExploreMoreSlider-container-top">Explore more Subcategories</h5>
            <Swiper
                autoHeight={true}
                //  loop={true}
                spaceBetween={0}
                slidesPerView={slidesPerView}
                slidesPerGroup={3}
                navigation={{
                    nextEl: '.swiper-button-next',

                }}
                //   breakpoints={{
                //     "640": {
                //         "slidesPerView": 1,
                //     },
                //     "768": {
                //         "slidesPerView": 2,
                //     },
                //     "1024": {
                //       "slidesPerView": 3,
                //     }
                //   }}
                className="ExploreMoreSlider-container-swiper"
            >
                {ExploreSliderDetails.map(data => (
                    <SwiperSlide key={data.id} >
                        <div className="ExploreMoreSlider-container-swiper-slide">
                            <img src={data.img} alt="biology" className="ExploreMoreSlider-container-swiper-slide-img" />
                            <div className="ExploreMoreSlider-container-swiper-slide-col2">
                                <h4 className="ExploreMoreSlider-container-swiper-slide-col2-heading">{data.title}</h4>
                                <p className="ExploreMoreSlider-container-swiper-slide-col2-para">{data.description}</p>
                                <button className="ExploreMoreSlider-container-swiper-slide-col2-btn">Explore</button>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}

                <div className="swiper-button-next"> <FaChevronRight /></div>
            </Swiper>
        </div>
    )
}

export default ExploreMoreSlider
