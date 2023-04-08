import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import "./index.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { AiOutlineExpand, AiOutlineFolder,  AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { CgMinimize } from "react-icons/cg";
import { motion } from 'framer-motion';


const transition = { duration: .4, ease: [0.6, 0.01, -0.05, 0.9] };

const bottomVariants = {
    initial: {
        scale: .8,
        y: 80,
    },
    animate: {
        scale: 1,
        y: 0,

    }
}

const ImgSlider = ({ images,user }) => {
 
    let dividedPortion = 100 / images.slideImages.length;
    const [activeSlide, setActiveSlide] = useState(0);
    const [timelineActiveSlide, setTimelineActiveSlide] = useState(0);
    const [timelineWidthPercentage, settTimelineWidthPercentage] = useState(0);
    const [timelineProgress, setTimelineProgress] = useState(dividedPortion);
    const [progress, setProgress] = useState(dividedPortion);
    const [fullScreen, setFullScreen] = useState(false);
    const [toggleLike, setToggleLike] = useState(false);
    const [likeCount, setLikeCount] = useState(null);

    const previousSlide = () => {
        if (activeSlide > 0) {
            setProgress(progress - dividedPortion);
            setActiveSlide(activeSlide - 1);
        }
    }
    const nextSlide = () => {
        if (activeSlide < images.slideImages.length - 1) {
            setProgress(progress + dividedPortion);
            setActiveSlide(activeSlide + 1);
        }
    }

    const progressPercentage = (event) => {
        let elementWidth = event.currentTarget.offsetWidth;
        let widthPercentage = (event.nativeEvent.offsetX / elementWidth) * 100;
        let clickedSlide = Math.floor(widthPercentage / dividedPortion);
        if (activeSlide < images.slideImages.length - 1 || activeSlide > 0) {
            setActiveSlide(clickedSlide);
            setProgress((clickedSlide + 1) * dividedPortion)
        }
    }

    const timelinePercentage = (event) => {
        let widthPercentage = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;
        // setTimelineActiveSlide(dividedPortion)
   
        if (widthPercentage >= (dividedPortion * (timelineActiveSlide + 1))) {
            if (timelineActiveSlide < images.slideImages.length - 1) {
                setTimelineActiveSlide(timelineActiveSlide + 1);
                setTimelineProgress((timelineActiveSlide + 2) * dividedPortion)
            }

        } else if (widthPercentage < (dividedPortion * (timelineActiveSlide))) {
            if (timelineActiveSlide > 0) {
                setTimelineActiveSlide(timelineActiveSlide - 1);
                setTimelineProgress((timelineActiveSlide) * dividedPortion)
            }

        }
    }

    useEffect(() => {
        let isMounted = true
        const keyListener = (e) => {
          
            if (e.key == "ArrowLeft") {
                previousSlide();
            }
            if (e.key == "ArrowRight") {
                nextSlide();
            }
        }
        window.addEventListener('keydown', keyListener)
        return () => {
            window.removeEventListener('keydown', keyListener)
        }
    }, [activeSlide])

    useEffect(() => {
        document.addEventListener('fullscreenchange', exitHandler);
        function exitHandler() {
            if (!document.fullscreenElement) {
                setFullScreen(false)
            }
        }
        return () => {
            document.removeEventListener('fullscreenchange', exitHandler);
        }
    }, [])

    const closeFullScreen = () => {
        setFullScreen(false);
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    const openFullScreen = () => {
        setFullScreen(true);
        var elem = document.getElementById("fullscreen");
        if (document.fullscreenEnabled) {
            /* Show the element in fullscreen */
            elem.requestFullscreen();
        }
    }
     //FETCHING BOOK LIKE COUNT
     useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            firebase.firestore().collection('Web-Slide-Reviews')
                .doc(images?.SlideName)
                .collection("Likes")
                .doc('Like-Count')
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot.data()) {
                      
                        setLikeCount(querySnapshot?.data().like_count);
                    }
                })
            firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedSlides')
                .doc(images?.SlideName)
                .onSnapshot((querySnapShot) => {
                    if (querySnapShot?.data()) {
                        setToggleLike(true)
                    }
                   
                })

        }
        return () => {
            isMounted = false
        }
    }, [images?.SlideName])

    function likeSlide() {
        try {
            setToggleLike(true);
            firebase.firestore().collection('Web-Slide-Reviews')
                .doc(images?.SlideName)
                .collection('Likes')
                .doc('Like-Count')
                .set({
                    like_count: likeCount ? likeCount + 1 : 1,
                })
                firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedSlides')
                .doc(images?.SlideName)
                .set({
                    SlideName:images?.SlideName,
                    slideCategory:images?.slideCategory,
                    slideImages:images?.slideImages,
                    slideSubCategory:images?.slideSubCategory
                })
                

        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
    function dislikeSlide() {
        try {
            setToggleLike(false);
            firebase.firestore().collection('Web-Slide-Reviews')
                .doc(images?.SlideName)
                .collection('Likes')
                .doc('Like-Count')
                .set({
                    like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
                })
                firebase.firestore().collection('Web-User-Data')
                .doc(user?.uid)
                .collection('LikedSlides')
                .doc(images?.SlideName)
                .delete()
        } catch (error) {
            console.log('Error disliking slide', error)
        }
    }

    return (
        <motion.div
            initial={{
                y: 150,
            }}
            animate={{
                y: 0
            }}
            transition={transition}
            className="slider-container">
            {/* SLIDE TITLE BAR */}
            <motion.div
                initial={{
                    y: 70,
                    opacity: 0,
                    scale: 0,

                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,

                }}
                transition={{ delay: .3, ...transition }}
                className="slider-container-top">
               
                <h4 className="imgSlider-top-head">{images.SlideName}</h4>
            </motion.div>
            <div className="slider-container-center">
                {/* SLIDE DISPLAY */}
                <motion.div
                    initial={{
                        scale: .3,
                        y: 100,
                    }}
                    animate={{
                        scale: 1,
                        y: 0,
                    }}
                    transition={{ delay: .2, ...transition }}
                    className={`slider-container-wrapper`}>

                    <div className="slider-container-wrapper-image-container">
                        <img className='slide-image' src={images.slideImages[activeSlide]} />
                    </div>


                    <div className="slider-container-wrapper-bottom-container">
                        <div className="left">
                            <FaChevronLeft className="icon" onClick={() => previousSlide()} />
                            <FaChevronRight className="icon" onClick={() => nextSlide()} />
                        </div>
                        <div className="right">
                            <FiShare className="icon" />
                            {!fullScreen ?
                                <AiOutlineExpand className="icon" onClick={() => openFullScreen()} />
                                :
                                <CgMinimize className="icon" onClick={() => closeFullScreen()} />
                            }
                        </div>
                    </div>
                    <div className="progress-indicator-container"
                        onMouseOut={() => setTimelineActiveSlide(0)}
                        onMouseMove={(event) => timelinePercentage(event)}
                        onClick={(e) => progressPercentage(e)}>
                        {images.slideImages.map((imgData, index) => {
                            if (timelineActiveSlide == index) {
                                return <div key={index} className="slide-position-image" style={
                                    {
                                        left: timelineActiveSlide == 0 ?
                                            "0" : timelineActiveSlide != images.length - 1 && (timelineProgress / 1.4) + "%",
                                        right: timelineActiveSlide == images.length - 1 && "0"
                                    }
                                }>
                                    <img className="image" src={imgData} />
                                </div>
                            }
                        })}
                        <div className="progress-indicator-container-active" style={{ width: progress + "%" }}></div>
                    </div>
                </motion.div>
                {/* SLIDE DISPLAY ON FULL SCREEN */}
                <div id="fullscreen" className={`slider-container-wrapper`} style={{ display: !fullScreen && 'none' }}>

                    <div className="slider-container-wrapper-image-container">
                        <img className="slide-image" src={images.slideImages[activeSlide]} />
                        <div className="slider-container-wrapper-full-screen-button-container">
                            <div className="left" onClick={() => previousSlide()} >
                                <FaChevronLeft className="icon " />
                            </div>
                            <div className="right" onClick={() => nextSlide()} >
                                <FaChevronRight className="icon" />
                            </div>

                        </div>
                    </div>

                    <div className="slider-container-wrapper-bottom-container">
                        <div className="left">
                        </div>
                        <div className="right">
                            <FiShare className="icon" />
                            {!fullScreen ?
                                <AiOutlineExpand className="icon" onClick={() => openFullScreen()} />
                                :
                                <CgMinimize className="icon" onClick={() => closeFullScreen()} />
                            }
                        </div>
                    </div>



                    <div className="progress-indicator-container"
                        onMouseOut={() => setTimelineActiveSlide(0)}
                        onMouseMove={(event) => timelinePercentage(event)}
                        onClick={(e) => progressPercentage(e)}>
                        {images.slideImages.map((imgData, index) => {
                            if (timelineActiveSlide == index) {
                                return <div key={index} className="slide-position-image" style={
                                    {
                                        left: timelineActiveSlide == 0 ?
                                            "0" : timelineActiveSlide != images.length - 1 && (timelineProgress / 1.4) + "%",
                                        right: timelineActiveSlide == images.length - 1 && "0"
                                    }
                                }>
                                    <img className="image" src={imgData} />
                                </div>
                            }
                        })}
                        <div className="progress-indicator-container-active" style={{ width: progress + "%" }}></div>
                    </div>
                </div>

                {/* SLIDE GALLERY (RIGHT SIDE) */}
                <div className="slider-container-navigator">
                    {
                        images.slideImages.map((imgData, index) => {
                            if (activeSlide == index) {
                                return <div key={imgData + index} onClick={() => setActiveSlide(index)}>
                                    <img className="slider-container-navigator-image-container-active" src={imgData} />
                                </div>
                            } else {
                                return <div key={imgData + index} onClick={() => setActiveSlide(index)}>
                                    <img className="slider-container-navigator-image-container" src={imgData} />
                                </div>
                            }
                        })
                    }
                </div>

            </div>

            {/* SLIDE INFO BOTTOM BAR */}
            <div className="slider-container-bottom">
                <div className="slider-container-bottom-container">
                    <div className="left">
                        <div className="userInfo">
                            <motion.img
                                variants={bottomVariants}
                                initial='initial'
                                animate='animate'
                                transition={{ delay: .2, ...transition }}
                                className="profilePic" src={images?.userAvatar ? images?.userAvatar: require("../../../../assets/images/slide/medicos.png").default} />
                            <motion.h6
                                variants={bottomVariants}
                                initial='initial'
                                animate='animate'
                                transition={{ delay: .3, ...transition }}
                            >{images?.userEmail ? images?.userEmail.replace(/@gmail.com/g,'') : "Medicos Int'l"}</motion.h6>
                        </div>
                        {/*
                         <motion.p
                            variants={bottomVariants}
                            initial='initial'
                            animate='animate'
                            transition={{ delay: .4, ...transition }}
                        >October 01, 2019 </motion.p> */}
                    </div>
                    <div className="right">
                        <motion.div
                            variants={bottomVariants}
                            initial='initial'
                            animate='animate'
                            transition={{ delay: .5, ...transition }}
                            className="category">
                            <AiOutlineFolder className="icon" />
                            <h6>{images.slideCategory}</h6>
                        </motion.div>
                        {
                            toggleLike ?
                                <motion.div
                                    onClick={() => dislikeSlide(images.SlideName)}
                                    variants={bottomVariants}
                                    initial='initial'
                                    animate='animate'
                                    transition={{ delay: .6, ...transition }}
                                    className="star">
                                    <AiFillHeart className="icon" />
                                    <h6>{likeCount > 0 && likeCount}</h6>
                                </motion.div>
                                :
                                <motion.div
                                    onClick={() => likeSlide(images.SlideName)}
                                    variants={bottomVariants}
                                    initial='initial'
                                    animate='animate'
                                    transition={{ delay: .6, ...transition }}
                                    className="star">
                                    <AiOutlineHeart className="icon" />
                                    <h6>{likeCount > 0 && likeCount}</h6>
                                </motion.div>

                        }

                        {/*
                            TODO
                         <motion.div
                            variants={bottomVariants}
                            initial='initial'
                            animate='animate'
                            transition={{ delay: .6, ...transition }}
                            className="star">
                            <AiOutlineStar className="icon" />
                            <h6>107</h6>
                        </motion.div>
                        <motion.div
                            variants={bottomVariants}
                            initial='initial'
                            animate='animate'
                            transition={{ delay: .7, ...transition }}
                            className="view">
                            <AiOutlineEye className="icon" />
                            <h6>107</h6>
                        </motion.div>
                        <motion.div
                            variants={bottomVariants}
                            initial='initial'
                            animate='animate'
                            transition={{ delay: .8, ...transition }}
                        >
                            <CgSoftwareDownload className="downloadIcon" />
                        </motion.div> */}

                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ImgSlider
