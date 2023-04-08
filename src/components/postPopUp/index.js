import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { VscClose } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import shortid from 'shortid';

//local imports
import { logEventWithParams } from '../../functions/commonMethod';
import { SlideDataContext } from '../../pages/Slide';
import NewsLinkTag from '../global/newsLinkTag';
import { Paragraphs } from '../global/paragraphs';
import './_postPopUp.scss';

export const PostPopUp = ({BooksID,SlidesID,linkData}) => {
    const [scroll, setScroll] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const slidesWholeData = useContext(SlideDataContext)

    const [slides, setSlides] = useState(null)
    const [books, setBooks] = useState([])
    const [loadingSlides, setLoadingSlides] = useState(true)
    const [loadingBooks, setLoadingBooks] = useState(true)
    const firestoreDatabase = firebase.firestore();

    const PopUp = () => {
        const winScroll=document.documentElement.scrollTop;
        const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;
        const scrolled=(winScroll / height)*100;
        if (scrolled > 50) {
            setScroll(true);
        }
        else {
            setScroll(false);
        }
    }

     useEffect(() => {
        window.addEventListener('scroll', PopUp);
         return () => {
            window.removeEventListener('scroll', PopUp);
         }
     }, [])
   




    useEffect(() => {
        let isMounted = true;

        if(BooksID){

                try {
                    setLoadingBooks(true);
                   
                    const Books = firestoreDatabase
                        .collection(`K-Books`)
                        .doc(`${BooksID}`)
                        .get()
                        .then(querySnapshot => {
                            let allBooksData =querySnapshot.data();

                            if (isMounted) {
                                setLoadingBooks(false);
                                setBooks(allBooksData);
                            }
                        });
                }
                catch (err) {
                    console.log('err from tryCatch', err)
                }

         }

        return () => {
            isMounted = false;

        }
    }, [])


    
    useEffect(() => {
        let isMounted = true;

        if(SlidesID){

                try {
                    setLoadingSlides(true);
                   
                    const Books = firestoreDatabase
                        .collection(`K-Slides-${SlidesID[0]?.slideCategory}-${SlidesID[0]?.slideSubCategory}`)
                        // .collection('K-Slides-BasicScience-Microbiology')
                        .doc(`${SlidesID[0]?.slideId}`)
                        // .doc('Antigen')
                        .get()
                        .then(querySnapshot => {
                            let allSlideData =querySnapshot.data();

                            if (isMounted) {
                                setLoadingSlides(false);
                                setSlides(allSlideData);
                            }
                        });
                }
                catch (err) {
                    console.log('err from tryCatch', err)
                }

         }

        return () => {
            isMounted = false;

        }
    }, [])

    

//     console.log('fetched id:',fetchedId)


    return (
        <>
            {
                !closeModal && books &&
                <div className="postPopUp-wrapper">
                    <div className={`postPopUp ${scroll ? "active" : ""}`}>
                        <div className="postPopUp-content">
                            <VscClose className="close-button" onClick={()=>setCloseModal(true)}/>
                            <Link
                                    key={shortid.generate()}
                                    className="postPopUp-Link"
                                    to={{
                                        pathname: `/bookDetails/${books.title}`,
                                        state: {
                                            data: JSON.stringify(books),
                                            wholeData: JSON.stringify(linkData),
                                        }
                                    }}>
                            <div className="postPopUp-content-col1" style={{ backgroundImage: `url(${books?.image})` }}>
                         
                            </div>
                            </Link>
                            <div className="postPopUp-content-col2">
                                <NewsLinkTag color='#2568ef' tag={'Books'} />
                                <div className="details">
                                <Link
                                    key={shortid.generate()}
                                  style={{textDecoration:'none'}}
                                    to={{
                                        pathname: `/bookDetails/${books.title}`,
                                        state: {
                                            data: JSON.stringify(books),
                                            wholeData: JSON.stringify(linkData),
                                        }
                                    }}>
                                    <h3>{books?.subject }</h3>
                                  </Link>
                                </div>

                                <Paragraphs type="muted-text" content={books?.title} />

                            </div>

                        </div>

                    </div>


                </div>

            }
             {
                !closeModal && slides &&
                <div className="postPopUp-wrapper">
                    <div className={`postPopUp ${scroll ? "active" : ""}`}>
                        <div className="postPopUp-content">
                            <VscClose className="close-button" onClick={()=>setCloseModal(true)}/>
                            <Link
                                onClick={() => logEventWithParams("web_slide_opened", {
                                    slideTitle: slides?.SlideName,
                                    slideCategory: slides?.slideCategory,
                                    slideSubCategory: slides?.slideSubCategory
                                })}
                                className="postPopUp-Link"
                                to={{
                                    pathname: `/slideDetails/${slides?.SlideName}/${slides?.slideCategory}/${slides?.slideSubCategory.replace(/\s|\//g, "")}`,
                                    state: {
                                        data: JSON.stringify(slides),
                                        wholeData: JSON.stringify(linkData),
                                    }
                                }}
                                >
                            <div className="postPopUp-content-col1" style={{ backgroundImage: `url(${slides?.slideImages[0]})` }}>
                         
                            </div>
                            </Link>
                            <div className="postPopUp-content-col2">
                                <NewsLinkTag color='#2568ef' tag={'Slides'} />
                                <div className="details">
                                <Link
                                onClick={() => logEventWithParams("web_slide_opened", {
                                    slideTitle: slides.SlideName,
                                    slideCategory: slides?.slideCategory,
                                    slideSubCategory: slides?.slideSubCategory
                                })}
                               style={{textDecoration:'none'}}
                                to={{
                                    pathname: `/slideDetails/${slides?.SlideName}/${slides?.slideCategory}/${slides?.slideSubCategory.replace(/\s|\//g, "")}`,
                                    state: {
                                        data: JSON.stringify(slides),
                                        wholeData: JSON.stringify(linkData),
                                    }
                                }}
                                >
                                    <h3>{ slides?.slideCategory }</h3>
                                    <h3>{ slides?.slideSubCategory}</h3>
                                </Link>
                                </div>

                                <Paragraphs type="muted-text" content={slides?.SlideName} />

                            </div>

                        </div>

                    </div>


                </div>

            }
        </>
    )
}
