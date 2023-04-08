import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import img from '../../assets/images/bookbackg.webp';
import { Button } from "../../components/global/button";
import SEO from '../../components/global/SEO';
import { DisplayTitle } from '../../components/global/Titles';
import Loading from '../../components/loading';
import { AuthContext } from "../../components/signUp/authMethods/authentication";
import useDocId from "../../customHooks";
import LoadingSearchAnimation from '../../components/LoadingSearch';
//LOCAL IMPORTS
import "./index.scss";

import Loadable from 'react-loadable';
// import { collection, getDoc,  getFirestore, onSnapshot, setDoc,doc } from "firebase/firestore";
import shortid from 'shortid';
import { async } from '@firebase/util';
// import RequestModal from '../BookDetail/components/requestmodal';

// const UploadedSlide =  Loadable({
//     loader: () => import('./pages/UploadedSlide'),
//     loading() {
//       return <div className="loading">Loading...</div>
//     }
//   });
  const SearchTab =  Loadable({
    loader: () => import('./components/SearchTab'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });
  const JournalCard =  Loadable({
    loader: () => import('./components/JournalCard'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });
  const BookCard =  Loadable({
    loader: () => import('../Book/components/bookCard'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });
  const FollowersAndFollowing =  Loadable({
    loader: () => import('../Profile/components/followersAndFollowing'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });
  const SlideCard =  Loadable({
    loader: () => import('../SlideDetail/components/slideCard'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });
  const ArticleCard =  Loadable({
    loader: () => import('./components/ArticleCard'),
    loading() {
      return <div className="loading">Loading...</div>
    }
  });

const LoadableLoginModal =  Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div className='loading'>Loading...</div>
    }
  });
const RequestModal =Loadable({
    loader: ()=> import('../BookDetail/components/requestmodal'),
    loading(){
        return <div className="loading">Loading...</div>
    }
})

  const loadingArray = Array.apply(null, Array(12));

const SearchResult = () => {
    const { user,username } = useContext(AuthContext);
    const { searchText } = useParams();
    const [showFormModel, setShowFormModel] = useState(false)

    const [searchedBook, setSearchedBook] = useState([]);
    const [searchedSlides, setSearchedSlides] = useState([])
    const [searchedArticles, setSearchedArticles] = useState([])
    const [searchedJournals, setSearchedJournals] = useState([])
    const [searchedProfiles, setSearchedProfiles] = useState([])

    const [bookFound, setBookFound] = useState(true);
    const [slideFound, setSlideFound] = useState(true);
    const [articleFound, setArticleFound] = useState(true);
    const [journalFound, setJournalFound] = useState(true);
    const [profileFound, setProfileFound] = useState(true);


    const [loadBooks, setLoadBooks] = useState(10);
    const [loadSlides, setLoadSlides] = useState(10);
    const [loadArticles, setLoadArticles] = useState(10);
    const loadJournals = 10;
    const [loadProfiles, setLoadProfiles] = useState(10);
//searchtext is passed to useDoc hooks so we can load firebase data only when it eneters searchresult page
    const { slideDocId, bookDocId, searchTagDocId, profileDocId } = useDocId(searchText);
    const [matchedBooks, setMatchedBooks] = useState([]);
    const [matchedSlides, setMatchedSlides] = useState([]);
    const [matchedArticles, setMatchedArticles] = useState([]);
    const [matchedJournals, setMatchedJournals] = useState([]);
    const [matchedProfiles, setMatchedProfiles] = useState([]);

    const [booksLoadMoreLoading , setBooksLoadMoreLoading] = useState(false)
    const [slideLoadMoreLoading , setSlideLoadMoreLoading] = useState(false)

    const [activeTab, setActiveTab] = useState('All');
    const [orderType, setOrderType] = useState('Relevance');
    const [showRequestModal,setShowRequestModal]=useState(false)
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import ('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    }

    function compareBookByTitle(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function compareSlideBySlideName(a, b) {
        if (a.SlideName < b.SlideName) {
            return -1;
        }
        if (a.SlideName > b.SlideName) {
            return 1;
        }
        return 0;
    }
    async function loadMoreBooksAndSlides(type, loadLimit, matchedData, collectionName) {
        // alert('load more books')
        let fetchedData = [];
        if (type === 'book') {
            setLoadBooks((init) => init + 10)
        } else if (type === 'slide') {
            setLoadSlides((init) => init + 10)
        }
        // alert(collectionName + matchedData?.length)

        return Promise.all(
            matchedData.map(async (dataDocId, index) => {
                if (index > loadLimit && index < loadLimit + 10) {
                    try {
                        const {firestore:{db,getDoc,doc}}=await getFirebaseAll()
                        console.log('clicked');
                        // return await firebase.firestore().collection(collectionName)
                        //     .doc(dataDocId)
                        //     .get()
                           return await getDoc(doc(db,collectionName,dataDocId))
                            .then((res) => {
                                if (res.data()) {
                                    fetchedData.push(res.data());
                                    // setSearchedBook((init) => [...init, res.data()]);
                                }
                                console.log('This is loadmore', index, loadLimit + 9)
                                if (index === loadLimit + 9) {
                                    console.log('This is GDFSGDFSGDFSG', res)
                                    return fetchedData;
                                }
                            })

                    } catch (error) {
                        console.log("Error while fetching searched book", error)
                    }
                }
            })
        ).then((res) => {
            let filteredData = res.filter((data) => data !== undefined);
            console.log('LoadMore', filteredData);
            // alert('LoadMore' + JSON.stringify(filteredData));
            if (type === 'book' && (orderType === 'Relevance' || orderType === 'Ascending') && filteredData?.length > 0) {
                setSearchedBook((init) => [...init, ...filteredData[0]].sort(compareBookByTitle))
            } else if (type === 'book' && (orderType === 'Descending') && filteredData?.length > 0) {
                setSearchedBook((init) => [...init, ...filteredData[0]].sort(compareBookByTitle).reverse())
            } else if (type === 'slide' && (orderType === 'Relevance' || orderType === 'Ascending') && filteredData?.length > 0) {
                setSearchedSlides((init) => [...init, ...filteredData[0]].sort(compareSlideBySlideName))
            } else if (type === 'slide' && (orderType === 'Descending') && filteredData?.length > 0) {
                setSearchedSlides((init) => [...init, ...filteredData[0]].sort(compareSlideBySlideName).reverse())
            }
        })
    }

    function loadMoreArticlesAndJournals(type, loadLimit, matchedData, firstCollection, secondCollection) {
        console.log('articles')
        let fetchedData = [];
        if (type === 'journal') {
            setLoadBooks((init) => init + 10)
        } else if (type === 'articles') {
            setLoadArticles((init) => init + 10)
        }

        return Promise.all(
            matchedData.map(async (data, index) => {
                if (index > loadLimit && index < loadLimit + 10) {
                    try {
                        console.log('clicked');
                        const {firestore:{db,getDoc,doc}}=await getFirebaseAll()

                        // return await firebase.firestore().collection(firstCollection)
                        //     .doc(data?.sourceDocId)
                        //     .collection(secondCollection)
                        //     .doc(data?.title)
                        //     .get()
                        return await getDoc(doc(db,firstCollection,data?.sourceDocId,secondCollection,data?.title))
                            .then((querySnapshot) => {
                                if (querySnapshot.data()) {
                                    fetchedData.push(querySnapshot.data());
                                    // setSearchedBook((init) => [...init, res.data()]);
                                }
                                console.log('This is loadmore', index, loadLimit + 9)
                                if (index === loadLimit + 9) {
                                    console.log('This is GDFSGDFSGDFSG', querySnapshot)
                                    return fetchedData;
                                }
                            })
                    } catch (error) {
                        console.log("Error while fetching searched book", error)
                    }
                }
            })
        ).then((res) => {
            let filteredData = res.filter((data) => data !== undefined);
            console.log('LoadMore', filteredData);
            if (type === 'journal' && filteredData?.length > 0) {
                setSearchedJournals((init) => [...init, ...filteredData[0]])
            } else if (type === 'articles' && filteredData?.length > 0) {
                setSearchedArticles((init) => [...init, ...filteredData[0]])
            }
        })
    }

    function loadMoreChannels(matchedDocId,loadLimit) {
        // alert("Load more")
        let fetchedData = [];
        setLoadProfiles((init)=>init + 10);
        matchedDocId?.map((docId,index)=>{
            if(index > loadLimit && index < loadLimit + 10)
            {
                fetchedData.push(docId)
            }
        })
        setSearchedProfiles((init)=>[...init,...fetchedData])
    }

    function fetchMatchedDataArticlesAndJournals(matchedDocIdData, loadLimit, firstCollection, secondCollection) {
        let matchedData = [];
        console.log("THIS IS ARTICLES", matchedDocIdData);

        return Promise.all(
            matchedDocIdData.map(async (data, index) => {
                if (index < loadLimit) {
                    try {
                        const {firestore:{db,getDoc,doc}}=await getFirebaseAll()

                        // return await firebase.firestore().collection(firstCollection)
                        //     .doc(data?.sourceDocId)
                        //     .collection(secondCollection)
                        //     .doc(data?.title)
                        //     .get()

                        return await getDoc(doc(db,firstCollection,data?.sourceDocId,secondCollection,data?.title))
                            .then((querySnapshot) => {
                                // console.log("THIS IS ARTICLES", loadLimit, index);
                                if (querySnapshot.data()) {
                                    matchedData.push(querySnapshot.data());
                                } else if (!querySnapshot.data() && matchedDocIdData?.length - 1 === index) {
                                    return false;
                                }
                                if (querySnapshot.data() && (loadLimit - 1 === index || matchedDocIdData?.length - 1 === index)) {
                                    // console.log("LAST INDEX", querySnapshot.data());
                                    return matchedData;
                                }
                            })
                    } catch (error) {
                        console.log("Error while fetching searched book", error)
                    }
                }
            })
        ).then((matchedData) => {
            console.log("THIS IS ARTICLES", matchedData, firstCollection, secondCollection);
            return { data: matchedData.filter((data) => data !== undefined), matchedDocIdData };
        })

    }


    function fetchMatchedData(docIdList, searchText, loadLimit, collectionName) {
        let matchedDocIdData = []
        let matchedData = []
        docIdList?.map((docId) => {
            if (docId.toLowerCase().includes(searchText.toLowerCase())) {
                matchedDocIdData.push(docId);
            }
        })

        return Promise.all(
            matchedDocIdData.map(async (docId, index) => {
                if (index < loadLimit) {
                    try {
                        const {firestore:{db,getDoc,doc}}=await getFirebaseAll()

                        // return await firebase.firestore().collection(collectionName)
                        //     .doc(docId)
                        //     .get()
                        return await getDoc(doc(db,collectionName,docId))
                            .then((res) => {
                                if (res.data()) {
                                    matchedData.push(res.data())
                                } else if (!res.data() && matchedDocIdData?.length - 1 === index) {
                                    return false;
                                }
                                if (res.data() && (loadLimit - 1 === index || matchedDocIdData?.length - 1 === index)) {
                                    console.log("LAST INDEX BOOKS AND SLIDES", res.data());
                                    return matchedData;
                                }
                            })

                    } catch (error) {
                        console.log("Error while fetching searched book", error)
                    }
                }
            })
        ).then((matchedData) => {
            return { data: matchedData.filter((data) => data !== undefined), matchedDocIdData };
        })
        // if (!matchedBooksData?.length) {
        //     setBookFound(false)
        // }

    }

    function fetchProfileData(docIdList, searchText) {
        let matchedDocIdData = []
        // let matchedData = []
        docIdList?.map((docId) => {
            if (docId.toLowerCase().includes(searchText.toLowerCase())) {
                matchedDocIdData.push(docId);
            }
        })
        return { data: matchedDocIdData }
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

    const orderStatus = (order) => {
        console.log('8888888888888888', order);
        setOrderType(order)

        if (order === 'Ascending') {
            let comparedBookData = searchedBook?.sort(compareBookByTitle);
            let comparedSlideData = searchedSlides?.sort(compareSlideBySlideName);
            // console.log('THIS IS ORDER TYPE', orderType)
            setSearchedSlides(comparedSlideData)
            setSearchedBook(comparedBookData)
        }
        if (order === 'Descending') {
            let comparedBookData = searchedBook?.sort(compareBookByTitle).reverse();
            let comparedSlideData = searchedSlides?.sort(compareSlideBySlideName).reverse();
            setSearchedBook(comparedBookData)
            setSearchedSlides(comparedSlideData)
        }
    }

    const activeTabName = (name) => {
        setActiveTab(name)
    }
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            let matchedArticlesDocId = [];
            let matchedJournalsDocId = [];
            let matchedSearchTagsData = [];
            // let matchedProfilesData = [];
            let taggedSlideData = [];
            setSearchedBook([]);
            setSearchedSlides([]);

            //When enabling profile search make sure to add profileDocId?.length in this if functions
            // if (slideDocId?.length > 0 && bookDocId?.length > 0 && searchTagDocId?.length > 0 && profileDocId?.length >= 0) {
                if (slideDocId?.length > 0 && bookDocId?.length > 0 && searchTagDocId?.length > 0 ) {

                //FETCHING BOOK DATA
                 fetchMatchedData(bookDocId, searchText, loadBooks, 'K-Books').then((res) => {
                    console.log('Book FUNCTION', res.data);
                    if (res?.data?.length === 0) {
                        setBookFound(false);
                    } else {
                        setBookFound(true);
                    }
                    setSearchedBook(...res?.data);
                    setMatchedBooks(res?.matchedDocIdData)
                })

                // //FETCHING PROFILE DATA
                // let res = fetchProfileData(profileDocId, searchText, loadProfiles, 'Web-User-Data')
                // if (res?.data?.length === 0) {
                //     setProfileFound(false);
                // } else {
                //     setProfileFound(true);
                // }
                // let searchedProfileDocIdData = [];
                // res?.data?.map((profileDocId,index)=>{
                //     if(index < loadProfiles){
                //         searchedProfileDocIdData.push(profileDocId)
                //     }
                // })
                // setSearchedProfiles(searchedProfileDocIdData);
                // setMatchedProfiles(res?.data)
                //FETCHING SLIDES DATA
                 fetchMatchedData(slideDocId, searchText, loadSlides, 'AllSlidesDataLockDownVersions').then((res) => {
                    if (res?.data?.length === 0) {
                        setSlideFound(false);
                    } else {
                        setSlideFound(true);
                    }
                    setSearchedSlides(...res?.data);
                    setMatchedSlides(res?.matchedDocIdData)
                    console.log('SLIDES MATCHED', res?.matchedDocIdData);
                })
                // FETCHING SEARCH TAGS DATA
                searchTagDocId?.map((docId) => {
                    if (docId.toLowerCase().includes(searchText.toLowerCase())) {
                        matchedSearchTagsData.push(docId);
                    }
                })
                if (matchedSearchTagsData?.length === 0) {
                    setArticleFound(false);
                    setJournalFound(false);
                }
                matchedSearchTagsData.map(async(docId, index) => {
                    try {
                        const {firestore:{db,getDoc,doc}}=await getFirebaseAll()

                        // firebase.firestore().collection("Web-SearchByTag")
                        //     .doc(docId)
                        //     .get()
                        getDoc(doc(db,'Web-SearchByTag',docId))
                            .then(async (res) => {
                                console.log("THIS IS ARTICLE DATA", res.data().type);
                                if (res?.data()?.type === 'slide' && isMounted) {
                                    console.log('MATHCED SLIDES', docId)
                                    setMatchedSlides((init) => [...init, docId]);
                                    // firebase.firestore().collection('AllSlidesDataLockDownVersions')
                                    //     .doc(res?.data()?.title)
                                    //     .get()
                                        getDoc(doc(db,'AllSlidesDataLockDownVersions',res?.data()?.title))
                                        .then((querySnapshot) => {
                                            // let filteredData = searchedSlides?.filter((slide) => querySnapshot?.data()?.SlideName != slide?.SlideName)
                                            // taggedSlideData.push(...searchedSlides,...filteredData);
                                            // setSearchedSlides(taggedSlideData);
                                            setSearchedSlides((init) => {
                                                if (init) {
                                                    // console.log('MATHCED SLIDES',querySnapshot?.data()?.SlideName, slide?.SlideName)
                                                    let filteredData = init?.filter((slide) => querySnapshot?.data()?.SlideName !== slide?.SlideName)
                                                    taggedSlideData.push(...filteredData)
                                                    return [...init]
                                                }
                                            })
                                            if (!querySnapshot?.data()) {
                                                setSlideFound(false);
                                            } else {
                                                setSlideFound(true);
                                            }
                                        })
                                }
                                else if (res?.data()?.type === 'article' && isMounted) {
                                    matchedArticlesDocId.push(res?.data());
                                    if (matchedSearchTagsData?.length - 1 === index) {
                                        await fetchMatchedDataArticlesAndJournals(
                                            matchedArticlesDocId,
                                            loadArticles,
                                            'Web-Articles',
                                            'Articles'
                                        ).then((res) => {
                                            setSearchedArticles(res?.data[0])
                                            setMatchedArticles(res?.matchedDocIdData)
                                            console.log('RESPONSE ARTILCE', res?.data);
                                            if (!res?.data[0]) {
                                                setArticleFound(false);
                                            } else {
                                                setArticleFound(true)
                                            }
                                        })
                                    }

                                    console.log("article data", res.data().title)
                                }
                                else if (res?.data()?.type === 'journal' && isMounted) {
                                    matchedJournalsDocId.push(res?.data());
                                    if (matchedSearchTagsData?.length - 1 === index) {
                                        await fetchMatchedDataArticlesAndJournals(
                                            matchedJournalsDocId,
                                            loadJournals,
                                            'Web-Journals',
                                            'Journals'
                                        ).then((res) => {
                                            setSearchedJournals(res?.data[0])
                                            setMatchedJournals(res?.matchedDocIdData)
                                            console.log('RESPONSE JOURNAL', res);
                                            if (!res?.data[0]) {
                                                setJournalFound(false);
                                            } else {
                                                setJournalFound(true)
                                            }
                                        })
                                    }

                                }
                                if (matchedSearchTagsData?.length === index) {
                                    setSearchedSlides((init) => [...init, taggedSlideData])
                                }
                            })

                    } catch (error) {
                        console.log("Error while fetching searched slides", error)
                    }
                })
            }
        }
        return () => {
            isMounted = false
        }
    }, [slideDocId, bookDocId, searchTagDocId, profileDocId])

    useEffect(() => {
        if (user?.uid) {
            setShowFormModel(false)
        }
    }, [user?.uid])



    // console.log('searched slides', searchedSlides)
    const clickhandlerloadmoreslide = () =>{
        setSlideLoadMoreLoading(true)
        loadMoreBooksAndSlides("slide", loadSlides, matchedSlides, 'AllSlidesDataLockDownVersions').then(()=>    setSlideLoadMoreLoading(false))
    } 
    const clickhandlerloadmoreslide2 = () => loadMoreArticlesAndJournals('articles', loadArticles, matchedArticles, 'Web-Articles', 'Articles')
    const clickhandlermorebook = () =>{
        setBooksLoadMoreLoading(true)
        loadMoreBooksAndSlides("book", loadBooks, matchedBooks, 'K-Books').then(()=>    setBooksLoadMoreLoading(false))

    } 
    const clickhandlermoreslide = () => loadMoreArticlesAndJournals('journal', loadJournals, matchedJournals, 'Web-Journals', 'Journals')
    const clickhandlermorechannels = () => loadMoreChannels(matchedProfiles,loadProfiles)
    const handelformmodal=() => setShowFormModel(true)


    const searchResultData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": searchText,
            "item": `https://medicospdf.com/search/searchtext/${searchText}`
        }, {
            "@type": "ListItem",
            "position": 2,
            "name": searchText,
            "item": `https://medicospdf.com/search/searchtext/${searchText}`
        }, {
            "@type": "ListItem",
            "position": 3,
            "name": "Medicos PDF"
        }]
    }


//fetched logged user history if present else add and dont repeat adding duplicate history
  useEffect(async() => {
    let isMounted=true

    if(isMounted && user && username){
      try {
        const {firestore:{db,onSnapshot,collection,setDoc,doc}}=await getFirebaseAll()

        const colRef = collection(db,'Web-User-Data',username,'Search-History')
       
        onSnapshot(colRef,(res)=>{
          if(res){
            
            let allHistory = []
            res.forEach(ele => {
                allHistory.push(ele.data());
            })
         
            if(allHistory){
                let historyTextArray=[]
                allHistory.forEach((ele)=>{
                    historyTextArray.push(ele.searchedText)
                })
                if(historyTextArray.includes(searchText)){
                    //no data add
                }
                else{
                    
                    setDoc(doc(db,'Web-User-Data',username,'Search-History',searchText),
                    {
                        searchedText:searchText,
                    })
                    
                }
              
            }
          }
          else{       
            
            setDoc(doc(db,'Web-User-Data',username,'Search-History',searchText),
            {
                searchedText:searchText,
            })
          }


        })
       
        
      } catch (error) {
        console.log('error fetching search history',error)
        
      }

    }

    return () => {
      isMounted=false
    }
  }, [username,user,searchText])

    return (
        <div className="search-result-page-container">

            <script type="application/ld+json">
                {JSON.stringify(searchResultData)}
            </script>
         
            <SEO image={img} title='MedicosPDF search result' description={slideDocId.toString() + bookDocId.toString() + searchTagDocId.toString()} />
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            <SearchTab
                activeTabName={activeTabName}
                orderStatus={orderStatus}
                slideCount={matchedSlides?.length}
                bookCount={matchedBooks?.length}
                articleCount={matchedArticles?.length}
                journalCount={matchedJournals?.length}
                profileCount={matchedProfiles?.length}
            />
            {
                searchedBook?.length > 0 || searchedSlides?.length > 0 || searchedArticles?.length > 0 || searchedJournals?.length > 0 || searchedProfiles?.length > 0 ?
                    <>
                        {/* BOOK SECTION */}
                        {
                            searchedBook?.length > 0 && (activeTab === 'All' || activeTab === 'Books') &&
                            <div className="search-result-page-book-section">
                                <div className="search-result-page-book-section-head">
                                    <p>{`${matchedBooks?.length} results found on `}</p>
                                    {/* {
                                        matchedBooks?.map((book)=>{
                                            return <p>{book.title}</p>
                                        })
                                    } */}
                                    <DisplayTitle title={`'${searchText?.split("-", 1)[0]}'`} type="display4" />
                                </div>

                                <div className="search-result-page-book-section-grid">
                                    {searchedBook?.map((book, index) => {


                                        return <Link
                                            key={book?.title + index}
                                            className='links'
                                            to={{
                                                pathname: `/bookdetails/${book?.title}`,
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
                                {
                                    matchedBooks?.length - 1 > loadBooks && searchedBook.length>9 &&
                                    <div className="search-result-page-book-section-footer">
                                        {
                                            user ?
                                                <div onClick={clickhandlermorebook} className="search-result-page-book-section-load-more-button">
                                                           {booksLoadMoreLoading &&     <Loading type='clip' size={25} />}
                                                    <Button type="primary-outline-rounded" label="Load More Books" labelColor="black" />
                                             
                                                </div>
                                                :
                                                <div onClick={handelformmodal} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Books" labelColor="black" />
                                                </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                        {
                            (searchedBook?.length === 0 || !searchedBook) && (activeTab === 'Books') &&
                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }

                        {/* SLIDE SECTION */}
                        {
                            searchedSlides?.length > 0 && (activeTab === 'All' || activeTab === 'Slides') &&
                            <div className="search-result-page-slide-section nopadding">
                                <div className="search-result-page-book-section-head">
                                    <p>{`${matchedSlides?.length} results found on `}</p>
                                    <DisplayTitle title={`'${searchText?.split("-", 1)[0]}'`} type="display4" />
                                </div>


                                <div className="search-result-page-book-section-grid">
                                    {searchedSlides.map((slide, index) => (
                                        <div key={slide?.SlideName + index} className="search-result-page-book-section-grid-item" >
                                            <SlideCard
                                                title={slide.slideCategory}
                                                title2={slide.slideSubCategory}
                                                description={slide.SlideName}
                                                images={slide.slideImages}
                                                wholeDatas={searchedSlides}
                                                datas={slide}
                                                showModal={showModal}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {
                                    matchedSlides?.length - 1 > loadSlides && searchedSlides.length>9 &&
                                    <div className="search-result-page-book-section-footer">
                                        {
                                            user?
                                                <div onClick={clickhandlerloadmoreslide} className="search-result-page-book-section-load-more-button">
                                                          {slideLoadMoreLoading &&     <Loading type='clip' size={25} />}
                                                    <Button type="primary-outline-rounded" label="Load More Slides" labelColor="black" />
                                              
                                                </div>
                                                :
                                                <div onClick={handelformmodal} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Slides" labelColor="black" />
                                                </div>
                                        }
                                    </div>
                                }

                            </div>
                        }
                        {
                            searchedSlides?.length === 0 && (activeTab === 'Slides') &&
                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }

                        {/* PROFILE SECTION */}
                        {
                            searchedProfiles?.length > 0 && (activeTab === 'All' || activeTab === 'Channels') &&
                            <div className="search-result-page-slide-section nopadding">
                                <div className="search-result-page-book-section-head">
                                    <p>{`${matchedProfiles?.length} results found on `}</p>
                                    <DisplayTitle title={`'${searchText?.split("-", 1)[0]}'`} type="display4" />
                                </div>


                                <div className="search-result-page-book-section-grid">
                                    {searchedProfiles?.map((profile, index) => {
                                        // console.log('profile data', profile)
                                        return <div key={profile + index} className="search-result-page-book-section-grid-item" >
                                            <FollowersAndFollowing data={{ username: profile }} />
                                        </div>
                                    }
                                    )}
                                </div>
                                {
                                    matchedProfiles?.length - 1 > loadSlides && searchedProfiles.length>9 &&
                                    <div className="search-result-page-book-section-footer">
                                        {
                                            user ?
                                                <div onClick={clickhandlermorechannels} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Channels" labelColor="black" />
                                                </div>
                                                :
                                                <div onClick={handelformmodal} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Channels" labelColor="black" />
                                                </div>
                                        }
                                    </div>
                                }

                            </div>
                        }
                        {
                            searchedSlides?.length === 0 && (activeTab === 'Slides') &&
                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }


                        {/* ARTICLE SECTION */}
                        {
                            searchedArticles?.length > 0 && (activeTab === 'All' || activeTab === 'Articles') &&
                            <div className="search-result-page-slide-section nopadding">
                                <div className="search-result-page-book-section-head">
                                    <p>{`${matchedArticles.length} results found on `}</p>
                                    <DisplayTitle title={`'${searchText?.split("-", 1)[0]}'`} type="display4" />
                                </div>


                                <div className="search-result-page-book-section-grid">
                                    {searchedArticles.map((article, index) => (
                                        <div key={article?.data?.title?.rendered + index} className="item" >
                                            <ArticleCard data={article?.data} sourceDocId={article?.sourceDocId} index={index} />
                                        </div>
                                    ))}
                                </div>
                                {
                                    matchedArticles?.length - 1 > loadArticles && searchedArticles.length>9 &&
                                    <div className="search-result-page-book-section-footer">
                                        {
                                            user ?
                                                <div onClick={clickhandlerloadmoreslide2} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Articles" labelColor="black" />
                                                </div>
                                                :
                                                <div onClick={handelformmodal} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Articles" labelColor="black" />
                                                </div>
                                        }
                                    </div>
                                }

                            </div>
                        }
                        {
                            searchedArticles?.length === 0 && (activeTab === 'Articles') &&
                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }

                        {/* JOURNAL SECTION */}
                        {
                            searchedJournals?.length > 0 && (activeTab === 'All' || activeTab === 'Journals') &&
                            <div className="search-result-page-slide-section nopadding">
                                <div className="search-result-page-book-section-head">
                                    <p>{`${matchedJournals.length} results found on `}</p>
                                    <DisplayTitle title={`'${searchText?.split("-", 1)[0]}'`} type="display4" />
                                </div>


                                <div className="search-result-page-journal-section">
                                    {searchedJournals.map((journal, index) => (
                                        <div key={journal?.data?.title + index} className="item" >
                                            <JournalCard data={journal?.data} sourceDocId={journal?.sourceDocId} index={index} />
                                        </div>
                                    ))}
                                </div>
                                {
                                    matchedJournals?.length - 1 > loadJournals && searchedJournals.length>9 &&
                                    <div className="search-result-page-book-section-footer">
                                        {
                                            user ?
                                                <div onClick={clickhandlermoreslide} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Journals" labelColor="black" />
                                                </div>
                                                :
                                                <div onClick={handelformmodal} className="search-result-page-book-section-load-more-button">
                                                    <Button type="primary-outline-rounded" label="Load More Journals" labelColor="black" />
                                                </div>
                                        }
                                    </div>
                                }

                            </div>
                        }
                        {
                            searchedJournals?.length === 0 && (activeTab === 'Journals') &&
                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }


                        {
                            searchedBook?.length === 0 && searchedSlides?.length === 0 &&

                            <div className="search-result-page-slide-section">
                                <button className='requestButton'>Tell us what you want</button>
                                <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                            </div>
                        }

                    </>
                    :
                    <div>
                        {
                            bookFound || slideFound || articleFound || journalFound ?
                                <div className='search-loading'>
                                    {/* <h1>sdfaksajdfh</h1> */}

                            {/* {
                                          loadingArray.map(() => {
                                            return <div key={shortid.generate()} className="item">
                                                <SlideCardPlaceholder />

                                            </div>

                                        })} */
                                        
                                        <LoadingSearchAnimation/>
                                        }
                            
                                </div>
                                :
                                <div className="search-result-page-slide-section">
                                    <button className='requestButton' onClick={()=>setShowRequestModal(true)}>Tell us what you want</button>
                                   
                                    <h3 className='dataNotFound-head'>(◕︵◕) Sorry,Data not found</h3>
                                </div>

                        }
                    </div>


            }
            {
                showRequestModal&&
                
             <div className='requestForm'  >
                <RequestModal exit={()=>setShowRequestModal(false)}/>
            </div>
            }

        </div>
    )
}
export default SearchResult
