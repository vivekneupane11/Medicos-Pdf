// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import React, { useCallback, useContext, useEffect, useRef, useState, Suspense } from 'react';
import LazyLoad from 'react-lazyload';
import shortid from "shortid";
//LOCAL IMPORTS
import { Link } from "react-router-dom";
import img from '../../assets/images/bookbackg.webp';
import { exploreLinks } from '../../components/constants/mock';
import { Button } from '../../components/global/button';
import { Headings } from '../../components/global/headings';
import ScrollToTopButton from '../../components/global/scrollToTopButton';
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { bookCategories } from "../../constants/Book/BookCategories";
// import useLocalStorage from '../../customHooks/useLocalStorage';
import { logEventWithoutParams } from '../../functions/commonMethod';
import { fetchAllBooksAndSlidesDocId, fetchSlidesAndBooksOrderedByNameWithLimit, fetchStartAfterBooksAndSlides } from '../../functions/firebaseMethod';
import { SubCatagories } from '../Slide/component/SubCatagories';

import Loadable from 'react-loadable';
import "./index.scss";
import BookCardPlaceholder from "./components/bookCardPlaceholder";
import LazyLoadingComponentLoader from "../../components/lazyLoadingLoaderComponent";
import { collection, getDocs, getFirestore ,doc, getDoc} from "firebase/firestore";
import ArrowRight from '../../components/global/icons/arrow_right';


const BookCard = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/bookCard")));
const BookSuggestion = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/bookSuggestion")));
const BookTrending = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/bookTrending")));
const ExploreLinkTab = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/exploreLinkTab")));
// const ExploreSearch = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/exploreSearch")));
const TopSearch = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/topSearch")));

const LoadableLoginModal = Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div style={{ color: 'gray' }}>Loading...</div>
    }
});


const Book = () => {
    const { user } = useContext(AuthContext)
    // const firestoreDatabase = firebase.firestore();
    // const [preference, setPreference] = useLocalStorage("preference", null);
    const [bookDocId, setBookDocId] = useState([]);
    const [slideDocId, setSlideDocId] = useState([])
    const [mappingData, setMappingData] = useState()
    const [exploreLinkActiveData, setExploreLinkActiveData] = useState('All')
    const [subCategoryActiveHeading, setSubCategoryActiveHeading] = useState('')
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [trendingBooks, setTrendingBooks] = useState([])
    const [firstBook , setFirstBook] = useState("")
    const [lastBook, setLastBook] = useState("")
    const pageLimit = 25;
    const refToExploreSLides = useRef();
    const [showDDC, setShowDDC] = useState(false)
    const [showDDS, setShowDDS] = useState(false)
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    //  const [fetchedId, setFetchedId] = useState(null);
    const [loadFromSearch, setLoadFromSearch] = useState(false);
    const [matchedBooks, setMatchedBooks] = useState([]);
    const [searchBookLimit, setSearchBookLimit] = useState(10);
    const [showFormModel, setShowFormModel] = useState(false)
    const loadingArray = Array.apply(null, Array(20))
    const db =getFirestore();

     useCallback(category => {
        let filtered = bookCategories.filter(
            bookCategory => bookCategory.category === category,
        );

        let subCategories = filtered[0]?.subCategories;
        let randomInteger = Math.floor(Math.random() * (subCategories?.length - 1));

        // console.log(category, randomInteger, subCategories[randomInteger]);
        return subCategories[randomInteger]
            .category;
    }, []
    )
    // USER FOR ANALYTICS
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            logEventWithoutParams("web_books_page_visited")
        }
        return () => {
            isMounted = false;
        }
    }, [])

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            const getUserPreferencesData = (subjectName, activeHeading) => {
                // let allBooksData = [];
                try {
                    if (subjectName === "All") {
                        setLoadingBooks(true);
                        fetchSlidesAndBooksOrderedByNameWithLimit('K-Books', 'subject', pageLimit)
                            .then((res) => {

                                if (isMounted) {
                                    setLoadingBooks(false);
                                    setMappingData(() => res?.allData)
                                    setFirstBook(res?.firstData)
                                    setLastBook(res?.lastData)
                                }
                            })
                    }
                    else {
                        if (subjectName !== '' && activeHeading !== '' && activeHeading) {
                            setLoadingBooks(true);
                            fetchSlidesAndBooksOrderedByNameWithLimit(`K-Books-${subjectName.replace(/\s|\//g, "")}-${activeHeading.replace(/\s|\//g, "")}`, 'subject', pageLimit)
                                .then((res) => {
                                    if (isMounted) {
                                        setLoadingBooks(false);
                                        setMappingData(() => res?.allData);
                                        setFirstBook(res?.firstData)
                                        setLastBook(res?.lastData)
                                    }
                                })
                        }
                    }
                } catch (err) {
                    console.log("ERROR FETCHING BOOKS", err);
                }
            };

            getUserPreferencesData(exploreLinkActiveData?.length ? exploreLinkActiveData : 'All', subCategoryActiveHeading);
        }
        return () => {
            isMounted = false;
        }
    }, [exploreLinkActiveData, subCategoryActiveHeading])


    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            const colRef= collection(db,"K-Books")
            getDocs(colRef)
                .then((querySnapshot) => {
                    let bookDocIdData = [];
                    let bookTrendingData = [];
                    querySnapshot.forEach((doc) => {
                        bookDocIdData.push(doc.id)
                        if (bookTrendingData?.length <= 30) {
                            bookTrendingData.push(doc.data())
                        }
                    })
                    setTrendingBooks(bookTrendingData);
                    setBookDocId(bookDocIdData);
                })
            fetchAllBooksAndSlidesDocId("K-Books")
                .then((res) => {
                    if (isMounted) {
                        setSlideDocId(res);
                    }
                })
        }
        return () => {
            isMounted = false
        }
    }, [db])

    const activeData = (data) => {
        setExploreLinkActiveData(data.linkName)

    }
    const toggleLoadFromSearch = () => {
        setLoadFromSearch(true);
    }

    // const toggleShowLoadMore = () => {
    //     setShowLoadMore(!showLoadMore);
    // }
    const searchResult = (data, matchedBooksData) => {
        setShowLoadMore(true);
        console.log('SEARCHED DATA', data?.length, matchedBooksData?.length)
        setSearchBookLimit(10);
        setMappingData(data);
        setMatchedBooks(matchedBooksData);
        if (matchedBooksData[matchedBooksData?.length - 1] === data[data?.length - 1].title) {
            setShowLoadMore(false);
        }
    }
    const subCategoryHeading = (data) => {
        if (data !== '') {
            setSubCategoryActiveHeading(data)
        }
    }


    const loadMore = (index) => {
        setLoadMoreLoading(true);
        // let allBooksData = []
        setLoadingBooks(true);

        let bookType = exploreLinkActiveData?.length ? exploreLinkActiveData : 'All'
        let collectionName = ""

        switch (bookType) {
            case "All":
                collectionName = "K-Books";
                break
            case "Basic Science":
                collectionName = `K-Books-BasicScience-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Clinical Science":
                collectionName = `K-Books-ClinicalScience-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Physiotherapy":
                collectionName = `K-Books-Physiotherapy-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Nursing":
                collectionName = `K-Books-Nursing-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            case "Dental":
                collectionName = `K-Books-Dental-${subCategoryActiveHeading.replace(/\s|\//g, "")}`;
                break
            default:
        }


        const getNextDataFromFirebase = () => {
            // refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
            if (lastBook !== null && lastBook !== undefined && collectionName !== "") {
                fetchStartAfterBooksAndSlides(collectionName, 'subject', lastBook, pageLimit)
                    .then((res) => {
                        if (res.length > 0) {
                            setLoadMoreLoading(false);
                            setLoadingBooks(false);
                            setMappingData((init) => [...init, ...res]);
                            setFirstBook(res[0]?.subject)
                            setLastBook(res[res.length - 1]?.subject)
                        } else {
                            // alert('data not found');
                            setShowLoadMore(false);
                            setLoadMoreLoading(false);
                        }
                    })
            }
        }
        getNextDataFromFirebase()
    }

    const loadMoreFromSearch = () => {
        setSearchBookLimit(searchBookLimit + 10)
        console.log('load books', mappingData?.length, matchedBooks?.length, searchBookLimit);
        matchedBooks.map((index) => {
            
           if (index > searchBookLimit && index < searchBookLimit + 10) {
                try {
                    console.log('clicked');
                    const colRef=doc(db,"K-Books","bookId")
                    // query (collection(db,"K-Books"),doc(db,'bookId'))
                   getDoc(colRef)
                        .then((res) => {
                            if (res.data()) {
                                setMappingData((init) => [...init, res.data()]);
                                console.log('Books', res.data());
                                // searchResult(searchedBook);
                                if (matchedBooks[matchedBooks?.length - 1] === res.data().title) {
                                    setShowLoadMore(false);
                                }
                            }
                        })

                } catch (error) {
                    console.log("Error while fetching searched book", error)
                }
            }
        })
    }

    //social  proof to be done
    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted) {
    //         try {
    //             firestoreDatabase.collection("MedicosPdfWeb-Social-PopUp")
    //                 .get()
    //                 .then((querySnapshot) => {
    //                     if (querySnapshot) {
    //                         let latestData = [];
    //                         querySnapshot.forEach((doc) => {
    //                             latestData.push(doc.data());
    //                         })
    //                         setFetchedId(latestData)

    //                     }
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
    useEffect(() => {
        let isMounted = true
        if (isMounted && user?.uid) {
            setShowFormModel(false)
        }
        return () => {
            isMounted = false;
        }
    }, [user?.uid])


    const clickhandlerdrop = () => { setShowDDC(!showDDC) }
    const clickhandlerdrop2 = () => { setShowDDC(!showDDC) }
    const clickhandlerdrop3 = () => { setShowDDS(!showDDS) }
    const clickhandlerhide = () => { setShowDDS(!showDDS) }
    const clickhandlerdrop4 = () => loadFromSearch ? loadMoreFromSearch() : loadMore()
    const formmodalTrue=() => setShowFormModel(true)

    return (
        <div className="book-page">
            {/* <h1>{lastBook.length}</h1> */}
            <ScrollToTopButton />
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />

            <SEO image={img} title=' Free Medical Books. We have more than 20,000 of medical books for free. Free Medical Books related to Basic Science , Clinical Science , Nursing , Dental (BDS) , BAMS and so on..Free authentic medical books are here for you.Free Medical Books , Free Medical Slides , Free Medical Notes , Medical Socio-Learning platform , MedicosPdf, medicos , free medical book , download medical book pdf , get medical books for free , medical slides for free , MedicosPdf ,free nursing book , free dentistry book pdf download , free mbbs book free download , free books , download freebooks pdf , free medical book , how to get free medical books , how to download medical books for free, where can i get free medical books , free medical notes, medical notes for free, download medical notes for free, free medical books pdf , get medical books for free., free basic science books pdf , free clinical science books free download , free nursing books , free medical books.' description={bookDocId.toString()} />
      
            <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                <TopSearch slideDocId={slideDocId} bookDocId={bookDocId} />
            </Suspense>
            <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                <BookTrending />
            </Suspense>

            <LazyLoad height={200} offset={100}>
                <BookSuggestion details={trendingBooks} />
            </LazyLoad>
            <div ref={refToExploreSLides} className="book-page-book-section">
               
                <div className="book-page-book-section-col2">
                <h3 className="explore-heading">Explore</h3>

                    <div className="tabs">

                        <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                        </Suspense>

                    </div>

                  

                    <div className='dropdownForMobile'>
                        <h2 className='dropdownForMobile-head'>Explore</h2>

                        <div className='dropdownForMobile-category'>
                            <h3 className='dropdownForMobile-category-dd' onClick={clickhandlerdrop}>
                                <span>Category : {exploreLinkActiveData ? `${exploreLinkActiveData}` : 'All'}</span>
                                <ArrowRight className={`showD ${showDDC ? 'rotateD' : ''}`} />
                            </h3>

                            <div className={`dd-hide ${showDDC ? 'dd-show' : ''}`} onClick={clickhandlerdrop2}>
                                <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                            </div>
                        </div>

                        <div className='dropdownForMobile-subcategory'>
                            {
                                exploreLinkActiveData.length === 0 || exploreLinkActiveData === 'All' ?
                                    ""
                                    :
                                    <h3 className='dropdownForMobile-category-dd' onClick={clickhandlerdrop3}>
                                        <span>Sub-category : {subCategoryActiveHeading}</span>
                                        <ArrowRight className={`showD ${showDDS ? 'rotateD' : ''}`} />
                                    </h3>
                            }


                            <div className={`dd-hide ${showDDS ? 'dd-show' : ''}`} onClick={clickhandlerhide}>
                                <SubCatagories slideArr={bookCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                            </div>
                        </div>
                        {/* <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                            <ExploreSearch
                                type='book'
                                exploreLinkActiveData={exploreLinkActiveData}
                                subCategoryActiveHeading={subCategoryActiveHeading}
                                bookDocId={bookDocId}
                                searchResult={searchResult}
                                toggleLoadFromSearch={toggleLoadFromSearch}
                                placeholder="Search Medical Books"
                            />
                        </Suspense> */}

                    </div>

                    {
                        <div className="book-page-book-section-col2-content-section">
                            {mappingData?.length > 0 ?
                                mappingData.map((book, index) => {
                                    return <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                                        <Link
                                            key={book.image + index}
                                            className="item"
                                            to={{
                                                pathname: `/bookdetails/${book.title}`,
                                                state: {
                                                    data: JSON.stringify(book),
                                                    wholeData: JSON.stringify(mappingData),
                                                }
                                            }}>
                                            <BookCard
                                                image={book?.image}
                                                title={book?.title}
                                                author={book?.writer}
                                                rating={book?.rating}
                                            />
                                        </Link>
                                    </Suspense>
                                })
                                :
                                loadingArray.map(() => {
                                    return <div key={shortid.generate()} className="item">
                                        <BookCardPlaceholder />
                                    </div>

                                })
                            }

                        </div>

                    }

                    <div className="pagination">
                        {
                            user ?
                                <div className="pagination-container">
                                    {
                                        showLoadMore &&
                                        <div onClick={clickhandlerdrop4}>
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
                                        <div onClick={formmodalTrue} >
                                            <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                                        </div>
                                    }


                                </div>
                        }
                        {/* <SlidePagination
                            activeSlideTab={exploreLinkActiveData?.length ? exploreLinkActiveData : 'All'}
                            // pages={pages}
                            activeColor="primary"
                            lastSlide={lastBook}
                            firstSlide={firstBook}
                            nextTrigger={loadMore}
                            previousTrigger={previousSlideAction}
                        /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default React.memo(Book)
