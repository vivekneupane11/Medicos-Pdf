import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
import './_todayHighlights.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
SwiperCore.use([Autoplay]);

const TodayHighlights = ({details}) => {

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
        <div>
        <div className="TodaysHighlights-wrapper">

            <h3 className="TodaysHighlights-wrapper-head1">Featured For Today</h3>
            <h6 className="TodaysHighlights-wrapper-head2">TOP OF THE WEEK</h6>

       
             <Swiper
                loop={true}
                speed={800}  
                spaceBetween={15}
                slidesPerView={5}
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
                      "slidesPerView": 5,
                    }
                  }}
               >
                {details?.filter((data,index)=>index>5 && index<11).map((data,index)=>(
                     <SwiperSlide key={shortid.generate()}> 
                        <div className="TodaysHighlights-wrapper-slider-slide">
                            <div onClick={()=>newTab(data?.link,data?.title)} className="TodaysHighlights-wrapper-slider-slide-img" style={{backgroundImage:`url(${data?.image?.url[0]})`}}>

                            </div>
                            <div className="TodaysHighlights-wrapper-slider-slide-description"> 
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.categories[0]} />
                                <h3 className="TodaysHighlights-wrapper-slider-slide-description-head" onClick={()=>newTab(data?.link,data?.title)}>{data?.title}</h3>  
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                            </div>
                        </div>
                     </SwiperSlide>

                ))}
                   

             
                   
                    
               </Swiper>
            </div>
            
        </div>
    )
}

export default TodayHighlights
