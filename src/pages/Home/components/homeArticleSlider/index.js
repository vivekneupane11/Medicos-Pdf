import axios from 'axios';
import firebase from "firebase";
import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import FeatureBlogCard from '../../../../components/global/featureBlogCard';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ButtonWithArrow from '../buttonWithArrow';
import './_homeArticleSlider.scss';
SwiperCore.use([Autoplay]);


const HomeArticleSlider = () => {
  const { user } = useContext(AuthContext);
  const [articleDataSecond, setArticleDataSecond] = useState([]);

  useEffect(async () => {
    let isMounted = true;
    async function addArticle(source, docId) {
      await axios.get(source).then((response) => {
        if (response?.data) {
          // alert ("No data on firebase")
          Promise.all(
            response?.data.map(async data => {
              if (data._links["wp:featuredmedia"][0].href) {
                let image = await axios.get(data._links["wp:featuredmedia"][0].href,)
          
                data.image = image.data.media_details.sizes.medium;
                return data;
              }
            })
          ).then(data => {
            // console.log('This is article dataaaa',data);
            // ADD ARTICLE OF RESPECTIVE SOURCE
            // ADD EXPIRATION DATE FOR ARTICLE
            let expiry_date = new Date();
            expiry_date.setDate(expiry_date.getDate() + parseInt(1))
            firebase.firestore().collection('Web-Articles')
              .doc("expiry")
              .set({
                expiry_date: expiry_date.toISOString()
              })
              .then(() => {
                data?.map((article) => {
                  // console.log("Journal title", article?.title?.rendered)
                  firebase.firestore().collection('Web-Articles')
                    .doc(docId)
                    .collection('Articles')
                    .doc(article?.title?.rendered.replace(/\/|\[|\]/g, ''))
                    .set({
                      data: article,
                      date: article?.modified,
                      sourceDocId:docId
                    })
                })
                if(isMounted){
                  setArticleDataSecond(data);
                }
              })
            // return response.data?.items;
          })
        }
      }).catch((err) => {
        console.log("Error fetching article from link", err);
      })
    }
    async function fetchArticle(source, docId) {
      try {
    
        await firebase.firestore().collection('Web-Articles')
          .doc(docId)
          .collection('Articles')
          .orderBy('date', 'desc')
          .limit(100)
          .onSnapshot(async (querySnapshot) => {
            // console.log("ARTICLE DATA DOC", querySnapshot);

            //CHECKS IF WEB ARTICLE COLLECTION EXISTS OF RESPECTIVE SOURCES
            if (!querySnapshot.empty) {
        
              return await firebase.firestore().collection('Web-Articles')
                .doc("expiry")
                .get()
                .then((res) => {
                  //CHECKS EXPIRY DATE OF ARTICLE TO UPDATE ARTICLE DATA 
                  if (res.data().expiry_date < new Date().toISOString()) {
               
                    addArticle(source, docId)
                  } else {
                    //FETCHING ARTICLE FROM FIREBASE
                    let fetchedData = [];
                    querySnapshot.forEach((doc) => {
                      fetchedData.push(doc.data().data)
                    })
               
                    if(isMounted){
                      setArticleDataSecond(fetchedData);
                    }
                  }
                })
            } else {
            
              addArticle(source, docId)
            }
          })

      } catch (error) {
        console.log("Error fetching journal from firebase", error);
      }
    }
    if (isMounted) {
      await fetchArticle('https://cardiactamponade.com/wp-json/wp/v2/posts', 'cardiactamponade')
    }
    return (() => {
      isMounted = false
    })
  }, [user?.uid])

  return (
    <>
      <div className="homeArticleSlider_container">

        <h3 className="homeArticleSlider_container_head">Medical Articles</h3>
        <Swiper
          loop={true}
          speed={800}
          slidesPerView={4}
          spaceBetween={30}
          // centeredSlides={true}      
          // autoplay={{
          //     "delay": 4000,
          //     "disableOnInteraction": false
          //   }} 
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
              "slidesPerView": 2,
            },
            "1026": {
              "slidesPerView": 3,
            }
          }}
          navigation={{
            nextEl: '.swiper-button-nextHAS',
            prevEl: '.swiper-button-prevHAS',
          }}
          className="homeArticleSlider_container_swiper"
        >

          {
            articleDataSecond.length > 0 ?
              articleDataSecond.map((data, index) => {
                return <SwiperSlide key={index} className="homeArticleSlider_container_swiper_slide">

                  <FeatureBlogCard details={data} source={"cardiactamponade"} />

                </SwiperSlide>
              })
              :
              <div className='homeArticleSlider_loading'>
                <Loading />
              </div>
          }


          <div className="swiper-button-nextHAS"><FaChevronRight className="arrow-pointed" /></div>
          <div className="swiper-button-prevHAS"><FaChevronLeft className="arrow-pointed" /></div>
        </Swiper>
        <ButtonWithArrow name="View more Articles" link='/article' />
      </div>
    </>
  )
}

export default React.memo(HomeArticleSlider) 
