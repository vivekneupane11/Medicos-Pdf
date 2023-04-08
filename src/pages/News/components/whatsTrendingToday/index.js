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
import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
SwiperCore.use([Autoplay]);

const WhatsTrendingToday = ({details}) => {

  const newTab=(url,title)=>{
    window.open(
       url, "_blank");
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
    } else if (index %2 == 0) {
        color = 'skyblue'
    } 
    return color;
}


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
                          <div onClick={()=>newTab(data?.link,data?.title)}  className="newsWhatsTrendingToday-wrapper-slide-img" style={{backgroundImage:`url(${data['media:content']?.$?.url})`}}>
                            
                          </div>
                          <div className="newsWhatsTrendingToday-wrapper-slide-tag">
                              <NewsLinkTag color={getColorsByIndex(index)} tag={data?.content} />
                          </div>
                          <h3 className="newsWhatsTrendingToday-wrapper-slide-head" onClick={()=>newTab(data?.link,data?.title)}>{data?.title}</h3>  
                          <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                      </div> 
                     </SwiperSlide>

                ))}
            
               </Swiper>
    
          </div>
            
        </>
    )
}

export default WhatsTrendingToday
