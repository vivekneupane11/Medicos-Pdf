import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Loading from '../../../../components/loading';
import SlideCard from '../../../SlideDetail/components/slideCard';
import BookCard from '../../../Book/components/bookCard';
import SlideTrending from '../../../Slide/component/slideTrending';
import BookTrending from '../../../Book/components/bookTrending';
import { DisplayTitle } from '../../../../components/global/Titles';
import './index.scss'
import SlideTrendingProfile from '../slideTrendingProfile';

const LikedSlidesAndBooks = ({ user }) => {
    const [likedSlides, setLikedSlides] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const [bookFound, setBookFound] = useState(true);
    const [slideFound, setSlideFound] = useState(true);

    useEffect(() => {
        let isMounted = true;
        try {
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedSlides')
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot && isMounted) {
                        let likedSlideData = []
                        querySnapshot.forEach((doc) => {
                            likedSlideData.push(doc.data())
                        })
                        if (likedSlideData.length == 0) {
                            setSlideFound(false)
                            console.log('Liked SLides',likedSlideData)
                        }
                        setLikedSlides(likedSlideData)
                    }
                })
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedBooks')
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot && isMounted) {
                        let likedBookData = []
                        querySnapshot.forEach((doc) => {
                            likedBookData.push(doc.data())
                        })
                        // console.log("user liked books",likedBookData.length);
                        if (likedBookData.length == 0) {
                            setBookFound(false)
                        }
                        setLikedBooks(likedBookData)
                    }
                })
        } catch (error) {
            console.log('Error fetching liked books and slides', error);
        }
        return () => {
            isMounted = false
        }
    }, [user?.uid])
    return (
        <div className='liked-slides-and-books-container'>
            <div className='liked-slides-container'>
                {
                    likedSlides ?
                        <div>
                            <DisplayTitle title="Liked Slides" type="display4" />
                            {/* <SlideTrending showTitle={false} details={likedSlides} /> */}
                            <SlideTrendingProfile showTitle={false} details={likedSlides}/>
                        </div>
                        :
                        <div>
                            {
                                slideFound ?
                                    <Loading />
                                    :
                                    <h1>No liked slides found</h1>
                            }
                        </div>
                }
            </div>

            <div className='liked-books-container'>
                {
                    likedBooks ?
                        <div>
                            <DisplayTitle title="Liked Books" type="display4" />
                            <BookTrending profile={true} showTitle={false} details={likedBooks} />
                        </div>
                        :
                        <div>
                            {
                                bookFound ?
                                    <Loading />
                                    :
                                    <h1>No liked slides found</h1>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default LikedSlidesAndBooks;