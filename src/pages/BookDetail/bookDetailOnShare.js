
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    useLocation,
    useParams
} from "react-router-dom";
import firebase from "firebase";


//LOCAL IMPORTS
import { AiOutlineShareAlt, AiOutlineExclamationCircle, AiFillStar } from "react-icons/ai";
import "./index.scss";
import Loading from '../../components/loading';


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

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (bookDocId) {
                try {
                    firebase.firestore().collection('K-Books')
                        .doc(bookDocId)
                        .get()
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
                                        src={data.image} />
                                    <div className="book-detail-page-wrapper-book-detail-section-container-content">
                                        <div className="book-title-section">
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .2, ...transition }}
                                                className="book-title">
                                                <h4>{data.title}</h4>
                                            </motion.div>
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .2, ...transition }}
                                                className="icon-container">
                                                <div className="share">
                                                    <AiOutlineShareAlt className="icon" />
                                                </div>
                                                <AiOutlineExclamationCircle className="icon" />
                                            </motion.div>
                                        </div>
                                        <div className="book-rating-section">
                                            <motion.div
                                                variants={animate}
                                                initial='initial'
                                                animate='animate'
                                                transition={{ delay: .3, ...transition }}
                                                className="star-container">
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <AiFillStar className="icon" />
                                                <h6>{data.rating}</h6>
                                            </motion.div>
                                            <div className="views">
                                                <motion.p
                                                    variants={animate}
                                                    initial='initial'
                                                    animate='animate'
                                                    transition={{ delay: .3, ...transition }}
                                                >5K Views</motion.p>
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
                                                >{data.description}</motion.p>
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
                                                >{data.writer}</motion.p>
                                            </div>
                                        </div>
                                        <motion.div
                                            variants={animate}
                                            initial='initial'
                                            animate='animate'
                                            transition={{ delay: .6, ...transition }}
                                            className="book-button-container">
                                            <a href={data?.link}>
                                                <Button type="info-outline-rounded" label="Download Now" labelColor="white" />
                                            </a>
                                            {/* <Button type="secondary-rounded" label="Add to read" />
                                            <div className="right-button" >
                                                <Button type="info-outline-rounded" label="Preview" labelColor="white" />
                                            </div> */}
                                        </motion.div>
                                    </div>
                                </div>
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

export default BookDetailOnShare
