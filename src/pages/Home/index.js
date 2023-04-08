import firebase from "firebase";
import React, { useEffect, useState } from 'react';

//Local imports
import SEO from '../../components/global/SEO';
import BookTrending from '../Book/components/bookTrending';
import SlideTrending from '../Slide/component/slideTrending';
import HomeArticleSlider from './components/homeArticleSlider';
import HomeJournalSlider from './components/homeJournalSlider';
import HomeNewsSlider from './components/homeNewsSlider';
import Welcome from './components/welcome';
import "./index.scss";

const Home = () => {
    const [slide, setSlide] = useState([])
    const [books, setBooks] = useState([])
    const [loadingSlides, setLoadingSlides] = useState(true)
    const [loadingBooks, setLoadingBooks] = useState(true)
    const firestoreDatabase = firebase.firestore();

    useEffect(() => {
        let isMounted = true;
        try {
            setLoadingSlides(true);
            const Slides = firestoreDatabase
                .collection(`K-Slides-BasicScience-Anatomy`)
                .orderBy("SlideName")
                .get()
                .then(querySnapshot => {
                    let allSlidesData = []
                    querySnapshot.forEach(ele => {
                        allSlidesData.push(ele.data());
                    });

                    if (isMounted) {
                        setLoadingSlides(false);
                        setSlide(() => allSlidesData);

                    }
                });
        }
        catch (err) {
            console.log('tryCatch err', err);
        }




        return () => {
            isMounted = false;

        }
    }, [])

    useEffect(() => {

        let isMounted = true;
        try {
            setLoadingSlides(true);
            const Books = firestoreDatabase
                .collection(`K-Books-BasicScience-Anatomy`)
                .orderBy("SlideName")
                .get()
                .then(querySnapshot => {
                    let allBooksData = []
                    querySnapshot.forEach(ele => {
                        allBooksData.push(ele.data());
                    });

                    if (isMounted) {
                        setLoadingBooks(false);
                        setBooks(() => allBooksData);
                    }
                });
        }
        catch (err) {
            console.log('err from tryCatch', err)
        }



        return () => {
            isMounted = false;

        }
    }, [])

    return (
        <div className="home-page-container">
            <SEO title='Medicos Pdf Home page' description='Medicos pdf provides authentic medical study materials like books,slides,news,articles and journals.' />
            <Welcome />
            <SlideTrending details={slide} />
            <BookTrending details={books} />
            <HomeArticleSlider />
            <HomeJournalSlider />
            <HomeNewsSlider />


        </div>
    )
}

export default Home
