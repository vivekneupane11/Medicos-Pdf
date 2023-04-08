import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';


import './index.scss';
import MultiSliderSwiper from './components/SlideMultilevelSlider/index';
import PlaylistSlideCard from './components/PlaylistSlideCard';
import PlayListFormModal from '../../components/global/PlaylistFormModal';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { logEventWithParams } from '../../functions/commonMethod';
// import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import ArrowRight from '../../components/global/icons/arrow_right';
import CloseCircle from '../../components/global/icons/xMark_Circle';
import GridAddIcon from '../../components/global/icons/addGrid_Icon';
import PlusCircle from '../../components/global/icons/plus_circle';
import CheckCircle from '../../components/global/icons/check_Circle';
const Playlist = () => {
    const { user,username } = useContext(AuthContext);
    const { levelone, leveltwo, levelthree } = useParams()
    const [slideaddedToPlaylist, setSlideAddedToPlaylist] = useState([])
    const [useruploadedSlides, setUserUploadedSlides] = useState([])
    const [visibility, setVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uplaodtoFirebaseloading, setUplaodtoFirebaseLoading] = useState(false);
    const [publishLink, setPublishLink] = useState();
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

    const addToPlayListHandler =
        (slideName) => {
            if (slideaddedToPlaylist?.includes(slideName)) {
                setSlideAddedToPlaylist(init => init?.length ? init?.filter(ele => ele !== slideName) : [])
            } else {
                setSlideAddedToPlaylist(init => init?.length ? [slideName, ...init] : [slideName])

            }


        }
 
    const visibilityToogle = () => {
        setVisibility(!visibility)
    }

    //Getting thumbnaik images for slideplaylist
    const getThumbnailImage = (firstslide) => {

        return useruploadedSlides.filter(data => data.SlideName === firstslide)

    }
    //getting slides from playlist
    const getSlidesFromPlaylist = useCallback(
        async() => {
            setLoading(true)
           try {
               const {firestore:{db,doc,getDoc}}=await getFirebaseAll()
            if (levelone && !leveltwo && !levelthree) {
                const docRef = doc(db,'Web-User-Data',username,'Playlist',levelone)
                // console.log('playlist test',levelone)
                getDoc(docRef)
                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .get()
                .then(querySnapshot => {

                    setSlideAddedToPlaylist(() => querySnapshot.data()?.slideList)
                    setLoading(false)
                })
            }
            else if (levelone && leveltwo && !levelthree) {

                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .collection(leveltwo)
                // .doc('playlist')
                // .get()
                const docRef= doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,'playlist')
                getDoc(docRef)
                .then(querySnapshot => {

                    setSlideAddedToPlaylist(() => querySnapshot.data()?.slideList)
                    setLoading(false)

                })

            }
            else if (levelone && leveltwo && levelthree) {
                console.log("Here")
                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('Playlist')
                // .doc(levelone)
                // .collection(leveltwo)
                // .doc(levelthree)
                // .get()
                const docRef= doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,levelthree)
                getDoc(docRef)
                .then(querySnapshot => {

                    setSlideAddedToPlaylist(() => querySnapshot.data()?.slideList)
                    setLoading(false)

                })

            }
               
           } catch (error) {
               
           }


        },
        [username,levelone, leveltwo, levelthree],
    )

    useEffect(() => {
        let isMounted = true;
        if (isMounted && username){
            // getSlidesFromPlaylist()
        } 

        return () => {
            isMounted = false;
        }
    }, [username])


    //Uploading Slides to Playlist/folder

    const addSlidesToPlaylistFirebase = async() => {
        if (!slideaddedToPlaylist?.length)
         return toast.error("You must select at least one slide to create playlist.", { theme: 'dark', hideProgressBar: true });
        setUplaodtoFirebaseLoading(true)
       try {
        const {firestore:{db,doc,setDoc}}=await getFirebaseAll()

        if (levelone && !leveltwo && !levelthree) {
            // firebase.firestore().collection('Web-User-Data')
            // .doc(username)
            // .collection('Playlist')
            // .doc(levelone)
            // .set({
            //     slideList: slideaddedToPlaylist
            // })
            setDoc(doc(db,'Web-User-Data',username,'Playlist',levelone),
            {
                slideList: slideaddedToPlaylist
            })
            .then(() => {

                let thumbnailImage = getThumbnailImage(slideaddedToPlaylist[0])
                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('ListOfPlaylist')
                // .doc(levelone)
                // .set({
                //     levelone: levelone,
                //     slideCount: slideaddedToPlaylist.length,
                //     slideList: slideaddedToPlaylist,
                //     slideThumbnails: thumbnailImage[0].slideImages[0],
                //     createdBy: username,
                //     createdAt: new Date(),
                //     userAvatar: user?.photoURL

                // })
                setDoc(doc(db,'Web-User-Data',username,'ListOfPlaylist',levelone),
                {
                    levelone: levelone,
                    slideCount: slideaddedToPlaylist.length,
                    slideList: slideaddedToPlaylist,
                    slideThumbnails: thumbnailImage[0].slideImages[0],
                    createdBy: username,
                    createdAt: new Date(),
                    userAvatar: user?.photoURL
                })
                .then(() => {
                    logEventWithParams('web_playlist_added', {username:username,levelone:levelone })
                    toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                    setPublishLink(`/viewplaylist/${username}/${levelone}`);
                    setUplaodtoFirebaseLoading(false)
                })


            })
        }
        else if (levelone && leveltwo && !levelthree) {

            // firebase.firestore().collection('Web-User-Data')
            // .doc(username)
            // .collection('Playlist')
            // .doc(levelone)
            // .collection(leveltwo)
            // .doc('playlist')
            // .set({
            //     slideList: slideaddedToPlaylist
            // })
            setDoc(doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,'playlist'),
            {
                slideList: slideaddedToPlaylist
            })
            .then(() => {

                let thumbnailImage = getThumbnailImage(slideaddedToPlaylist[0])
                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('ListOfPlaylist')
                // .doc(levelone)
                // .set({
                //     levelone: levelone,
                //     leveltwo: leveltwo,
                //     slideCount: slideaddedToPlaylist.length,
                //     slideList: slideaddedToPlaylist,
                //     slideThumbnails: thumbnailImage[0].slideImages[0],
                //     createdBy: username,
                //     createdAt: new Date(),
                //     userAvatar: user?.photoURL
                // })
                setDoc(doc(db,'Web-User-Data',username,'ListOfPlaylist',levelone),
                {
                    levelone: levelone,
                    leveltwo: leveltwo,
                    slideCount: slideaddedToPlaylist.length,
                    slideList: slideaddedToPlaylist,
                    slideThumbnails: thumbnailImage[0].slideImages[0],
                    createdBy: username,
                    createdAt: new Date(),
                    userAvatar: user?.photoURL
                })
                .then(() => {
                    setPublishLink(`/viewplaylist/${username}/${levelone}/${leveltwo}`);
                    logEventWithParams('web_playlist_added', {username:username,levelone:levelone,leveltwo:leveltwo })
                    toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                    setUplaodtoFirebaseLoading(false)

                })

            })

        }
        else if (levelone && leveltwo && levelthree) {

            // firebase.firestore().collection('Web-User-Data')
            // .doc(username)
            // .collection('Playlist')
            // .doc(levelone)
            // .collection(leveltwo)
            // .doc(levelthree)
            // .set({
            //     slideList: slideaddedToPlaylist
            // })
            setDoc(doc(db,'Web-User-Data',username,'Playlist',levelone,leveltwo,levelthree),
            {
                slideList: slideaddedToPlaylist
            })
            .then(() => {

                let thumbnailImage = getThumbnailImage(slideaddedToPlaylist[0])
                // firebase.firestore().collection('Web-User-Data')
                // .doc(username)
                // .collection('ListOfPlaylist')
                // .doc(levelone)
                // .set({
                //     levelone: levelone,
                //     leveltwo: leveltwo,
                //     levelthree: levelthree,
                //     slideCount: slideaddedToPlaylist.length,
                //     slideList: slideaddedToPlaylist,
                //     slideThumbnails: thumbnailImage[0].slideImages[0],
                //     createdBy: username,
                //     createdAt: new Date(),
                //     userAvatar: user?.photoURL

                // })
                setDoc(doc(db,'Web-User-Data',username,'ListOfPlaylist',levelone),
                {
                    levelone: levelone,
                    leveltwo: leveltwo,
                    levelthree: levelthree,
                    slideCount: slideaddedToPlaylist.length,
                    slideList: slideaddedToPlaylist,
                    slideThumbnails: thumbnailImage[0].slideImages[0],
                    createdBy: username,
                    createdAt: new Date(),
                    userAvatar: user?.photoURL
                })
                .then(() => {
                    setPublishLink(`/viewplaylist/${username}/${levelone}/${leveltwo}/${levelthree}`);
                    logEventWithParams('web_playlist_added', {username:username,levelone:levelone,levelthree:levelthree})
                    toast.success("Playlist added successfully", { theme: 'dark', hideProgressBar: true });
                    setUplaodtoFirebaseLoading(false)

                })

            })

        }
       } catch (error) {
           
       }


    }

    //Fetchinf every slides uploaded by the users
    useEffect(async() => {
         let isMounted = true;
        if (username) {
            // firebase.firestore().collection('UserUploadedSlides')
            // .doc(username)
            // .collection('slides')
            // .get()
           try{
               const{firestore:{db,getDocs,collection}}=await getFirebaseAll()
            getDocs(collection(db,'UserUploadedSlides',username,'slides'))
            .then(querySnapshot => {
                let slidescolletion = []

                // console.log('query',querySnapshot)
                querySnapshot.forEach(ele => {
                     slidescolletion.push(ele?.data())
                })

                setUserUploadedSlides(slidescolletion)


            })

           } 
            catch(err){
                console.log('catching err',err)
            }
        }
        return () => {
            isMounted = false;
        }
    }, [username])

    return <div className="playlist-wrapper">
        {/* Levels are just folders sub directory */}
        <PlayListFormModal levelone={levelone} leveltwo={leveltwo} levelthree={levelthree} visibilityToogle={visibilityToogle} visibility={visibility} />
        {
            publishLink && <section className='publish-alert-container'>
                <div className='text'>
                    <CheckCircle className='icon' />
                    <p>Your playlist has been published.</p>
                    <Link to={publishLink}
                        className='link'
                    ><p>Visit your playlist</p></Link>
                </div>
                {/* <IoMdClose className='close-icon' /> */}
            </section>
        }
        <section className="playlist-header">
            <aside className='playlist-header-title'><h3> {levelone} <ArrowRight className='playlist-header-icon' size={30} /> {leveltwo ? leveltwo : ''} {leveltwo && <ArrowRight className='playlist-header-icon' size={30} />} {levelthree ? levelthree : ''} </h3> </aside>
            {!slideaddedToPlaylist?.length && !levelthree ? <aside> <button onClick={visibilityToogle} ><PlusCircle className='playlist-header-icon-button-plus' />Add Folder</button> </aside> : <aside> <button disabled={uplaodtoFirebaseloading} onClick={addSlidesToPlaylistFirebase}><CheckCircle className='playlist-header-icon-button'/>Publish Your Playlist</button> </aside>}
        </section>
        {
            !loading ? <section className="playlist-container">
                {
                    !slideaddedToPlaylist?.length && <section className="playlist-container-add-zone">
                        <GridAddIcon className='playlist-header-icon-button' />
                        <p>Add slides to your playlist.</p>
                        <p>Select slide from below to add inside {levelone}</p>
                        {!levelthree && <button onClick={visibilityToogle}><PlusCircle className='playlist-header-icon-button-plus' />Create another folder</button>}
                    </section>
                }
                {
                    slideaddedToPlaylist?.length ? <section className="addedslidetoplaylist-container">
                        {useruploadedSlides.filter(ele => slideaddedToPlaylist?.includes(ele.SlideName)).map((data, index) => <PlaylistSlideCard index={index} addToPlayListHandler={addToPlayListHandler} key={index} slideData={data} />
                        )

                        }
                    </section> : ''
                }

            </section>
                : <Loading />
        }

        <MultiSliderSwiper addToPlayListHandler={addToPlayListHandler} slideaddedToPlaylist={slideaddedToPlaylist} setSlideAddedToPlaylist={setSlideAddedToPlaylist} useruploadedSlides={useruploadedSlides} />

        <div className='mobileView-iconShow'>
            {!slideaddedToPlaylist?.length && !levelthree ? <aside> <button onClick={visibilityToogle} ><PlusCircle className='playlist-header-icon-button-plus' />Add Folder</button> </aside> : <aside> <button disabled={uplaodtoFirebaseloading} onClick={addSlidesToPlaylistFirebase}><CloseCircle className='playlist-header-icon-button' size={27} />Publish Your Playlist</button> </aside>}

        </div>
    </div>
}
export default Playlist; 