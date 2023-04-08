import axios from 'axios';
import firebase from "firebase";
import { motion } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

//LOCAL IMPORTS
import { Link } from "react-router-dom";
import { exploreLinks } from '../../components/constants/mock';
import { Headings } from '../../components/global/headings';
import SEO from '../../components/global/SEO';
import Loading from '../../components/loading';
import { PostPopUp } from '../../components/postPopUp';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { bookCategories } from "../../constants/Book/BookCategories";
import { logEventWithoutParams } from '../../functions/commonMethod';
import SlidePagination from '../Slide/component/pagination';
import { SubCatagories } from '../Slide/component/SubCatagories';
import BookCard from './components/bookCard';
import BookSuggestion from './components/bookSuggestion';
import BookTrending from './components/bookTrending';
import ExploreLinkTab from './components/exploreLinkTab';
import TopSearch from './components/topSearch';
import "./index.scss";





const Book = () => {
    const firestoreDatabase = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [bookDocId, setBookDocId] = useState([]);
    const [slideDocId, setSlideDocId] = useState([])
    const [mappingData, setMappingData] = useState([])
    const [exploreLinkActiveData, setExploreLinkActiveData] = useState('')
    const [subCategoryActiveHeading, setSubCategoryActiveHeading] = useState('')
    const [loadingBooks, setLoadingBooks] = useState(false);
    const [trendingBooks, setTrendingBooks] = useState([])
    const [firstBook, setFirstBook] = useState("")
    const [lastBook, setLastBook] = useState("")
    const pageLimit = 10;
    const refToExploreSLides = useRef();
    const [showDDC, setShowDDC] = useState(false)
    const [showDDS, setShowDDS] = useState(false)
    const [articleData, setArticleData] = useState([])
    const [fetchedId,setFetchedId]=useState(null)

    const randomSubcategory = useCallback(category => {
       
        let filtered = bookCategories.filter(
            bookCategory => bookCategory.category == category,
        );
        let subCategories = filtered[0]?.subCategories;
        let randomInteger = Math.floor(Math.random() * (subCategories?.length - 1));
        // console.log('######');
        // console.log(randomInteger);
        // console.log(category, randomInteger, subCategories[randomInteger]);
        return subCategories[Math.floor(Math.random() * (subCategories?.length - 1))]
            .category;
    }, []
    )
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
          logEventWithoutParams("web_books_page_visited")
        }
        return (() => {
          isMounted = false;
        })
      }, [])

    useEffect(() => {
        let isMounted = true;

        const getUserPreferencesData = (subjectName, activeHeading) => {
   
            let allBooksData = [];

            try {

                if (subjectName == "All Books") {
                    setLoadingBooks(true);
                    const AllBooks = firestoreDatabase
                        .collection(`K-Books`)
                        .orderBy("subject")
                        // .startAt("fundamentals")
                        .limit(pageLimit)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(ele => {
                                allBooksData.push(ele.data());
                            });

                            if (isMounted) {
                                setLoadingBooks(false);
                                setMappingData(() => allBooksData)
                            }

                        });

                }

                else {

                    if (subjectName != '' && activeHeading != '') {
                        setLoadingBooks(true);
                      
                        const OtherBooks = firestoreDatabase
                            .collection(`K-Books-${subjectName.replace(/\s|\//g, "")}-${activeHeading.replace(/\s|\//g, "")}`)
                            .orderBy("subject")
                            // .startAt("Anatomy of Arm ")
                            .limit(pageLimit)
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(ele => {
                                    allBooksData.push(ele.data());
                                });

                                if (isMounted) {
                                    setLoadingBooks(false);
                                    setMappingData(() => allBooksData);
                                    setFirstBook(allBooksData[0]?.subject)
                                    setLastBook(allBooksData[allBooksData.length - 1]?.subject)
                                }
                            });
                    }
                }
            } catch (err) {
                console.log("ERROR FETCHING BOOKS", subjectName);
            }
        };

        getUserPreferencesData(exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books', subCategoryActiveHeading);
        return () => {
            isMounted = false;
        }
    }, [exploreLinkActiveData, subCategoryActiveHeading])

    // // BOOK TRENDING DATA
    // useEffect(() => {
    //     let isMounted = true
    //     if (isMounted) {
    //       try {
    //         firestoreDatabase.collection('K-Books')
    //           .orderBy("title")
    //           .limit(30)
    //           .get().then((querySnapshot) => {
    //             // console.log("No Preference data found",res)
    //             if (querySnapshot) {
    //               let bookTrendingData = [];
    //               querySnapshot.forEach((doc) => {
    //                 bookTrendingData.push(doc.data())
    //               })
    //               setTrendingBooks(bookTrendingData)
    //             }
    //           })
    
    //       } catch (err) {
    //         console.log("Error while fetching book trending data", err)
    //       }
    //     }
    //     return () => {
    //       isMounted = false
    //     }
    //   }, [])
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            firebase.firestore().collection("K-Books")
                .get()
                .then((querySnapshot) => {
                    let bookDocIdData = [];
                    let bookTrendingData = [];
                    querySnapshot.forEach((doc) => {
                        bookDocIdData.push(doc.id)
                        if(bookTrendingData?.length <=30){
                            bookTrendingData.push(doc.data())
                        }
                    })
                    setTrendingBooks(bookTrendingData);
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
    }, [])
    
    const activeData = (data) => {
        setExploreLinkActiveData(data.linkName)

    }
    const subCategoryHeading = (data) => {
        if (data != '') {
            setSubCategoryActiveHeading(data)
        }
    }


    const nextSlideAction = (index) => {
        let allBooksData = []
        setLoadingBooks(true);
       

        const randomBasicScience = randomSubcategory('Basic Science');
        const randomNursing = randomSubcategory('Nursing');
        const randomDental = randomSubcategory('Dental');
        const randomPhysiotherapy = randomSubcategory('Clinical Science');




        let bookType = exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books'
        let collectionName = ""

        switch (bookType) {
            case "All Books":
                collectionName = "AllSlidesDataLockDownVersions";
                break
            case "Basic Science":
                collectionName = `K-Books-BasicScience-${randomBasicScience.replace(/\s|\//g, "")}`;
                break
            case "Physiotherapy":
                collectionName = `K-Books-Physiotherapy-${randomPhysiotherapy.replace(/\s|\//g, "")}`;
                break
            case "Nursing":
                collectionName = `K-Books-Nursing-${randomNursing.replace(/\s|\//g, "")}`;
                break
            case "Dental":
                collectionName = `K-Books-Dental-${randomDental.replace(/\s|\//g, "")}`;
                break
        }


        const getNextDataFromFirebase = () => {
            refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
            if (lastBook != null && lastBook != undefined && collectionName != "") {
                firestoreDatabase
                    .collection(collectionName)
                    .orderBy("subject")
                    .startAfter(lastBook)
                    .limit(pageLimit)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) return;
                        querySnapshot.forEach(ele => {
                            allBooksData.push(ele.data());
                        });

                        setLoadingBooks(false);
                       
                        setMappingData(() => allBooksData);
                        setFirstBook(allBooksData[0]?.subject)
                        setLastBook(allBooksData[allBooksData.length - 1]?.subject)
                    });
            }
        }
        getNextDataFromFirebase()
    }

    const previousSlideAction = (index) => {
        refToExploreSLides.current.scrollIntoView({ behavior: 'smooth' })
        let allBooksData = []
        setLoadingBooks(true);
        // console.log('checking:',subjectName);
       
        const randomBasicScience = randomSubcategory('Basic Science');
        const getPreviousDataFromFirebase = () => {
            if (firstBook != null && firstBook != undefined) {
                firestoreDatabase
                    .collection(`K-Books-BasicScience-${randomBasicScience.replace(/\s|\//g, "")}`)
                    .orderBy("subject")
                    .endBefore(firstBook)
                    .limit(pageLimit)
                    .get()
                    .then(querySnapshot => {
                        if (querySnapshot.empty) return;
                        querySnapshot.forEach(ele => {
                            allBooksData.push(ele.data());
                        });

                        setLoadingBooks(false);
                      
                        setMappingData(() => allBooksData);
                        setFirstBook(allBooksData[0]?.subject)
                        setLastBook(allBooksData[allBooksData.length - 1]?.subject)
                    });
            }
        }
        getPreviousDataFromFirebase()
    }

   

   
    
  
  
    useEffect(() => {
      let isMounted=true;
  
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
        
            return [];
  
          })
      }
  
   
   
      getArticleData()

          return()=>{
              isMounted=false;
          }
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
        <motion.div className="book-page">
             <SEO title='Medicos Books page' description='Medicos book page provides over 10,000 medical books for medical students to enhance their knowledge and skill'/>
            {
               fetchedId && mappingData &&
               <PostPopUp BooksID={fetchedId[0].bookId} linkData={mappingData}/>
               
            }
           
            <TopSearch slideDocId={slideDocId} bookDocId={bookDocId} />
            <BookTrending details={trendingBooks} />
   
            <BookSuggestion details={trendingBooks} />
            <div ref={refToExploreSLides} className="book-page-book-section">
                <div className="book-page-book-section-col1">
                    <div className="heading">
                        <Headings className="heading" content="Explore" type="heading3" />
                    </div>
                    <div className="sub-heading">
                        <Headings type="heading5" content="Sub Catagories" />
                    </div>
                    <div className="sub-categories">
                        <SubCatagories slideArr={bookCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                    </div>

                </div>
                <div className="book-page-book-section-col2">

                    <div className="tabs">
                        <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                    </div>

                    <div className="sub-categories-forMobile">
                        <SubCatagories slideArr={bookCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                    </div>

                    <div className='dropdownForMobile'>
                        <h2 className='dropdownForMobile-head'>Explore</h2>
                        <div className='dropdownForMobile-category'>
                            <h3 className='dropdownForMobile-category-dd' onClick={() => { setShowDDC(!showDDC) }}>
                                <span>Category : {exploreLinkActiveData?`${exploreLinkActiveData}`:'All Books'}</span>
                                {/* <FontAwesomeIcon icon={faSortDown} className={`showD ${showDDC? 'rotateD':''}`}/> */}
                                <FaChevronRight className={`showD ${showDDC ? 'rotateD' : ''}`} width={5} fill={"#777"} />
                            </h3>
                            
                            <div className={`dd-hide ${showDDC ? 'dd-show' : ''}`} onClick={() => { setShowDDC(!showDDC) }}>
                                <ExploreLinkTab links={exploreLinks} activeData={activeData} />
                            </div>
                        </div>

                        <div className='dropdownForMobile-subcategory'>
                             {
                                 exploreLinkActiveData.length===0 || exploreLinkActiveData==='All Books' ?
                                 ""
                                 :
                                 <h3 className='dropdownForMobile-category-dd' onClick={() => { setShowDDS(!showDDS) }}>
                                 <span>Sub-category : {subCategoryActiveHeading}</span>
                                 {/* <FontAwesomeIcon icon={faSortDown} className={`showD ${showDDS? 'rotateD':''}`}/>  */}
                                 <FaChevronRight className={`showD ${showDDS ? 'rotateD' : ''}`} width={5} fill={"#777"} />
                                </h3>
                             }
                           

                            <div className={`dd-hide ${showDDS ? 'dd-show' : ''}`} onClick={() => { setShowDDS(!showDDS) }}>
                                <SubCatagories slideArr={bookCategories} activeLinkData={exploreLinkActiveData} subCategoryHeading={subCategoryHeading} />
                            </div>
                        </div>

                    </div>

                    {mappingData.length > 0 ?
                        <div className="book-page-book-section-col2-content-section">
                            {mappingData.map((book, index) => {
                                return <Link
                                    key={book.image + index}
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/bookDetails/${book.title}`,
                                        state: {
                                            data: JSON.stringify(book),
                                            wholeData: JSON.stringify(mappingData),
                                        }
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
                        <div className="book-loading-wrapper">
                            <Loading />
                        </div>
                    }
                    <div className="pagination">
                        <SlidePagination
                            activeSlideTab={exploreLinkActiveData?.length ? exploreLinkActiveData : 'All Books'}
                            // pages={pages}
                            activeColor="primary"
                            lastSlide={lastBook}
                            firstSlide={firstBook}
                            nextTrigger={nextSlideAction}
                            previousTrigger={previousSlideAction}
                        />
                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default Book
