import React from 'react'
import './_slideRecentSlide.scss'
import { Link } from 'react-router-dom';
import { RiShareForwardFill } from "react-icons/ri";
import { CgSoftwareDownload } from "react-icons/cg";
import { AiOutlineStar, AiOutlineEye } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';

import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
SwiperCore.use([Autoplay]);


const SlideRecentSlides = ({ detailsSlides }) => {

  const removeUnderscore=(str)=> {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
  return (
    <>
      <div className="slideRecentSlide-container">
        <h4 className="slideRecentSlide-container-head">Recent Slides</h4>
        <Swiper
          loop={true}
          speed={800}
          spaceBetween={20}
          slidesPerView={3}
          // autoplay={{
          //     "delay": 3000,
          //     "disableOnInteraction": false
          //   }} 

          breakpoints={{
            "200": {
              "slidesPerView": 1,
            },
            "500": {
              "slidesPerView": 1,
            },
            "768": {
              "slidesPerView": 2,
            },
            "1026": {
              "slidesPerView": 3,
            }
          }}
          navigation={{
            nextEl: '.swiper-button-nextR',
            prevEl: '.swiper-button-prevR',
          }}
          className="slideRecentSlide-container-swiperContainer"
        >
          {detailsSlides.filter((data, index) => index < 5).reverse().map((data, index) => (

            <SwiperSlide key={index} className="slideRecentSlide-container-swiperContainer-slide">

              <div className="slideRecentSlide-container-swiperContainer-slide-bgImg" style={{ backgroundImage: `url(${data.slideImages[0]})` }}>

                <Link
                  onClick={() => logEventWithParams("web_slide_opened", {
                    slideTitle: data?.SlideName,
                    slideCategory: data?.slideCategory,
                    slideSubCategory: data?.slideSubCategory,
                  })}
                  style={{ textDecoration: 'none' }}
                  to={{
                    pathname: `/slideDetails/${data?.SlideName}/${data?.slideCategory}/${data?.slideSubCategory.replace(/\s|\//g, "")}`,
                    state: {
                      slideCategory: data.slideCategory,
                      slideSubCategory: data.slideSubCategory,
                      slideName: data.SlideName,

                    }
                  }}>
                  <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-tag">
                    <NewsLinkTag color='orange' tag={data.slideSubCategory} />
                  </div>
                </Link>





                <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc">
                  <Link
                    onClick={() => logEventWithParams("web_slide_opened", {
                      slideTitle: data?.SlideName,
                      slideCategory: data?.slideCategory,
                      slideSubCategory: data?.slideSubCategory,
                    })}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: `/slideDetails/${data?.SlideName}/${data?.slideCategory}/${data?.slideSubCategory.replace(/\s|\//g, "")}`,
                      state: {
                        data: JSON.stringify(data),
                        wholeData: JSON.stringify(detailsSlides),

                      }
                    }}>
                    <h3 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-head1">{removeUnderscore(data.SlideName)}</h3>
                  </Link>
                  <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-head2">{data.slideCategory}</h6>
                  <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom">
                    <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile">

                      <img src={require('../../../../assets/images/slide/medicos.png').default} alt='profile' className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-img" />
                      <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-head">Medicos Int'l</h6>
                    </div>

                    <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-star">
                      <AiOutlineStar className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-star-icon" />
                      <p className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-star-head">107</p>
                    </div>
                    <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-seen">
                      <AiOutlineEye className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-seen-icon" />
                      <p className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-seen-head">107</p>
                    </div>
                    <CgSoftwareDownload className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-download" />
                    <RiShareForwardFill className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-share" />
                  </div>
                </div>

              </div>


            </SwiperSlide>

          ))}
          <div className="swiper-button-prevR"><FaChevronLeft className='slideRecentSlides-arrowIcon'/></div>
          <div className="swiper-button-nextR"><FaChevronRight className='slideRecentSlides-arrowIcon' /></div>
        </Swiper>

      </div>
    </>
  )
}

export default SlideRecentSlides
