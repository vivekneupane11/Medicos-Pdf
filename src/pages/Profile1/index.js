import firebase from 'firebase';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

//local imports
import { ProfileNav } from '../../components/constants/mock';
import { AuthContext } from '../../components/signUp/authMethods/authentication';
import { AdditionalDetails } from './AdditionalDetails';
import { ProfileTab } from './components/ProfileTab';
import { TopCard } from './topCard';
import './_profile1.scss';

export const Profile1 = () => {
    const {user} = useContext(AuthContext);
    const { userId } = useParams();
    const [userData, setUserData] = useState()
    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            if(userId){
                firebase.firestore().collection('Web-User-Data')
                .doc(userId)
                .collection('Additional-Details')
                .doc(userId)
                .get()
                .then((res)=>{
                    if(res?.data()){
                       
                        setUserData(res?.data());
                    }
                })
                .catch((err)=>console.log("Error while fetching user",err))
            }
        }
        return () => {
            isMounted = false;
        }
    }, [userId])
    return (
        <div className="profile1-wrapper">
            <div className="profile1-wrapper-container">
                <div className="profile1-wrapper-container-left">
                    <TopCard user={userData} />
                    <ProfileTab user={user} profileNav={ProfileNav} />
                    {/* <Post /> */}
                </div>
                <div className="profile1-wrapper-container-right">
                    {/* <div className="item1">
                        <MyManager />
                    </div> */}
                    <div className="item2">
                        <AdditionalDetails edit={user?.uid == userId} user={userData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
