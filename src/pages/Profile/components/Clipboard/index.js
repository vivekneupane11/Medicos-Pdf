import React, { useContext, useEffect, useState } from "react";
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

import './index.scss';
import { Avatar } from "../../../../components/global/images";
import { Link, useParams } from "react-router-dom";
// import Loading from "../../../../components/loading";
import { Button } from "../../../../components/global/button";
import { ClipboardPlaceholder } from "../ClipboardPlaceholder";
// import { collection, deleteDoc, doc,  getDocs, getFirestore, limit, onSnapshot, orderBy, query, startAfter, where } from "firebase/firestore";
import { AuthContext } from "../../../../components/signUp/authMethods/authentication";

import Delete from "../../../../components/global/icons/delete";
import ImagesModal from "../../../../components/global/imagesModal";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Clipboard = () => {
    const { userId } = useParams();
    const { user ,username:usernameauth} = useContext(AuthContext);

    const [clippedSlideImages, setClippedSlideImages] = useState();
    const [loading, setLoading] = useState(false);
    const [showLoadMore, setShowLoadMore] = useState(false);
    let loadLimit = 6;
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    }


   async function deleteClippedSlideImage(image, createdAt) {
        try {
            const {firestore:{db,query,collection,where,onSnapshot,deleteDoc,doc}}=await getFirebaseAll();
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(usernameauth)
            //     .collection('Clipped-Slide-Images')
            //     .where('image', '==', image)
            //     .where('createdAt', '==', createdAt)
            //     .get()
                const colRef =query(collection(db,'Web-User-Data',usernameauth,'Clipped-Slide-Images'),
                where('image', '==', image),
                where('createdAt', '==', createdAt))
                // getDocs(colRef)
                onSnapshot(colRef,(querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // firebase.firestore()
                        //     .collection('Web-User-Data')
                        //     .doc(usernameauth)
                        //     .collection('Clipped-Slide-Images')
                        //     .doc(querySnapshot?.docs[0]?.id)
                        //     .delete()
                            deleteDoc(doc(db,'Web-User-Data',usernameauth,'Clipped-Slide-Images',querySnapshot?.docs[0]?.id))
                            .then(() => {
                                toast.success('Clipped Slide Images deleted successfully.', { theme: 'dark', hideProgressBar: true })
                            })
                    }
                })

        } catch (error) {
            console.log('Error deleting clipped slide image', error)
        }
    }


    const ImageContainer = ({ data,index }) => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        function openModal() {
            setModalIsOpen(true);
        }
        function closeModal() {
            setModalIsOpen(false);
        }
        const handelmodalopen=() => setModalIsOpen(true)
        // console.log('This is image', data?.userAvatar)
        return <div className="clipped-image-container" key={index}>
            {/* <img loading="lazy" onClick={() => setModalIsOpen(true)} className="image" src={data?.image} alt="image"/> */}
            <LazyLoadImage onClick={handelmodalopen} className="image" src={data?.image} alt="image"/>
            <ImagesModal
                data={data}
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                openModal={openModal}
            />
            <div className="bottom-container">
                <Link
                    to={`/profile/${data?.author ? data?.author : 'medicos.int7'}`}
                    className="userInfo">
                    <Avatar
                        size={"35px"}
                        Image={data?.userAvatar}
                        text={data?.author}
                    />
                    <p>{data?.author}</p>
                </Link>
                {
                    usernameauth === data?.createdBy && <div onClick={() => deleteClippedSlideImage(data?.image, data?.createdAt)}>

                        <Delete  className="icon" />
                    </div>
                }
            </div>
        </div>
    }
    useEffect(async() => {
        let isMounted = true;
        try {
            const {firestore:{db,query,collection,orderBy,limit,onSnapshot}}=await getFirebaseAll()
            setLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('Clipped-Slide-Images')
            //     .orderBy('createdAt', 'desc')
            //     .limit(loadLimit)
                const colRef =query(collection(db,'Web-User-Data',userId,'Clipped-Slide-Images'),
                orderBy('createdAt', 'desc'),
                limit(loadLimit))
                onSnapshot(colRef,(querySnapshot) => {
                    if (!querySnapshot.empty) {
                        let clippedSlideImagesData = [];
                        querySnapshot.forEach((doc) => {
                            clippedSlideImagesData.push(doc.data())
                        })
                        setClippedSlideImages(clippedSlideImagesData);
                        if (querySnapshot?.docs?.length === loadLimit) {
                            setShowLoadMore(true)
                        } else {
                            setShowLoadMore(false)
                        }
                        setLoading(false);
                    } else {
                        setLoading(false)
                    }
                })
        } catch (error) {
            console.log('Error fetching clipped slide images', error)
        }
        return () => {
            isMounted = false
        }
    }, [loadLimit,userId])

    const loadMore = async() => {
        // firebase.firestore()
            // .collection('Web-User-Data')
            // .doc(userId)
            // .collection('Clipped-Slide-Images')
            // .orderBy('createdAt',"desc")
            // .startAfter(clippedSlideImages[clippedSlideImages?.length - 1]?.createdAt)
            // .limit(loadLimit)
            // .get()
            const {firestore:{db,query,collection,orderBy,startAfter,limit,getDocs}}=await getFirebaseAll()
            const colRef = query(collection(db,'Web-User-Data',userId,'Clipped-Slide-Images'),
            orderBy('createdAt',"desc"),
            startAfter(clippedSlideImages[clippedSlideImages?.length - 1]?.createdAt),
            limit(loadLimit))
            getDocs(colRef)
            .then((querySnapshot) => {
                console.log('THIS IS MORE LOADED DATA', querySnapshot.docs)
                if (!querySnapshot.empty) {
                    let clippedSlideImagesMoreData = []
                    querySnapshot.forEach((doc) => {
                        clippedSlideImagesMoreData.push(doc.data())
                    })
                    setClippedSlideImages((init) => [...init, ...clippedSlideImagesMoreData]);
                    setShowLoadMore(true);
                } else {
                    setShowLoadMore(false);
                }
            })
    }


    return <div className="clipboard-page-container">
        {
            loading ?
               <div className="clipped-image-list">
               <ClipboardPlaceholder/>

               </div>
                :
                <>
                    {
                        clippedSlideImages?.length ?
                            <div className="clipped-image-list">
                                {
                                    clippedSlideImages?.map((clippedImage,index) => {
                                        return <ImageContainer
                                            data={clippedImage}
                                            key={index}
                                        />
                                    })
                                }
                            </div>
                            :
                            <div className="text-container">
                                <h3>No clipped slide images.</h3>
                            </div>
                    }
                </>
        }
        {
            showLoadMore && <div className='button-container'>
                <div onClick={loadMore}>
                    <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                </div>
            </div>
        }
    </div>
}

export default Clipboard;