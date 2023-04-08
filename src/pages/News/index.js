import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import img from '../../assets/images/bookbackg.webp';
import LazyLoadingComponentLoader from '../../components/lazyLoadingLoaderComponent';

import { logEventWithoutParams } from '../../functions/commonMethod';
import { TopImagePlaceholder } from '../Article/Component/topImagePlaceholder';
import "./index.scss";

const ScrollToTopButton = React.lazy(() => LazyLoadingComponentLoader(() => import("../../components/global/scrollToTopButton")));
const SEO = React.lazy(() => LazyLoadingComponentLoader(() => import("../../components/global/SEO")));
const Loading = React.lazy(() => LazyLoadingComponentLoader(() => import("../../components/loading")));
const WorldWidePlaceholder = React.lazy(() => LazyLoadingComponentLoader(() => import("../Article/Component/worldwidePlaceholder")));
const ArtAndCulture = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/artAndCulture")));
const CarousalTop = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/carousalTop")));
const Categories = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/categories")));
const LastWholeSection = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/lastWholeSection")));
const NewsLinks = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/newsLinks")));
const Recent = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/recent")));
const RecentPlaceholder = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/recentPlaceholder")));
const Selected = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/selected")));
const SelectedPosts = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/selectedPosts")));
const Technology = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/technology")));
const TechnologyPlaceholder = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/technologyPlaceholder")));
const TodayHighlights = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/todayHighlights")));
const Travel = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/travel")));
const Video = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/video")));
const WhatsTrendingToday = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/whatsTrendingToday")));


const News = () => {
  const [scrollTop] = useState(0);
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
    return () => {
      isMounted = false;
    }
  }, [])

  useEffect(() => {
    let isActive = true;
 
      // console.log("CHECKING RE RENDERING")
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
         
  
          if (response?.data && isActive) {
  
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
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
  
            if (response?.data && isActive) {
              setNewsData8(response.data?.items);
            }
          }).catch((err) => {
            return [];
          })
      }
    if(!newsData1)  getNewsData1()
    if(!newsData2)  getNewsData2()
    if(!newsData3)  getNewsData3()
    if(!newsData4) getNewsData4()
    if(!newsData5) getNewsData5()
    if(!newsData6) getNewsData6()
    if(!newsData7) getNewsData7()
    if(!newsData8) getNewsData8()
    

    return () => {
      isActive = false;
    };

  }, [newsData1?.length,newsData2?.length,newsData3?.length,newsData4?.length,newsData5?.length,newsData6?.length,newsData7?.length,newsData8?.length])



  return (
    <>
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

        <ScrollToTopButton/>
        </Suspense>
        <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

        <SEO image={img} title=' Get medical news from various source around the globe.One place for all the medical news you will ever need. Medicos pdf news bring medical news to you...' description='MedicosPDF News  provides  latest medical News for medical students to enhance their knowledge and skill'/>
      </Suspense>
      <div className="news-page-container">
        <div className="progressBarContainer">
          <div className="progressBarContainer-increment" style={{ width: `${scrollTop}%` }}></div>
        </div>
        {newsData1 ?
              <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

          <CarousalTop details={newsData1} />
          </Suspense>
          :
         <TopImagePlaceholder/>
        }
        {newsData4 ?
          <div>
                  <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <NewsLinks details={newsData4} />
            </Suspense>
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <Recent  detailsRight={newsData4} />
       </Suspense>
          </div>
          :
          <div>
                  <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <RecentPlaceholder/>
            </Suspense>
          </div>
        }
        {
          newsData2 ?
            <div>
                    <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Technology details={newsData2} />
        </Suspense>
        <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <TodayHighlights details={newsData2} />
            </Suspense>
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <ArtAndCulture details={newsData2} />
           </Suspense>
           <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Selected details={newsData2} />
              </Suspense>
            </div>
            :
            <div >
                    <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

             <TechnologyPlaceholder/>
             </Suspense>
            </div>
        }
        {
          newsData3 ?
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <Travel  newsData={newsData3} />
            </Suspense>
            :
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <WorldWidePlaceholder/>
            </Suspense>

        }
        <div className="news-page-container-categories">
          <h3 className="news-page-container-categories-head1">Categories</h3>
          <h6 className="news-page-container-categories-head2">FEATURED POSTS</h6>
          {newsData3 ?
                <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <Categories details={newsData3} />
            </Suspense>
            :
            <div className="news-loading-wrapper">
                 <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
          }
        </div>
   
        
        {
          newsData3 ?
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <Video details={newsData3} />
            </Suspense>
            :
            <div className="news-loading-wrapper">
               <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
        }
        {
          newsData5 ?
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <SelectedPosts details={newsData5} />
         </Suspense>
            :
            <div className="news-loading-wrapper">
              <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
        }

        {
          newsData7 ?
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <WhatsTrendingToday details={newsData7} />
           </Suspense>
            :
            <div className="news-loading-wrapper">
                  <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
        }


        {
          newsData1 ?
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <LastWholeSection details={newsData1} />
            </Suspense>
            :
            <div className="news-loading-wrapper">
                    <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
        }
      </div>
    </>
  )
}
export default React.memo(News)
