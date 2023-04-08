import React from 'react';
import { Link } from 'react-router-dom';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
//local imports
// import { logEventWithParams } from '../../../../functions/commonMethod';
import BookCard from '../../../Book/components/bookCard';
import './_relatedBooksSlider.scss';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



const RelatedBooksSlider = ({bookDetails}) => {

        return (
        <div className="RelatedBooksSlider-container">
            <Swiper
                autoHeight={true}
                loop={true}
                // slidesPerView={slidesPerView}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-nextRBS',
                    prevEl: '.swiper-button-prevRBS',
                }}
                centeredSlides={true}
                
                breakpoints={{
                    "200": {
                        "slidesPerView": 1,
                    },
                    "760": {
                        "slidesPerView": 2,
                    },
                }}
                className="RelatedBooksSlider-container-slider"
            >
                {bookDetails?.map((book, index) => (

                    <SwiperSlide key={book.image + index} className="RelatedBooksSlider-container-slider-slides" >
                    <Link
                    
                      key={book.image + index}
                     className='links'
                      to={{
                        pathname: `/bookdetails/${book?.title}`,
                        state: {
                          data: JSON.stringify(book),
                          wholeData: JSON.stringify(bookDetails),
                        }
                      }}>
                        <BookCard
                            data={book}
                            image={book.image}
                            title={book.title}
                            author={book.writer}
                            rating={book.rating}
                        />
                        </Link>
                    </SwiperSlide>

                ))}

                <div className="swiper-button-prevRBS"><ArrowLeft className="next"/></div>
                <div className="swiper-button-nextRBS"> <ArrowRight className="next" /></div>

            </Swiper>
        </div>
    )
}
export default RelatedBooksSlider
