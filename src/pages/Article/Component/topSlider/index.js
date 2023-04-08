import React from 'react'
import { Link } from 'react-router-dom';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { Swiper, SwiperSlide } from 'swiper/react';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import shortid from  "shortid";
import './_topSlider.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
SwiperCore.use([Autoplay]);

 const TopSlider = ({details, sourceDocId}) => {
  

    return (
         <div className="topslider-wrapper">
         
         <div className="topslider">
         <div className="topslider-content">

            <Swiper
                            loop={true}
                            speed={800}
                            slidesPerView={1}
                            centeredSlides={true}      
                            autoplay={{
                                "delay": 4000,
                                "disableOnInteraction": false
                            }} 
                           
                        >
                 {details.map((data,index)=>(

                  <SwiperSlide key={shortid.generate()}> 
                       <>
                            <div className="topslider-wrapper-slide">
                                <div className="topslider-wrapper-slide-left">
                                   
                                        <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug}  />
                                        <Link
                                                onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                              style={{textDecoration:'none'}}
                                                to={{
                                                  pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                                }}>
                                        <h3 className="topslider-wrapper-slide-left-head">{data?.title?.rendered}</h3>
                                        </Link>
                                        <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='black' fontSize='12px'  />
                                    

                                </div>
                                <Link
                                    onClick={ () => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                   className="topSlider_link"
                                    to={{
                                      pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                    <div className="topslider-wrapper-slide-rightImg" style={{backgroundImage:`url(${data?.image?.source_url})`}}>
                    
                                    </div>
                                </Link>
                                
                            </div>
                        </>
                        </SwiperSlide>


                 ))}
</Swiper>
</div>
            </div>
        </div>
    )
}
export default TopSlider