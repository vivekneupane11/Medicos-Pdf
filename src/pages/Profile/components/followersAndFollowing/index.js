// import firebase from 'firebase/compat'
import React, { useEffect, useState,useRef, useContext } from 'react'
// import { HiDotsHorizontal } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { DisplayTitle } from '../../../../components/global/Titles'
import './_followersAndFollowing.scss'
// import { deleteDoc, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';

const FollowersAndFollowing = ({data}) => {
    const [toggleFollow, setToggleFollow] = useState(false);
    const { user,username } = useContext(AuthContext);
    const [allData,setAllData]=useState()
    // const [showOption,setShowOption]=useState(false)
    const [showOptionIcon,setShowOptionIcon]=useState(true)
    // const [index,setIndex]=useState(null)
    const [disabled,setDisabled]=useState(false)
    
    const ref = useRef()
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };

    useEffect(async() => {
        let isMounted=true

        if(isMounted && data){
            try {
                const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()
                //  firebase.firestore()
                //  .collection('Web-User-Data')
                //  .doc(data?.username)
                //  .collection('Additional-Details')
                //  .doc(data?.username)
                //  .get()
                const docRef=doc(db,'Web-User-Data',data?.username,'Additional-Details',data?.username)
                 onSnapshot(docRef,(res)=>{
                     if(res.data()){
                         setAllData(res.data())
                     }
                 })
            } catch (error) {
                console.log('error fetching data',error)
                
            }
        }
        return () => {
            isMounted=false
        }
    }, [toggleFollow,data,username])


//cheking whether followed or not 
   useEffect(async() => {
    let isMounted = true;
    try{
        const {firestore:{db,doc,onSnapshot}}=await getFirebaseAll()

        if (isMounted && data?.username && username) {
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(username)
            //     .collection('Following')
            //     .doc(data?.username)
                const docRef= doc(db,'Web-User-Data',username,'Following',data?.username)
                onSnapshot(docRef,(querySnapshot) => {
                    if (querySnapshot.data() ) {
    
                        if(querySnapshot.data().username===data?.username){
                            setToggleFollow(true)
                        }
                    }
                })
    
        }
    }
    catch(err){
        console.log('err',err)
    }
    return () => {
        isMounted = false
    }
}, [toggleFollow,username,data?.username])


    //follow
 const follow=async()=>{
       setDisabled(true)
        try {
        const {firestore:{db,doc,setDoc}}=await getFirebaseAll()

            setToggleFollow(true);

            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(username)
            //     .collection('Following')
            //     .doc(data?.username)
            //     .set({
            //         username:data?.username
            //     })
            setDoc(doc(db,'Web-User-Data',username,'Following',data?.username),
            {
                username:data?.username
            })
                  
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(data?.username)
                //     .collection('Followers')
                //     .doc(username)
                //     .set({
                //         username:username
                //     })
                    setDoc(doc(db,'Web-User-Data',data?.username,'Followers',username),
                    {
                        username:username
                    })

                  
        } catch (error) {
            console.log('Error following', error)
        }
    }

     //unFollow
    const unFollow=async()=> {
        setDisabled(true)

        try {
        const {firestore:{db,doc,deleteDoc}}=await getFirebaseAll()

            setToggleFollow(false);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(username)
            //     .collection('Following')
            //     .doc(data?.username)
            //     .delete()
               deleteDoc(doc(db,'Web-User-Data',username,'Following',data?.username))

            // firebase.firestore()
            // .collection('Web-User-Data')
            // .doc(data?.username)
            // .collection('Followers')
            // .doc(username)
            // .delete()

            deleteDoc(doc(db,'Web-User-Data',data?.username,'Followers',username))


        } catch (error) {
            console.log('Error unfollowing', error)
        }
    }

    useEffect(() => {

        let isMounted=true;
        if(data?.username===username && isMounted){
            setShowOptionIcon(false)
        }
        return () => {
            isMounted=false;
        }
    }, [data?.username,username])

    // useEffect(() => {
    //     const checkIfClickedOutside = e => {
    //         if (showOption && ref.current && !ref.current.contains(e.target)) {
    //             setShowOption(false)
    //         }
    //     }

    //     document.addEventListener("mousedown", checkIfClickedOutside)

    //     return () => {
    //         document.removeEventListener("mousedown", checkIfClickedOutside)
    //     }
    // }, [showOption])

const handelfollow=()=>follow()
const handelunfollow=()=>unFollow()

    return (
        <div className='followersAndFollowing-container' >

             <div className='followersAndFollowing-container-img'>
                 {
                     (allData?.photoURL!==null || allData?.photoURL !== '') ?
                     <Link
                     className='links'
                     to={{
                         pathname: `${allData?.username? `/profile/${allData?.username}` : '/profile/medicos.int7'}`,
                     }}>  <LazyLoadImage
    effect="blur"
    src={allData?.photoURL} alt={allData?.displayName}

     /> 
     </Link>
                 
                     :
                     <Link
                     className='avatar-followerFollowing'
                     to={{
                         pathname: `${allData?.username? `/profile/${allData?.username}` : '/profile/medicos.int7'}`,
                     }}>
                   
                       <DisplayTitle title={allData?.email?.substring(0, 1)} color='white' type="display1" />
                     </Link>
                 }
                
             </div>
             <div className='followersAndFollowing-container-desc'>
                <Link
                    className='links'
                    to={{
                        pathname: `${allData?.username? `/profile/${allData?.username}` : '/profile/medicos.int7'}`,
                    }}>
                   <h6>{allData?.displayName ?
                      allData?.displayName
                      :
                      "Medicos"
                
                }</h6>
                 </Link>
                 <p>{allData?.email}</p>
           
               
             </div>
             {
                       showOptionIcon && <>{
                        !toggleFollow ?
                        <button onClick={handelfollow}  className='followersAndFollowing-container-option-container-btn'>Follow</button>
                        :
                        <button onClick={handelunfollow}  className='followersAndFollowing-container-option-container-btn'>Following</button>
                       }</>   
                    }

             {/* <div ref={ref} className='followersAndFollowing-container-option'>
                 {
                     showOptionIcon &&  <HiDotsHorizontal className='followersAndFollowing-container-option-icon' onClick={()=>setShowOption(!showOption)} />
                 }
               
                <div className={`followersAndFollowing-container-option-container ${showOption? 'followersAndFollowing-container-option-containerActive':''}`}>
                    {
                        !toggleFollow ?
                        <button onClick={()=>follow()} disabled={disabled} className='followersAndFollowing-container-option-container-btn'>Follow</button>
                        :
                        <button onClick={()=>unFollow()} disabled={disabled} className='followersAndFollowing-container-option-container-btn'>Unfollow</button>
                    }
                </div>
             </div> */}
        </div>
    )
}

export default FollowersAndFollowing
