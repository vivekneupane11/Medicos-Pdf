import axios from 'axios';
// import firebase from 'firebase/compat';
// import { collection, doc, getDoc, getFirestore, limit, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useViewsCount from '../../components/customHooks/viewsCount';
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
  // const db =getFirestore();
  const getFirebaseAll=()=>{
    return Promise.all([
      import('../../firebase/firestore')
    ])
    .then(([firestore])=>{
      return{firestore}
    })
  }

 const viewCount=useViewsCount(articleTitle)

  useEffect(async() => {
    let isMounted = true;
    try {
      const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
        const colRef=doc(db,'Web-Articles',articleSource,'Articles',articleTitle)
        
        onSnapshot(colRef,(querySnapshot) => {

          if (querySnapshot.exists() && isMounted) {
            setArticleData(querySnapshot.data().data)
          }
        })
    } catch (error) {
      console.log("Error fetching article", error)
    }
    return () => {
      isMounted = false
    }
  }, [articleSource, articleTitle])

  useEffect(async() => {
    let isMounted = true;
    try {
      const{firestore:{db,collection,onSnapshot}}=await getFirebaseAll()
        const colRef=collection(db,'Web-Articles',articleSource,'Articles')
        onSnapshot(colRef,(querySnapshot) => {
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
  }, [articleSource])

  useEffect(() => {
    let isMounted = true;
    async function addArticle(source, docId) {
      await axios.get(source).then((response) => {
        if (response?.data) {
          // alert ("No data on firebase")
          Promise.all(
            response?.data.map(async data => {
              if (data._links["wp:featuredmedia"][0].href) {
                let image = await axios.get(data._links["wp:featuredmedia"][0].href,)

                data.image = image.data.media_details.sizes.full;
                console.log('CHECKING IMAGE',data.image);
                return data;
              }
            })
          ).then(async(data) => {
            // console.log('This is article dataaaa',data);
            // ADD ARTICLE OF RESPECTIVE SOURCE
            // ADD EXPIRATION DATE FOR ARTICLE
            // firebase.firestore().collection('Web-Articles')
            //   .doc("expiry")
            //   .set({
              //     expiry_date: expiry_date.toISOString()
              //   })
             try {
               const {firestore:{db,setDoc,doc}}=await getFirebaseAll()
              let expiry_date = new Date();
              expiry_date.setDate(expiry_date.getDate() + parseInt(1))
              setDoc(doc(db,"Web-Articles","expiry"),{
                expiry_date: expiry_date.toISOString()
              })
              .then(() => {
                data?.map((article) => {

                  // firebase.firestore().collection('Web-Articles')
                  //   .doc(docId)
                  //   .collection('Articles')
                  //   .doc(article?.title?.rendered.replace(/\/|\[|\]/g, ''))
                  //   .set({
                  //     data: article,
                  //     date: article?.modified,
                  //     sourceDocId: docId
                  //   })
                  setDoc(doc(db,'Web-Articles',docId,'Articles',article?.title?.rendered.replace(/\/|\[|\]/g, ''),
                          {
                            data: article,
                            date: article?.modified,
                            sourceDocId: docId
                          }))
                })
                setAllArticles((init) => [...init, data]);
              })
               
             } catch (error) {
               
             }
            // return response.data?.items;
          })
        }
      }).catch((err) => {
        console.log("Error fetching article from link", err);
      })
    }
    async function fetchArticle(source, docId) {
      try {
        const {firestore:{db,collection,onSnapshot,query,limit,getDoc,doc,orderBy}}=await getFirebaseAll()

        // await
        //  firebase.firestore().collection('Web-Articles')
        //   .doc(docId)
        //   .collection('Articles')
        //   .orderBy('date', 'desc')
        //   .limit(100)
        const colref=query(collection(db,'Web-Articles',docId,'Articles'),
        orderBy('date', 'desc'),
        limit(100))
          await onSnapshot(colref,async (querySnapshot) => {
            // console.log("ARTICLE DATA DOC", querySnapshot);

            //CHECKS IF WEB ARTICLE COLLECTION EXISTS OF RESPECTIVE SOURCES
            if (!querySnapshot.empty) {

              //  firebase.firestore().collection('Web-Articles')
              //   .doc("expiry")
              //   .get()
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
                    })
                  
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
          setArticleDataSecond(article)
        } else if (index === 1 && isMounted) {
          setArticleDataThird(article)
        } else if (index === 2 && isMounted) {
          setArticleDataFourth(article)
        }
      })
    }
  }, [allArticles])

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": articleData?.title?.rendered,
    "image": [
     articleData?.image?.source_url
    ],
    "datePublished": new Date(articleData?.date).toDateString(),
    "dateModified": new Date(articleData?.date).toDateString(),
    "author": {
      "@type": "Person",
      "name": "Medicos",
      "url": "https://play-lh.googleusercontent.com/g5GanfEH-tDgbGkyoGJ2HQ3nU6uMU7t__m-qVBKxCD693NjgJKGHAfVVWUzoV_5ZPYG9=s180-rw"
        },    "publisher": {
      "@type": "Organization",
      "name": "Medicos",
      "logo": {
        "@type": "ImageObject",
        "url": "https://play-lh.googleusercontent.com/g5GanfEH-tDgbGkyoGJ2HQ3nU6uMU7t__m-qVBKxCD693NjgJKGHAfVVWUzoV_5ZPYG9=s180-rw"
      }
    }
  }

  return (
    <div className="news-detail-page-container">
      <script type="application/ld+json">
        {JSON.stringify(articleStructuredData)}
      </script>
      {
        // console.log('article data', articleData)
      }
      <SEO image={articleData?.image?.source_url} title={articleData?.title?.rendered} description='Article details page of  Medicospdf' />
      {/*
         TODO
        <SocialShareForMobile /> */}

      <TopBackground details={articleData} viewCount={viewCount}/>
      <NewsDetailBottomFullContainer
       
        details1={articleDataFourth}
        details1Source={'amedstudentsjourney'}
       
        details2={relatedArticles}
        details2Source={articleSource}

        details3={articleDataSecond}
        details3Source={'medschoolinsiders'}
       
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
