import firebase from "firebase";
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

//LOCAL IMPORTS
import "./index.scss";
import SEO from '../../components/global/SEO';
import { DisplayTitle } from '../../components/global/Titles';
import Loading from '../../components/loading';
import BookCard from '../Book/components/bookCard';
import SlideCard from '../SlideDetail/components/slideCard';


const SearchResult = () => {
    const location = useLocation();
    const [searchedBook, setSearchedBook] = useState([]);
    const [bookFound, setBookFound] = useState(true);
    const [searchedSlides, setSearchedSlides] = useState([])
    const [slideFound, setSlideFound] = useState(true);
    const { slideDocId, bookDocId, searchText } = location.state;
    let parsedSlideDocId = JSON.parse(slideDocId);
    let parsedBookDocId = JSON.parse(bookDocId);
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            let matchedBooks = []
            let matchedSlides = []
            setSearchedBook([]);
            setSearchedSlides([]);
            //FETCHING BOOKS
            parsedBookDocId.map((docId) => {
                if (docId.includes(searchText)) {
                    matchedBooks.push(docId);
                }
            })

            matchedBooks.map((bookId, index) => {
                try {
                    firebase.firestore().collection("K-Books")
                        .doc(bookId)
                        .get()
                        .then((res) => {
                            if (res.data() && isMounted) {
                                matchedBooks.push(res.data())
                                setSearchedBook((init) => [...init, res.data()]);
                            } else if (!res.data() && isMounted && matchedBooks?.length - 1 == index) {
                                setBookFound(false);
                            }
                        })

                } catch (error) {
                    console.log("Error while fetching searched book", error)
                }
            })
            if (!matchedBooks?.length) {
                setBookFound(false)
            }

            // FETCHING SLIDES
            parsedSlideDocId.map((docId) => {
                if (docId.includes(searchText)) {
                    matchedSlides.push(docId);
                }
            })
            matchedSlides.map((slideId, index) => {
                try {
                    firebase.firestore().collection("AllSlidesDataLockDownVersions")
                        .doc(slideId)
                        .get()
                        .then((res) => {
                            // console.log("This is fetched  data",res.data())
                            if (res.data() && isMounted) {
                                matchedSlides.push(res.data())
                                setSearchedSlides((init) => [...init, res.data()]);
                            } else if (!res.data() && isMounted && matchedSlides?.length - 1 == index) {
                                setSlideFound(false);
                            }
                        })

                } catch (error) {
                    console.log("Error while fetching searched slides", error)
                }
            })
            if (!matchedSlides?.length) {
                setSlideFound(false)
            }
        }
        return () => {
            isMounted = false
        }
    }, [])
    return (
        <div className="search-result-page-container">

            <SEO title='MedicosPDF search result page' description='All the search results are shown in this page that includes books and slides' />
            <div className="search-result-page-book-section">
                <div className="search-result-page-book-section-head">
                    <DisplayTitle title="Books" type="display3" />
                </div>

                {
                    searchedBook?.length ?
                        <div className="search-result-page-book-section-grid">
                            {searchedBook?.map((book, index) => {
                               
                                return <Link
                                    key={book?.title}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/bookDetails/${book?.title}`,
                                        // state: {
                                        //     data: JSON.stringify(book),
                                        //     wholeData: JSON.stringify(mappingData),
                                        // }
                                    }}>
                                    <div className="item">
                                        <BookCard
                                            image={book?.image}
                                            title={book?.title}
                                            author={book?.writer}
                                            rating={book?.rating}
                                        />
                                    </div>
                                </Link>
                            })}
                        </div>
                        :
                        <div>
                            {
                                bookFound ?
                                    <div className="search-loading">
                                        <Loading />
                                    </div>
                                    :
                                    <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            }
                        </div>
                }
                <div className="search-result-page-book-section-head">
                    <DisplayTitle title="Slides" type="display3" />
                </div>
                {
                    searchedSlides?.length ?

                        <div className="search-result-page-book-section-grid">
                            {searchedSlides.map((slide, index) => (
                                <div key={slide?.SlideName} className="item" >
                                    <SlideCard
                                        title={slide.slideCategory}
                                        description={slide.SlideName}
                                        images={slide.slideImages}
                                        wholeDatas={searchedSlides}
                                        datas={slide}
                                    />
                                </div>
                            ))}
                        </div>
                        :
                        <div>
                            {
                                slideFound ?
                                    <div className="search-loading">
                                        <Loading />
                                    </div>
                                    :
                                    <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            }
                        </div>
                }
            </div>
            <div className="search-result-page-slide-section">

            </div>
        </div>
    )
}

export default SearchResult
