import React from 'react'
import './_relatedBooksSlider.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import BookCard from '../../../Book/components/bookCard';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



const RelatedBooksSlider = ({slidesPerView,bookDetails,activeData}) => {

    

     const handleChange=(book)=>{
         activeData(book)

     }

     const clickhandlerebook = ()=>handleChange(book)
    return (
        <div className="RelatedBooksSlider-container">
            <Swiper
                autoHeight={true}
                loop={true}
                slidesPerView={slidesPerView}
                navigation={{
                    nextEl: '.swiper-button-nextRBS',
                    prevEl: '.swiper-button-prevRBS',
                }}
                centeredSlides={true}
                className="RelatedBooksSlider-container-slider"
            >
                {bookDetails.map((book,index) => (
                       
                        <SwiperSlide  key={book.image + index} className="RelatedBooksSlider-container-slider-slides" onClick={clickhandlerebook} >
                            <BookCard
                                 image={book.image}
                                 title={book.subject}
                                 author={book.writer}
                                 rating={book.rating}
                            />
                        </SwiperSlide>
                   
                ))}
               
                <div className="swiper-button-prevRBS"><ArrowLeft /></div>
                <div className="swiper-button-nextRBS"> <ArrowRight /></div>

            </Swiper>
        </div>
    )
}

export default RelatedBooksSlider
