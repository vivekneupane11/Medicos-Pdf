// import firebase from 'firebase/compat';
// import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
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
    // const { user } = useContext(AuthContext);
    const { userId } = useParams();
    const [userData, setUserData] = useState();
    const { user,username } = useContext(AuthContext);
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    }

    useEffect(async() => {
        let isMounted = true;
        try{
            const {firestore:{db,query,collection,where,getDocs,onSnapshot}}=await getFirebaseAll()
            if (isMounted) {
                // console.log('res',userId)
                if (userId ) {
                    // firebase.firestore().collection('Web-Uid-To-Username')
                    //         .where('username','==',userId)
                    //         .get()
                            const colRef= query(collection(db,'Web-Uid-To-Username'),
                            where('username','==',userId))
                            getDocs(colRef)
                            .then((res)=>{
                                // console.log('res',res.docs[0].id)
                                if(res){
                                    // firebase.firestore().collection("Web-User-Data")
                                    //     .doc(res.docs[0].id )
                                    //     .collection('Additional-Details')
                                    //     .doc(res.docs[0].id )
                                        const docRef = doc(db,"Web-User-Data",res.docs[0].id,'Additional-Details',res.docs[0].id)
                                        onSnapshot(docRef,(res) => {
                                            if (res?.data()) {
                                                setUserData(res?.data());
                                            }
                                        })
                                }
                            })
    
                  
                }
    
            }
        }
        catch(err){
            console.log(err,'err')
        }
        return () => {
            isMounted = false;
        }
    }, [userId])

   
    return (
        <div className="profile1-wrapper">
            <div className="profile1-wrapper-container">
                <div className="profile1-wrapper-container-left">
                    <TopCard user={userData} edit={username == userId}/>
                    <ProfileTab user={userData} profileNav={ProfileNav}  />
                </div>
                <div className="profile1-wrapper-container-right">
                    <div className="item2">
                        <AdditionalDetails edit={username == userId} user={userData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
