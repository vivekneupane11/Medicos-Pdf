// import firebase from 'firebase/compat';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import SlideCard from '../../../SlideDetail/components/slideCard';
 
import { logEventWithParams } from '../../../../functions/commonMethod';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import "./index.scss";
import useSlideLikeCount from '../../../../components/customHooks/SlideLikes';
import Loadable from 'react-loadable';
import { collection, getDocs, getFirestore, where, setDoc, doc, deleteDoc, onSnapshot, query } from 'firebase/firestore';
import useFollowStatus from '../../../../customHooks/checkFollow';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ArrowLeft from '../../../../components/global/icons/arrow_left';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import HeartFill from '../../../../components/global/icons/heart_fill';
import HeartOutline from '../../../../components/global/icons/heart_outline';
import Delete from '../../../../components/global/icons/delete';
import Eye from '../../../../components/global/icons/eye';
import EditIcon from '../../../../components/global/icons/edit';
import FolderIcon from '../../../../components/global/icons/folder';
import ShareIcon from '../../../../components/global/icons/share';
import ExpandIcon from '../../../../components/global/icons/expand';
import CropIcon from '../../../../components/global/icons/crop';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { async } from '@firebase/util';
// import { Images } from '../../../../components/global/images';
// import { CategorizedSlidesdata } from '../categorizedSlides';

const transition = { duration: .4, ease: [0.6, 0.01, -0.05, 0.9] };

const ConfirmationModal = Loadable({
    loader: () => import('../../../../components/global/confirmationModal'),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});
const LoadableLoginModal = Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});

const LoadableShareModal = Loadable({
    loader: () => import('../../../../components/global/shareModal'),
    loading() {
        return <div className='loading'>Loading...</div>
    }
});

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

const ImgSlider = ({ images, user, viewCount, playlistUrl = null }) => {
    let history = useHistory();
    const activeSlideRef = useRef();
    const { likeCount, slideLiked } = useSlideLikeCount(images?.SlideName);
    const [showFormModel, setShowFormModel] = useState(false)
    // const [recommendedData, setRecommendedData] = useState([]);

    let dividedPortion = images?.slideImages?.length > 0 ? 100 / images?.slideImages?.length : 20;
    console.log('top image length', images?.slideImages?.length)
    const [activeSlide, setActiveSlide] = useState(0);
    const [timelineActiveSlide, setTimelineActiveSlide] = useState(0);
    // const [timelineWidthPercentage, settTimelineWidthPercentage] = useState(0);
    const [timelineProgress, setTimelineProgress] = useState(dividedPortion);
    const [progress, setProgress] = useState(dividedPortion);
    const [fullScreen, setFullScreen] = useState(false);
    const { username } = useContext(AuthContext);


    const followStatus = useFollowStatus(username, images?.username ? images?.username : 'medicos.int7');
    const [toggleFollow, setToggleFollow] = useState(null);
    const [showFollowButton, setShowFollowButton] = useState(null)
    const [checkShare, setCheckShare] = useState(false);
    const [confirmModalShowState, setConfirmModalShowState] = useState(false)
    const [confirmModalConfirmation, setConfirmModalConfirmation] = useState(false)
    const [showTooltip, setShowTooltip] = useState(true);
    const [showEditAndDelete, setShowEditAndDelete] = useState(null)
    // const [recommendedSlide,setRecommendedSlide]=useState(null)
    // const db = getFirestore();
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };

    // const {recomendedData}=useContext(CategorizedSlidesdata);

    let shareUrl = playlistUrl ?
        playlistUrl
        :
        encodeURI(`https://medicospdf.com/slidedetails/${images?.SlideName}/${images?.slideCategory}/${filterSlideSubCategory(images?.slideSubCategory)}`)


    const previousSlide = () => {
        if (activeSlide > 0) {
            setProgress(progress - dividedPortion);
            setActiveSlide(activeSlide - 1);
            scrollLeft()
        }
    }
    const nextSlide = () => {
        if (activeSlide < images?.slideImages?.length - 1) {
            setProgress(progress + dividedPortion);
            setActiveSlide(activeSlide + 1);
            scrollRight()
        }
    }

    const progressCheckOnCLick = (index) => {
        setActiveSlide(index)
        setProgress((index + 1) / images?.slideImages?.length * 100)

    }
    const progressPercentage = (event) => {
        let elementWidth = event.currentTarget.offsetWidth;
        let widthPercentage = (event.nativeEvent.offsetX / elementWidth) * 100;
        let clickedSlide = Math.floor(widthPercentage / dividedPortion);
        if (activeSlide < images?.slideImages?.length - 1 || activeSlide > 0) {
            setActiveSlide(clickedSlide);
            setProgress((clickedSlide + 1) * dividedPortion)
        }
    }
    const timelinePercentage = (event) => {
        let widthPercentage = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * 100;
        // setTimelineActiveSlide(dividedPortion)

        if (widthPercentage >= (dividedPortion * (timelineActiveSlide + 1))) {
            if (timelineActiveSlide < images?.slideImages?.length - 1) {
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
        // let isMounted = true
        const keyListener = (e) => {

            if (e.key === "ArrowLeft") {
                previousSlide();
            }
            if (e.key === "ArrowRight") {
                nextSlide();
                console.log('arrow check render')
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




    //like slide for unique users only once
    async function likeSlide(slideName) {
        // alert('liked')
        try {
            const { firestore: { db, doc,setDoc } } = await getFirebaseAll()
            setDoc(doc(db, 'Web-Slide-Reviews', slideName, 'Likes', 'Like-Count'),
                {
                    like_count: likeCount ? likeCount + 1 : 1,
                })

            // firebase.firestore()
            //     .collection('Web-Slide-Reviews')
            //     .doc(slideName)
            //     .collection('Likes')
            //     .doc('Like-Count')
            //     .set({
            //         like_count: likeCount ? likeCount + 1 : 1,
            //     })

            if (username) {
                return setDoc(doc(db, 'Web-User-Data', username, 'LikedSlides', slideName),
                    {
                        SlideName: images?.SlideName,
                        slideCategory: images?.slideCategory,
                        slideImages: images?.slideImages,
                        slideSubCategory: images?.slideSubCategory
                    })
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('LikedSlides')
                //     .doc(slideName)
                //     .set({
                //         SlideName: images?.SlideName,
                //         slideCategory: images?.slideCategory,
                //         slideImages: images?.slideImages,
                //         slideSubCategory: images?.slideSubCategory
                //     })
            }

        } catch (error) {
            console.log('Error liking slide', error)
        }
    }

    //dislike slide for unique users only once
    async function dislikeSlide(slideName) {
        // alert('dislike'+ slideName)
        try {const { firestore: { db, setDoc,doc } } = await getFirebaseAll()
            setDoc(doc(db, 'Web-Slide-Reviews', slideName, 'Likes', 'Like-Count'), {
                like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
            })

            // firebase.firestore()
            //     .collection('Web-Slide-Reviews')
            //     .doc(slideName)
            //     .collection('Likes')
            //     .doc('Like-Count')
            //     .set({
            //         like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
            //     })

            if (username) {
                // firebase.firestore().collection('Web-User-Data')
                //     .doc(username)
                //     .collection('LikedSlides')
                //     .doc(slideName)
                //     .delete()

                return deleteDoc(doc(db, 'Web-User-Data', username, 'LikedSlides', slideName))
            }

        } catch (error) {
            console.log('Error disliking slide', error)
        }
    }


    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [],
    )

    useEffect(() => {
        if (user?.uid) {
            setShowFormModel(false)
            console.log('user check in slider')

        }
    }, [user?.uid])

    function scrollRight() {
        let element = document.getElementById('navigator');
        // console.log('window width',activeSlideRef?.current.offsetWidth)
        element.scrollLeft += activeSlideRef?.current.offsetWidth;
    }
    function scrollLeft() {
        let element = document.getElementById('navigator');
        // console.log('window width',activeSlideRef?.current.offsetWidth)
        element.scrollLeft -= activeSlideRef?.current.offsetWidth;
    }

    //  check slide shown is uploaded by current user or not for editing

    useEffect(async() => {
        let isMounted = true;
        try {
            // firebase.firestore().collection('UserUploadedSlides')
            //     .doc(username)
            //     .collection('slides')
            //     .where('SlideName', '==', images?.SlideName)
            //     .get()
            const { firestore: { db, query, collection, where, getDocs} } = await getFirebaseAll()
  if(username){
    // console.log('slider', username, images?.SlideName)
    getDocs(query(collection(db, 'UserUploadedSlides', username, 'slides'),
        where('SlideName', '==', images?.SlideName)))
        .then((data) => {
            // console.log('edited',data)
            setShowEditAndDelete(!data.empty)
        })
  }

        } catch (error) {
            console.log("Error fetching user uploaded slides", error)
        } 
        return () => {
            isMounted = false;
        }
    }, [images?.SlideName,  username,showEditAndDelete])


    //cheking whether followed or not 
    useEffect(async() => {
        let isMounted = true;
      try{
        const { firestore: { db, doc, onSnapshot } } = await getFirebaseAll()
        if (isMounted && username) {

            // firebase.firestore()
            // .collection('Web-User-Data')
            // .doc(username)
            // .collection('Following')
            // .doc(images?.username)
            // let slideUploader = images?.username?images.username:'medicos.int7'
            console.log('following check', images?.username)
            let usernameDefault = images?.username ? images?.username : 'medicos.int7'
            const docRef = doc(db, 'Web-User-Data', username, 'Following', usernameDefault)
            console.log('default ', usernameDefault)
            onSnapshot(docRef, (querySnapshot) => {
                // console.log('query1',querySnapshot.data(),images?.username)
                if (!querySnapshot.data()) {
                    setToggleFollow(false)
                }
                else {

                    console.log('following query', querySnapshot.data())
                    if (querySnapshot.data().username == usernameDefault) {
                        setToggleFollow(true)
                    }
                    else {
                        setToggleFollow(false)
                    }

                }

            })




            // else {
            //     // firebase.firestore()
            //     //     .collection('Web-User-Data')
            //     //     .doc(username)
            //     //     .collection('Following')
            //     // //     .doc('medicos.int7')
            //     // const docRef=doc(db,'Web-User-Data',username,'Following','medicos.int7')
            //     // onSnapshot(docRef,(querySnapshot) => {

            //     //     if (querySnapshot.data()) {
            //     //         if (querySnapshot.data().username === 'medicos.int7') {
            //     //             setToggleFollow(true)
            //     //         }
            //     //         else{
            //     //             setToggleFollow(false)
            //     //         }
            //     //     }
            //     // })
            // //    setToggleFollow(false)
            // }

        }
      }
      catch(err){
          console.log(err,'error')
      }
        return () => {
            isMounted = false
        }
    }, [images?.username, username,toggleFollow])


    //follow
    const follow = async() => {
        try {

            const { firestore: { db, setDoc,doc } } = await getFirebaseAll()
            if (images?.username) {
                setDoc(doc(db, 'Web-User-Data', username, 'Following', images?.username),
                    {
                        username: images?.username
                    })
                setDoc(doc(db, 'Web-User-Data', images?.username, 'Followers', username),
                    {
                        username: username
                    })
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('Following')
                //     .doc(images?.username)
                //     .set({
                //         username: images?.username
                //     })


                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(images?.username)
                //     .collection('Followers')
                //     .doc(username)
                //     .set({
                //         username: username
                //     })


            }
            else {
                setDoc(doc(db, 'Web-User-Data', username, 'Following', 'medicos.int7'),
                    {
                        username: 'medicos.int7'
                    })
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('Following')
                //     .doc('medicos.int7')
                //     .set({
                //         username: 'medicos.int7'
                //     })

                setDoc(doc(db, 'Web-User-Data', 'medicos.int7', 'Followers', username),
                    {
                        username: username
                    })
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc('medicos.int7')
                //     .collection('Followers')
                //     .doc(username)
                //     .set({
                //         username: username
                //     })



            }
            setToggleFollow(true);


        } catch (error) {
            console.log('Error following', error)
        }
    }

    //unFollow
    const unFollow = async() => {

        try {
            const { firestore: { db, deleteDoc,doc} } = await getFirebaseAll()
            setToggleFollow(false);
            if (images?.username) {
                deleteDoc(doc(db, 'Web-User-Data', username, 'Following', images?.username))
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('Following')
                //     .doc(images?.username)
                //     .delete()


                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(images?.username)
                //     .collection('Followers')
                //     .doc(username)
                //     .delete()

                deleteDoc(doc(db, 'Web-User-Data', images?.username, 'Followers', username))
            }

            else {
                deleteDoc(doc(db, 'Web-User-Data', username, 'Following', 'medicos.int7'))
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('Following')
                //     .doc('medicos.int7')
                //     .delete()

                deleteDoc(doc(db, 'Web-User-Data', 'medicos.int7', 'Followers', username))
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc('medicos.int7')
                //     .collection('Followers')
                //     .doc(username)
                //     .delete()
                console.log('error deleting')
            }


        } catch (error) {
            console.log('Error unfollowing', error)
        }
    }

    //show follow button or not
    useEffect(() => {
        let isMounted = true
        if (images?.username) {
            console.log("follow test", images?.username, 'username', username)

            if (isMounted && username !== images?.username) {
                setShowFollowButton(true)

            }
            else {
                setShowFollowButton(false)
            }
        }
        else {
            if (isMounted && username !== 'medicos.int7') {
                setShowFollowButton(true)
            }
            else {
                setShowFollowButton(false)
            }
            //  setShowFollowButton(false)
        }
        return () => {
            console.log('testing slideer')
            isMounted = false
        }
    }, [])

    const cancelShare = useCallback(
        (show) => {

            if (show === false) {
                setCheckShare(false)
            }
        }, []
    )
    const cancelConfirmModal = useCallback(
        (show) => {

            if (show === false) {
                setConfirmModalShowState(false)
            }
        }, []
    )

    const ConfirmModalConfirmation = useCallback(
        (show) => {

            if (show === true) {
                setConfirmModalConfirmation(true)
            }
        }, []
    )


    const handleDelete = async(username, slideDocId) => {
        if (username && slideDocId) {
            try {
                // firebase.firestore().collection(`K-Slides-${images?.slideCategory.replace(/\s|\//g, "")}-${images?.slideSubCategory.replace(/\s|\//g, "")}`)
                //     .doc(slideDocId)
                //     .delete()
                // firebase.firestore().collection("AllSlidesDataLockDownVersions")
                //     .doc(slideDocId)
                //     .delete()
                // firebase.firestore().collection('UserUploadedSlides')
                //     .doc(username)
                //     .collection('slides')
                //     .doc(slideDocId)
                //     .delete()
                const { firestore: { db,deleteDoc,doc } } = await getFirebaseAll()
                deleteDoc(doc(db, `K-Slides-${images?.slideCategory.replace(/\s|\//g, "")}-${images?.slideSubCategory.replace(/\s|\//g, "")}`, slideDocId))
                deleteDoc(doc(db, "AllSlidesDataLockDownVersions", slideDocId))
                deleteDoc(doc(db, 'UserUploadedSlides', username, 'slides', slideDocId))
                    .then((res) => {
                        history.goBack()
                        toast.success("Deleted Successfully", { theme: 'dark', hideProgressBar: true })


                    })
            } catch (error) {
                console.log("Error while fetching user's selected slides")
            }
        }
    }

    //SAVE CLIPPED SLIDE IMAGE
    const SaveClippedSlideImage = async() => {
        try {
            const { firestore: { db, setDoc,doc } } = await getFirebaseAll()
            setDoc(doc(db, 'Web-User-Data', username, 'Clipped-Slide-Images', Math.random() + new Date()),
                {
                    image: images?.slideImages[activeSlide],
                    createdAt: new Date(),
                    createdBy: username,
                    userAvatar: images?.userAvatar ? images?.userAvatar : null,
                    author: images?.username ? images?.username : "medicos.int7"

                })
                .then(() => {
                    toast.success("Clipped Images saved successfully", { theme: 'dark', hideProgressBar: true });
                })
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(username)
            //     .collection('Clipped-Slide-Images')
            //     .doc()
            //     .set({
            //         image: images?.slideImages[activeSlide],
            //         createdAt: new Date(),
            //         createdBy: username,
            //         userAvatar: images?.userAvatar ? images?.userAvatar : null,
            //         author: images?.username ? images?.username : "medicos.int7"
            //     })
        } catch (error) {
            console.log('Error saving clipped slide images', error)
        }
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted && confirmModalConfirmation && username && images?.SlideName) {
            handleDelete(username, images?.SlideName)
            console.log('testing slideer delete')
        }
        return () => {
            isMounted = false
        }
    }, [confirmModalConfirmation])




    // const clickhandlerpreslide = () => previousSlide()
    // const clickhandlernexttslide = () => nextSlide()
    const clickhandlerslideimage = () => openFullScreen()
    const clickhandlericon11 = () => previousSlide()
    const clickhandlercloseicon = () => closeFullScreen()
    const clickhandlernextsliderr = () => nextSlide()
    const clickhandleropenslide = () => openFullScreen()
    const clickhandlerclosefull = () => closeFullScreen()
    const clickhandlerproslide = () => previousSlide()
    const clickhandlerproslide2 = () => nextSlide()
    const clickhandleropenicon = () => openFullScreen()
    const clickhandleropenicon2 = () => closeFullScreen()
    const clickhandlerpreslide2 = () => previousSlide()
    const clickhandlernextslide4 = () => nextSlide()
    const clickhandlermotion = () => likeSlide(images?.SlideName)
    const clickhandlermotion2 = () => dislikeSlide(images?.SlideName)
    const clickhandlermotion3 = () => setShowFormModel(true)
    const clickhandlerslideshare5 = () => logEventWithParams("web_slide_categoryAndSubCategory_opened", {
        slideCategory: images?.slideCategory,
        slideSubCategory: images?.slideSubCategory
    })
    const handelcheckshare=() => setCheckShare(true)
    const handelformmodal=() => setShowFormModel(true)


    return (
        <div
       
            className="slider-container">
            {/* SLIDE TITLE BAR */}
            <div
                
                className="slider-container-top">
                {images?.SlideName?.split("-", 1)[0] &&
                    <h4 className="imgSlider-top-head">
                        {images?.SlideName?.split("-", 1)[0]
                        }</h4>

                }

            </div>
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            <ConfirmationModal show={confirmModalShowState} cancel={cancelConfirmModal} confirm={ConfirmModalConfirmation} />
         {
             shareUrl && images?.SlideName &&
                <LoadableShareModal
                url={shareUrl}
                appId={process.env.REACT_APP_ID}
                title={images?.SlideName}
                image={images?.slideImages[0]}
                show={checkShare}
                cancel={cancelShare}
            />
         }

            <div className="slider-container-center">
                {/* SLIDE DISPLAY */}
                <div
                 
                    className={`slider-container-wrapper`}>


                    <div className={`slider-container-wrapper-image-container${images?.slideImages[activeSlide] ? `` : '-loading'}`}>
                        <div className='desktop-ClickContainerForSlideImages-right' onClick={() => previousSlide()}>
                            <ArrowLeft className='desktop-ClickContainerForSlideImages-right-icon' />
                        </div>
                        <div className='desktop-ClickContainerForSlideImages-left' onClick={() => nextSlide()}>
                            <ArrowRight className='desktop-ClickContainerForSlideImages-left-icon' />
                        </div>
                        {
                            !fullScreen ?
                                // <LazyLoadImage  className='slide-image' effect='blur' alt={images?.SlideName? images?.slideName:'Medicos Slide'} src={images?.slideImages[activeSlide]} onClick={clickhandlerslideimage}/>
                                <img loading="lazy" className='slide-image' alt={images?.SlideName? images?.slideName:'Medicos Slide'} src={images?.slideImages[activeSlide]} onClick={clickhandlerslideimage} />
                                :
                                <LazyLoadImage className='slide-image' effect='blur' alt={images?.SlideName? images?.slideName:'Medicos Slide'} src={images?.slideImages[activeSlide]} onClick={clickhandlercloseicon}/>
                                // <img loading="lazy" className='slide-image' alt={images?.SlideName? images?.slideName:'Medicos Slide'} src={images?.slideImages[activeSlide]} onClick={clickhandlercloseicon} />
                        }

                    </div>
                    <div className="slider-container-wrapper-bottom-container">
                        <div className="left">
                            <div onClick={clickhandlericon11}>
                            <ArrowLeft className="icon"  />
                            </div>
                            <div onClick={clickhandlernextsliderr}>
                            <ArrowRight className="icon"  />
                            </div>
                        </div>
                        <div className="right">
                            {
                                user ?
                                    <>
                                        <div onClick={SaveClippedSlideImage} onMouseOver={() => setShowTooltip(!showTooltip)} onMouseOut={() => setShowTooltip(!showTooltip)} className='clip-button-container'>
                                            {!showTooltip &&
                                                <p className={`tooltips-tip-top ${showTooltip ? '' : `tooltips-tipS-top`}`}>Clip</p>
                                            }
                                            <CropIcon className='icon' />
                                        </div>

                                    </>
                                    :
                                    <div onClick={handelformmodal} onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)} className='clip-button-container'>
                                        {!showTooltip &&
                                            <p className={`tooltips-tip-top ${showTooltip ? '' : `tooltips-tipS-top`}`}>Clip</p>
                                        }
                                        <CropIcon className='icon' />
                                    </div>
                            }
                            {
                                user ?
                                    <div  onClick={handelcheckshare}>

                                        <ShareIcon className="icon" />
                                    </div>
                                    :
                                    <div onClick={handelformmodal}>

                                        <ShareIcon className="icon"  />
                                    </div>

                            }
                            {!fullScreen ?
                            <div onClick={clickhandleropenslide}>

                                <ExpandIcon className="icon"  />
                            </div>
                                :
                                <div onClick={clickhandlerclosefull}>

                                    <ExpandIcon className="icon"  />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="progress-indicator-container"
                        onMouseOut={() => setTimelineActiveSlide(0)}
                        onMouseMove={(event) => timelinePercentage(event)}
                        onClick={(e) => progressPercentage(e)}>
                        {images?.slideImages.map((imgData, index) => {
                            if (timelineActiveSlide === index) {


                                return <div key={index} className="slide-position-image" style={
                                    {
                                        left: timelineActiveSlide === 0 ?
                                            "0" : timelineActiveSlide !== images?.length - 1 && (timelineProgress / 1.4) + "%",
                                        right: timelineActiveSlide === images?.length - 1 && "0"
                                    }
                                }>
                                    {/* <img loading="lazy" className="image" alt="Medicos Slide" src={imgData} /> */}
                                    <LazyLoadImage className="image" alt="Medicos Slide" src={imgData} effect='blur' />
                                </div>
                            }
                        })}
                        <div className="progress-indicator-container-active" style={{ width: progress + "%" }}></div>

                    </div>
                </div>
                {/* SLIDE DISPLAY ON FULL SCREEN */}
                <div id="fullscreen" className={`slider-container-wrapper`} style={{ display: !fullScreen && 'none' }}>
                    <div className="slider-container-wrapper-image-container">
                        <img loading="lazy" className="slide-image" src={images?.slideImages[activeSlide]} alt="slide images" />
                        {/* <LazyLoadImage className="slide-image" src={images?.slideImages[activeSlide]} alt="slide images" effect='blur' /> */}
                        <div className="slider-container-wrapper-full-screen-button-container">
                            <div className="left" onClick={clickhandlerproslide} >
                                <ArrowLeft className="icon " />
                            </div>
                            <div className="right" onClick={clickhandlerproslide2} >
                                <ArrowRight className="icon" />
                            </div>

                        </div>

                    </div>

                    <div className="slider-container-wrapper-bottom-container">
                        <div className="left">
                        </div>
                        <div className="right">
                            {
                                user ?
                                    <>
                                        <div onClick={SaveClippedSlideImage} onMouseOver={() => setShowTooltip(!showTooltip)} onMouseOut={() => setShowTooltip(!showTooltip)} className='clip-button-container'>
                                            {!showTooltip &&
                                                <p className={`tooltips-tip-top ${showTooltip ? '' : `tooltips-tipS-top`}`}>Clip</p>
                                            }
                                            <CropIcon className='icon' />
                                        </div>

                                    </>
                                    :
                                    <div onClick={handelformmodal} onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)} className='clip-button-container'>
                                        {!showTooltip &&
                                            <p className={`tooltips-tip-top ${showTooltip ? '' : `tooltips-tipS-top`}`}>Clip</p>
                                        }
                                        <CropIcon  className='icon' />
                                    </div>
                            }
                            <ShareIcon className="icon" />
                            {!fullScreen ?
                            <div onClick={clickhandleropenicon}>

                                <ExpandIcon className="icon"  />
                            </div>
                                :
                                <div onClick={clickhandleropenicon2}>

                                    <ExpandIcon className="icon"  />
                                </div>
                            }
                        </div>
                    </div>



                    <div className="progress-indicator-container"
                        onMouseOut={() => setTimelineActiveSlide(0)}
                        onMouseMove={(event) => timelinePercentage(event)}
                        onClick={(e) => progressPercentage(e)}>
                        {images?.slideImages.map((imgData, index) => {
                            if (timelineActiveSlide === index) {
                                return <div key={index} className="slide-position-image" style={
                                    {
                                        left: timelineActiveSlide === 0 ?
                                            "0" : timelineActiveSlide !== images?.length - 1 && (timelineProgress / 1.4) + "%",
                                        right: timelineActiveSlide === images?.length - 1 && "0"
                                    }
                                }>
                                    {/* <img loading="lazy" className="image" src={imgData} alt="slideimage" /> */}
                                    <LazyLoadImage className="image" src={imgData} alt="slideimage" effect='blur'/>
                                </div>
                            }
                        })}
                        <div className="progress-indicator-container-active" style={{ width: progress + "%" }}></div>
                    </div>



                </div>

                {/* SLIDE GALLERY (RIGHT SIDE) */}
                <div id="navigator" className="slider-container-navigator">
                    <div className="imgSliderMobileView-btn-left" onClick={clickhandlerpreslide2}><ArrowLeft className="imgSliderMobileView-btn-icon" /></div>
                    <div className="imgSliderMobileView-btn-right" onClick={clickhandlernextslide4}> <ArrowRight className="imgSliderMobileView-btn-icon" /></div>
                    {
                        images?.slideImages.map((imgData, index) => {
                            if (activeSlide === index) {
                                // console.log('image length', images?.slideImages.imgData)
                                return <div ref={activeSlideRef} key={imgData + index} onClick={() => progressCheckOnCLick(index)}>
                                    <LazyLoadImage alt="slideimage" className="slider-container-navigator-image-container-active" src={imgData} effect='blur'/>
                                    {/* <img loading="lazy" alt="slideimage" className="slider-container-navigator-image-container-active" src={imgData} /> */}
                                </div>
                            } else {
                                return <div key={imgData + index} onClick={() => progressCheckOnCLick(index)}>
                                    <LazyLoadImage alt="slideimage" className="slider-container-navigator-image-container" src={imgData} effect='blur'/>
                                    {/* <img loading="lazy" alt="slideimage" className="slider-container-navigator-image-container" src={imgData} /> */}
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
                        {
                            user ?
                                <Link
                                    className='links'
                                    to={{
                                        pathname: `${images?.username ? `/profile/${images?.username}` : '/profile/medicos.int7'}`,
                                    }}>
                                    <div className="userInfo">
                                        {images?.slideCategory ? <img
                                        
                                       
                                            className="profilePic" src={images?.userAvatar ? images?.userAvatar : images?.slideCategory ? require("../../../../assets/images/slide/medicos.webp") : ''} />
                                            :
                                            <div
                                           
                                           
                                                className="profilePicloader">

                                            </div>

                                        }
                                        <h6
                                      
                                        >{images?.username ? images?.username : images?.slideCategory ? "Medicos Int'l" : 'loading'}</h6>
                                    </div>
                                </Link>
                                : <div onClick={clickhandlermotion3}>
                                    <div className="userInfo">
                                        {images?.slideCategory ? <img
                                       
                                       
                                            className="profilePic" src={images?.userAvatar ? images?.userAvatar : images?.slideCategory ? require("../../../../assets/images/slide/medicos.webp") : ''} />
                                            :
                                            <div
                                         
                                                className="profilePicloader">

                                            </div>

                                        }
                                        <h6
                                        
                                        >{images?.username ? images?.username : images?.slideCategory ? "Medicos Int'l" : 'loading'}</h6>
                                    </div>
                                </div>


                        }
                        {

                            user && showFollowButton && images?.slideImages &&
                        
                            <div
                            
                            >
                                {/* {followStatus.toString()} */}
                                  {/* {console.log('followtoggle',toggleFollow,!toggleFollow,user,followStatus)} */}
                                {

                                    !followStatus ?
                                        <button onClick={() => follow()} className='slideDetails-followButton'>Follow</button>
                                        :
                                        <button onClick={() => unFollow()} className='slideDetails-followButton'>Following</button>
                                }
                            </div>


                        }
                    </div>
                    <div className="right">
                        <Link
                            onClick={clickhandlerslideshare5}
                            className='links'
                            to={{
                                pathname: `/slidesubcategory/${images?.slideCategory}/${images?.slideSubCategory.replace(/\s|\//g, "")}`,
                            }}>
                            <div
                             
                                className="category">
                                <FolderIcon className="category-icon" />
                                <h6>{images?.slideCategory}</h6>
                                <ArrowRight className="category-icon" />
                                <h6>{images?.slideSubCategory}</h6>
                            </div>
                        </Link>
                        {
                            user ?
                                <>
                                    {
                                        slideLiked ?
                                            <div
                                                // onClick={clickhandlermotion2}
                                        
                                                className="star">
                                                    <div onClick={clickhandlermotion2}>
                                                <HeartFill  className="icon" />

                                                    </div>
                                                <h6>{likeCount > 0 && likeCount}</h6>
                                            </div>
                                            :
                                            <div
                                                // onClick={clickhandlermotion}
                                           
                                                className="star">
                                                    <div onClick={clickhandlermotion}>
                                                <HeartOutline  className="icon" />

                                                    </div>
                                                <h6>{likeCount > 0 && likeCount}</h6>
                                            </div>

                                    }
                                </>
                                :
                                <div
                                    // onClick={clickhandlermotion3}
                                
                                    className="star">
                                        <div onClick={clickhandlermotion3}>
                                    <HeartOutline  className="icon" />

                                        </div>
                                    <h6>{likeCount > 0 && likeCount}</h6>
                                </div>

                        }

                        <div className='slideDetailPage-views'>
                            <Eye className='slideDetailPage-views-icon' />
                            <h6 className='slideDetailPage-views-count'>{viewCount}</h6>
                            {console.log('views count',viewCount)}
                        </div>

                        {
                            user ?
                            <div onClick={handelcheckshare}>

                                <ShareIcon className='slideDetail-imgSlider-bottom-share-icon'  />
                            </div>
                                :
                                <div onClick={() => setShowFormModel(true)}>

                                    <ShareIcon className='slideDetail-imgSlider-bottom-share-icon'  />
                                </div>
                        }

                        {
                            user && showEditAndDelete &&
                            <div className="slideDetailPage-editAndDeleteContainer">
                                <Link
                                    onClick={() => logEventWithParams("web_slide_opened", {
                                        slideTitle: images?.SlideName,
                                        slideCategory: images?.slideCategory,
                                        slideSubCategory: images?.slideSubCategory
                                    })}
                                    to={{
                                        pathname: `/uploadslide/${username}/${images?.SlideName}`,
                                    }}
                                    className='slideDetailPage-editAndDeleteContainer-editLink'
                                >
                                    <EditIcon className='slideDetailPage-editAndDeleteContainer-editLink-icon' />
                                </Link>
                                        <div onClick={() => setConfirmModalShowState(true)}>

                                <Delete className="slideDetailPage-editAndDeleteContainer-deleteIcon"  />
                                        </div>
                            </div>

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
        </div>
    )
}
export default React.memo(ImgSlider)
