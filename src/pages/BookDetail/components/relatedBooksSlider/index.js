import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import { logEventWithParams } from '../../../../functions/commonMethod';
import BookCard from '../../../Book/components/bookCard';
import './_relatedBooksSlider.scss';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);



const RelatedBooksSlider = ({
    // slidesPerView,
    bookDetails, activeData }) => {



    const handleChange = (book) => {
        activeData(book);
        logEventWithParams("web_book_opened",{book_title:book?.title, book_subcategory: book?.subject})

    }
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

                    <SwiperSlide key={book.image + index} className="RelatedBooksSlider-container-slider-slides" onClick={() => handleChange(book)} >
                        <BookCard
                            data={book}
                            image={book.image}
                            title={book.title}
                            author={book.writer}
                            rating={book.rating}
                        />
                    </SwiperSlide>

                ))}

                <div className="swiper-button-prevRBS"><FaChevronLeft /></div>
                <div className="swiper-button-nextRBS"> <FaChevronRight /></div>

            </Swiper>
        </div>
    )
}

export default RelatedBooksSlider
