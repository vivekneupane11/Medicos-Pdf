import React from 'react'
import './_joinOurWorld.scss'



import { FaChevronLeft,FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation} from 'swiper';



const JoinOurWorld = ({details}) => {
    return (
        <div className="JoinOurWorld-wrapper">
           <h1 className="JoinOurWorld-wrapper-heading">join our world</h1>
           <div className="JoinOurWorld-wrapper-col1">
                <h1 className="JoinOurWorld-wrapper-col1-head">see our customer opinion</h1>
                <p className="JoinOurWorld-wrapper-col1-para">Meet Wingman, a robust suite of styled pages and components, powered by Bootstrap 4. The ideal starting point for product landing pages, stylish web-apps and complete company websites.</p>
                <button className="JoinOurWorld-wrapper-col1-btn">Contact us</button>
          </div>
           <Swiper
                loop={true}
                slidesPerView={1}
                centeredSlides={true}
                speed={700}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    "300": {
                      "slidesPerView":1,
                    },
                    "768": {
                      "slidesPerView": 3,
                    },
                    "1024": {
                      "slidesPerView": 4,
                    }
                }}
           >
             {details.map(data=>(
                <SwiperSlide key={data.id}> 
                    <div className="JoinOurWorld-wrapper-slide">
                        <p className="JoinOurWorld-wrapper-slide-quote">{data.clientQuote}</p>
                        <div className="JoinOurWorld-wrapper-slide-info">
                            <img src={data.clientImage}/>
                            <h5 className="JoinOurWorld-wrapper-slide-info-name">{data.clientName}</h5>
                        </div>
                    </div>
                </SwiperSlide>
             ))}
                
            
                <div class="swiper-button-prev"><FaChevronLeft /></div>
                <div class="swiper-button-next"> <FaChevronRight /></div>
        </Swiper>

      
    </div>
    )
}

export default JoinOurWorld
