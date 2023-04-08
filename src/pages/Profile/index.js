// import firebase from 'firebase/compat';
// import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState,Suspense } from 'react';
import { useHistory, useParams } from 'react-router';
//local imports
import { ProfileNav } from '../../components/constants/mock';
import SEO from '../../components/global/SEO';
import LazyLoadingComponentLoader from '../../components/lazyLoadingLoaderComponent';
import Loading from '../../components/loading';
import { AuthContext } from '../../components/signUp/authMethods/authentication';

import { ProfileTab } from './components/ProfileTab';

import './_profile1.scss';

const Summary = React.lazy(() => LazyLoadingComponentLoader(() => import("./components/Summary")));
const TopCard = React.lazy(() => LazyLoadingComponentLoader(() => import("./topCard")));

const Profile = () => {

    const { user ,username:usernameauth} = useContext(AuthContext);
    const { userId } = useParams();
    const [userData, setUserData] = useState();

    const history = useHistory()
    // const db = getFirestore();
    const getFirebaseAll =()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return{firestore}
        })
    }
    useEffect(async() => {
        let isMounted = true;
       try{
           const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
        if (isMounted) {
            if (userId) {
                // firebase.firestore().collection("Web-User-Data")
                // .doc(userId)
                // .collection('Additional-Details')
                // .doc(userId)
                const docRef = doc(db,"Web-User-Data",userId,'Additional-Details',userId)
                onSnapshot(docRef,(res) => {
                    if (res?.data()) {
                        setUserData(res?.data());
                    }
                })
            }

        }
       }
       catch(err){

       }
        return () => {
            isMounted = false;
        }
    }, [userId])


    useEffect(() => {
        let isMounted = true;

        if (isMounted && user === null) {
            history.goBack()
        }
        return () => {
            isMounted = false;
        }
    }, [user,history])


    return (
        <div className="profile1-wrapper">
            <SEO title='MedicosPDF profile' description='Profile page of MedicosPdf'/>
            <div className="profile1-wrapper-container">
                <div className="profile1-wrapper-container-left">
                <Suspense fallback={<div className='suspenseLoading'><Loading /></div>}>
                    <TopCard user={userData} edit={usernameauth === userId} />
                    </Suspense>
                    <ProfileTab user={userData} profileNav={ProfileNav} />
                </div>
              
            </div>
        </div>
    )
}


export default React.memo(Profile);