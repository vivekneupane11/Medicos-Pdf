import React from 'react';
import shortid from "shortid";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { newTab } from '../../../../functions/newTabMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../author-date-readTime';
import './_todayHighlights.scss';
SwiperCore.use([Autoplay]);

const TodayHighlights = ({details}) => {


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
                            <div onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')} className="TodaysHighlights-wrapper-slider-slide-img" style={{backgroundImage:`url(${data?.image?.url[0]})`}}>

                            </div>
                            <div className="TodaysHighlights-wrapper-slider-slide-description"> 
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.categories[0]} />
                                <h3 className="TodaysHighlights-wrapper-slider-slide-description-head" onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>  
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                            </div>
                        </div>
                     </SwiperSlide>

                ))}
                   

             
                   
                    
               </Swiper>
            </div>
            
        </div>
    )
}
export default React.memo(TodayHighlights)
