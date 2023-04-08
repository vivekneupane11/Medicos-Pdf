import firebase from "firebase";
import React, { useEffect, useState } from 'react';
import {
    useLocation
} from "react-router-dom";

//LOCAL IMPORTS
import SEO from '../../components/global/SEO';
import SlidePagination from '../Slide/component/pagination';
import SlideCard from '../SlideDetail/components/slideCard';
import './_slideSubCategoryPage.scss';

const SlideSubCategoryPage = () => {

    const location = useLocation();
    const {slideCategory,slideSubCategory,slideName}=location.state;
    const [name,setName] = useState(slideName)
    const [category,setCategory] = useState(slideCategory)
    const [subCategory,setSubCategory ]= useState(slideSubCategory)

    const [loadingSlides,setLoadingSlides]=useState(false)
    const [mappingData,setMappingData]=useState([])
    const pageLimit=12;
    const firestoreDatabase = firebase.firestore();
    const [firstSlide, setFirstSlide] = useState("")
    const [lastSlide, setLastSlide] = useState("")



    useEffect(() => {
        let isMounted = true;

        const PreferredSubCategoryAllSlides=async()=>{
        

            let allSlidesData = [];


            try{
               
                setLoadingSlides(true);
                const AllSlides = firestoreDatabase
                   .collection(`K-Slides-${category.replace(/\s|\//g, "")}-${subCategory.replace(/\s|\//g, "")}`)
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
                            setMappingData(()=>allSlidesData)
                            setFirstSlide(allSlidesData[0]?.SlideName)
                            setLastSlide(allSlidesData[allSlidesData.length - 1]?.SlideName)
                        }

                    });
                  }
            
            catch(err){
                 console.log('error fetching local storage data',err)
            }
        }


        PreferredSubCategoryAllSlides();
        return () => {
            isMounted = false;
        }
    }, [])


    const nextSlideAction = (index) => {
        let allSlidesData = []
        setLoadingSlides(true);
      

        let collectionName = `K-Slides-${category.replace(/\s|\//g, "")}-${subCategory.replace(/\s|\//g, "")}`;


            const getNextDataFromFirebase = () => {

                if (lastSlide != null && lastSlide != undefined && collectionName !="") {
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
            let allSlidesData = []
            setLoadingSlides(true);
           
            const getPreviousDataFromFirebase = () => {
                if (firstSlide != null && firstSlide != undefined) {
                    firestoreDatabase
                        .collection( `K-Slides-${category.replace(/\s|\//g, "")}-${subCategory.replace(/\s|\//g, "")}`)
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

    return (
        <>
            <SEO title='MedicosPDF slide subCategories page' description='Slides subcategories are found in this page'/>

            <h3 className='AllSubCategoriesSLides-heading' >All slides of <span>{subCategory}</span></h3>
            <div className="AllSubCategoriesSLides-container">
                    {mappingData.map((slide, index) => (
                        <div
                        className="AllSubCategoriesSLides-container-link"
                        key={index}
                            // style={{ textDecoration: 'none' }}
                            // to={{
                            //     pathname: '/slideDetails',
                            //     state: {
                            //         data: JSON.stringify(slide),
                            //         wholeData: JSON.stringify(mappingData),

                            //     }
                            // }}
                            >
                            <div className=" AllSubCategoriesSLides-container-link-card">
                                    <SlideCard
                                        title={slide.slideCategory}
                                        description={slide.SlideName}
                                        images={slide.slideImages}
                                    />

                                </div>
                    </div>
                    ))}
            </div>

            <div className="AllSubCategoriesSLides-pagination">
                  <SlidePagination
                                activeSlideTab={category}
                                // pages={pages}
                                activeColor="primary"
                                lastSlide={lastSlide}
                                firstSlide={firstSlide}
                                nextTrigger={nextSlideAction}
                                previousTrigger={previousSlideAction}
                            />

                            
            </div>
            
        </>
    )
}

export default SlideSubCategoryPage
