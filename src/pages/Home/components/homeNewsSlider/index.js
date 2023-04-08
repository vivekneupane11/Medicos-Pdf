import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import shortid from "shortid";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import ProfileCardWithDetail from '../../../../components/global/profileCardWithDetail';
import Loading from '../../../../components/loading';
import ButtonWithArrow from '../buttonWithArrow';
import './_homeNewsSlider.scss';
SwiperCore.use([Autoplay]);


const HomeNewsSlider = () => {

    const [newsData,setNewsData]=useState([])

    useEffect(() => {
        let isActive = true;
        const getNewsData= async () => {
          

            await axios.get('https://medicospdf.com/api/news?link=https://www.medscape.com/cx/rssfeeds/2700.xml',
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json',
                  'Referrer': 'origin'
                }
              }).then((response) => {
      
                if (response?.data) {
                  setNewsData(response.data?.items);
                }
              }).catch((err) => {
                return [];
              })
          }
          getNewsData()
        return () => {
            isActive=false;
        }
    }, [])
   
    return (
        <>
          <div className="homeNewsSlider_container">
             <h3 className="homeNewsSlider_container_head">Medical News</h3>

             <Swiper
                loop={true}
                speed={800}
                slidesPerView={4}
                spaceBetween={30}
                // centeredSlides={true}      
                // autoplay={{
                //     "delay": 4000,
                //     "disableOnInteraction": false
                //   }} 
                breakpoints={{
                  "200": {
                  "slidesPerView": 1,
                  },
                  "500": {
                  "slidesPerView": 1,
                  },
                  "725": {
                  "slidesPerView": 2,
                  'spaceBetween':15,
                  },
                  "768": {
                  "slidesPerView": 2,
                  'spaceBetween':15,
                  },
                  "1026": {
                  "slidesPerView": 3,
                  }
              }}
                  navigation={{
                    nextEl: '.swiper-button-nextHNS',
                    prevEl: '.swiper-button-prevHNS',
                }}
                className="homeNewsSlider_container_swiper"
             >
                   {
                        newsData?.length>0?

                        newsData.filter((data,index)=>index<7).map((data,index)=>{
                      

                            return <SwiperSlide  key={shortid.generate()}  className="homeNewsSlider_container_swiper_slide">
                                        <ProfileCardWithDetail
                                        link={data?.link}
                                        profileImage={data?.image?.url[0]}
                                        userName={data?.categories[0]}
                                        level={data.title}
                                        description={data.content}
                                        />
                                       
                                        
                                 </SwiperSlide>
                        })
                        :
                        <div className='homeNewsSlider_loading'>
                            <Loading/>
                            
                        </div>
                   }
                   
                   
                    <div className="swiper-button-prevHNS"><FaChevronLeft className="arrow-pointed" /></div>
                    <div className="swiper-button-nextHNS"><FaChevronRight className="arrow-pointed" /></div>
            </Swiper>

            <div className="homeNewsSlider_container_btn">
                <ButtonWithArrow name="View more News" link='/news' />
            </div>

           

        </div>
        </>
    )
}

export default React.memo(HomeNewsSlider) 