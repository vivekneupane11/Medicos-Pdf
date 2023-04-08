import axios from 'axios';
import firebase from "firebase";
import React, { useEffect, useState } from 'react';

//LOCAL IMPORTS
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { logEventWithoutParams } from '../../functions/commonMethod';
import { MainTop } from './Component/articleMainTop';
import ArticleTopSlider from './Component/articleTopSlider';
import European_News from './Component/EuropeanNews';
import { LastSection } from './Component/LastSection';
import { Markets } from './Component/markets';
import { Selected } from './Component/Selected';
import { StoriesForYou } from './Component/StoriesForYou';
import TopSlider from './Component/topSlider';
import Trending from './Component/trending';
import WorldWideNews from './Component/WorldWideNews';
import { Income } from './Income/income';
import QuickTake from './QuickTake';
import './_article.scss';







const Article = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [articleData, setArticleData] = useState([])
  const [articleDataSecond, setArticleDataSecond] = useState([])
  const [articleDataThird, setArticleDataThird] = useState([])
  const [articleDataFourth, setArticleDataFourth] = useState([])

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      logEventWithoutParams("web_article_page_visited")
    }
    return (() => {
      isMounted = false;
    })
  }, [])



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
            
                  firebase.firestore().collection('Web-Articles')
                    .doc(docId)
                    .collection('Articles')
                    .doc(article?.title?.rendered.replace(/\/|\[|\]/g, ''))
                    .set({
                      data: article,
                      date: article?.modified,
                      sourceDocId: docId
                    })
                })
                if (isMounted) {
                  setAllArticles((init) => [...init, data]);
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
    if (isMounted) {
      await fetchArticle('https://cardiactamponade.com/wp-json/wp/v2/posts', 'cardiactamponade')
      await fetchArticle('https://medschoolinsiders.com/wp-json/wp/v2/posts', 'medschoolinsiders')
      await fetchArticle('https://thenepalidoctor.com/wp-json/wp/v2/posts', 'thenepalidoctor')
      await fetchArticle('https://amedstudentsjourney.com/wp-json/wp/v2/posts', 'amedstudentsjourney')
    }
    return (() => {
      isMounted = false
    })
  }, [])
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      allArticles.map((article, index) => {
        if (index == 0 && isMounted) {
          setArticleData(article)
        } else if (index == 1 && isMounted) {
          setArticleDataSecond(article)
        } else if (index == 2 && isMounted) {
          setArticleDataThird(article)
        } else if (index == 3 && isMounted) {
          setArticleDataFourth(article)
        }
      })
    }
  }, [allArticles?.length])


  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

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

        <SEO title='MedicosPDF Article page' description='MedicosPDF Article page provides provides medical articles for medical students to enhance their knowledge and skill' />

        {articleDataSecond.length > 0 ?
          <ArticleTopSlider sourceDocId='cardiactamponade' details={shuffledData1} />
          :
          <div className="article-loading-wrapper">
            <Loading />
          </div>
        }

        {articleData.length > 0 ?
          <MainTop sourceDocId='thenepalidoctor' mainTopDetails={shuffledData3} />
          :
          <div className="article-loading-wrapper">
            <Loading />
          </div>
        }

        {articleData.length > 0 ?
          <StoriesForYou sourceDocId='cardiactamponade' stories={articleData} />
          :
          <div className="article-loading-wrapper">
            <Loading />
          </div>
        }

        {articleDataSecond.length > 0 ?
          <div>
            <European_News sourceDocId='medschoolinsiders' details={articleDataSecond} />
            <Selected sourceDocId='medschoolinsiders' selected={articleDataSecond} />
          </div>
          :
          <div className="article-loading-wrapper">
            <Loading />
          </div>
        }
        <QuickTake sourceDocId='medschoolinsiders' details={shuffledData2} />
        {
          articleDataThird.length > 0 ?
            <WorldWideNews sourceDocId='thenepalidoctor' details={articleDataThird} />
            :
            <div className="article-loading-wrapper">
              <Loading />
            </div>
        }

        {
          articleDataFourth.length > 0 ?
            <div>
              <Markets sourceDocId='amedstudentsjourney' markets={articleDataFourth} />
              <LastSection
                lastsecCol1SourceDocId='amedstudentsjourney'
                lastsecCol1={articleDataFourth}
                latestPostSourceDocId='cardiactamponade'
                latestPost={articleData}
                popularPostSourceDocId='medschoolinsiders'
                popularPost={articleDataSecond}
              />
            </div>
            :
            <div className="article-loading-wrapper">
              <Loading />
            </div>
        }
        <TopSlider sourceDocId='cardiactamponade' details={articleData} />


        {
          articleData.length > 0 ?
            <div>
              <Trending sourceDocId='cardiactamponade' details={shuffledData1} />
              <Income sourceDocId='medschoolinsiders' income={shuffledData2} />
            </div>
            :
            <div className="article-loading-wrapper">
              <Loading />
            </div>
        }

      </div>
    </>
  )
}
export default Article
