import axios from 'axios';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

//LOCAL IMPORTS
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import NewsDetailRelatedPosts from '../NewsDetail/components/newsDetailsRelatedPosts/index';
import NewsDetailBottomFullContainer from './components/newsDetailBottomFullContainer';
import TopBackground from './components/topBackground';
import "./index.scss";




const NewsDetail = () => {
  const [allArticles, setAllArticles] = useState([]);
  const { articleTitle, articleSource } = useParams();
  const [articleData, setArticleData] = useState([])
  const [relatedArticles, setRelatedArticles] = useState([])
  const [articleDataSecond, setArticleDataSecond] = useState([])
  const [articleDataThird, setArticleDataThird] = useState([])
  const [articleDataFourth, setArticleDataFourth] = useState([])



  const [scrollTop, setScrollTop] = useState(0);
  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    // console.log(winScroll);
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // console.log(height);
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  }



  useEffect(() => {

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);

  }, [])


  useEffect(() => {
    let isMounted = true;
    try {
      firebase.firestore().collection('Web-Articles')
        .doc(articleSource)
        .collection('Articles')
        .doc(articleTitle)
        .onSnapshot((querySnapshot) => {
     
          if (querySnapshot.exists && isMounted) {
            setArticleData(querySnapshot.data().data)
          }
        })
    } catch (error) {
      console.log("Error fetching article", error)
    }
    return () => {
      isMounted = false
    }
  }, [articleSource,articleTitle])

  useEffect(() => {
    let isMounted = true;
    try {
      firebase.firestore().collection('Web-Articles')
        .doc(articleSource)
        .collection('Articles')
        .onSnapshot((querySnapshot) => {
          if (!querySnapshot.empty && isMounted) {
            let relatedArticlesData = []
            querySnapshot.forEach((doc) => {
              relatedArticlesData.push(doc.data().data)
            })
            setRelatedArticles(relatedArticlesData)
          }
        })
    } catch (error) {
      console.log("Error fetching article", error)
    }
    return () => {
      isMounted = false
    }
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
                setAllArticles((init) => [...init, data]);
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
                    console.log("firebase DATA FETCHED");
                    if (isMounted) {
                      setAllArticles((init) => [...init, fetchedData]);
                    }
                  }
                })
            } else {
              console.log("ADDING ARTICLE", docId)
              addArticle(source, docId)
            }
          })

      } catch (error) {
        console.log("Error fetching journal from firebase", error);
      }
    }
    if (isMounted) {
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
          setArticleDataSecond(article)
        } else if (index == 1 && isMounted) {
          setArticleDataThird(article)
        } else if (index == 2 && isMounted) {
          setArticleDataFourth(article)
        }
      })
    }
  }, [allArticles?.length])



  return (
    <div className="news-detail-page-container">

      <SEO title='MedicosPDF terms and condition page' description='Terms and conditions of medicos PDf' />
      {/*
         TODO
        <SocialShareForMobile /> */}
      <div className="progressBarContainer">
        <div className="progressBarContainer-increment" style={{ width: `${scrollTop}%` }}></div>
      </div>
      <TopBackground details={articleData} />
      <NewsDetailBottomFullContainer
        details2Source={articleSource}
        details1Source={'amedstudentsjourney'}
        details1={articleDataFourth}
        details2={relatedArticles}
        details1Source={'medschoolinsiders'}
        details3={articleDataSecond}
        articlePara={articleData?.content?.rendered}
      />

      <div className="news-detail-page-container-relatedPosts">
        {
          articleDataSecond.length > 0 ?
            <NewsDetailRelatedPosts articleSource={'medschoolinsiders'} details={articleDataSecond} />
            :
            <div className="newsDetail_loading">
              <Loading />
            </div>
        }

      </div>


    </div>
  )
}

export default NewsDetail
