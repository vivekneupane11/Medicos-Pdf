import axios from 'axios';
import React, { useEffect, useState } from 'react';

//LOCAL IMPORTS
import { newsRecentDetailsLeft, newsTravelDetails } from '../../components/constants/mock';
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { logEventWithoutParams } from '../../functions/commonMethod';
import ArtAndCulture from './components/artAndCulture';
import CarousalTop from './components/carousalTop';
import Categories from './components/categories';
import LastWholeSection from './components/lastWholeSection';
import NewsLinks from './components/newsLinks';
import Recent from './components/recent';
import Selected from './components/selected';
import SelectedPosts from './components/selectedPosts';
import Technology from './components/technology';
import TodayHighlights from './components/todayHighlights';
import Travel from './components/travel';
import Video from './components/video';
import WhatsTrendingToday from './components/whatsTrendingToday';
import "./index.scss";



const News = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [newsData1, setNewsData1] = useState(null);
  const [newsData2, setNewsData2] = useState(null);
  const [newsData3, setNewsData3] = useState(null);
  const [newsData4, setNewsData4] = useState(null);
  const [newsData5, setNewsData5] = useState(null);
  const [newsData6, setNewsData6] = useState(null);
  const [newsData7, setNewsData7] = useState(null);
  const [newsData8, setNewsData8] = useState(null);


  // CAUSED PAGE RE-RENDERING
  // const onScroll = () => {
  //   const winScroll = document.documentElement.scrollTop;
  //   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  //   const scrolled = (winScroll / height) * 100;
  //   setScrollTop(scrolled);
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);

  // }, [])
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams("web_news_page_visited")
    }
    return (() => {
      isMounted = false;
    })
  }, [])

  useEffect(() => {
    let isActive = true;
    const getNewsData1 = async () => {
      await axios.get('https://medicospdf.com/api/news?link=http://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }
      ).then((response) => {
       

        if (response?.data) {

          setNewsData1(response.data?.items);
        }
      }).catch((err) => {
        return [];
      })
    }

    const getNewsData2 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://www.medscape.com/cx/rssfeeds/2700.xml',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*"
            // 'Referrer': 'origin'
          }
        }).then((response) => {

          if (response?.data) {
            setNewsData2(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }
    const getNewsData3 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://www.theguardian.com/science/rss',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }).then((response) => {

          if (response?.data) {
            setNewsData3(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }
    const getNewsData4 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://medicalxpress.com/rss-feed/',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }).then((response) => {

          if (response?.data) {
            setNewsData4(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }

    const getNewsData5 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://medicalnewsbulletin.com/feed/',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }).then((response) => {

          if (response?.data) {
            setNewsData5(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }
    const getNewsData6 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://medlineplus.gov/groupfeeds/new.xml',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }).then((response) => {

          if (response?.data) {
            setNewsData6(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }

    const getNewsData7 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://www.news-medical.net/syndication.axd?format=rss',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
          // 'Referrer': 'origin'
        }
      }).then((response) => {

          if (response?.data) {
            setNewsData7(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }

    const getNewsData8 = async () => {

      await axios.get('https://medicospdf.com/api/news?link=https://www.medicaldaily.com/rss',
           {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*"
            // 'Referrer': 'origin'
          }
        }).then((response) => {

          if (response?.data) {
            setNewsData8(response.data?.items);
          }
        }).catch((err) => {
          return [];
        })
    }

    if (isActive && (!newsData1 || !newsData2 || !newsData3 || !newsData4 || !newsData5 || !newsData6 || !newsData7 || !newsData8)) {
      // console.log("CHECKING RE RENDERING")
      getNewsData1()
      getNewsData2()
      getNewsData3()
      getNewsData4()
      getNewsData5()
      getNewsData6()
      getNewsData7()
      getNewsData8()
    }

    return () => {
      isActive = false;
    };

  }, [])



  return (
    <>
   
        <SEO title='MedicosPDF News page' description='MedicosPDF News page provides provides latest medical News for medical students to enhance their knowledge and skill'/>
      <div className="news-page-container">
        <div className="progressBarContainer">
          <div className="progressBarContainer-increment" style={{ width: `${scrollTop}%` }}></div>
        </div>
        {newsData1 ?
          <CarousalTop details={newsData1} />
          :
          <div className="news-loading-wrapper">
            <Loading />
          </div>
        }
        {newsData4 ?
          <div>
            <NewsLinks details={newsData4} />
            <Recent detailsLeft={newsRecentDetailsLeft} detailsRight={newsData4} />
          </div>
          :
          <div className="news-loading-wrapper">
            <Loading />
          </div>
        }
        {
          newsData2 ?
            <div>
              <Technology details={newsData2} />
              <TodayHighlights details={newsData2} />
              <ArtAndCulture details={newsData2} />
              <Selected details={newsData2} />
            </div>
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
        }
        {
          newsData3 ?
            <Travel details={newsTravelDetails} newsData={newsData3} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>

        }
        <div className="news-page-container-categories">
          <h3 className="news-page-container-categories-head1">Categories</h3>
          <h6 className="news-page-container-categories-head2">FEATURED POSTS</h6>
          {newsData3 ?
            <Categories details={newsData3} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
          }
        </div>
   
        
        {
          newsData3 ?
            <Video details={newsData3} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
        }
        {
          newsData5 ?
            <SelectedPosts details={newsData5} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
        }

        {
          newsData7 ?
            <WhatsTrendingToday details={newsData7} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
        }


        {
          newsData1 ?
            <LastWholeSection details={newsData1} />
            :
            <div className="news-loading-wrapper">
              <Loading />
            </div>
        }
      </div>
    </>
  )
}

export default News
