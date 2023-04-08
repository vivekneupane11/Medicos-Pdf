import React from 'react'
import './_moreFromHypeSlider.scss'
import { Link } from 'react-router-dom';
import { logEventWithParams } from '../../../../functions/commonMethod';
import { FaArrowLeft,FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import AuthorDateRead from '../author-date-readTime';
SwiperCore.use([Autoplay]);


const MoreFromHypeSlider = ({details}) => {

    const newTab=(url,title)=>{
        window.open(
           url, "_blank");
           logEventWithParams('web_news_detail_page_opened', { newsTitle: title })
    }
    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index %2 == 0) {
            color = 'skyblue'
        } 
        return color;
    }

    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text?.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

      };


    return (
        <>
          <div className="newsMoreFromHypeSlider-wrapper">
          

             <Swiper
                loop={true}
                speed={800}
                slidesPerView={1}
                centeredSlides={true}      
                // autoplay={{
                //     "delay": 4000,
                //     "disableOnInteraction": false
                //   }} 
                  navigation={{
                    nextEl: '.swiper-button-nextt',
                    prevEl: '.swiper-button-prevv',
                }}
                className="newsMoreFromHypeSlider-wrapper-swiperContainer"
             >

                {details?.map((data,index)=>(
                        <SwiperSlide key={index}> 
                            <div className="newsMoreFromHypeSlider-wrapper-slide">
                          
                                <div className="newsMoreFromHypeSlider-wrapper-slide-left">
                                    <div className="newsMoreFromHypeSlider-wrapper-slide-left-top">
                                        <h3 onClick={()=>newTab(data?.link)} className="newsMoreFromHypeSlider-wrapper-slide-left-top-head1">{ data?.title}</h3>
                                        {/* <h4 className="newsMoreFromHypeSlider-wrapper-slide-left-top-head2">our best stuff for product designers</h4> */}
                                    </div>

                                    <div className="newsMoreFromHypeSlider-wrapper-slide-left-bottom">
                                        <NewsLinkTag color={getColorsByIndex(index)} tag={data?.content}/>

                                         {/* <div className="newsMoreFromHypeSlider-wrapper-slide-left-bottom-head" dangerouslySetInnerHTML={{__html: data?.excerpt?.rendered} }></div> */}
                                        <div style={{marginTop:data?.content? '20px':''}}>

                                         <AuthorDateRead  date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.contentSnippet) + " min read"} color='#fff' fontSize='12px'/>
                                        </div>
                                    </div>

                                </div>
                               
                               
                                    <div onClick={()=>newTab(data?.link)} className="newsMoreFromHypeSlider-wrapper-slide-rightImg" style={{backgroundImage:`url(${data?.image?.source_url || data['media:content']?.$?.url})`}}>
                                        {/* <div className="newsMoreFromHypeSlider-wrapper-slide-rightImg-btn">
                                            {data.newsPlayBtn}
                                        </div> */}
                                    </div>
                                
                                
                            </div>
                        
                        </SwiperSlide>

                ))}
                   
                    <div className="swiper-button-prevv"><FaArrowLeft /></div>
                    <div className="swiper-button-nextt"><FaArrowRight /></div>
            </Swiper>

        </div>
        </>
    )
}

export default MoreFromHypeSlider
