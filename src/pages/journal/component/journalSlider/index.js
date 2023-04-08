import React from 'react'
import './_journalSlider.scss'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import { logEventWithParams } from '../../../../functions/commonMethod';



SwiperCore.use([Autoplay]);


const JournalSlider = ({ details }) => {
    const newTab = (url, title) => {
        window.open(
            url, "_blank");
        logEventWithParams('web_journals_detail_page_opened', { journalTitle: title })
    }
    return (
        <>
            <div className="journalSlider-wrapper">


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
                        nextEl: '.swiper-journal-button-previous',
                        prevEl: '.swiper-journal-button-nxt',
                    }}
                    className="journalSlider-wrapper-swiperContainer"
                >

                    {details.map((data) => (
                        <SwiperSlide key={data.id} className="swipper-slide">
                            <div className="journalSlider-wrapper-slide">
                                <div className="journalSlider-wrapper-slide-left">
                                    <div className="journalSlider-wrapper-slide-left-top">
                                        <h3 className="journalSlider-wrapper-slide-left-top-head1">More from InHype</h3>
                                        <h4 className="journalSlider-wrapper-slide-left-top-head2">our best stuff for product designers</h4>
                                    </div>

                                    <div className="journalSlider-wrapper-slide-left-bottom">
                                        <NewsLinkTag key={data.tag.id} color={data.tag.color} tag={data.tag.tag} link={data.tag.link} />
                                        <h3 className="journalSlider-wrapper-slide-left-bottom-head"><a onClick={()=>newTab(data?.headinglink,data?.heading)} href={data.headinglink}>{data.heading}</a></h3>
                                        <AuthorDateRead author={data.dateAndTime.author} link={data.dateAndTime.link} date={data.dateAndTime.date} readTime={data.dateAndTime.readTime} color={data.dateAndTime.color} fontSize={data.dateAndTime.fontSize} />
                                    </div>

                                </div>
                                <div className="journalSlider-wrapper-slide-rightImg" style={{ backgroundImage: `url(${data.bgImg})` }}>
                                    <div className="journalSlider-wrapper-slide-rightImg-btn">
                                        {data.newsPlayBtn}
                                    </div>
                                </div>

                            </div>

                        </SwiperSlide>

                    ))}

                    <div className="swiper-journal-button-previous"><FaArrowLeft /></div>
                    <div className="swiper-journal-button-nxt"><FaArrowRight /></div>
                </Swiper>

            </div>
        </>
    )
}
export default JournalSlider
