import axios from 'axios';
import firebase from "firebase";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import useLocalStorageState from 'use-local-storage-state';
import { exploreLinks } from '../../components/constants/mock';
import { Headings } from '../../components/global/headings';
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { PostPopUp } from '../../components/postPopUp';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { slideCategories } from '../../constants/Book/BookCategories';
import { logEventWithoutParams } from '../../functions/commonMethod';
import QuickTake from '../Article/QuickTake';
import ExploreLinkTab from '../Book/components/exploreLinkTab';
import TopSearch from '../Book/components/topSearch';
import SlideCard from '../SlideDetail/components/slideCard';
import SlidePagination from "./component/pagination";
import Recent from './component/recent';
import SlideRecentSlides from './component/slideRecentSlides';
import SlideTrending from './component/slideTrending';
import { SubCatagories } from './component/SubCatagories';
//LOCAL IMPORTS
import "./index.scss";




export const SlideDataContext = createContext()

const Slide = () => {
    const firestoreDatabase = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [bookDocId, setBookDocId] = useState([]);
    const [slideDocId, setSlideDocId] = useState([])
    const [mappingData, setMappingData] = useState([])
    const [exploreLinkActiveData, setExploreLinkActiveData] = useState('')
    const [subCategoryActiveHeading, setSubCategoryActiveHeading] = useState('')
    const [loadingSlides, setLoadingSlides] = useState(false);
    const [firstSlide, setFirstSlide] = useState("")
    const [lastSlide, setLastSlide] = useState("")
    const pageLimit = 9;
    const [recentSlides, setRecentSlides] = useLocalStorageState('recentSlidesArray', [])
    const [recentSlidesMappingData, setRecentSlidesMappingData] = useState([
        [" Death", "Dental", "Forensic Dentistry"],
    ])
    const refToExploreSLides = useRef();
    const [showDDC,setShowDDC]=useState(false)
    const [showDDS,setShowDDS]=useState(false)
    const [articleData, setArticleData] = useState([])
    const [fetchedId,setFetchedId]=useState(null)

    const randomSubcategory = useCallback(category => {
        let filtered = slideCategories.filter(
            slideCategory => slideCategory.category == category,
        );
        let subCategories = filtered[0].subCategories;
        let randomInteger = Math.floor(Math.random() * (subCategories.length - 1));
       
        // console.log(category, randomInteger, subCategories[randomInteger]);
        return subCategories[Math.floor(Math.random() * (subCategories.length - 1))]
            .category;
    }, []
    )

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
          logEventWithoutParams("web_slide_page_visited")
        }
        return (() => {
          isMounted = false;
        })
      }, [])

      useEffect(() => {
        let isMounted = true
        if (isMounted) {
            firebase.firestore().collection("K-Books")
                .get()
                .then((querySnapshot) => {
                    let bookDocIdData = [];
                    querySnapshot.forEach((doc) => {
                        bookDocIdData.push(doc.id)
                    })
                    setBookDocId(bookDocIdData)
               

                })
            firebase.firestore().collection("AllSlidesDataLockDownVersions")
                .get()
                .then((querySnapshot) => {
                    let slideDocIdData = [];
                    querySnapshot.forEach((doc) => {
                        slideDocIdData.push(doc.id);
                        // console.log("Numbers of collection",doc.id)    
                    })
                    setSlideDocId(slideDocIdData)
                   

                })
        }
        return () => {
            isMounted = false
        }
    }, [user?.uid])


    useEffect(() => {
        let isMounted = true;

        const getUserPreferencesData = (subjectName, activeHeading) => {

            let allSlidesData = [];

            try {

                if (subjectName == "All Books") {
                    setLoadingSlides(true);
                    const AllSlides = firestoreDatabase
                        .collection(`AllSlidesDataLockDownVersions`)
                        .orderBy("SlideName")
                        // .startAt("fundamentals")
                        .limit(pageLimit)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(ele => {
                                allSlidesData.push(ele.data());
                            });

                            if (isMounted) {
                                setLoadingSlides(false);
                                setMappingData(() => allSlidesData)
                            }

                        });

                }

                else {

                    if (subjectName != '' && activeHeading != '') {
                        setLoadingSlides(true);
                        const OtherSlides = firestoreDatabase
                            .collection(`K-Slides-${subjectName.replace(/\s|\//g, "")}-${activeHeading.replace(/\s|\//g, "")}`)
                            .orderBy("SlideName")
                            // .startAt("Anatomy of Arm ")
                            .limit(pageLimit)
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(ele => {
                                    allSlidesData.push(ele.data());
                                });

                                if (isMounted) {
                                    setLoadingSlides(false);
                                    setMappingData(() => allSlidesData);
                                    setFirstSlide(allSlidesData[0]?.SlideName)
                                    setLastSlide(allSlidesData[allSlidesData.length - 1]?.SlideName)
                                }
                            });
                    }
                }
            } catch (err) {
                console.log("ERROR FETCHING BOOKS", subjectName);
            }
        };



        const recentSlidesInvoke = async () => {

            let datas = recentSlides

            try {
                let slidesArray = []
                for (let i = 0; i < datas.length; i++) {

                    const recentSlides = await firestoreDatabase
                        .collection('AllSlidesDataLockDownVersions')
                        .doc(`${datas[i][0]}`)
                        .get()
                        .then(doc => {

                            if (doc.exists) {
                                slidesArray.push(doc.data())
                                // console.log('mapping data single:',doc.data())

                            } else {
                                console.log("No such document!");
                            }
                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                }

                setRecentSlidesMappingData(slidesArray)


            }
            catch (err) {
                console.log('error fetching local storage data', err)
            }





        }

        recentSlidesInvoke();
        getUserPreferencesData(exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books', subCategoryActiveHeading);
        return () => {
            isMounted = false;
        }
    }, [exploreLinkActiveData, subCategoryActiveHeading])


    const activeData = (data) => {
        setExploreLinkActiveData(data.linkName)
    }

    const subCategoryHeading = (data) => {
        if (data != '') {
            setSubCategoryActiveHeading(data)
        }
        // console.log('from callback of active head',data)
    }

    const nextSlideAction = (index) => {
        let allSlidesData = []
        setLoadingSlides(true);
        const randomBasicScience = randomSubcategory('Basic Science');
        const randomNursing = randomSubcategory('Nursing');
        const randomDental = randomSubcategory('Dental');
        const randomPhysiotherapy = randomSubcategory('Clinical Science');




        let slideType = exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books'
        let collectionName = ""

        switch (slideType) {
            case "All Books":
                collectionName = "AllSlidesDataLockDownVersions";
                break
            case "Basic Science":
                collectionName = `K-Slides-BasicScience-${randomBasicScience.replace(/\s|\//g, "")}`;
                break
            case "Physiotherapy":
                collectionName = `K-Slides-Physiotherapy-${randomPhysiotherapy.replace(/\s|\//g, "")}`;
                break
            case "Nursing":
                collectionName = `K-Slides-Nursing-${randomNursing.replace(/\s|\//g, "")}`;
                break
            case "Dental":
                collectionName = `K-Slides-Dental-${randomDental.replace(/\s|\//g, "")}`;
                break
        }


        const getNextDataFromFirebase = () => {
            refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
            if (lastSlide != null && lastSlide != undefined && collectionName != "") {
                firestoreDatabase
                    .collection(collectionName)
                    .orderBy("SlideName")
                    .startAfter(lastSlide)
                    .limit(pageLimit)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) return;
                        querySnapshot.forEach(ele => {
                            allSlidesData.push(ele.data());
                        });

                        setLoadingSlides(false);
                       
                        setMappingData(() => allSlidesData);
                        setFirstSlide(allSlidesData[0]?.SlideName)
                        setLastSlide(allSlidesData[allSlidesData.length - 1]?.SlideName)
                    });
            }
        }
        getNextDataFromFirebase()
    }

    const previousSlideAction = (index) => {
        refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
        let allSlidesData = []
        setLoadingSlides(true);
        // console.log('checking:',subjectName);
       
        const randomBasicScience = randomSubcategory('Basic Science');
        const getPreviousDataFromFirebase = () => {
            if (firstSlide != null && firstSlide != undefined) {
                firestoreDatabase
                    .collection(`K-Slides-BasicScience-${randomBasicScience.replace(/\s|\//g, "")}`)
                    .orderBy("SlideName")
                    .endBefore(firstSlide)
                    .limit(pageLimit)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) return;
                        querySnapshot.forEach(ele => {
                            allSlidesData.push(ele.data());
                        });

                        setLoadingSlides(false);
                        setMappingData(() => allSlidesData);
                        setFirstSlide(allSlidesData[0]?.SlideName)
                        setLastSlide(allSlidesData[allSlidesData.length - 1]?.SlideName)
                    });
            }
        }
        getPreviousDataFromFirebase()
    }

    const addToLocalStorage = (slideName, category, subCategory) => {

        if (slideName != '' && category != '') {

            let recent = [
                slideName,
                category,
                subCategory,
            ]

            let data1 = recent[0]
            let data2 = []

            for (let i = 0; i < recentSlides.length; i++) {
                data2.push(recentSlides[i][0])
            }

            if (recentSlides.length < 5 && data2.includes(data1) == false) {
                setRecentSlides([...recentSlides, [...recent]])
            }

            else if (recentSlides.length === 5 && data2.includes(data1) == false) {
                recentSlides.shift()
                setRecentSlides([...recentSlides, [...recent]])
            }


        }

    }
    
 
    useEffect(() => {
        // let isActive=true;
    
        const getArticleData = async () => {
    
          await axios.get('https://medschoolinsiders.com/wp-json/wp/v2/posts',
            {
              // baseURL: "https://localhost:9000",
              // withCredentials: false,
              headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Accept': 'application/json',
                // 'Referrer': 'origin'
              }
            }).then((response) => {
            //   console.log("response from api journal", response)
    
              if (response?.data) {
    
                Promise.all(
                  response?.data.map(async data => {
                    if (data._links["wp:featuredmedia"][0].href) {
                      let image = await axios.get(data._links["wp:featuredmedia"][0].href,
                        {
                          // baseURL: "https://localhost:9000",
                          // withCredentials: false,
                          headers: {
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                            // 'Accept': 'application/json',
                            // 'Referrer': 'origin'
                          }
                        })
                    
                      data.image = image.data.media_details.sizes.medium;
                      return data;
                    }
                  })
                ).then(data => {
                  setArticleData(data);
    
                }).catch(err => {
                  console.log(err)
                })
    
    
                // if (isActive) {
                // }
              }
            }).catch((err) => {
              console.log(err)
              return [];
    
            })
        }
    
     
     
        getArticleData()
  
            
      }, [])


      useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firestoreDatabase.collection("MedicosPdfWeb-Social-PopUp")
                    .get()
                    .then((querySnapshot) => {
                        if (querySnapshot) {
                            let latestData = [];
                            querySnapshot.forEach((doc) => {
                                latestData.push(doc.data());
                            })
                            setFetchedId(latestData)

                        }
                    })
            } catch (error) {
                console.log("Error while fetching latest news");
            }
        }
        return () => {
            isMounted = false
        }
    }, [])




    return (
        <SlideDataContext.Provider value={mappingData.length ? mappingData : ''} className="slide-page-container">
           
             <SEO title='MedicosPDF Slide page' description='MedicosPDF Slide page provides over 30,000 medical slides for medical students to enhance their knowledge and skill'/>
             {
                 fetchedId &&
                 <PostPopUp SlidesID={fetchedId} linkData={mappingData} />
                
             }
             <TopSearch slideDocId={slideDocId} bookDocId={bookDocId}/>
           
            <Recent slideDetailsRight={mappingData} />
            {
                recentSlidesMappingData.length >= 3 ?
                    <SlideRecentSlides detailsSlides={recentSlidesMappingData} />
                    :
                    null
            }

            <div>
                <SlideTrending details={mappingData} />
            </div>

            {
                articleData.length>0?
                <QuickTake details={articleData}/>
                :
                <div style={{paddingTop:'200px',paddingBottom:'200px'}}>
                   <Loading/>
                </div>
              
            }
           


            <div ref={refToExploreSLides} className="slide-page-container-wrapper">

                <div className="slide-page-slide-section">
                    <div className="slide-page-slide-section-col1">
                        <div className="heading">
                            <Headings className="heading" content="Explore" type="heading3" />
                        </div>
                        <div className="sub-heading">
                            <Headings type="heading5" content="Sub Catagories" />
                        </div>
                        <div className="sub-categories">
                            <SubCatagories slideArr={slideCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                        </div>

                    </div>
                    <div className="slide-page-slide-section-col2">

                        <div className="tabs">
                            <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                        </div>

                        <div className="S-sub-categories-forMobile">
                             <SubCatagories slideArr={slideCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading}  />
                        </div>

                        <div className='S-dropdownForMobile'>
                            <h2 className='S-dropdownForMobile-head'>Explore</h2>
                            <div className='S-dropdownForMobile-category'>
                                <h3 className='S-dropdownForMobile-category-dd' onClick={()=>setShowDDC(!showDDC)}>
                                    <span>Category : {exploreLinkActiveData?`${exploreLinkActiveData}`:'All Books'}</span>
                                    <FaChevronRight className={`S-showD ${showDDC? 'S-rotateD':''}`} width={5} fill={"#777"} />
                                </h3>

                                <div className={`S-dd-hide ${showDDC?'S-dd-show':''}`} onClick={()=>setShowDDC(!showDDC)}>
                                <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                                </div>
                            </div>

                            <div className='S-dropdownForMobile-subcategory'>
                            {
                                 exploreLinkActiveData.length===0 || exploreLinkActiveData==='All Books' ?
                                 ""
                                 :
                                 <h3 className='S-dropdownForMobile-category-dd' onClick={()=>setShowDDS(!showDDS)}>
                                    <span>Sub-category : {subCategoryActiveHeading}</span>
                                    <FaChevronRight className={`showD ${showDDS? 'rotateD':''}`} width={5} fill={"#777"} />
                                 </h3>
                            }
                               

                                <div className={`S-dd-hide ${showDDS?'S-dd-show':''}`} onClick={()=>setShowDDS(!showDDS)}>
                                <SubCatagories slideArr={slideCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading}  />
                                </div>
                            </div>

                        </div>
                        {mappingData.length > 0 ?
                            <div className="slide-page-slide-section-col2-content-section">
                                {mappingData.map((slide, index) => (
                                    <div key={index} className="item" onClick={() => addToLocalStorage(slide.SlideName, slide.slideCategory, slide.slideSubCategory)} >
                                        <SlideCard
                                            title={slide.slideCategory}
                                            description={slide.SlideName}
                                            images={slide.slideImages}
                                            wholeDatas={mappingData}
                                            datas={slide}
                                        />
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="slide-loading-wrapper">
                                <Loading />
                            </div>
                        }
                        <div className="pagination">
                            <SlidePagination
                                activeSlideTab={exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books'}
                                // pages={pages}
                                activeColor="primary"
                                lastSlide={lastSlide}
                                firstSlide={firstSlide}
                                nextTrigger={nextSlideAction}
                                previousTrigger={previousSlideAction}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </SlideDataContext.Provider>
    )
}

export default Slide
