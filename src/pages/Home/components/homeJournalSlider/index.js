import axios from 'axios';
import firebase from "firebase";
import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import shortid from "shortid";
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

//local imports
import BlogCard from '../../../../components/global/blogCard';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ButtonWithArrow from '../buttonWithArrow';
import './_homeJournalSlider.scss';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HomeJournalSlider = () => {
  const [journalData, setJournalData] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(async () => {
    let isActive = true;
    async function addJournal(source, docId) {
      await axios.get(source,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*"
            // 'Referrer': 'origin'
          }
        }).then((response) => {
          if (response?.data) {
            // alert ("No data on firebase")
          
            // ADD JOURNAL OF RESPECTIVE SOURCE
            // ADD EXPIRATION DATE FOR JOURNAL
            let expiry_date = new Date();
            expiry_date.setDate(expiry_date.getDate() + parseInt(1))
            firebase.firestore().collection('Web-Journals')
              .doc("expiry")
              .set({
                expiry_date: expiry_date.toISOString()
              })
              .then(() => {
                response.data?.items?.map((data) => {
                  // console.log("Journal title", data?.title)
                  firebase.firestore().collection('Web-Journals')
                    .doc(docId)
                    .collection('Journals')
                    .doc(data.title.replace(/\/|\[|\]/g, ''))
                    .set({
                      data: data
                    })
                })
                if (isActive) {
                  setJournalData(response?.data?.items);
                }
              })
            // return response.data?.items;
          }
        }).catch((err) => {
          console.log("Error fetching journal from link", err);
        })
    }
    async function fetchJournal(source, docId) {
      try {
    
        await firebase.firestore().collection('Web-Journals')
          .doc(docId)
          .collection('Journals')
          .orderBy('date', 'desc')
          .limit(100)
          .onSnapshot(async (querySnapshot) => {
            // console.log("JOURNAL DATA DOC", querySnapshot);

            //CHECKS IF WEB JOURNAL COLLECTION EXISTS OF RESPECTIVE SOURCES
            if (!querySnapshot.empty) {
         
              return await firebase.firestore().collection('Web-Journals')
                .doc("expiry")
                .get()
                .then((res) => {
                  //CHECKS EXPIRY DATE OF JOURNAL TO UPDATE JOURNAL DATA 
                  if (res.data().expiry_date < new Date().toISOString()) {
                 
                    addJournal(source, docId)
                  } else {
                    //FETCHING JOURNAL FROM FIREBASE
                    let fetchedData = [];
                    querySnapshot.forEach((doc) => {
                      fetchedData.push(doc.data().data)
                    })
                   
                    if (isActive) {
                      setJournalData(fetchedData);
                    }
                  }
                })
            } else {
            
              addJournal(source, docId)
            }
          })

      } catch (error) {
        console.log("Error fetching journal from firebase", error);
      }
    }
    if (isActive) {
      await fetchJournal('https://medicospdf.com/api/journals?link=https://www.amjmed.com/current.rss', 'amjmed');
    }
    return () => {
      isActive = false;
    };

  }, [user?.uid])
  
  return (
    <div className='homeJournalSlider_container'>
      <h3 className='homeJournalSlider_container_head'>Medical Journals</h3>
      <Swiper
        loop={true}
        speed={800}
        spaceBetween={25}
        slidesPerView={3}
        // autoplay={{
        //   "delay": 6000,
        //   "disableOnInteraction": false
        // }}

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
          nextEl: '.swiper-button-nextHJS',
          prevEl: '.swiper-button-prevHJS',
        }}
        className='homeJournalSlider_container_swiper'
      >
        {
          journalData?.length > 0 ?

            journalData.filter((data,index)=>index<7).map((data, index) => {
              return <SwiperSlide key={shortid.generate()} className='homeJournalSlider_container_slide'>
                <BlogCard details={data} />
              </SwiperSlide>
            })

            :
            <div className="home_journal-loading-wrapper">
              <Loading />

            </div>
        }
        <div className="swiper-button-prevHJS"><FaChevronLeft className="arrow-pointed" /></div>
        <div className="swiper-button-nextHJS"> <FaChevronRight className="arrow-pointed" /></div>

      </Swiper>

      <div>
        <ButtonWithArrow name="View more Journals" link='/journal' />
      </div>

    </div>
  )
}

export default React.memo( HomeJournalSlider)
