// import firebase from 'firebase/compat'
import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { IoIosArrowForward } from 'react-icons/io'
import { useParams } from 'react-router'
import { Button } from '../../components/global/button'
import ScrollToTopButton from '../../components/global/scrollToTopButton'
import Loading from '../../components/loading'
import { AuthContext } from '../../components/signUp/authMethods/authentication'
import { slideCategories } from '../../constants/Book/BookCategories'
import { fetchStartAfterBooksAndSlides } from '../../functions/firebaseMethod'
import SlideCard from '../SlideDetail/components/slideCard'
import './_slideSubCategoryPage.scss';
import filterSlideSubCategory from '../../functions/filterSlideSubCategory';
import Loadable from 'react-loadable';
// import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'

import ArrowRight from '../../components/global/icons/arrow_right'
import SEO from '../../components/global/SEO'



const LoadableLoginModal =  Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });

  const LoadableShareModal =  Loadable({
    loader: () => import('../../components/global/shareModal'),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });


const SlideSubCategoryPage = () => {


    const { user } = useContext(AuthContext);
    const { slideCategory, slideSubCategory } = useParams()
    const [categoryName, setCategoryName] = useState(slideCategory)
    const [subCategoryName, setSubCategoryName] = useState(slideSubCategory)
    const [showCategory, setShowCategory] = useState(false)
    const [showSubCategory, setShowSubCategory] = useState(false)
    const [loading, setLoadingSlides] = useState(false)
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [mappingData, setMappingData] = useState(null)
    const [firstSlide, setFirstSlide] = useState("")
    const [lastSlide, setLastSlide] = useState("")
    const [showShare, setShowShare] = useState(false)
    const [callBackData, setCallBackData] = useState(null)
    const [showFormModel, setShowFormModel] = useState(false)
    const pageLimit = 9;
    // const db = getFirestore();
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };

    useEffect(() => {
        let isMounted = true;
        const getUserPreferencesData = async(category, subCategory) => {
            try {
            const { firestore: { db, orderBy,query,collection,getDocs,limit } } = await getFirebaseAll()

                if (category && subCategory) {
                    setLoadingSlides(true);
                    // firebase.firestore()
                    //     .collection(`K-Slides-${category.replace(/\s|\//g, "")}-${subCategory?.replace(/\s|\//g, "")}`)
                    //     .orderBy('SlideName', 'asc')
                    //     .limit(pageLimit)
                    //     .get()
                    const colRef = query(collection(db,`K-Slides-${category.replace(/\s|\//g, "")}-${subCategory?.replace(/\s|\//g, "")}`),
                    orderBy('SlideName', 'asc'),
                    limit(pageLimit))
                    getDocs(colRef)
                        .then(querySnapshot => {
                            let allData = []
                            querySnapshot.forEach(ele => {
                                allData.push(ele.data());
                            })
                            setLastSlide(allData[allData.length - 1]?.SlideName)
                            setMappingData(allData)
                        })
                }
            } catch (err) {
                console.log("ERROR FETCHING BOOKS", err);
            }
        };

        getUserPreferencesData(categoryName, subCategoryName);
        return () => {
            isMounted = false;
        }
    }, [categoryName, subCategoryName])

    const loadMore = (index) => {
        setLoadMoreLoading(true);
        // let allSlidesData = []
        setLoadingSlides(true);
        let slideType = categoryName;
        let collectionName = ""

        switch (slideType) {
            case "All":
                collectionName = "AllSlidesDataLockDownVersions";
                break
            case "Basic Science":
                collectionName = `K-Slides-BasicScience-${subCategoryName.replace(/\s|\//g, "")}`;
                break
            case "Clinical Science":
                collectionName = `K-Slides-ClinicalScience-${subCategoryName.replace(/\s|\//g, "")}`;
                break
            case "Physiotherapy":
                collectionName = `K-Slides-Physiotherapy-${subCategoryName.replace(/\s|\//g, "")}`;
                break
            case "Nursing":
                collectionName = `K-Slides-Nursing-${subCategoryName.replace(/\s|\//g, "")}`;
                break
            case "Dental":
                collectionName = `K-Slides-Dental-${subCategoryName.replace(/\s|\//g, "")}`;
                break
            default:
        }


        const getNextDataFromFirebase = () => {
            console.log('NEXT PARAMETER', lastSlide, collectionName, slideType)
            // refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
            if (lastSlide !== null && lastSlide !== undefined && collectionName !== "") {
                fetchStartAfterBooksAndSlides(collectionName, 'SlideName', lastSlide, pageLimit)
                    .then((res) => {
                        if (res.length > 0) {
                            setLoadMoreLoading(false);
                            setLoadingSlides(false);
                            setShowLoadMore(true)
                            setMappingData((init) => [...init, ...res]);
                            setFirstSlide(res[0]?.SlideName)
                            setLastSlide(res[res.length - 1]?.SlideName)
                        } else {
                            setShowLoadMore(false);
                            setLoadMoreLoading(false);
                        }
                    })
            }
        }
        getNextDataFromFirebase()
    }

    const clickhandlerloadfrom = () => loadMore()



    const handleCategory = (category, subCategory) => {
        if (category && subCategory) {
            setCategoryName(category)
            setSubCategoryName(subCategory)
            setShowCategory(false)
        }
    }
    const handleSubCategory = (data) => {
        if (data) {
            setSubCategoryName(data)
            setShowSubCategory(false)
            console.log('Subcategory', data)
        }
    }


    const toggleCategory = () => {
        setShowCategory(!showCategory)

    }
    const toggleSubCategory = () => {
        setShowSubCategory(!showSubCategory)

    }
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
        if (user?.uid) {
            setShowFormModel(false)
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
        },
        [],
    )
    const handelformmodal=() => setShowFormModel(true)
    return (
        <div className='slideSubCategoryPage-container'>
            <SEO title='SlideSubCatagories page' description={categoryName + subCategoryName + 'MedicosPdf slides ' } />
            <ScrollToTopButton />
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />

            <LoadableShareModal
                url={encodeURI(`https://medicospdf.com/slidedetails/${callBackData?.SlideName}/${callBackData?.slideCategory}/${filterSlideSubCategory(callBackData?.slideSubCategory)}`)}
                appId={process.env.REACT_APP_ID}
                title={callBackData?.SlideName}
                image={callBackData?.slideImages[0]}
                show={showShare}
                cancel={cancelShare}
            />
            <div className='slideSubCategoryPage-container-top'>
                <h3 className='slideSubCategoryPage-container-top-category'>{categoryName}</h3>
                <h5 className='slideSubCategoryPage-container-top-subCategory'>{subCategoryName}</h5>

            </div>
            <div className='slideSubCategoryPage-container-slidesContainer'>
                <div className='slideSubCategoryPage-container-slidesContainer-select'>
                    <div className='slideSubCategoryPage-container-slidesContainer-select-category'>
                        <div className='slideSubCategoryPage-container-slidesContainer-select-category-top' onClick={() => toggleCategory()}>
                            <h3 className='slideSubCategoryPage-container-slidesContainer-select-category-top-head' >Category: {categoryName}</h3>
                            <ArrowRight className={`slideSubCategoryPage-container-slidesContainer-select-category-top-icon ${showCategory ? 'slideSubCategoryPage-container-slidesContainer-select-category-top-icon-rotate' : ''}`} />
                        </div>

                        <div className={`slideSubCategoryPage-container-slidesContainer-select-category-lists ${showCategory ? 'slideSubCategoryPage-container-slidesContainer-select-category-lists-active' : ''}`}>
                            {
                                slideCategories.map((data, index) => {
                                    return <p key={index} onClick={() => handleCategory(data?.category, data.subCategories[0].category)} className='slideSubCategoryPage-container-slidesContainer-select-category-lists-data'>{data?.category}</p>
                                })
                            }
                        </div>
                    </div>

                    <div className='slideSubCategoryPage-container-slidesContainer-select-subCategory'>
                        <div className='slideSubCategoryPage-container-slidesContainer-select-subCategory-top' onClick={() => toggleSubCategory()}>
                            <h3 className='slideSubCategoryPage-container-slidesContainer-select-subCategory-top-head' >Sub-Category: {subCategoryName}</h3>
                            <ArrowRight className={`slideSubCategoryPage-container-slidesContainer-select-subCategory-top-icon ${showSubCategory ? 'slideSubCategoryPage-container-slidesContainer-select-category-top-icon-rotate' : ''}`} />
                        </div>

                        <div className={`slideSubCategoryPage-container-slidesContainer-select-subCategory-lists ${showSubCategory ? 'slideSubCategoryPage-container-slidesContainer-select-category-lists-active' : ''}`}>
                            {
                                slideCategories?.map((categories) => {
                                    if (categories?.category === categoryName) {
                                        return categories?.subCategories?.map((subCategory, index) => {
                                            return <p key={subCategory?.category + index} onClick={() => handleSubCategory(subCategory?.category)} className='slideSubCategoryPage-container-slidesContainer-select-subCategory-lists-data'>{subCategory?.category}</p>
                                        })
                                    }
                                })
                            }
                        </div>
                    </div>


                </div>

                <div className='slideSubCategoryPage-container-slidesContainer-DatasContainer'>

                    <div>
                        {
                            mappingData?.length > 0 ?
                                <div className='slideSubCategoryPage-container-slidesContainer-DatasContainer-Section'>
                                    {mappingData.map((slide, index) => (
                                        <div key={index} className='slideSubCategoryPage-container-slidesContainer-DatasContainer-Section-item'>
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

                                        </div>
                                    ))}
                                </div>
                                :
                                <div className="slide-loading-wrapper">
                                    <Loading />
                                </div>
                        }
                    </div>

                    {
                        user ?
                            <div className='slideSubCategoryPage-container-slidesContainer-DatasContainer-loadMoreContainer'>
                                {
                                    showLoadMore &&
                                    <div onClick={clickhandlerloadfrom} className='slideSubCategoryPage-container-slidesContainer-DatasContainer-loadMoreContainer-load'>
                                        <Button type="primary-outline-rounded" label="Load More" labelColor="black" />

                                    </div>
                                }
                                {
                                    loadMoreLoading &&
                                    <Loading type='clip' size={25} />
                                }
                            </div>
                            :
                            <div className='slideSubCategoryPage-container-slidesContainer-DatasContainer-loadMoreContainer'>
                                {

                                    <div className='slideSubCategoryPage-container-slidesContainer-DatasContainer-loadMoreContainer-load'
                                        onClick={handelformmodal}
                                    >
                                        <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                                    </div>
                                }

                            </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default SlideSubCategoryPage
