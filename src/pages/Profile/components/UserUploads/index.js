// import firebase from 'firebase/compat';
// import { collection, getDocs, getFirestore, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../../../components/global/button';
import Loading from '../../../../components/loading';
// import useLocalStorage from '../../../../customHooks/useLocalStorage';
import PinnedSLides from '../pinnedSlides';
import SlideTrendingProfile from '../slideTrendingProfile';
import PlaylistCreate from './Components/PlaylistButton';
import './index.scss';
const UserUploads = ({ user }) => {
    // const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    const [userUploaded, setUserUploaded] = useState([]);
    // const [slideLimit, setSlideLimit] = useState(10);
    const slideLimit=10;
    const [lastSlides, setLastSlides] = useState();
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };

    const loadMoreUploadSlides = async() => {
        try {
            const {firestore:{db,query,orderBy,startAfter,limit,getDocs,collection}}=await getFirebaseAll()
            setShowMoreLoading(true);
            // firebase.firestore()
            //     .collection('UserUploadedSlides')
            //     .doc(userId)
            //     .collection('slides')
            //     .orderBy('SlideName')
            //     .startAfter(lastSlides?.SlideName)
            //     .limit(slideLimit)
            //     .get()
            const colRef =query(collection(db,'UserUploadedSlides',userId,'slides'),
            orderBy('SlideName'),
            startAfter(lastSlides?.SlideName),
            limit(slideLimit)
            )
            getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        // console.log("This is data", ele.data())
                        allData.push(ele?.data());

                    })
                    setLastSlides(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMore(false)
                    }
                    setShowMoreLoading(false);
                    console.log('more slides', allData)
                    setUserUploaded((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }

    useEffect(async() => {
        let isMounted = true;
        try {
            const {firestore:{db,query,collection,orderBy,limit,onSnapshot}}=await getFirebaseAll()
            setShowMoreLoading(true);
            // firebase.firestore().collection('UserUploadedSlides')
            //     .doc(userId)
            //     .collection('slides')
            //     .orderBy('SlideName')
            //     .limit(slideLimit)
            const colRef =query(collection(db,'UserUploadedSlides',userId,'slides'),
            orderBy('SlideName'),
            limit(slideLimit))
                onSnapshot(colRef,(querySnapshot) => {

                    if (querySnapshot && isMounted) {
                        let userUploadedData = []
                        querySnapshot.forEach((doc) => {
                            userUploadedData.push(doc.data())
                        })
                        if (userUploadedData?.length > 0) {
                            setShowLoadMore(true)
                        }
                        setLoading(false);
                        setShowMoreLoading(false);
                        setLastSlides(userUploadedData[userUploadedData?.length - 1])
                        setUserUploaded(userUploadedData)
                    }
                    if (querySnapshot.empty) {
                        setLoading(false);
                        setShowMoreLoading(false);
                    }
                })
        } catch (error) {
            console.log("Error fetching user uploaded slides", error)
        }
        return () => {
            isMounted = false
        }
    }, [userId, slideLimit])

    return <div className='uploaded-slide-container'>

        <PlaylistCreate />
        <PinnedSLides />

        <div className='uploaded-slide-container-uploadContainer'>
            <h3>Uploaded Slides</h3>


            <SlideTrendingProfile showTitle={false} loading={loading} details={userUploaded} from="userUploads" />
            {
                showLoadMore && userUploaded?.length > 9 &&
                <div className='load-more-container' onClick={loadMoreUploadSlides}>
                    {
                        showMoreLoading &&
                        <Loading />
                    }
                    <Button type="primary-outline-rounded" label="Load More" labelColor="black" />

                </div>
            }
        </div>



    </div>
}

export default React.memo(UserUploads);