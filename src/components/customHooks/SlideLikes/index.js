import React, { useState, useEffect, useContext } from 'react';
// import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../signUp/authMethods/authentication';

function useSlideLikeCount(slideName) {
    const { username } = useContext(AuthContext);
    const [likeCount, setLikeCount] = useState();
    const [slideLiked, setSlideLiked] = useState();
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }

    useEffect(async() => {
        let isMounted = true;
       try {
           const{firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
        if (isMounted) {
           
            if(slideName){
                const docRef=doc(db,'Web-Slide-Reviews',slideName,"Likes",'Like-Count')

                onSnapshot(docRef,(querySnapshot) => {
                    if (querySnapshot.data()) {
                        setLikeCount(querySnapshot?.data()?.like_count);
                    }
                })
            }

        if (username && slideName) {
           
                const docRefrence = doc(db,'Web-User-Data',username,'LikedSlides',slideName)
                onSnapshot(docRefrence,(querySnapShot) => {
                    if (querySnapShot?.exists()) {
                        setSlideLiked(true)
                    } else {
                        setSlideLiked(false)
                    }
                })
        }

    } 
       } catch (error) {
           
       }
        return () => {
            isMounted = false
        }
    }, [slideName,username])
    return { likeCount, slideLiked };
}


export default useSlideLikeCount;
