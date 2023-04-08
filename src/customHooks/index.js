import React, { useState, useEffect } from 'react';
import { fetchAllBooksAndSlidesDocId } from '../functions/firebaseMethod';
// import { collection, getDocs, getFirestore } from 'firebase/firestore';

function useDocId(searchText) {
    const [slideDocId, setSlideDocId] = useState([]);
    const [bookDocId, setBookDocId] = useState([]);
    const [searchTagDocId, setSearchTagDocId] = useState([]);
    const [profileDocId, setProfileDocId] = useState([])
    // const fire = getFirestore();
  
    useEffect(() => {
        let isMounted = true;
        if (isMounted && searchText?.length ) {
            fetchAllBooksAndSlidesDocId('AllSlidesDataLockDownVersions').then((res) => {
                setSlideDocId(res);
            })

            fetchAllBooksAndSlidesDocId('K-Books').then((res) => {
                setBookDocId(res);
            })
            //@Regarding profile search
            // Username will come from tags if user has uploaded.. if you want to search profile as well then uncomment this
            // getDocs(collection(fire, 'Web-Uid-To-Username'))
               
            //     .then(querySnapshot => {
            //         let allData = []
            //         querySnapshot.forEach((doc) => {
            //             allData.push(doc.data().username)
            //         })
            //         setProfileDocId(allData)
            //     })

            fetchAllBooksAndSlidesDocId('Web-SearchByTag').then((res) => {
                setSearchTagDocId(res);
            })

        }
    }, [searchText]);
    return { slideDocId, bookDocId, profileDocId, searchTagDocId };
}


export default useDocId;
