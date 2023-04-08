import React from 'react'
import './_europeanNews.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import SwiperCore, { Autoplay } from 'swiper';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";

SwiperCore.use([Autoplay]);

const European_News = ({ details, sourceDocId }) => {
  const getColorsByIndex = (index) => {
    let color = "yellow";
    if (index % 3 == 0) {
      color = 'red'
    } else if (index % 2 == 0) {
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

      <div className="europeanNews-wrapper">
        <h3 className="europeanNews-wrapper-head1">Medical Inside Articles</h3>

        <Swiper
          className="europeanNews-wrapper-container"
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
          {details.filter((data, index) => index <= 4).map((data, index) => (

            <SwiperSlide key={shortid.generate()} >
              <div className="europeanNews-wrapper-content">
                <div className="europeanNews-wrapper-slide">
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                    }}>
                    <div className="europeanNews-wrapper-slide-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                      <div className="europeanNews-wrapper-slide-img-icon">
                        {data.newsPlay}
                        {data.rating}
                      </div>
                    </div>
                  </Link>
                  <div className="europeanNews-wrapper-slide-tag">
                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.slug} className="TodaysHighlights-wrapper-slider-slide-description-tag" />
                  </div>
                  <Link
                    onClick={() => logEventWithParams('web_article_detail_page_opened', { articleTitle: data?.title?.rendered })}
                    style={{ textDecoration: 'none' }}
                    to={{
                      pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${sourceDocId}`
                    }}>
                    <h3 className="europeanNews-wrapper-slide-head">{data?.title?.rendered}</h3>
                  </Link>
                  <p style={{ fontSize: '18px', marginBottom: '10px' }}>{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "")}</p>
                  <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px' className="TodaysHighlights-wrapper-slider-slide-description-dateread" />
                </div>
              </div>
            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </>
  )
}

export default European_News
