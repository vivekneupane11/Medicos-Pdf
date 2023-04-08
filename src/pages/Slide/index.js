import React, {  Suspense, useCallback, useContext, useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazyload';
import img from '../../assets/images/bookbackg.webp';
import { exploreLinks } from '../../components/constants/mock';
import { Button } from '../../components/global/button';
import ScrollToTopButton from '../../components/global/scrollToTopButton';
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { slideCategories } from '../../constants/Book/BookCategories';
import useLocalStorage from '../../customHooks/useLocalStorage';
import { logEventWithoutParams } from '../../functions/commonMethod';
import { fetchSlidesAndBooksOrderedByNameWithLimit, fetchStartAfterBooksAndSlides } from '../../functions/firebaseMethod';

import { SubCatagories } from './component/SubCatagories';
import Loadable from 'react-loadable';
//LOCAL IMPORTS
import "./index.scss";
import { SlideCardPlaceholder } from "./component/slideCardPlaceholder";
import LazyLoadingComponentLoader from "../../components/lazyLoadingLoaderComponent";
import shortid from "shortid";
import { collection, doc, getDoc,  getFirestore, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import ArrowRight from '../../components/global/icons/arrow_right';
import { async } from '@firebase/util';

const ExploreLinkTab = React.lazy(() => LazyLoadingComponentLoader(() => import("../Book/components/exploreLinkTab")));
// const ExploreSearch = React.lazy(() => LazyLoadingComponentLoader(() => import("../Book/components/exploreSearch")));
const TopSearch = React.lazy(() => LazyLoadingComponentLoader(() => import("../Book/components/topSearch")));
const SlideCard = React.lazy(() => LazyLoadingComponentLoader(() => import("../SlideDetail/components/slideCard")));
const SlideRecentSlides = React.lazy(() => LazyLoadingComponentLoader(() => import("./component/slideRecentSlides")));


const LoadableShareModal = Loadable({
    loader: () => import('../../components/global/shareModal'),
    loading() {
        return <div>Loading...</div>
    }
});
const LoadableLoginModal = Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div>Loading...</div>
    }
});

const Slide = () => {
    // const firestoreDatabase = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [preference] = useLocalStorage("preference", null);
    const [mappingData, setMappingData] = useState([])
    const [exploreLinkActiveData, setExploreLinkActiveData] = useState('All')
    const [subCategoryActiveHeading, setSubCategoryActiveHeading] = useState('')
    const [loadingSlides, setLoadingSlides] = useState(false);
    const [firstSlide, setFirstSlide] = useState("")
    const pageLimit = 12;
    const [showFormModel, setShowFormModel] = useState(false)
    const refToExploreSLides = useRef();
    const [showDDC, setShowDDC] = useState(false)
    const [showDDS, setShowDDS] = useState(false)
    // const [articleData, setArticleData] = useState([])
    // const [fetchedId, setFetchedId] = useState(null)
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [matchedSlides, setMatchedSlides] = useState([]);
    const [searchSlideLimit, setSearchSlideLimit] = useState(10);
    const [showShare, setShowShare] = useState(false)
    const [callBackData, setCallBackData] = useState(null)
    const loadingArray = Array.apply(null, Array(10));


// const db= getFirestore();
const getFirebaseAll = () => {
    return Promise.all([
      import('../../firebase/firestore')
    ]).then(([ firestore]) => {
      return { firestore };
    });
  };
 
    const randomSubcategory = useCallback(category => {
        let filtered = slideCategories.filter(
            slideCategory => slideCategory.category === category,
        );
        let subCategories = filtered[0]?.subCategories;
        // let randomInteger = Math.floor(Math.random() * (subCategories.length - 1));

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
        let isMounted = true;
        if (isMounted) {
            const getInitialData = async(subjectName, activeHeading) => {
                // let allSlidesData = [];
                try {
                    const {firestore:{db,query,orderBy,limit,onSnapshot,collection}}=await getFirebaseAll()
                    if (subjectName === "All") {
                        setLoadingSlides(true);
                        if (preference) {
                            let preferenceCategory = preference?.subjects[preference?.subjects?.length - 1]?.subjectName;
                            // firebase.firestore()
                            //     .collection(`K-Slides-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSubcategory(preferenceCategory)?.replace(/\s|\//g, "")}`)
                            //     .orderBy('SlideName', 'asc')
                            //     .limit(pageLimit)
                            //     .get()
                                const colRef=query(collection(db,`K-Slides-${preferenceCategory?.replace(/\s|\//g, "")}-${randomSubcategory(preferenceCategory)?.replace(/\s|\//g, "")}`),
                                orderBy('SlideName', 'asc'),
                                limit(pageLimit))
                                onSnapshot(colRef,(querySnapshot) => {
                                    let allData = []
                                    querySnapshot.forEach(ele => {
                                        allData.push(ele.data());
                                    })
                                    setMappingData((init) => [...init, ...allData])
                                })
                        } else {
                            fetchSlidesAndBooksOrderedByNameWithLimit('AllSlidesDataLockDownVersions', 'SlideName', pageLimit)
                                .then((res) => {
                                    if (isMounted) {
                                        setLoadingSlides(false);
                                        setMappingData(() => res?.allData)
                                        setShowLoadMore(true)
                                    }
                                })
                        }
                    }
                    else if (subjectName !== '' && activeHeading !== '' && activeHeading) {
                        setLoadingSlides(true);
                        fetchSlidesAndBooksOrderedByNameWithLimit(`K-Slides-${subjectName.replace(/\s|\//g, "")}-${activeHeading.replace(/\s|\//g, "")}`, 'SlideName', pageLimit)
                            .then((res) => {
                                if (isMounted) {
                                    setLoadingSlides(false);
                                    setShowLoadMore(true)
                                    setMappingData(() => res?.allData);
                                    setFirstSlide(res?.allData[0]?.SlideName)
                                }
                            })
                    }
                } catch (err) {
                    console.log("ERROR FETCHING BOOKS", err);
                }
            };

            getInitialData(exploreLinkActiveData?.length ? exploreLinkActiveData : 'All', subCategoryActiveHeading);
        }
        return () => {
            isMounted = false;
        }
    }, [exploreLinkActiveData, subCategoryActiveHeading, preference?.length, preference])


    const activeData = (data) => {
        // alert(data.linkName)
        setExploreLinkActiveData(data.linkName)
    }

    const subCategoryHeading = (data) => {
        if (data !=='') {
            setSubCategoryActiveHeading(data)
        }
        // console.log('from callback of active head',data)
    }

    const loadMore = (index) => {
        setLoadMoreLoading(true);
        // let allSlidesData = []
        setLoadingSlides(true);
        let slideType = exploreLinkActiveData?.length ? exploreLinkActiveData : 'All'
        let collectionName = ""

        switch (slideType) {
            case "All":
                collectionName = "AllSlidesDataLockDownVersions";
                break
            case "Basic Science":
                collectionName = `K-Slides-BasicScience-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Clinical Science":
                collectionName = `K-Slides-ClinicalScience-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Physiotherapy":
                collectionName = `K-Slides-Physiotherapy-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Nursing":
                collectionName = `K-Slides-Nursing-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Dental":
                collectionName = `K-Slides-Dental-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            default:
        }


        const getNextDataFromFirebase = () => {
            console.log('NEXT PARAMETER', mappingData[mappingData?.length -1]?.SlideName, collectionName, slideType)
            // refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
            if (mappingData[mappingData?.length -1]?.SlideName && mappingData[mappingData?.length -1]?.SlideName && collectionName !== "") {
                fetchStartAfterBooksAndSlides(collectionName, 'SlideName', mappingData[mappingData?.length -1]?.SlideName, pageLimit)
                    .then((res) => {
                        if (res && res?.length > 0) {
                            setLoadMoreLoading(false);
                            setLoadingSlides(false);
                            setShowLoadMore(true)
                            setMappingData((init) => [...init, ...res]);
                            setFirstSlide(res[0]?.SlideName)
                        } else {
                            setShowLoadMore(false);
                            setLoadMoreLoading(false);
                        }
                    })
            }
        }
        getNextDataFromFirebase()
    }


    //social proof to be done
    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted) {
    //         try {
    //             fetchWithCollectionName("MedicosPdfWeb-Social-PopUp")
    //                 .then((res) => {
    //                     setFetchedId(res)
    //                 })
    //         } catch (error) {
    //             console.log("Error while fetching latest news");
    //         }
    //     }
    //     return () => {
    //         isMounted = false
    //     }
    // }, [])


    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [],
    )

    const showModal = useCallback(
        (show) => {

            if (show === true) {
                setShowFormModel(true)

            }
        },
        [],
    )

    useEffect(() => {
        let isMounted = true
        if (isMounted && user?.uid) {
            setShowFormModel(false)
        }
        return () => {
            isMounted = false
        }
    }, [user?.uid])


    const showShareModal = useCallback(
        (show, data) => {

            if (show === true && data) {
                setShowShare(true)
                setCallBackData(data)

            }
        },
        [],
    )
    const cancelShare = useCallback(
        (show) => {

            if (show === false) {
                setShowShare(false)

            }
        }, [],
    )


    const clickhandlerddc = () => setShowDDC(!showDDC)
    const clickhandlerddc2 = () => setShowDDC(!showDDC)
    const clickhandlerddc3 = () => setShowDDS(!showDDS)
    const clickhandlerddc4 = () => setShowDDS(!showDDS)

    const clickhandlerloadfrom = () => loadMore()
    return (
        <>
        <SEO image={callBackData?.slideImages[0]} title='Get Medical Slides and Notes for free. We have more than 50,000 medical slides related to Basic Science , Clinical Science , Nursing , Dental (BDS) , BAMS and so on..Free authentical medical slides are here for you. You can also upload your own medical slides from medicospdf.' description={slideCategories+exploreLinks}/>
            <ScrollToTopButton />
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />

            <LoadableShareModal
                url={encodeURI(`https://medicospdf.com/slidedetails/${callBackData?.SlideName}/${callBackData?.slideCategory}/${callBackData?.slideSubCategory.replace(/\s|\//g, "")}`)}
                appId={process.env.REACT_APP_ID}
                title={callBackData?.SlideName}
                image={callBackData?.slideImages[0]}
                show={showShare}
                cancel={cancelShare}
            />



       

            <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                <TopSearch />
            </Suspense>

            <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                <SlideRecentSlides />
            </Suspense>


            <div ref={refToExploreSLides} className="slide-page-container-wrapper">
                <div className="slide-page-slide-section">
                   
                    <div className="slide-page-slide-section-col2">
                    <h3 className="explore-heading">Explore</h3>

                        <div className="tabs">
                            <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                                <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                            </Suspense>

                        </div>
                        
                        
                        

                        <div className="S-sub-categories-forMobile">
                            <SubCatagories slideArr={slideCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                        </div>

                        <div className='S-dropdownForMobile'>
                            <h2 className='S-dropdownForMobile-head'>Explore</h2>

                            <div className='S-dropdownForMobile-category'>
                                <h3 className='S-dropdownForMobile-category-dd' onClick={clickhandlerddc}>
                                    <span>Category : {exploreLinkActiveData ? `${exploreLinkActiveData}` : 'All'}</span>
                                    <ArrowRight className={`S-showD ${showDDC ? 'S-rotateD' : ''}`}  />
                                </h3>

                                <div className={`S-dd-hide ${showDDC ? 'S-dd-show' : ''}`} onClick={clickhandlerddc2}>
                                    <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                                        <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                                    </Suspense>
                                </div>
                            </div>

                            <div className='S-dropdownForMobile-subcategory'>
                                {
                                    exploreLinkActiveData.length === 0 || exploreLinkActiveData === 'All' ?
                                   ""
                                        :
                                        <h3 className='S-dropdownForMobile-category-dd' onClick={clickhandlerddc3}>
                                            <span>SubCategory : {subCategoryActiveHeading}</span>
                                            <ArrowRight  className={`showD ${showDDS ? 'rotateD' : ''}`} />
                                        </h3>
                                }


                                <div className={`S-dd-hide ${showDDS ? 'S-dd-show' : ''}`} onClick={clickhandlerddc4}>
                                    <SubCatagories slideArr={slideCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                                </div>
                            </div>
                            {/* <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                                <ExploreSearch
                                    type='slide'
                                    exploreLinkActiveData={exploreLinkActiveData}
                                    subCategoryActiveHeading={subCategoryActiveHeading}
                                    searchResult={searchResult}
                                    placeholder="Search Medical Slides"
                                />
                            </Suspense> */}
                        </div>
                      
                                    {

                                        <div className="slide-page-slide-section-col2-content-section">
                                            {mappingData.length > 0 ?
                                                mappingData.map((slide, index) => (
                                                    <div key={index} className="item">
                                                        <Suspense fallback={<div key={shortid.generate()} className="item">
                                                <SlideCardPlaceholder />

                                            </div>}>
                                                            <SlideCard
                                                                title={slide.slideCategory}
                                                                title2={slide.slideSubCategory}
                                                                description={slide.SlideName}
                                                                images={slide.slideImages}
                                                                wholeDatas={mappingData}
                                                                datas={slide}
                                                                showModal={showModal}
                                                                showShareModal={showShareModal}
                                                            />
                                                        </Suspense>
                                                    </div>
                                                ))
                                                :
                                                loadingArray.map(() => {
                                                    return <div key={shortid.generate()} className="item">
                                                        <SlideCardPlaceholder />

                                                    </div>

                                                })}
                                        </div>

                                    }
                             
                        

                        <div className="pagination">
                            {
                                user ?
                                    <div className="pagination-container">
                                        {
                                            showLoadMore &&
                                            <div onClick={clickhandlerloadfrom}>
                                                <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                                            </div>
                                        }
                                        {
                                            loadMoreLoading &&
                                            <Loading type='clip' size={25} />
                                        }
                                    </div>
                                    :
                                    <div className="pagination-container">
                                        {

                                            <div onClick={() => setShowFormModel(true)}>
                                                <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                                            </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default React.memo(Slide)
