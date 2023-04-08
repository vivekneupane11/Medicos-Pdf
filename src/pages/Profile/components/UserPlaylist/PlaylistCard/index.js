import React, { useState, useEffect, useRef, useContext } from 'react';
// import firebase from 'firebase/compat'
import './_playlistCard.scss';
// import { Headings } from '../../../../../components/global/headings';
import PlaylistCreate from '../../UserUploads/Components/PlaylistButton';
import { Button } from '../../../../../components/global/button';
// import {HiOutlineDotsVertical} from 'react-icons/hi';
// import { BiEditAlt } from 'react-icons/bi';
// import {RiDeleteBin7Line} from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom';
import TextClamp from 'react-string-clamp';
// import Loading from '../../../../../components/loading';
import { PlaylistCardPlaceholder } from '../playlistCardPlaceholder';
// import { collection, deleteDoc, doc, getDocs, getFirestore, limit, onSnapshot, orderBy, query,startAfter } from 'firebase/firestore';
import { AuthContext } from '../../../../../components/signUp/authMethods/authentication';
import Delete from '../../../../../components/global/icons/delete';
import EditIcon from '../../../../../components/global/icons/edit';
import VerticleDots from '../../../../../components/global/icons/dots_Verticle';
// import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
// import { async } from '@firebase/util';

export const PlayListCard = () => {
    const { userId } = useParams();
    const [playlistList, setPlaylistList] = useState([])
    const { user,username } = useContext(AuthContext)

    const [showLoadMore, setShowLoadMore] = useState(false);
    const [loading, setLoading] = useState(false);
    let loadLimit = 7
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

    useEffect(async() => {
        try {
            const {firestore:{db,query,collection,limit,onSnapshot}}=await getFirebaseAll()
            setLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('ListOfPlaylist')
            //     .limit(loadLimit)
                const colRef =query(collection(db,'Web-User-Data',userId,'ListOfPlaylist'),
                limit(loadLimit))
                onSnapshot(colRef,(querySnapshot) => {
                    if (!querySnapshot.empty) {
                        let playlistlistdata = []
                        querySnapshot.forEach(doc => {
                            playlistlistdata.push(doc?.data())
                        })
                        setPlaylistList(playlistlistdata);
                        setLoading(false);
                        if (querySnapshot?.docs?.length === loadLimit) {
                            setShowLoadMore(true)
                        } else {
                            setShowLoadMore(false)
                        }
                    } else {
                        setLoading(false);
                    }
                })
        } catch (error) {
            console.log('Error fetching list of playlist', error);
        }

    }, [loadLimit,userId])

    const loadMorePlaylist = async() => {
        // firebase.firestore()
        //     .collection('Web-User-Data')
        //     .doc(username)
        //     .collection('ListOfPlaylist')
        //     .orderBy('levelone')
        //     .startAfter(playlistList[playlistList?.length - 1]?.levelone)
        //     .limit(loadLimit)
        //     .get()
        const {firestore:{db,query,collection,limit,orderBy,startAfter,getDocs}}=await getFirebaseAll()

            const colRef = query(collection(db,'Web-User-Data',username,'ListOfPlaylist'),
            orderBy('levelone'),
            startAfter(playlistList[playlistList?.length - 1]?.levelone),
            limit(loadLimit))
            getDocs(colRef)
            .then(querySnapshot => {
                console.log('This is more playlist', querySnapshot.docs)
                if (!querySnapshot.empty) {
                    let playlistlistdata = []
                    querySnapshot.forEach(doc => {
                        playlistlistdata.push(doc?.data())
                    })
                    setPlaylistList(((init) => [...init, ...playlistlistdata]))
                } else {
                    setShowLoadMore(false);
                }
            })
    }

    const backgroundColors = [
        "#a0aec1",
        "#98c1d9"
    ]

    const Card = ({ data, index }) => {
        const ref = useRef();
        const [optionCheck, setOptionCheck] = useState(false)
        // const [showEdit, setShowEdit] = useState(null);
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

        const DeletePlaylist = async() => {
            console.log('playlist deleted', data?.levelone)
            try {
                const {firestore:{db,deleteDoc,doc}}=await getFirebaseAll()
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('ListOfPlaylist')
                //     .doc(data?.levelone)
                //     .delete()
                deleteDoc(doc(db,'Web-User-Data',username,'ListOfPlaylist',data?.levelone))
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('Playlist')
                //     .doc(data?.levelone)
                //     .delete()
                deleteDoc(doc(db,'Web-User-Data',username,'Playlist',data?.levelone))
            } catch (error) {
                console.log('Error deleting playlis', error)
            }
        }

        return <div className='playlistCard-wrapper'>
            <div className='playlistCard-wrapper-container'>
                <Link
                    to={
                        data?.levelthree ? `/viewplaylist/${data?.createdBy}/${data?.levelone}/${data?.leveltwo}/${data?.levelthree}` :
                            data?.leveltwo ? `/viewplaylist/${data?.createdBy}/${data?.levelone}/${data?.leveltwo}` :
                                `/viewplaylist/${data?.createdBy}/${data?.levelone}`
                    }
                    className='playlistCard-wrapper-container-top' style={{ backgroundColor: `${index % 2 ? backgroundColors[0] : backgroundColors[1]}`, textDecoration: 'none' }}>
                    <div className='slide-count'>
                        <p>{data?.slideCount + '  slides'}</p>
                    </div>
                    <div className="title">
                        <h5>{data?.levelone}</h5>
                        <h6>{data?.leveltwo}</h6>
                        <p>{data?.levelthree}</p>
                    </div>
                    <div className='slide-images'>
                    {data?.slideThumbnails &&
                     <img loading="lazy" className="image3" src={data?.slideThumbnails } alt='Thumbnail' />
                    //  <LazyLoadImage className="image3" src={data?.slideThumbnails } alt='Thumbnail' effect='blur' /> 
                }    
                    {data?.slideThumbnails &&  
                     <img loading="lazy" className="image2" src={data?.slideThumbnails } alt='Thumbnail' />
                    // <LazyLoadImage className="image2" src={data?.slideThumbnails } alt='Thumbnail' effect='blur' />
                     }  
                    {data?.slideThumbnails && 
                    <img loading="lazy" className="image1" src={data?.slideThumbnails } alt='Thumbnail' /> 
                    // <LazyLoadImage className="image1" src={data?.slideThumbnails } alt='Thumbnail' effect='blur' />
                    }   
                        <div className='slideCount '>
                        </div>
                    </div>
                </Link>
                <div className='playlistCard-wrapper-container-bottom'>
                    <div className='profileImage'>
                        {/* <LazyLoadImage className="profilePic" src={data?.userAvatar ? data?.userAvatar : require("../../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' effect='blur'/> */}
                        <img loading="lazy" className="profilePic" src={data?.userAvatar ? data?.userAvatar : require("../../../../../assets/images/slide/medicos.webp")} alt='MedicosPdf logo' />
                    </div>
                    <div className='descriptions'>
                        <Link
                            to={`/profile/${data?.createdBy}`}
                            className='userName'>
                            {/* <Headings type="heading6" content={data?.createdBy ? data?.createdBy : "Medicos Int'l"} /> */}
                            <TextClamp
                                text={data?.createdBy ? data?.createdBy : "Medicos Int'l"}
                                lines={1}
                                element='h6'
                                ellipsis={'...'}
                                
                                
                                />
                        </Link>
                        <div className="profile-options-container" ref={ref}>
                            {
                                username === data?.createdBy && <div onClick={() => setOptionCheck(!optionCheck)}>

                                    <VerticleDots className="profile-options-container-icon"  />
                                </div>
                            }
                            <div className={`profile-options-container-options ${optionCheck ? 'profile-options-container-options-Active' : ''}`}>
                                <Link
                                    className='links'
                                    to={
                                        data?.levelthree ? `/playlist/${data?.levelone}/${data?.leveltwo}/${data?.levelthree}` :
                                            data?.leveltwo ? `/playlist/${data?.levelone}/${data?.leveltwo}` :
                                                `/playlist/${data?.levelone}`
                                    }
                                    className='slideCardProfile-options-editLink'>
                                    <EditIcon className="profile-expandIcon" />
                                    <span>Edit</span>
                                </Link>

                                <div className="slideCardProfile-delete" onClick={DeletePlaylist}>
                                    <Delete className="profile-expandIcon" />
                                    <span>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }


    return (
        <div className='playlistCard playlist-container-profile'>
            <PlaylistCreate />
            {
                loading ?
                    <div className='loading-container'>
                       <PlaylistCardPlaceholder/>
                    </div>
                    :
                    <>
                        {
                            playlistList?.length ?
                                <>
                                    {
                                        playlistList.map((data, index) => {
                                            return <Card key={data?.levelone + index} data={data} index={index} />
                                        })
                                    }
                                </>
                                :
                                <h3>Create your playlist</h3>
                        }
                    </>
            }
            {
                showLoadMore && <div className='button-container'>
                    <div onClick={loadMorePlaylist}>
                        <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                    </div>
                </div>
            }
        </div>
    )
}
