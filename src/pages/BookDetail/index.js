import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    useLocation,
    useParams,
    Link
} from "react-router-dom";
import defaultImg from '../../assets/images/book/loaderpdf.webp';
import useViewsCount from "../../components/customHooks/viewsCount";
import { Button } from '../../components/global/button';

import SEO from '../../components/global/SEO';
import ShareModal from "../../components/global/shareModal";
import { DisplayTitle } from '../../components/global/Titles';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import SocialShareForMobile from '../../components/SocialShareForMobile';
import { logEventWithParams } from '../../functions/commonMethod';
import { addUserVisited } from "../../functions/firebaseMethod";
import BookTrending from '../Book/components/bookTrending';
import RelatedBooksSlider from './components/relatedBooksSlider';
import { Reviews } from './components/reviews';
import "./index.scss";
import Loadable from 'react-loadable';
// import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, where } from "firebase/firestore";
import HeartFill from '../../components/global/icons/heart_fill';
import HeartOutline from '../../components/global/icons/heart_outline';
import StarFill from '../../components/global/icons/star_fill';
import StarOutline from '../../components/global/icons/star_outline';
import Eye from '../../components/global/icons/eye';
import ShareIcon from '../../components/global/icons/share';
import ExclamanationCircle from '../../components/global/icons/exclamanationCircle';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import RequestModal from './components/requestmodal';
import { toast } from 'react-toastify';
import CheckCircle from '../../components/global/icons/check_Circle';
// import { async } from "@firebase/util";


const LoadableLoginModal = Loadable({
    loader: () => import('../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div>Loading...</div>
    }
});

const transition = { duration: .4, ease: [0.6, 0.01, -0.05, 0.9] };

const imgVariants = {
    initial: {
        scale: .8,
        opacity: 0,
        y: 80,
        x: 50,
    },
    animate: {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
    }
}
const animate = {
    initial: {
        opacity: 0,
        y: 30,
        scale: .5
    },

    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        //   transition: { delay: .4},
    }
}
const BookDetail = () => {
    const location = useLocation();
    const { user,username:usernameauth } = useContext(AuthContext)
    const { bookDocId } = useParams();
    let data;
    let wholeData;
    let relatedBooksData;
    const [bookDetail, setBookDetail] = useState()
    const [wholeBooksDetail, setWholeBookDetails] = useState();
    const [toggleLike, setToggleLike] = useState(false);
    const [relatedBooks, setRelatedBooks] = useState()
    const [checkShare, setCheckShare] = useState(false);
    const [likeCount, setLikeCount] = useState(null)
    const [showFormModel, setShowFormModel] = useState(false)
    const viewCount = useViewsCount(bookDocId);

    const [state, setState] = useState(false)
    const [showRequestModal,setShowRequestModal]=useState(false)
    const [check,setCheck]=useState(false)
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }


    const checkIfImageExists = (url, callback) => {
        const img = new Image();

        img.src = url;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    }
    useEffect(() => {
        if (location?.state) {
            data = JSON.parse(location?.state?.data);
            wholeData = JSON.parse(location?.state?.wholeData);
            relatedBooksData = wholeData?.filter((data) => data?.title !== bookDetail?.title);
            setBookDetail(data);
            setWholeBookDetails(wholeData);
            setRelatedBooks(relatedBooksData)
        }
        return () => {

        }
    }, [location?.state])

    // USER FOR ANALYTICS
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            logEventWithParams("web_book_details_page_visited", { title: bookDocId })
        }
        return (() => {
            isMounted = false;
        })
    })

    //FETCH DATA WHEN NO DATA AVAILABLE AT LOCATION STATE
    useEffect(async() => {
        let isMounted = true;
       try {
           const {firestore:{db,getDoc,doc,where,getDocs,query,collection}}=await getFirebaseAll()
        if (isMounted && !location?.state) {
            getDoc(doc(db,'K-Books',bookDocId))
            // firebase.firestore().collection('K-Books')
            //     .doc(bookDocId)
            //     .get()
                .then((res => {
                    if (res) {
                        setBookDetail(res.data());
                        const colRef=query(collection(db,'K-Books'),
                        where('subject', '==', res?.data()?.subject))
                        getDocs(colRef)
                        // firebase.firestore().collection('K-Books')
                        //     .where('subject', '==', res?.data()?.subject)
                        //     .get()
                            .then((querySnapShot) => {
                                if (querySnapShot) {
                                    let relatedData = [];
                                    querySnapShot.forEach((doc) => {
                                        relatedData.push(doc.data());

                                    })
                                    setRelatedBooks(relatedData)
                                }
                            })
                    }
                }))

        }
       } catch (error) {
           
       }
        return () => {
            isMounted = false
        }
    }, [])

    //FETCHING BOOK LIKE COUNT
    useEffect(async() => {
        let isMounted = true;
        //ADD USER VISITED ON BOOKS ON FIREBASE(KEPT HERE BECAUSE SO BOOK LOAD CAN BE SHOWN WITHOUT ROUTE/PATHNAME CHANGED)
       try {
           const {firestore:{db,query,doc,onSnapshot}}=await getFirebaseAll()
        if (bookDetail?.title) {
            addUserVisited(user?.uid, 'book', bookDetail?.title)
        }
        if (isMounted && bookDetail?.title) {
            
             const docRef=query(doc(db,'Web-Book-Reviews',bookDetail?.title,"Likes",'Like-Count'))
            // firebase.firestore().collection('Web-Book-Reviews')
            //     .doc(bookDetail?.title)
            //     .collection("Likes")
            //     .doc('Like-Count')
              onSnapshot(docRef,(querySnapshot) => {
                    if (querySnapshot.data()) {
                        setLikeCount(querySnapshot?.data()?.like_count);
                    }
                })

            if (usernameauth && bookDetail?.title) {
                const docRef= doc(db,'Web-User-Data',usernameauth,'LikedBooks',bookDetail?.title)
                // firebase.firestore().collection('Web-User-Data')
                //     .doc(usernameauth)
                //     .collection('LikedBooks')
                //     .doc(bookDetail?.title)
                    onSnapshot(docRef,(querySnapShot) => {
                        if (querySnapShot?.data()) {
                            setToggleLike(true)

                        }
                    })
            }

        }
           
       } catch (error) {
           
       }
        return () => {
            isMounted = false
        }
    }, [bookDetail?.title, toggleLike])


    useEffect(() => {
        if (bookDetail) {
            checkIfImageExists(bookDetail?.image, (exists) => {
                if (exists) {
                    setState(!state)
                } else {
                    setState(state)
                }
            });
        }

    }, [bookDetail])

   async function likeBook() {
        try {
            const {firestore:{db,setDoc,doc}}=await getFirebaseAll()
            setToggleLike(true);
            setDoc(doc(db,'Web-Book-Reviews',bookDetail?.title,'Likes','Like-Count'),
            {
                like_count: likeCount ? likeCount + 1 : 1,
            })
         
            if (usernameauth) {
                setDoc(doc(db,'Web-User-Data',usernameauth,'LikedBooks',bookDetail?.title),
                {
                    title: bookDetail?.title,
                    subject: bookDetail?.subject,
                    writer: bookDetail?.writer,
                    rating: bookDetail?.rating,
                    edition: bookDetail?.edition,
                    amazonLink: bookDetail?.amazonLink,
                    description: bookDetail?.description,
                    image: bookDetail?.image,
                    link: bookDetail?.link
                })
               
            }


        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
   async function dislikeBook() {
        try {
            const {firestore:{db,setDoc,doc,deleteDoc}}=await getFirebaseAll()
            setToggleLike(false);
         
            setDoc(doc(db,'Web-Book-Reviews',bookDetail?.title,'Likes','Like-Count'),
            {
                like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
            })
          

            if (usernameauth) {
                deleteDoc(doc(db,'Web-User-Data',usernameauth,'LikedBooks',bookDetail?.title))
               
            }

        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
  async  function requestBook(){
        try{
            const {firestore:{db,addDoc,collection}}=await getFirebaseAll()
            let date=new Date()
            console.log('book new date',date)

            if (user) {
                addDoc(collection(db,'book_request_for_weekly_update'),
                {
                    email:user?.email,
                    title: bookDetail?.title,
                    subject: bookDetail?.subject,
                    writer: bookDetail?.writer,
                    link: bookDetail?.link,
                    submited_date:date,
                })
                toast.success("Request successfully submitted", { theme: 'dark', hideProgressBar: true })
                setCheck(true)
            }
            
           
            
        }
        catch(err){
            console.log('Error during request',err)
            alert('Request Failed')

        }


    }

    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [showFormModel],
    )

    useEffect(() => {
        if (user?.uid) {
            setShowFormModel(false)

        }
    }, [user?.uid])

    const cancelShare = useCallback(
        (show) => {
            if (show === false) {
                setCheckShare(false)

            }
        },
        [checkShare],
    )

    //    console.log('user',user)

    const clickhandlersetchecks = () => setCheckShare(true)
    const clickhandlericonset = () => setShowFormModel(true)
    const clickhandlericonset2 = () => dislikeBook()
    const clickhandlerlikebook = () => likeBook()
    const clickhandlershowform = () => setShowFormModel(true)
    const clickhandlerbookdetail = () => logEventWithParams("web_book_downloaded", { book_title: bookDetail?.title, book_subcategory: bookDetail?.subject })
    const clickhandleratag = () => setShowFormModel(true)
    const handelrequestModal=()=>setShowRequestModal(true)
    const handelExit=()=>setShowRequestModal(false)




    const bookStructuredData = {
        "@context": "https://schema.org",
        "@type": "DataFeed",
        "dataFeedElement": [
            {
                "@context": "https://schema.org",
                "@type": "Book",
                "@id": encodeURI(`http://medicospdf.com/slidedetails/${bookDetail?.title}`),
                "url": encodeURI(`http://medicospdf.com/slidedetails/${bookDetail?.title}`),
                "name": bookDetail?.title,
                "author": {
                    "@type": "Person",
                    "name": bookDetail?.writer
                },
                "sameAs": `https://en.wikipedia.org/wiki/${bookDetail?.title}`,
                "workExample": [
                    {
                        "@type": "Book",
                        "@id": encodeURI(`http://medicospdf.com/slidedetails/${bookDetail?.title}`),
                        "isbn": "9787543321724",
                        "bookEdition": "Mass Market Paperback",
                        "bookFormat": "https://schema.org/Paperback",
                        "inLanguage": "en",

                    },

                ]
            }
        ],
        "dateModified": "2018-09-10T13:58:26.892Z"
    }






    return (
        <div>
            <script type="application/ld+json">
                {JSON.stringify(bookStructuredData)}
            </script>
            <ShareModal
                url={encodeURI(`https://medicospdf.com/slidedetails/${bookDetail?.title}`)}
                appId={process.env.REACT_APP_ID}
                title={bookDetail?.title}
                image={bookDetail?.image}
                show={checkShare}
                cancel={cancelShare}
            />
            <SEO image={bookDetail?.image} title={bookDetail?.title? bookDetail.title : 'MedicosPDF book details'} description={bookDetail?.title + bookDetail?.subject + bookDetail?.description} />
            {
                user ?
                    <SocialShareForMobile title={bookDetail?.title}
                        shareUrl={encodeURI(`https://medicospdf.com/slidedetails/${bookDetail?.title}`)}
                    />
                    :
                    ''
            }
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            {
                bookDetail && relatedBooks ?
                    <div
                        initial={{
                            y: 400,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        transition={{ delay: .1, ...transition }}
                        className="book-detail-page">
                        <div className="book-detail-page-wrapper">
                                {/* <div className={showRequestModal?'showrequestmodal':'showrequestmodal-displaynone'}>
                                    <RequestModal exit={handelExit}/>
                                </div> */}
                            <div className="book-detail-page-wrapper-book-detail-section">
                                <div className="book-detail-page-wrapper-book-detail-section-container">
                                    <div className='backgroundRound'>
                                    <LazyLoadImage src={`${state ? `${bookDetail.image}` : `${defaultImg}`}`}
                                        alt={`${state ? `${bookDetail.title}` : 'MedicosPdf default book Image'}`} className='bookImage' effect='blur'/>

                                    </div>
                                    {/* <img
                                    
                                        src={`${state ? `${bookDetail.image}` : `${defaultImg}`}`}
                                        alt={`${state ? `${bookDetail.title}` : 'MedicosPdf default book Image'}`}
                                    /> */}
                                    <div className="book-detail-page-wrapper-book-detail-section-container-content">
                                        <div className="book-title-section">
                                            <div
                                          
                                                className="book-title">
                                                <h4>{bookDetail.title}</h4>
                                            </div>
                                            <div
                                            
                                                className="icon-container">
                                                {
                                                    user ?
                                                        <div className="share" onClick={clickhandlersetchecks}>
                                                            <ShareIcon className="icon"  />
                                                        </div>
                                                        :
                                                        <div className="share"  onClick={clickhandlericonset}>
                                                            <ShareIcon className="icon" />
                                                        </div>
                                                }
                                                <Link to='/dcmapolicy'>     <ExclamanationCircle className="icon" /> </Link>
                                                {
                                                    user ?
                                                        <>
                                                            {
                                                                toggleLike ?
                                                                <div onClick={clickhandlericonset2}>
                                                                    <HeartFill  className='icon' />
                                                                </div>
                                                                    :
                                                                    <div onClick={clickhandlerlikebook}>
                                                                        <HeartOutline  className='icon' />

                                                                    </div>
                                                            }
                                                        </>
                                                        :
                                                        <div onClick={clickhandlershowform}>

                                                            <HeartOutline  className='icon' />
                                                        </div>


                                                }

                                            </div>
                                        </div>
                                        <div className="book-rating-section">
                                            <div
                                           
                                                className="star-container">
                                                {/* <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" /> */}
                                                <div className="BookDetails-ratingContainer"> 
                                                 {[...Array(5)].map((data, index) => {
                                                    if (Math.ceil(bookDetail.rating) > index) {
                                                        return <StarFill className="rating-icon" />;
                                                    } else {
                                                        return <StarOutline className="rating-icon" />;
                                                    }
                                                })}
                                                </div>

                                                <h6>{bookDetail.rating}</h6>
                                            </div>

                                            <div
                                           
                                                className="views">
                                                <Eye className="views-icon" />
                                                <h6 className='views-count'>{viewCount}</h6>
                                            </div>
                                        </div>
                                        <div className="book-summary-section">
                                            <h6
                                         
                                            >Summary</h6>
                                            <div className="summary">
                                                <p
                                                
                                                >{bookDetail.description}</p>
                                            </div>
                                        </div>
                                        <div className="book-author-section">
                                            <h6
                                             
                                            >Author</h6>
                                            <div className="summary">
                                                <p
                                            
                                                >{bookDetail.writer}</p>
                                            </div>
                                        </div>
                                        {
                                            likeCount > 0 &&
                                            <div className="book-author-section">
                                                <h6
                                               
                                                >Likes</h6>
                                                <div className="summary">
                                                    <p
                                               
                                                    >{likeCount}</p>
                                                </div>
                                            </div>
                                        }
                                        {
                                            check&&
                                            <p className='request-message'>Request successful. We will make it available within a week.</p>
                                        }
                                        <div
                                   
                                            className="book-button-container">
                                                 {
                                                user ?
                                                    <a target='_blank' onClick={requestBook}
                                                        >
                                                        {/* <Button type="info-outline-rounded" label="Download Now" labelColor="white" /> */}
                                                        <button className='requestButton'>Request Book {check&&<CheckCircle className='checkmark'/>}</button>
                                                    </a>
                                                    :
                                                    <a onClick={clickhandleratag}>
                                                        {/* <Button type="info-outline-rounded" label="request Now" labelColor="white" /> */}
                                                        <button className='requestButton'>Request Book</button>
                                                    </a>
                                            }

                                            {
                                                user ?
                                                    <a target='_blank' onClick={clickhandlerbookdetail}
                                                        href={bookDetail?.link}>
                                                        {/* <Button type="info-outline-rounded" label="Download Now" labelColor="white" /> */}
                                                        <button className='downloadButton'> Download Now</button>
                                                    </a>
                                                    :
                                                    <a onClick={clickhandleratag}>
                                                        {/* <Button type="info-outline-rounded" label="Download Now" labelColor="white" /> */}
                                                        <button className='downloadButton'> Download Now</button>
                                                    </a>
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="book-detail-page-wrapper-book-explore-section">
                                <div className="book-review-section">
                                    <DisplayTitle type="display4" title="Write Reviews" />
                                    {
                                        user ?
                                            <Reviews data={bookDetail} profilePic={user?.photoURL} />
                                            :
                                            <Reviews data={bookDetail} profilePic={require("../../assets/images/avatar.webp")} />
                                    }


                                </div>
                                <div className="related-book-section">
                                    <DisplayTitle type="display4" title="Related Books" />
                                    <div className="book-slider">
                                        <RelatedBooksSlider bookDetails={relatedBooks} />
                                    </div>
                                </div>

                            </div>
                            <div className="explore-more-slider" >
                                <BookTrending details={relatedBooks} />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="book-detail-loading-wrapper">
                        <Loading />
                    </div>
            }
        </div>
    )
}

export default React.memo(BookDetail)
