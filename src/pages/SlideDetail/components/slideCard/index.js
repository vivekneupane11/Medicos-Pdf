// import firebase from 'firebase/compat';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import useTotalViews from '../../../../components/customHooks/totalViews';
import ConfirmationModal from '../../../../components/global/confirmationModal';
import { Headings } from '../../../../components/global/headings';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
// import useLocalStorage from '../../../../customHooks/useLocalStorage';
import { logEventWithParams } from '../../../../functions/commonMethod';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import "./index.scss";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { getFirestore, getDoc, doc, onSnapshot, setDoc, deleteDoc, addDoc } from 'firebase/firestore';
import useSlideLikeCount from '../../../../components/customHooks/SlideLikes';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import HeartFill from '../../../../components/global/icons/heart_fill';
import HeartOutline from '../../../../components/global/icons/heart_outline';
import Delete from '../../../../components/global/icons/delete';
import Eye from '../../../../components/global/icons/eye';
import EditIcon from '../../../../components/global/icons/edit';
import VerticleDots from '../../../../components/global/icons/dots_Verticle';
import ShareIcon from '../../../../components/global/icons/share';
import CommentBoxIcon from '../../../../components/global/icons/comment';
import ExpandIcon from '../../../../components/global/icons/expand';
import TagFill from '../../../../components/global/icons/tagFill';
import { async } from '@firebase/util';


const SlideCard = ({ title, title2, description, images, datas, showModal, showShareModal }) => {
    const { user,username } = useContext(AuthContext)
    const { likeCount, slideLiked } = useSlideLikeCount(datas?.SlideName);
    const [showFormModel, setShowFormModel] = useState(false)
    const [optionCheck, setOptionCheck] = useState(false)
    const [showEdit, setShowEdit] = useState(null);
    const [pinState, setPinState] = useState(null)
    const [showPin, setShowPin] = useState(null)

    const totalViewsCount = useTotalViews('slidedetails', datas?.SlideName)
    const [confirmModalShowState, setConfirmModalShowState] = useState(false)
    const [confirmModalConfirmation, setConfirmModalConfirmation] = useState(false)
    const [slideDocId, setSlideDocId] = useState(false)
    const [istrue, setIstrue] = useState(true);


    const { userId } = useParams();
    const location = useLocation()
    const ref = useRef()

    let dividedPortion = useMemo(() => 100 / images?.filter((data, index) => (index < 5))?.length, []);
    const [progressValue, setProgressValue] = useState(dividedPortion);

    const [toggleLike] = useState(false);
    // const db = getFirestore();
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };






    const likeSlide = async() => {
        console.log('log is increasing')
        try {
    const { firestore: { db, doc,setDoc } } = await getFirebaseAll()

            setDoc(doc(db, 'Web-Slide-Reviews', datas?.SlideName, 'Likes', 'Like-Count'),
                {
                    like_count: likeCount ? likeCount + 1 : 1,
                })

            if (username) {
                setDoc(doc(db, 'Web-User-Data', username, 'LikedSlides', datas?.SlideName),
                    {
                        SlideName: datas?.SlideName,
                        slideCategory: datas?.slideCategory,
                        slideImages: datas?.slideImages,
                        slideSubCategory: datas?.slideSubCategory,
                        userAvatar: datas?.userAvatar ? datas?.userAvatar : null,
                        username: datas?.username ? datas?.username : null 

                    })
            }



        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
    const dislikeSlide = async() => {
        try {
    const { firestore: { db, doc,setDoc,deleteDoc } } = await getFirebaseAll()

            setDoc(doc(db, 'Web-Slide-Reviews', datas?.SlideName, 'Likes', 'Like-Count'),
                {
                    like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
                })


            if (username) {
                deleteDoc(doc(db, 'Web-User-Data', username, 'LikedSlides', datas?.SlideName))
            }


        } catch (error) {
            console.log('Error disliking slide', error)
        }
    }





    const removeUnderscore = (str) => {
        str = str.split("-", 1)[0]
        var i, frags = str.split('_');
        for (i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }


    useEffect(() => {
        let isMounted = true

        if (isMounted && user?.uid) {
            setShowFormModel(false)

        }
        return () => {
            isMounted = false
        }
    }, [user?.uid])

    const clickhandlerslideshare = () => logEventWithParams("web_slide_opened", {
        slideTitle: title,
        slideCategory: datas.slideCategory,
        slideSubCategory: datas.slideSubCategory,
    })
    const clickhandlerslideshare2 = () => logEventWithParams("web_slide_opened", {
        slideTitle: title,
        slideCategory: datas?.slideCategory,
        slideSubCategory: datas?.slideSubCategory
    })
    const clickhandlerslideshare3 = () => logEventWithParams("web_slide_categoryAndSubCategory_opened", {
        slideCategory: datas?.slideCategory,
        slideSubCategory: datas?.slideSubCategory
    })

    const clickhandlerrighticon0 = () => setShowFormModel(true)


    useEffect(async() => {
        let isMounted = true;
        if (isMounted && username && datas?.SlideName) {
            try {
    const { firestore: { db, doc,getDoc } } = await getFirebaseAll()

                getDoc(doc(db, 'UserUploadedSlides', username, 'slides', datas?.SlideName))
                    .then((res) => {

                        if (res?.exists() && isMounted) {
                            setShowEdit(true)
                        }

                    })
            } catch (error) {
                console.log("Error while fetching user's selected slides")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [username, datas?.SlideName])


    useEffect(() => {
        let isMounted = true
        const checkIfClickedOutside = e => {
            if (optionCheck && ref.current && !ref.current.contains(e.target)) {
                setOptionCheck(false)
            }

        }

        if (isMounted) {

            document.addEventListener("mousedown", checkIfClickedOutside)
        }


        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
            isMounted = false

        }
    }, [optionCheck])
    const confirmDelete = (data) => {
        if (data) {
            setSlideDocId(data)
            setConfirmModalShowState(true)
        }

    }
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

    useEffect(async() => {
        let isMounted = true;

        if (isMounted && confirmModalConfirmation && slideDocId) {
            const deleteSlide = async(slideDocId) => {
                if (username && slideDocId) {
                    try {
                    const { firestore: { db, doc,deleteDoc } } = await getFirebaseAll()

                        deleteDoc(doc(db, 'UserUploadedSlides', username, 'slides', slideDocId))
                            .then((res) => {
                                toast.success("Deleted Successfully", { theme: 'dark', hideProgressBar: true })
                                setConfirmModalShowState(false)
                                setConfirmModalConfirmation(false)
                            })
                        deleteDoc(doc(db, `K-Slides-${datas?.slideCategory.replace(/\s|\//g, "")}-${datas?.slideSubCategory.replace(/\s|\//g, "")}`, datas?.SlideName))
                        deleteDoc(doc(db, "AllSlidesDataLockDownVersions", datas?.SlideName))

                    } catch (error) {
                        console.log("Error while fetching user's selected slides")
                    }
                }
            }
            deleteSlide(slideDocId)
        }
        return () => {
            isMounted = false
        }
    }, [confirmModalConfirmation, slideDocId, datas?.SlideName, username, datas?.slideCategory, datas?.slideSubCategory])


    useEffect(() => {
        let isMounted = true

        if (isMounted) {
            if (location.pathname.split('/').includes('profile')) {
                setShowPin(true)
            }


        }
        return () => {
            isMounted = false
        }
    }, [showPin, location.pathname])


    useEffect(async() => {
        let isMounted = true
        try{
         const { firestore: { db, doc,onSnapshot } } = await getFirebaseAll()

            if (isMounted && username && location.pathname.split('/').includes('profile')) {
                const docRef = doc(db, 'Web-User-Data', username, 'Pinned-Slide', datas?.SlideName)
                onSnapshot(docRef, (querySnapShot) => {
                    if (querySnapShot?.data()) {
                        setPinState(true)
                    }
    
                })
            }
        }
        catch(err){
            console.log(err,'error')
        }
        return () => {
            isMounted = false
        }
    }, [pinState, datas?.SlideName, location.pathname, username])


    const handlePinSlide = async() => {
        setPinState(!pinState)
        try{
    const { firestore: { db, doc,setDoc } } = await getFirebaseAll()

            if (username) {
                setDoc(doc(db, 'Web-User-Data', username, 'Pinned-Slide', datas?.SlideName),
                    {
                        SlideName: datas?.SlideName,
                        slideCategory: datas?.slideCategory,
                        slideImages: datas?.slideImages,
                        slideSubCategory: datas?.slideSubCategory,
                        userAvatar: datas?.userAvatar,
                        username: datas?.username
    
                    })
            }

        }
        catch{

        }


    }

    const handleUnPinSlide = async() => {
        setPinState(!pinState)
        try{
    const { firestore: { db, doc,deleteDoc } } = await getFirebaseAll()

            if (username) {
                deleteDoc(doc(db, 'Web-User-Data', username, 'Pinned-Slide', datas?.SlideName))
            }
        }
        catch(err){
            console.log(err,'errr')
        }

    }
    const unpinhandeler=() => handleUnPinSlide()
    const handelmodal=() => showModal(true)



    return (
        <>
            {/* <LoginModal show={showFormModel} formModel={FormModel}/> */}
            <ConfirmationModal show={confirmModalShowState} cancel={cancelConfirmModal} confirm={ConfirmModalConfirmation} />
            <div className="slide-card">

                {
                    showPin && userId === username &&
                    <div className='slideCardPin-container' onMouseOver={() => setIstrue(!istrue)} onMouseOut={() => setIstrue(!istrue)}>
                        {
                            pinState ?
                            <div onClick={unpinhandeler}>

                                <TagFill className='slideCardPin-container-icon'  />
                            </div>
                                :
                                <div onClick={unpinhandeler}>

                                    <TagFill className='slideCardPin-container-icon2'  />
                                </div >
                        }
                        {!istrue &&
                            <p className={`slideCardPin-container-tooltip ${istrue ? '' : `slideCardPin-container-tooltip-hide`}`}>{pinState ? 'Unpin' : 'Pin'}</p>
                        }
                    </div>
                }


                <Link
                    onClick={clickhandlerslideshare}
                    className="slide-links"
                   
                    to={{
                        pathname: `/slidedetails/${datas?.SlideName}/${datas?.slideCategory}/${filterSlideSubCategory(datas?.slideSubCategory)}`,
                    }}>
                    <div
                        className="slide-card-image-container"
                    >


                        <LazyLoadImage
                            key={'slide-thumbnails'}
                            alt={'Slide thumbnail image'}
                            effect="blur"
                            src={images[0]}
                            className="slide-card-image"
                        />





                    </div>

                </Link>

                <div className="slide-card-bottom">
                    <div className="description">
                        <Link
                            onClick={clickhandlerslideshare2}
                            className="slide-links"
                           
                            to={{
                                pathname: `/slidedetails/${datas?.SlideName}/${datas?.slideCategory}/${filterSlideSubCategory(datas?.slideSubCategory)}`,
                           
                            }}>
                            <div className="title">
                                <Headings type="heading5" content={removeUnderscore(description)} />
                            </div>
                        </Link>
                        {/* <Paragraphs content={title} /> */}
                        <Link
                            onClick={clickhandlerslideshare3}
                            className="slide-links"
                            to={{
                                pathname: `/slidesubcategory/${datas?.slideCategory}/${(datas?.slideSubCategory)}`,
                            }}>
                            <div className='slideCard-categoryAndSubCategory'>
                                <p>{title}</p>
                                <ArrowRight className='slideCard-categoryAndSubCategory-icon' />
                                <p>{title2}</p>
                            </div>
                        </Link>


                        <div className='slideCard-likesAndViews-Container'>
                            {
                                likeCount > 0 &&
                                <p className='slideCard-likesAndViews-Container-likes'>{likeCount} likes</p>
                            }

                            {
                                totalViewsCount > 0 &&
                                <div className='slideCard-likesAndViews-Container-views'>
                                    <Eye className='slideCard-likesAndViews-Container-views-icon' />
                                    <h6 className='slideCard-likesAndViews-Container-views-count'>{totalViewsCount}</h6>
                                </div>
                            }

                        </div>
                    </div>

                    <div className="slide-info">
                        {
                            user ?
                                <Link
                                    className='slide-links'
                                    to={{
                                        pathname: `${datas.username ? `/profile/${datas?.username}` : '/profile/medicos.int7'}`,
                                    }}>
                                    <div className="left">
                                        <div className="userInfo">
                                            {/* {console.log('user data',datas)} */}
                                            <LazyLoadImage className="profilePic" src={datas?.userAvatar ? datas?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' effect='blur'/>
                                            {/* <img loading="lazy" className="profilePic" src={datas?.userAvatar ? datas?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' /> */}
                                            <Headings type="heading7" content={datas?.username ? datas?.username : "Medicos Int'l"} />
                                        </div>
                                    </div>
                                </Link>
                                :
                                <div onClick={handelmodal}>
                                    <div className="left">
                                        <div className="userInfo">
                                        <LazyLoadImage className="profilePic" src={datas?.userAvatar ? datas?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' effect='blur'/>

                                            {/* <img loading="lazy" className="profilePic" src={datas?.userAvatar ? datas?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' /> */}
                                            <Headings type="heading7" content={datas?.username ? datas?.username : "Medicos Int'l"} />
                                        </div>
                                    </div>
                                </div>
                        }

                        <div className="right">
                            {
                                user ?
                                    <>
                                        <TransitionGroup>
                                            {
                                                slideLiked ?

                                                    <div className='right-likeDislikeContainer'onClick={dislikeSlide}>
                                                        <CSSTransition
                                                            timeout={300}
                                                            in={true}
                                                            appear={true}
                                                            classNames="like"
                                                        >
                                                            <HeartFill  className='right-likeDislikeContainer-icon1' />
                                                        </CSSTransition>
                                                    </div>

                                                    :
                                                    <div className='right-likeDislikeContainer'onClick={likeSlide}>
                                                        <HeartOutline  className='right-likeDislikeContainer-icon2' />
                                                    </div>

                                            }
                                        </TransitionGroup>

                                    </>
                                    :
                                    <>
                                        {
                                            toggleLike ?
                                                <div className='right-likeDislikeContainer' onClick={handelmodal}>
                                                    <HeartFill  className='right-likeDislikeContainer-icon1' />
                                                </div>
                                                :
                                                <div className='right-likeDislikeContainer'onClick={handelmodal}>
                                                    <HeartOutline  className='right-likeDislikeContainer-icon2' />
                                                </div>
                                        }

                                    </>

                            }



                            {
                                user ?
                                    <Link
                                        className="right-comment-icon"
                                        onClick={clickhandlerslideshare2}
                                        to={{
                                            pathname: `/slidedetails/${datas?.SlideName}/${datas?.slideCategory}/${filterSlideSubCategory(datas?.slideSubCategory)}`,
                                      
                                        }}>
                                        <CommentBoxIcon className="icon" />
                                    </Link>
                                    :
                                    <div className="right-comment-icon" onClick={clickhandlerrighticon0}>
                                        <CommentBoxIcon className="icon"  />
                                    </div>
                            }

                            {
                                user ?
                                    <div className="shareOptions" onClick={() => showShareModal(true, datas)}>
                                        <ShareIcon className="shareIcon"  />
                                    </div>
                                    :
                                    <div className="shareOptions" onClick={handelmodal}>
                                        <ShareIcon className="shareIcon"  />
                                    </div>
                            }
                            {
                                showEdit &&
                                <div className="profile-options-container" ref={ref}>
                                    <div onClick={() => setOptionCheck(!optionCheck)}>

                                    <VerticleDots className="profile-options-container-icon"  />
                                    </div>
                                    <div className={`profile-options-container-options ${optionCheck ? 'profile-options-container-options-Active' : ''}`}>
                                        <Link
                                            onClick={() => logEventWithParams("web_slide_opened", {
                                                slideTitle: title,
                                                slideCategory: datas?.slideCategory,
                                                slideSubCategory: datas?.slideSubCategory
                                            })}
                                            to={{
                                                pathname: `/uploadslide/${username}/${datas?.SlideName}`,
                                            }}
                                            className='slideCardProfile-options-editLink'
                                        >

                                            <EditIcon className="profile-expandIcon" />
                                            <span>Edit</span>
                                        </Link> 

                                        <div className="slideCardProfile-delete" onClick={() => confirmDelete(datas?.SlideName)}>
                                            <Delete className="profile-expandIcon" />
                                            <span>Delete</span>
                                        </div>

                                        <Link
                                            onClick={() => logEventWithParams("web_slide_opened", {
                                                slideTitle: title,
                                                slideCategory: datas?.slideCategory,
                                                slideSubCategory: datas?.slideSubCategory
                                            })}
                                            to={{
                                                pathname: `/slidedetails/${datas?.SlideName}/${datas?.slideCategory}/${filterSlideSubCategory(datas?.slideSubCategory)}`,
                                       
                                            }}
                                            className='slideCardProfile-options-expandLink'
                                        >
                                            <ExpandIcon className="profile-expandIcon" />
                                            <span>Expand</span>
                                        </Link>

                                    </div>

                                </div>
                            }
                            {
                                !showEdit &&
                                <Link
                                    onClick={() => logEventWithParams("web_slide_opened", {
                                        slideTitle: title,
                                        slideCategory: datas?.slideCategory,
                                        slideSubCategory: datas?.slideSubCategory
                                    })}
                                    to={{
                                        pathname: `/slidedetails/${datas?.SlideName}/${datas?.slideCategory}/${filterSlideSubCategory(datas?.slideSubCategory)}`,
                                   
                                    }}>
                                    <ExpandIcon className="downloadIcon" />
                                </Link>
                            }




                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}


export default React.memo(SlideCard);
