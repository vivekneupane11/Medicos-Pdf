// import firebase from 'firebase/compat';
// import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/global/button';
import { Headings } from '../../../../components/global/headings';
// import { DisplayTitle } from '../../../../components/global/Titles';
import Loading from '../../../../components/loading';
import BookStackCard from '../../../Book/components/bookStackCard';
import { BookStackCardPlaceholderPlaceholder } from '../../../Book/components/bookStackCardPlaceholder';
// import BookTrending from '../../../Book/components/bookTrending';
import ButtonWithArrow from '../../../Home/components/buttonWithArrow';
import { SlideCardPlaceholder } from '../../../Slide/component/slideCardPlaceholder';
import SlideTrendingProfile from '../slideTrendingProfile';
import './index.scss';

const LikedSlidesAndBooks = ({ user }) => {
    const [likedSlides, setLikedSlides] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const [bookFound, setBookFound] = useState(true);
    const [slideFound, setSlideFound] = useState(true);
    const { userId } = useParams();
    // const [slideLimit, setSlideLimit] = useState(10);
    const slideLimit=10;
    const [lastSlide, setLastSlide] = useState();
    const [lastBook, setLastBook] = useState();
    const [showLoadMoreSlides, setShowLoadMoreSlides] = useState(false);
    const [showMoreSlidesLoading, setShowMoreSlidesLoading] = useState(false);
    const [showLoadMoreBooks, setShowLoadMoreBooks] = useState(false);
    const [showMoreBooksLoading, setShowMoreBooksLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    // const db =getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };
    useEffect(async() => {
        let isMounted = true;
        try {
            const {firestore:{db,query,collection,orderBy,limit,getDocs}}=await getFirebaseAll()
            // firebase.firestore().collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('LikedSlides')
            //     .orderBy('SlideName')
            //     .limit(slideLimit)
            //     .get()
               if(userId){
                const colRef1=query(collection(db,'Web-User-Data',userId,'LikedSlides'),
                orderBy('SlideName'),
                limit(slideLimit))
                getDocs(colRef1)
                .then((querySnapshot) => {
                    if (querySnapshot && isMounted) {
                        let likedSlideData = []
                        querySnapshot.forEach((doc) => {
                            likedSlideData.push(doc.data())
                        })
                        // console.log("user liked books",likedSlideData);
                        if (likedSlideData.length === 0) {
                            setSlideFound(false)
                           
                        }
                        else{
                            setShowLoadMoreSlides(true)
                        }
                        setLoading(false);
                        setShowMoreSlidesLoading(false);
                        setLastSlide(likedSlideData[likedSlideData?.length - 1])
                        setLikedSlides(likedSlideData)
                    }
                })
               }
            // firebase.firestore().collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('LikedBooks')
            //       .orderBy('title')
            //     .limit(slideLimit)
            //     .get()
                const colRef2=query(collection(db,'Web-User-Data',userId,'LikedBooks'),
                orderBy('title'),
                limit(slideLimit))
                getDocs(colRef2)
                .then((querySnapshot) => {
                    if (querySnapshot && isMounted) {
                        let likedBookData = []
                        querySnapshot.forEach((doc) => {
                            likedBookData.push(doc.data())
                        })
                        // console.log("user liked books",likedBookData);
                        if (likedBookData.length === 0) {
                            setBookFound(false)
                        }
                        else{
                            setShowLoadMoreBooks(true)
                        }
                        setLoading(false);
                        setShowMoreBooksLoading(false);
                        setLastBook(likedBookData[likedBookData?.length - 1])
                        setLikedBooks(likedBookData)
                    }
                })
        } catch (error) {
            console.log('Error fetching liked books and slides', error);
        }
        return () => {
            isMounted = false
        }
    }, [userId])

    const loadMoreSlides = async() => {
        try {
            const {firestore:{db,query,collection,orderBy,startAfter,limit,getDocs}}=await getFirebaseAll()
            setShowMoreSlidesLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('LikedSlides')
            //     .orderBy('SlideName')
            //     .startAfter(lastSlide?.SlideName)
            //     .limit(slideLimit)
            //     .get()
                const colRef=query(collection(db,'Web-User-Data',userId,'LikedSlides'),
                orderBy('SlideName'),
                startAfter(lastSlide?.SlideName),
                limit(slideLimit))
                getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        // console.log("This is data", ele.data())
                        allData.push(ele.data());

                    })
                    setLastSlide(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreSlides(false)
                    }
                    setShowMoreSlidesLoading(false);
                    setLikedSlides((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }
      
    const loadMoreBooks = async() => {
        try {
            const{firestore:{db,query,collection,startAfter,limit,getDocs,orderBy}}=await getFirebaseAll()
            setShowMoreBooksLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('LikedBooks')
            //     .orderBy('title')
            //     .startAfter(lastBook?.title)
            //     .limit(slideLimit)
            //     .get()
                const colRef=query(collection(db,'Web-User-Data',userId,'LikedBooks'),
                orderBy('title'),
                startAfter(lastBook?.title),
                limit(slideLimit))
                getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        allData.push(ele.data());

                    })
                    setLastBook(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreBooks(false)
                    }
                    setShowMoreBooksLoading(false);
                    setLikedBooks((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }

    return (
        <div className='liked-slides-and-books-container'>
            <div className='liked-slides-container'>
                {
                    likedSlides ?
                        <div>
                        <Headings type="heading5" content="Liked Slides" />
                            {/* <SlideTrending showTitle={false} details={likedSlides} /> */}
                            <SlideTrendingProfile showTitle={false} details={likedSlides} from='likeSlidesAndBooks'/>
                        </div>
                        :
                        <div>
                            {
                                slideFound ?
                                    <div className='liked-slides-container'>
                                        <SlideCardPlaceholder/>
                                    </div>
                                    :
                                    <h1>No liked slides found</h1>
                            }
                        </div>
                }

                {
                    showLoadMoreSlides && likedSlides?.length>9 && slideFound &&
                    <div className='likedBookAndSlides-load-more-container' onClick={loadMoreSlides}>
                         {
                            showMoreSlidesLoading &&
                            <Loading />
                        }
                        <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                       
                    </div>
                }
            </div>

            <div className='liked-books-container'>
                {
                    likedBooks ?
                        <div>
                        <Headings type="heading5" content="Liked Books" />
                            {/* <BookTrending profile={true} showTitle={false} details={likedBooks} /> */}
                           {
                               likedBooks &&
                               <div className="profileLikedBooks-container">
                               {
                                   
                                   likedBooks?.map((data,index)=>{
                                       return<div key={index + data?.title} className="profileLikedBooks-container-wrapper">
                                           <Link
                                                className='links'
                                                to={{
                                                    pathname: `/bookdetails/${data?.title}`,
                                                    state: {
                                                    data: JSON.stringify(data),
                                                    wholeData: JSON.stringify(likedBooks),
                                                    }
                                                }}>
                                                    <BookStackCard
                                                        data={data}
                                                        bookImage={data?.image}
                                                        title={data?.title}
                                                        authorInfo={data?.writer}
                                                        rating={data?.rating}
                                                        views={"100 Views"}
                                                    />
                                             </Link>
                                       </div>
                                   })
                               }
                             </div>
                           }
                        </div>
                        :
                        <div>
                            {
                                bookFound ?
                                    <div className='profileLikedBooks-container-wrapper'>
                                        <BookStackCardPlaceholderPlaceholder/>
                                    </div>
                                    :
                                    <h1>No liked slides found</h1>
                            }
                        </div>
                }
                {
                    !bookFound && 
                    <div>
                          <p className="profileLikedBooks-infoPara">No liked books.</p>
                          <ButtonWithArrow name="Explore Books" link='/book'/>
                     </div>   
                  
                }
                  {
                    showLoadMoreBooks && likedBooks?.length>9 && bookFound &&
                    <div className='likedBookAndSlides-load-more-container' onClick={loadMoreBooks}>
                         {
                            showMoreBooksLoading &&
                            <Loading />
                        }
                        <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                       
                    </div>
                }
            </div>
        </div>
    )
}

export default React.memo(LikedSlidesAndBooks);