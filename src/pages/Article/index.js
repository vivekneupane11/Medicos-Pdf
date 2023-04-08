import React, { Suspense, useEffect, useState } from 'react';
import ScrollToTopButton from '../../components/global/scrollToTopButton';
import axios from 'axios';


//LOCAL IMPORTS
import { logEventWithoutParams } from '../../functions/commonMethod';
import { LastSection } from './Component/LastSection';
import { Markets } from './Component/markets';
import { Selected } from './Component/Selected';
import { StoriesForYou } from './Component/StoriesForYou';
import { Income } from './Income/income';

import './_article.scss';
import LazyLoad from 'react-lazyload';
import { MainTopPlaceholder } from './Component/articleMainTopPlaceholder';
import { StoriesForYouPlaceholder } from './Component/storiesForYouPlaceholder';
import LazyLoadingComponentLoader from "../../components/lazyLoadingLoaderComponent";

import { TopImagePlaceholder } from './Component/topImagePlaceholder';
// import { collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import SEO from '../../components/global/SEO';
// const SEO = React.lazy(() => LazyLoadingComponentLoader(() => import("../../components/global/SEO")));
const Loading = React.lazy(() => LazyLoadingComponentLoader(() => import("../../components/loading")));
const MainTop = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/articleMainTop")));
const ArticleTopSlider = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/articleTopSlider")));
const European_News = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/EuropeanNews")));
const TopSlider = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/topSlider")));
const Trending = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/trending")));
const WorldWideNews = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/WorldWideNews")));
const QuickTake = React.lazy(() => LazyLoadingComponentLoader(() => import("./QuickTake")));
const WorldWidePlaceholder = React.lazy(() => LazyLoadingComponentLoader(() => import("./Component/worldwidePlaceholder")));
const RecentPlaceholder = React.lazy(() => LazyLoadingComponentLoader(() => import("../News/components/recentPlaceholder")));




const Article = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [articleData, setArticleData] = useState([])
  const [articleDataSecond, setArticleDataSecond] = useState([])
  const [articleDataThird, setArticleDataThird] = useState([])
  const [articleDataFourth, setArticleDataFourth] = useState([])
// const db= getFirestore();
const getFirebaseAll=()=>{
  return Promise.all([
    import('../../firebase/firestore')
  ])
  .then(([firestore])=>{
    return{firestore}
  })
}

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams("web_article_page_visited")
    }
    return () => {
      isMounted = false;
    }
  }, [])



  useEffect(() => {
    let isMounted = true;
   
    if (isMounted) {
      async function addArticle(source, docId) {
        try { const{firestore:{db,setDoc,doc}}=await getFirebaseAll()
          await axios?.get(source).then((response) => {
            if (response?.data) {
              Promise.all(
                response?.data.map(async data => {
                  if (data._links["wp:featuredmedia"][0].href) {
                    let image = await axios?.get(data._links["wp:featuredmedia"][0].href,)
    
                    data.image = image.data.media_details.sizes.full;
                    return data;
                  }
                })
              ).then(data => {
                // ADD ARTICLE OF RESPECTIVE SOURCE
                // ADD EXPIRATION DATE FOR ARTICLE
                let expiry_date = new Date();
                expiry_date.setDate(expiry_date.getDate() + parseInt(1))
                setDoc(doc(db,"Web-Articles","expiry"),{
                  expiry_date: expiry_date.toISOString()
                })
              
                  .then(() => {
                    data?.map((article) => {
                      try {
                          setDoc(doc(db,'Web-Articles',docId,'Articles',article?.title?.rendered.replace(/\/|\[|\]/g, ''),
                          {
                            data: article,
                            date: article?.modified,
                            sourceDocId: docId
                          }))
                          setDoc(doc(db,'Web-SearchByTag',
                          (article?.slug + article?.title?.rendered.replace(/\/|\[|\]/g, '') + article?.excerpt?.rendered.replace(/\/|\[|\]/g, '')).slice(0, 1450),{
                            title: article?.title?.rendered.replace(/\/|\[|\]/g, ''),
                            type: 'article',
                            sourceDocId: docId
                          }))
                      } catch (error) {
                        console.log('Error while adding article to firebase', error)
                      }
                    })
                    if (isMounted) {
                      setAllArticles((init) => [...init, data]);
                    }
                  })
                // return response.data?.items;
              })
            }
          })
        } catch (error) {
          console.log("Error fetching article from link", error)
        }
       
      }
      async function fetchArticle(source, docId) {
        try {
          const{firestore:{db,query,collection,orderBy,limit,onSnapshot,getDoc,doc}}=await getFirebaseAll()
          
            const colref=query(collection(db,'Web-Articles',docId,'Articles'),
            orderBy('date', 'desc'),
            limit(100))
          await onSnapshot(colref, async(querySnapshot) => {
              // console.log("ARTICLE DATA DOC", querySnapshot);
  
              //CHECKS IF WEB ARTICLE COLLECTION EXISTS OF RESPECTIVE SOURCES
              if (!querySnapshot.empty) {
  
                return await getDoc(doc(db,"Web-Articles","expiry"))
                  .then((res) => {
                    //CHECKS EXPIRY DATE OF ARTICLE TO UPDATE ARTICLE DATA 
                    if (res.data().expiry_date < new Date().toISOString()) {
  
                      addArticle(source, docId)
                    } else {
                      //FETCHING ARTICLE FROM FIREBASE
                      let fetchedData = [];
                      querySnapshot.forEach((doc) => {
                        fetchedData.push(doc.data().data)
                        // console.log('This is slug',doc.data().data.slug);
                      })
  
                      if (isMounted) {
                        setAllArticles((init) => [...init, fetchedData]);
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
       fetchArticle('https://cardiactamponade.com/wp-json/wp/v2/posts', 'cardiactamponade')
       fetchArticle('https://medschoolinsiders.com/wp-json/wp/v2/posts', 'medschoolinsiders')
       fetchArticle('https://thenepalidoctor.com/wp-json/wp/v2/posts', 'thenepalidoctor')
       fetchArticle('https://amedstudentsjourney.com/wp-json/wp/v2/posts', 'amedstudentsjourney')
    }
    return (() => {
      isMounted = false
    })
  }, [])


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      allArticles.map((article, index) => {
      
        if (index === 0 && isMounted) {
          setArticleData(article)
        } else if (index === 1 && isMounted) {
          setArticleDataSecond(article)
        } else if (index === 2 && isMounted) {
          setArticleDataThird(article)
        } else if (index === 3 && isMounted) {
          setArticleDataFourth(article)
        }
      })
    }
    return()=>{
      isMounted=false
    }
  }, [allArticles?.length,allArticles])


  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const shuffledData1 = shuffle(articleData)
  const shuffledData2 = shuffle(articleDataSecond)
  const shuffledData3 = shuffle(articleDataThird)

  return (
    <>
      <div className="article-wrapper">
        <SEO title='Medicos Pdf Article contains all medical research , articles ,recent medical study and experiments for you. Get daily health tips , Medical student medlife and journey. Best articles for growth in medical fields and medical aspirants. Get medical journals from various sources at one place..' description='This is the artice details page of the medicospdf'/>
      <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>
       </Suspense>
        <ScrollToTopButton/>
        {articleDataSecond.length > 0 ?
                      <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

          <ArticleTopSlider sourceDocId='cardiactamponade' details={shuffledData1} />
        </Suspense>
          :
         <TopImagePlaceholder/>
        }

        {articleData.length > 0 ?
                      <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

          <MainTop sourceDocId='thenepalidoctor' mainTopDetails={shuffledData3} />
       </Suspense>
          :
            <MainTopPlaceholder/>
          
        }

        {articleData.length > 0 ?
          <StoriesForYou sourceDocId='cardiactamponade' stories={articleData} />
          :
         
          <StoriesForYouPlaceholder/>
        
        }

        {articleDataSecond.length > 0 ?
          <div>
          <LazyLoad height={200} offset={100}>
          <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <European_News sourceDocId='medschoolinsiders' details={articleDataSecond} />
           </Suspense>
            <Selected sourceDocId='medschoolinsiders' selected={articleDataSecond} />
            </LazyLoad>
          </div>
          :
          <StoriesForYouPlaceholder/>
        }
                      <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

        <QuickTake sourceDocId='medschoolinsiders' details={shuffledData2} />
      </Suspense>
        {
          articleDataThird.length > 0 ?
          <LazyLoad height={200} offset={100}>
                       <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <WorldWideNews sourceDocId='thenepalidoctor' details={articleDataThird} />
          </Suspense>
            </LazyLoad>
            :
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <WorldWidePlaceholder/>
            </Suspense>
        }

        {
          articleDataFourth.length > 0 ?
            <div>
              <Markets sourceDocId='amedstudentsjourney' markets={articleDataFourth} />
              <LazyLoad height={200} offset={100}>    <LastSection
                lastsecCol1SourceDocId='amedstudentsjourney'
                lastsecCol1={articleDataFourth}
                latestPostSourceDocId='cardiactamponade'
                latestPost={articleData}
                popularPostSourceDocId='medschoolinsiders'
                popularPost={articleDataSecond}
              /> </LazyLoad>
            </div>
            :
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

            <RecentPlaceholder/>
            </Suspense>
        }
                      <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

        <TopSlider sourceDocId='cardiactamponade' details={articleData} />
</Suspense>

        {
          articleData.length > 0 ?
            <div>
            <LazyLoad height={200} offset={100}>
            <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Trending sourceDocId='cardiactamponade' details={shuffledData1} />
             </Suspense>
              <Income sourceDocId='medschoolinsiders' income={shuffledData2} />

</LazyLoad>
            </div>
            :
            <div className="article-loading-wrapper">
                           <Suspense fallback={<div className='suspenseLoading'>loading...</div>}>

              <Loading />
              </Suspense>
            </div>
        }

      </div>
    </>
  )
}
export default React.memo(Article)
