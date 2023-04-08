
import firebase from "firebase";
import { motion } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AiFillHeart, AiFillStar, AiOutlineExclamationCircle, AiOutlineHeart, AiOutlineShareAlt, AiOutlineStar } from "react-icons/ai";
import Rating from 'react-rating';
import {
    useLocation,
    useParams
} from "react-router-dom";

//LOCAL IMPORTS
import defaultImg from '../../assets/images/book/loaderpdf.png';
import { reviews } from '../../components/constants/mock';
import { Button } from '../../components/global/button';
import { LoginModal } from '../../components/global/loginModel';
import SEO from '../../components/global/SEO';
import SocialAccountShare from '../../components/global/SocialAccountShare';
import { DisplayTitle } from '../../components/global/Titles';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import SocialShareForMobile from '../../components/SocialShareForMobile';
import { logEventWithParams } from '../../functions/commonMethod';
import BookTrending from '../Book/components/bookTrending';
import RelatedBooksSlider from './components/relatedBooksSlider';
import { Reviews } from './components/reviews';
import "./index.scss";







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
    const { user } = useContext(AuthContext)
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
    const [showFormModel,setShowFormModel]=useState(false)

    const activeData = (data) => {
        setBookDetail(data)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const [state, setState] = useState(false)

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
            relatedBooksData = wholeData?.filter((data) => data?.title != bookDetail?.title);
            setBookDetail(data);
            setWholeBookDetails(wholeData);
            setRelatedBooks(relatedBooksData)
        }

        return () => {

        }
    }, [location?.state])

    //FETCH DATA WHEN NO DATA AVAILABLE AT LOCATION STATE
    useEffect(() => {
        let isMounted = true;
        if (isMounted && !location?.state) {
            firebase.firestore().collection('K-Books')
                .doc(bookDocId)
                .get()
                .then((res => {
                    if (res) {
                        setBookDetail(res.data());
                        firebase.firestore().collection('K-Books')
                            .where('subject', '==', res?.data()?.subject)
                            .get()
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
        return () => {
            isMounted = false
        }
    }, [])

    //FETCHING BOOK LIKE COUNT
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            firebase.firestore().collection('Web-Book-Reviews')
                .doc(bookDetail?.title)
                .collection("Likes")
                .doc('Like-Count')
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.data()) {
                       
                        setLikeCount(querySnapshot?.data().like_count);
                    }
                })
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedBooks')
                .doc(bookDetail?.title)
                .onSnapshot((querySnapShot) => {
                    if (querySnapShot?.data()) {
                        setToggleLike(true)
                    }
                   
                })

        }
        return () => {
            isMounted = false
        }
    }, [bookDetail?.title])


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

    function likeBook() {
        try {
            setToggleLike(true);
            firebase.firestore().collection('Web-Book-Reviews')
                .doc(bookDetail?.title)
                .collection("Likes")
                .doc('Like-Count')
                .set({
                    like_count: likeCount ? likeCount + 1 : 1,
                })
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedBooks')
                .doc(bookDetail?.title)
                .set({
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

        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
    function dislikeBook() {
        try {
            setToggleLike(false);
            firebase.firestore().collection('Web-Book-Reviews')
                .doc(bookDetail?.title)
                .collection("Likes")
                .doc('Like-Count')
                .set({
                    like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
                })
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedSlides')
                .doc(bookDetail?.title)
                .delete()

        } catch (error) {
            console.log('Error liking slide', error)
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

    useEffect(()=>{
        if(user?.uid){
           setShowFormModel(false)
     
        }
   },[user?.uid])
    return (
        <div>

            <SEO title='MedicosPDF book detail page' description='down and view the books you like with related and recommended books' />
            <SocialShareForMobile title={bookDetail?.title}
                shareUrl={encodeURI(`https://medicospdf.com/slideDetails/${bookDetail?.title}`)}
            />
            <LoginModal show={showFormModel} formModel={FormModel}/>
            {
                bookDetail && relatedBooks ?
                    <motion.div
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
                            <div className="book-detail-page-wrapper-book-detail-section">
                                <div className="book-detail-page-wrapper-book-detail-section-container">
                                    <motion.img
                                        variants={imgVariants}
                                        initial='initial'
                                        animate='animate'
                                        transition={{ delay: .2, ...transition }}
                                        src={`${state ? `${bookDetail.image}` : `${defaultImg}`}`}
                                        alt={`${state ? `${bookDetail.title}` : 'MedicosPdf default book Image'}`}
                                    />
                                    <div className="book-detail-page-wrapper-book-detail-section-container-content">
                                        <div className="book-title-section">
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .2, ...transition }}
                                                className="book-title">
                                                <h4>{bookDetail.title}</h4>
                                            </motion.div>
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .2, ...transition }}
                                                className="icon-container">
                                                {
                                                    user?
                                                     <div className="share">
                                                        <AiOutlineShareAlt className="icon" onClick={() => setCheckShare(!checkShare)} />
                                                        <SocialAccountShare
                                                        title={bookDetail?.title}
                                                        shareUrl={encodeURI(`https://medicospdf.com/slideDetails/${bookDetail?.title}`)}
                                                        checkShare={checkShare} />
                                                    </div> 
                                                    :
                                                     <div className="share">
                                                        <AiOutlineShareAlt className="icon" onClick={() => setShowFormModel(true)} />  
                                                     </div> 
                                                }
                                                <AiOutlineExclamationCircle className="icon exclamationIcon" />
                                               {
                                                   user?
                                                   <>
                                                   {
                                                       toggleLike ?
                                                           <AiFillHeart onClick={() => dislikeBook()} className='icon' />
                                                           :
                                                           <AiOutlineHeart onClick={() => likeBook()} className='icon' />
                                                   }
                                                   </>
                                                   :
                                                   
                                                    <AiOutlineHeart onClick={() => setShowFormModel(true)} className='icon' />
                                                  
                                               }

                                            </motion.div>
                                        </div>
                                        <div className="book-rating-section">
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .3, ...transition }}
                                                className="star-container">
                                                {/* <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" /> */}
                                                <Rating
                                                    emptySymbol={<AiOutlineStar className="rating-icon"/>}
                                                    fullSymbol={<AiFillStar className="rating-icon"/>}   
                                                    initialRating={bookDetail?.rating}       
                                                    className="BookDetails-ratingContainer"                                    
                                                />
                                                <h6>{bookDetail.rating}</h6>
                                            </motion.div>
                                            <div className="views">
                                                {/* <motion.p
                                                    variants={animate}
                                                    initial='initial'
                                                    animate='animate'
                                                    transition={{ delay: .3, ...transition }}
                                                >5K Views</motion.p> */}
                                            </div>
                                        </div>
                                        <div className="book-summary-section">
                                            <motion.h6
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .4, ...transition }}
                                            >Summary</motion.h6>
                                            <div className="summary">
                                                <motion.p
                                                    variants={animate}
                                                    initial='initial'
                                                    animate='animate'
                                                    transition={{ delay: .4, ...transition }}
                                                >{bookDetail.description}</motion.p>
                                            </div>
                                        </div>
                                        <div className="book-author-section">
                                            <motion.h6
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .5, ...transition }}
                                            >Author</motion.h6>
                                            <div className="summary">
                                                <motion.p
                                                    variants={animate}
                                                    initial='initial'
                                                    animate='animate'
                                                    transition={{ delay: .5, ...transition }}
                                                >{bookDetail.writer}</motion.p>
                                            </div>
                                        </div>
                                        {
                                            likeCount > 0 &&
                                            <div className="book-author-section">
                                                <motion.h6
                                                    variants={animate}
                                                    initial='initial'
                                                    animate='animate'
                                                    transition={{ delay: .5, ...transition }}
                                                >Likes</motion.h6>
                                                <div className="summary">
                                                    <motion.p
                                                        variants={animate}
                                                        initial='initial'
                                                        animate='animate'
                                                        transition={{ delay: .5, ...transition }}
                                                    >{likeCount}</motion.p>
                                                </div>
                                            </div>
                                        }
                                        <motion.div
                                            variants={animate}
                                            initial='initial'
                                            animate='animate'
                                            transition={{ delay: .6, ...transition }}
                                            className="book-button-container">

                                            {
                                                user?
                                                <a onClick={() => logEventWithParams("web_book_downloaded", { book_title: bookDetail?.title, book_subcategory: bookDetail?.subject })
                                                    } href={bookDetail?.link}>
                                                        <Button type="info-outline-rounded" label="Download Now" labelColor="white" />
                                                    </a>
                                                 :  
                                                 <a onClick={()=>setShowFormModel(true)}>
                                                    <Button type="info-outline-rounded" label="Download Now" labelColor="white" />
                                                </a> 
                                            }

                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <div className="book-detail-page-wrapper-book-explore-section">
                                <div className="book-review-section">
                                    <DisplayTitle type="display4" title="Write Reviews" />
                                    <Reviews data={bookDetail} profilePic={require("../../assets/images/members.jpg")} reviews={reviews} />

                                </div>
                                <div className="related-book-section">
                                    <DisplayTitle type="display4" title="Related Books" />
                                    <div className="book-slider">
                                        <RelatedBooksSlider
                                            // slidesPerView={2} 
                                            bookDetails={relatedBooks}
                                            activeData={activeData} />
                                    </div>
                                </div>

                            </div>
                            <div className="explore-more-slider" >
                                <BookTrending details={relatedBooks.reverse()} />
                            </div>
                        </div>
                    </motion.div>
                    :
                    <div className="book-detail-loading-wrapper">
                        <Loading />
                    </div>
            }
        </div>
    )
}

export default BookDetail
