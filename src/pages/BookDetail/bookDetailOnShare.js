
import React, { useState, useEffect } from 'react';
import {
    useLocation,
    useParams
} from "react-router-dom";
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


//LOCAL IMPORTS
// import { AiOutlineShareAlt, AiOutlineExclamationCircle, AiFillStar } from "react-icons/ai";
import "./index.scss";
import Loading from '../../components/loading';
// import { getDoc } from 'firebase/firestore';
import StarFill from '../../components/global/icons/star_fill';
import ShareIcon from '../../components/global/icons/share';
import ExclamanationCircle from '../../components/global/icons/exclamanationCircle';
import { LazyLoadImage } from 'react-lazy-load-image-component';



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
const BookDetailOnShare = () => {
    const { bookDocId } = useParams();
    // const { user } = useContext(AuthContext);
    const [data, setData] = useState()
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

    useEffect(async() => {
        let isMounted = true;
        if (isMounted) {
            if (bookDocId) {
                try {
                    const{firestore:{db,getDoc}}=await getFirebaseAll()
                    getDoc(doc(db,'K-Books',bookDocId))
                    // firebase.firestore().collection('K-Books')
                    //     .doc(bookDocId)
                    //     .get()
                        .then((doc) => {
                            setData(doc.data())
                     
                        })
                } catch (error) {
                    console.log("Error while fetching slide detail");
                }
            }
        }
        return () => {
            isMounted = false
        }
    }, [bookDocId])



    return (
        <div>
            {
                data ?
                    <div
                      
                        className="book-detail-page">
                        <div className="book-detail-page-wrapper">
                            <div className="book-detail-page-wrapper-book-detail-section">
                                <div className="book-detail-page-wrapper-book-detail-section-container">
                                    {/* <img src={data.image} /> */}
                                    <LazyLoadImage src={data.image} alt='bookimage' effect='blur'/>
                                    <div className="book-detail-page-wrapper-book-detail-section-container-content">
                                        <div className="book-title-section">
                                            <div
                                            
                                                className="book-title">
                                                <h4>{data.title}</h4>
                                            </div>
                                            <div
                                           
                                                className="icon-container">
                                                <div className="share">
                                                    <ShareIcon className="icon" />
                                                </div>
                                                <ExclamanationCircle className="icon" />
                                            </div>
                                        </div>
                                        <div className="book-rating-section">
                                            <div
                                            
                                                className="star-container">
                                                <StarFill className="icon" />
                                                <StarFill className="icon" />
                                                <StarFill className="icon" />
                                                <StarFill className="icon" />
                                                <StarFill className="icon" />
                                                <h6>{data.rating}</h6>
                                            </div>
                                            <div className="views">
                                                <p
                                              
                                                >5K Views</p>
                                            </div>
                                        </div>
                                        <div className="book-summary-section">
                                            <h6
                                             
                                            >Summary</h6>
                                            <div className="summary">
                                                <p
                                                
                                                >{data.description}</p>
                                            </div>
                                        </div>
                                        <div className="book-author-section">
                                            <h6
                                              
                                            >Author</h6>
                                            <div className="summary">
                                                <p
                                               
                                                >{data.writer}</p>
                                            </div>
                                        </div>
                                        <div
                                         
                                            className="book-button-container">
                                            <a href={data?.link}>
                                                <Button type="info-outline-rounded" label="Download Now" labelColor="white" />
                                            </a>
                                            {/* <Button type="secondary-rounded" label="Add to read" />
                                            <div className="right-button" >
                                                <Button type="info-outline-rounded" label="Preview" labelColor="white" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
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

export default BookDetailOnShare
