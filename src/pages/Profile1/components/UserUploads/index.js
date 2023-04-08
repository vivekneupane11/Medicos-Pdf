import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import SlideTrending from '../../../Slide/component/slideTrending';
import './index.scss'
import SlideTrendingProfile from '../slideTrendingProfile';
const UserUploads = ({ user }) => {
    const [userUploaded, setUserUploaded] = useState([])
    useEffect(() => {
        let isMounted = true;        
        try {
            firebase.firestore().collection('UserUploadedSlides')
                // .doc('a0Z1LcXM6lMFnN5x3YbI19UFtEo2')
                .doc('FAriCiwmEtUQ0jBGyZGQDC2byPB2')
                //replace doc id
                // .doc(user?.uid)
                .collection('slides')
                .onSnapshot((querySnapshot) => {
                    if (querySnapshot && isMounted) {
                        let userUploadedData = []
                        querySnapshot.forEach((doc) => {
                            userUploadedData.push(doc.data())
                        })
                        console.log('User Uploaded', userUploadedData)
                        setUserUploaded(userUploadedData)
                    }
                })
        } catch (error) {
            console.log("Error fetching user uploaded slides", error)
        }
        return () => {
            isMounted = false
        }
    }, [])
    return <div className='uploaded-slide-container'>
        <SlideTrendingProfile showTitle={false} details={userUploaded} />
    </div>
}

export default UserUploads;