import React from 'react'
import { Link } from 'react-router-dom'
import './_inHypeSponsored.scss'

import AuthorDateRead from '../../../News/components/author-date-readTime'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
SwiperCore.use([Autoplay]);

const InHypeSponsored = ({details,details3Source}) => {
 
    const goTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }
    const clickhandlergoto = ()=>goTop()
    return (
        <>
        <div className="newsDetailInHypeSponsoredWrapper">
           
            <Swiper
                loop={true}
                speed={800}
                slidesPerView={1}
                centeredSlides={true}      
                autoplay={{
                    "delay": 4000,
                    "disableOnInteraction": false
                  }} 
                  className="newsDetailInHypeSponsoredWrapper-swiperContainer"
           >
               {details?.map((data,index)=>(
                    <SwiperSlide key={index} className="newsDetailInHypeSponsoredWrapper-swiperContainer-slide">
                        <div className="newsDetailInHypeSponsoredWrapper-swiperContainer-slide-wrapper">
                            
                            <div  className="newsDetailInHypeSponsoredWrapper-swiperContainer-slide-wrapper-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                               
                                <div className="newsDetailInHypeSponsoredWrapper-swiperContainer-slide-wrapper-img-description">
                                   
                                    <Link
                        
                                       className='links'
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details3Source}`
                                        }}>
                                    <h3 onClick={clickhandlergoto} className="newsDetailInHypeSponsoredWrapper-swiperContainer-slide-wrapper-img-description-head">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#fff' fontSize='12px'/>
                              </div>
                            </div>
                           
                        </div>
                    </SwiperSlide>
               ))}
              
            </Swiper>
        </div>
            
        </>
    )
}

export default InHypeSponsored
