import React from 'react'
import { Link } from 'react-router-dom'
import './_trending.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
SwiperCore.use([Autoplay]);

const Trending = ({ details,sourceDocId}) => {
 
  return (
    <>

      <div className="trending-wrapper">
        <h3 className="trending-wrapper-head1">Whats Trending Today</h3>

        <Swiper
          loop={true}
          speed={800}
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={15}
          autoplay={{
            "delay": 3000,
            "disableOnInteraction": false
          }}
          breakpoints={{
            "200": {
              "slidesPerView": 1,
            },
            "500": {
              "slidesPerView": 1,
            },
            "768": {
              "slidesPerView": 2,
            },
            "1026": {
              "slidesPerView": 4,
            }
          }}
        >
          {details?.filter((data, index) => index > 3 && index < 8).map((data, index) => (
            <SwiperSlide key={shortid.generate()}>
              <div className="trending-wrapper-content">
                <div className="trending-wrapper-slide">
                  <Link
                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                    className='links'
                    to={{
                      pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                    }}>
                    <div className="trending-wrapper-slide-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                      <div className="trending-wrapper-slide-img-icon">
                       
                      </div>
                    </div>
                  </Link>
                  <div className="trending-wrapper-slide-tag">
                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.slug} />
                  </div>
                  <Link
                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                    className='links'
                    to={{
                      pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                    }}>
                    <h3 className="trending-wrapper-slide-head">{data?.title?.rendered}</h3>
                  </Link>
                  <p className='content'>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                  <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' />
                </div>
              </div>
            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </>
  )
}

export default Trending
