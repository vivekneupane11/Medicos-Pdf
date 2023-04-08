import React from 'react';
// import Swiper core and required modules
import { Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
// import useLocalStorage from '../../../../customHooks/useLocalStorage';
import SlideCard from '../../../SlideDetail/components/slideCard';
import './index.scss';
// import { AiOutlineCheckSquare } from 'react-icons/ai';
import Loading from '../../../../components/loading';
import CheckCircle from '../../../../components/global/icons/check_Circle';

const PlaylistSlider = ({slideaddedToPlaylist,useruploadedSlides,addToPlayListHandler})=>{

  
   




    return <div className="playlist-select-your-slide-container">
            <section className="playlist-footer">
        <h3> Please select your slides you want to add to this playlist </h3>
  { slideaddedToPlaylist?.length !== 0 && <span className='selected-count'>Selected ({slideaddedToPlaylist?.length})</span>}  
        </section>
        
    {useruploadedSlides?.length ? <Swiper
    // install Swiper modules
    modules={[Pagination,  Scrollbar, A11y]}
    spaceBetween={10}
    slidesPerView={5}
    navigation={{
              
            }}
    loop={true}
    breakpoints={{
              "200": {
                "slidesPerView": 1,
              },
              "500": {
                "slidesPerView": 1,
              },
              "725": {
                "slidesPerView": 2,
              },
              "768": {
                "slidesPerView": 3,
              },
              "1024": {
                "slidesPerView": 4,
              },
              "1250": {
                "slidesPerView": 5,
              }
            }}
    pagination={{ clickable: true }}

    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
  >
   {useruploadedSlides.map((ele,index)=> <SwiperSlide key={index}>  
        <div className='playlist-slide-container' onClick={()=>addToPlayListHandler(ele.SlideName)}>
           
            <section className="playlist-checkbox-selected">
<CheckCircle className={ slideaddedToPlaylist?.includes(ele.SlideName) ?'playlist-checkbox-icon-selected playlist-checkbox-icon-selected-active' :'playlist-checkbox-icon-selected'} size={60} />
            </section>
        <SlideCard
      title={ele.slideCategory}
       description={ele.SlideName}
    images={ele.slideImages}
     datas={ele} />
</div>
     </SwiperSlide>)}

  </Swiper>
:
<Loading/>
}
    </div>
}

export default PlaylistSlider;