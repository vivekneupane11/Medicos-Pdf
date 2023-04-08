import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shortid from "shortid";
import SwiperCore, { Autoplay, Controller, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import { logEventWithParams } from '../../../../functions/commonMethod';
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_articleTopSlider.scss';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';

SwiperCore.use([Autoplay]);
SwiperCore.use([Controller]);
SwiperCore.use([Pagination]);

const ArticleTopSlider = ({ details, sourceDocId }) => {

    const [count, setCount] = useState(0);

    return (
        <div className='slider'>
            <Swiper
                loop={true}
                speed={800}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    "delay": 4000,
                    "disableOnInteraction": false
                }}
                navigation={{
                    nextEl: '.swiper-button-nextATS',
                    prevEl: '.swiper-button-prevATS',
                }}

                onSlideChange={({ realIndex }) => {
                    setCount(realIndex);
                }}
                className="ArticleTop-sliderContainer"

            >
                {details?.filter((data, index) => index < 3).map((data, index) => {

                  
                    return <SwiperSlide key={shortid.generate()} >
                        <div className='ArticleTop-wrapper' style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                            <div className='ArticleTop-wrapper-description'>

                              
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`,
                                    }}>
                                    <h3 className='ArticleTop-wrapper-description-title' >{data?.title?.rendered}</h3>
                                </Link>
                                <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#fff' fontSize='12px' />
                            </div>
                        </div>
                    </SwiperSlide>
                }
                )}

                <div className="swiper-button-prevATS"><ArrowLeft className="arrow-pointed" /></div>
                <div className="swiper-button-nextATS"> <ArrowRight className="arrow-pointed" /></div>
            </Swiper>



            <div className='ArticleTop-wrapper-Bottom '>
                {details?.filter((data, index) => index < 3).map((data, index) => (
                    <div key={shortid.generate()} className={`ArticleTop-wrapper-Bottom-wrapper ArticleTop-wrapper-Bottom-wrapper${index} ArticleTop-wrapper-Bottom-wrapper ArticleTop-wrapper-Bottom-wrapper${count === index ? "-active" : ""}`}>
                        <div className={`ArticleTop-wrapper-Bottom-wrapper-Description ${(index === count) ? 'ArticleTop-wrapper-Bottom-wrapper-DescriptionActive' : ''}`} >
                            <div className='ArticleTop-wrapper-Bottom-wrapper-Description-wrapper'>
                                <div className='ArticleTop-wrapper-Bottom-wrapper-Description-wrapper-number' >{index}</div>
                                <Link
                                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`,
                                    }}>
                                    <h4 className='ArticleTop-wrapper-Bottom-wrapper-Description-wrapper-heading'>{data?.title?.rendered}</h4>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ArticleTopSlider

