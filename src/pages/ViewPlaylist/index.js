import React, { useCallback, useContext, useEffect, useState } from "react";
import LazyLoad from 'react-lazyload';
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import TextClamp from 'react-string-clamp';
import { useParams } from "react-router-dom";
//LOCAL IMPORTS
// import useLocalStorage from "../../customHooks/useLocalStorage";
import './index.scss'
import { AuthContext } from "../../components/signUp/authMethods/authentication";
import ImgSlider from '../../pages/SlideDetail/components/slider';
import useViewsCount from "../../components/customHooks/viewsCount";
import { Avatar } from "../../components/global/images";
import SlideDescription from "../SlideDetail/components/slideDescription";
import Loading from "../../components/loading";
// import { DisplayTitle } from "../../components/global/Titles";
import { logEventWithParams } from "../../functions/commonMethod";
// import { doc, getDoc, getFirestore } from "firebase/firestore";
import ArrowRight from "../../components/global/icons/arrow_right";
import ListCheckIcon from "../../components/global/icons/listCheck";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ViewPlaylist = () => {
    const { user } = useContext(AuthContext);
    const { username, levelone, leveltwo, levelthree } = useParams();
    console.log('level check',levelone,leveltwo,levelthree)
    const [slideDocIdList, setSlideDocIdList] = useState([]);
    // const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    const [slideData, setSlideData] = useState();
    const [activeSlide, setActiveSlide] = useState(0)
    const [loading, setLoading] = useState(false);
    const viewCount = useViewsCount(slideData ? slideData[activeSlide]?.SlideName : '')
    // const db =getFirestore();
    const  getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }


    //getting slides from playlist
    const getSlidesDocId = useCallback(
        async() => {
            setLoading(true)
            
         try{
             const {firestore:{db,getDoc,doc}}=await getFirebaseAll()
            if (levelone && !leveltwo && !levelthree) {
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .get()
                logEventWithParams('web_playlist_opened',{levelone:levelone})
                const docRef=doc(db,'Web-User-Data',username,'Playlist',levelone)
                getDoc(docRef)
                .then(querySnapshot => {
                    console.log('this is level one', querySnapshot.data())
                    setSlideDocIdList(() => querySnapshot.data()?.slideList)
                    setLoading(false)
                })
            }
            else if (levelone && leveltwo && !levelthree) {
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .collection(leveltwo)
                // .doc('playlist')
                // .get()
                logEventWithParams('web_playlist_opened',{levelone:levelone,leveltwo:leveltwo})
                const docRef=doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,'playlist')
                getDoc(docRef)
                .then(querySnapshot => {
                    console.log('this is level two', querySnapshot.data())
                    setSlideDocIdList(() => querySnapshot.data()?.slideList)
                    setLoading(false)
                })

            }
            else if (levelone && leveltwo && levelthree) {
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .collection(leveltwo)
                // .doc(levelthree)
                // .get()
                logEventWithParams('web_playlist_opened',{levelone:levelone,leveltwo:leveltwo,levelthree:levelthree})
                console.log("Here")
                const docRef=doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,levelthree)
                getDoc(docRef)
                .then(querySnapshot => {
                    console.log('this is level three', querySnapshot.data())
                    setSlideDocIdList(() => querySnapshot.data()?.slideList)
                    setLoading(false)
                })
            }
         }
         catch(err){

         }
        },
        [levelone, leveltwo, levelthree,username],
    )

    useEffect(() => {
        let isMounted = true;
        if (isMounted){
            getSlidesDocId()
        } ;
        return () => {
            isMounted = false;
        }
    }, []);
    
    useEffect(async() => {
        let isMounted = true;
        try{
            const {firestore:{db,doc,getDoc}}=await getFirebaseAll()
            if (slideDocIdList?.length > 0) {
                Promise.all(
                    slideDocIdList?.map(async (docId, index) => {
                        setLoading(true);
                        // return await firebase.firestore()
                        //     .collection('AllSlidesDataLockDownVersions')
                        //     .doc(docId)
                        //     .get()
                        const docRef=doc(db,'AllSlidesDataLockDownVersions',docId)
                       return getDoc(docRef)
                            .then((querySnapshot) => {
                                if (querySnapshot?.exists()) {
                                    if (slideDocIdList?.length === index) {
                                        setLoading(false);
                                    }
                                    
                                    console.log('slideDocid', querySnapshot.data());
                                    return querySnapshot.data();
                                }
                            })
                    })
                ).then((res) => {
                    console.log('This is final data', res)
                    setSlideData(res)
                    // setLoading(false)
                })
            }
        }
        catch(err){

        }
        return () => {
            isMounted = false
        }
    }, [slideDocIdList])
    return <div className="view-playlist-container">
        {
            slideData?.length > 0 && loading ?
            
                <div>
                    {
                console.log('data',slideData)
            }
                    <ImgSlider

                        playlistUrl={encodeURI(levelthree ? `https://medicospdf.com/viewplaylist/${username}/${levelone}/${leveltwo}/${levelthree}` :
                        leveltwo ? `https://medicospdf.com/viewplaylist/${username}/${levelone}/${leveltwo}` :
                            `https://medicospdf.com/viewplaylist/${username}/${levelone}`)}
                        images={slideData[activeSlide]}
                        user={user}
                        viewCount={viewCount}
                    />
                    <section className="playlist-title">
                        <h4>Playlist</h4>
                        <div className='title-container'>
                            <ListCheckIcon className='icon' />
                            <h5>{(levelone && levelone) + (leveltwo ? ' > ' + leveltwo : '') + (levelthree ? ' > ' + levelthree : '')}</h5>
                        </div>
                    </section>

                    <div className="playlist-container">

                        <div className="playlist-slider">
                            {
                                slideData?.map((data, index) => {
                                    return <section onClick={() => setActiveSlide(index)} className={`playlist-slidecard ${activeSlide === index ? 'playlist-slidecard-active' : 'playlist-slidecard'} `}>
                                        <aside className='card-thumbnails'>
                                            {/* <img loading="lazy" src={data?.slideImages[0]} alt='Slides thumbnail image' /> */}
                                            <LazyLoadImage src={data?.slideImages[0]} alt='Slides thumbnail image' effect="blur"/>
                                        </aside>
                                        <aside className='slide-descriptions'>
                                            <h3> {data?.SlideName.split('-', 1)[0]} </h3>
                                            <span>{data?.slideCategory}</span>
                                            <ArrowRight className='playlist-categoryAndSubCategory-icon' />
                                            <span> {data?.slideSubCategory} </span>
                                            <p>{data?.slideDescription}</p>
                                            <div className='user-descriptions'>
                                                <Avatar size={'20px'} Image={data?.userAvatar} text={username} />
                                                {/* <p className='user-avatar-name'>{data?.username}</p> */}
                                                <TextClamp
                                                text={data?.username}
                                                lines={1}
                                                element='p'
                                                className='user-avatar-name'
                                            />
                                            </div>

                                        </aside>
                                    </section>
                                })
                            }
                        </div>
                    </div>
                    <LazyLoad height={200} offset={50}>
                        {/* playlist props used to disable the comment and review section  */}
                        <SlideDescription playlist={true} data={slideData[activeSlide]} user={user} viewCount={viewCount} />
                    </LazyLoad>

                </div>
                
                :
                <div className="loading-container">
                    <Loading />
                </div>
        }
    </div>
}

export default ViewPlaylist;