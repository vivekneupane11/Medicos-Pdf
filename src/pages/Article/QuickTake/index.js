import React from 'react'
import './_quick.scss'
import { Link } from 'react-router-dom';
import { logEventWithParams } from '../../../functions/commonMethod';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';

import AuthorDateRead from '../../News/components/author-date-readTime';
import NewsLinkTag from '../../../components/global/newsLinkTag';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../functions/tagColorAndReadTimeMethod';
import ArrowLeft from '../../../components/global/icons/arrow_left';
import ArrowRight from '../../../components/global/icons/arrow_right';
SwiperCore.use([Autoplay]);


const QuickTake = ({details,sourceDocId}) => {
 
    return (
        <>
          <div className="quickTake-wrapper">
          

             <Swiper
                loop={true}
                speed={800}
                slidesPerView={1}
                centeredSlides={true}      
               
                  navigation={{
                    nextEl: '.swiper-button-nextQT',
                    prevEl: '.swiper-button-prevQT',
                }}
                className="quickTake-wrapper-swiperContainer"
             >

                {details.map((data,index)=>(
                        <SwiperSlide key={shortid.generate()} className="swipper-slide"> 
                            <div className="quickTake-wrapper-slide">
                                <div className="quickTake-wrapper-slide-left">

                                    <div className="quickTake-wrapper-slide-left-bottom">
                                        <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                                        <Link
                                            onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                                className='links'
                                                to={{
                                                    pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                                }}>
                                        <h3 className="quickTake-wrapper-slide-left-bottom-head">{data?.title?.rendered}</h3>
                                        </Link>
                                        <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                                    </div>

                                </div>
                                <Link
                                onClick={() => logEventWithParams('web_article_detail_page_opened',{articleTitle: data?.title?.rendered})}
                                    className='quickTake_link'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                                    }}>
                                <div className="quickTake-wrapper-slide-rightImg" style={{backgroundImage:`url(${data?.image?.source_url})`}}>
    
                                </div>
                                </Link>
                                
                            </div>
                        
                        </SwiperSlide>

                ))}
                   
                    <div className="swiper-button-prevQT"><ArrowLeft className="arrow-pointed"/></div>
                    <div className="swiper-button-nextQT"><ArrowRight className="arrow-pointed"/></div>
            </Swiper>

        </div>
        </>
    )
}
export default React.memo(QuickTake)
