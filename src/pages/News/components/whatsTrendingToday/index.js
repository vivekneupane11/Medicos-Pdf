import React from 'react'
import './_whatsTrendingToday.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
// import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
SwiperCore.use([Autoplay]);

const WhatsTrendingToday = ({details}) => {

    return (
        <>

          <div className="newsWhatsTrendingToday-wrapper">
              <h3 className="newsWhatsTrendingToday-wrapper-head1">For You</h3>
              <h6 className="newsWhatsTrendingToday-wrapper-head2">PEOPLE LOVE IT</h6>

              <Swiper
                loop={true}
                speed={800}  
                spaceBetween={15}
                slidesPerView={4}
                slidesPerGroup={4}
                autoplay={{
                    "delay": 3000,
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
                      "slidesPerView": 3,
                    },
                    "1026": {
                      "slidesPerView": 4,
                    }
                  }}  
                  className="newsWhatsTrendingToday-wrapper-swiperContainer"
               >
                {details?.filter((data,index)=>index<10).map((data,index)=>(
                     <SwiperSlide key={shortid.generate()}> 
                        <div className="newsWhatsTrendingToday-wrapper-slide">
                          <div onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}  className="newsWhatsTrendingToday-wrapper-slide-img" style={{backgroundImage:`url(${data['media:content']?.$?.url})`}}>
                            
                          </div>
                          <div className="newsWhatsTrendingToday-wrapper-slide-tag">
                              <NewsLinkTag color={getColorByIndex(index)} tag={data?.content} />
                          </div>
                          <h3 className="newsWhatsTrendingToday-wrapper-slide-head" onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>  
                          <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                      </div> 
                     </SwiperSlide>

                ))}
            
               </Swiper>
    
          </div>
            
        </>
    )
}

export default React.memo(WhatsTrendingToday)
