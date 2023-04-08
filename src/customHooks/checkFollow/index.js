import React, { useState, useEffect } from 'react'
// import {  getFirestore, doc,  onSnapshot } from 'firebase/firestore';
const useFollowStatus = (user, userToFollow) => {
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    const [followStatus, setFollowStatus] = useState(false);
    useEffect(async() => {
        let isMounted = true;
     
           try{
               const{firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
               if(user){
                const docRef = doc(db, 'Web-User-Data', user, 'Following', userToFollow)
                onSnapshot(docRef, (querySnapshot) => {
                    console.log('CHECK FOLLOWING',user,userToFollow)
                if (querySnapshot.exists()) {
                    setFollowStatus(true)
                } else {
                    setFollowStatus(false)
                }
            })
               }
           }
           catch(err){
               console.log('Followed status check for the user',err)
           }
        return () => {
            isMounted = false
        }
    }, [user, userToFollow])
    return followStatus
}
export default useFollowStatus