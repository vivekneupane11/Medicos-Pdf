// import firebase from 'firebase/compat';
// import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../../components/global/button';
import { Headings } from '../../../components/global/headings';
import Loading from '../../../components/loading';
// import useLocalStorage from '../../../customHooks/useLocalStorage';
import ButtonWithArrow from '../../Home/components/buttonWithArrow';
import FollowersAndFollowing from '../components/followersAndFollowing';
import { FollowersPlaceholder } from '../components/FollowersAndFollowingPlaceholder';
import './_profilePreference.scss';

const ProfileFollowers = ({user,edit}) => {
    const { userId } = useParams();
    // const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    const [followers,setFollowers]=useState(null)
    const [following,setFollowing]=useState(null)
    const [showLoadMoreFollowers, setShowLoadMoreFollowers] = useState(false);
    const [showMoreFollowersLoading, setShowMoreFollowersLoading] = useState(false);
    const [showLoadMoreFollowing, setShowLoadMoreFollowing] = useState(false);
    const [showMoreFollowingLoading, setShowMoreFollowingLoading] = useState(false);
    // const [slideLimit, setSlideLimit] = useState(10);
    const slideLimit =10;
    const [lastFollower, setLastFollower] = useState();
    const [lastFollowing, setLastFollowing] = useState();
    const [loading, setLoading] = useState(true);
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };

    //Followers data
    useEffect(async() => {
        let isMounted = true;
     try{
        const {firestore:{db,orderBy,limit,getDocs,query,collection,}}=await getFirebaseAll()
        if (isMounted && userId ) {
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('Followers')
            //     .orderBy('username')
            //     .limit(slideLimit)
            //     .get()
                const colRef=query(collection(db,'Web-User-Data',userId,'Followers'),
                orderBy('username'),
                limit(slideLimit))
                getDocs(colRef)
                .then((res) => {
                    if (res) {
                       
                        let allFollowers=[]
                        res.forEach(element => {
                            allFollowers.push(element.data())
                            
                        })    

                        if (allFollowers?.length > 0) {
                            setShowLoadMoreFollowers(true)
                        }
                        setLoading(false);
                        setShowMoreFollowersLoading(false);
                        setLastFollower(allFollowers[allFollowers?.length - 1])
                        setFollowers(allFollowers)
                    }
                    if (res.empty) {
                        setLoading(false);
                        setShowMoreFollowersLoading(false);
                    }
                })
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(userId)
                // .collection('Following')
                // .orderBy('username')
                // .limit(slideLimit)
                // .get()
                const colRef2 = query(collection(db,'Web-User-Data',userId,'Following'),
                orderBy('username'),
                limit(slideLimit))

                getDocs(colRef2)
                .then((res) => {
                    if (res) {
                       
                        let allFollowing=[]
                        res.forEach(element => {
                            allFollowing.push(element.data())
                            
                        })    
                        if (allFollowing?.length > 0) {
                            setShowLoadMoreFollowing(true)
                        }
                        setLoading(false);
                        setShowMoreFollowingLoading(false);
                        setLastFollowing(allFollowing[allFollowing?.length - 1])
                        setFollowing(allFollowing)
                    }
                })
    
        }
     }
     catch(err){
         console.log('errr',err)
     }
        return () => {
            isMounted = false
        }
    }, [slideLimit,userId])


    const loadMoreFollowers = async() => {
        try {
            const {firestore:{db,query,collection,orderBy,limit,startAfter,getDocs}}=await getFirebaseAll()
            setShowMoreFollowersLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(userId)
            //     .collection('Followers')
            //     .orderBy('username')
            //     .startAfter(lastFollower?.username)
            //     .limit(slideLimit)
                // .get()
                const colRef = query(collection(db,'Web-User-Data',userId,'Followers'),
                orderBy('username'),
                startAfter(lastFollower?.username),
                limit(slideLimit))
                getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        // console.log("This is data", ele.data())
                        allData.push(ele.data());

                    })
                    setLastFollower(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreFollowers(false)
                    }
                    setShowMoreFollowersLoading(false);
                    console.log('more followers', allData)
                    setFollowers((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }
      
    const loadMoreFollowing = async() => {
        try {
            const {firestore:{db,query,collection,orderBy,limit,startAfter,getDocs}}=await getFirebaseAll()

            setShowMoreFollowingLoading(true);
            // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(userId)
                // .collection('Following')
                // .orderBy('username')
                // .startAfter(lastFollowing?.username)
                // .limit(slideLimit)
                // .get()
                const colRef = query(collection(db,'Web-User-Data',userId,'Following'),
                orderBy('username'),
                startAfter(lastFollowing?.username),
                limit(slideLimit))
                getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        // console.log("This is data", ele.data())
                        allData.push(ele.data());

                    })
                    setLastFollowing(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreFollowing(false)
                    }
                    setShowMoreFollowingLoading(false);
                    console.log('more following', allData)
                    setFollowing((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }
      
    return (
        <>
        {!following?.length && !following?.length && !loading && !showMoreFollowersLoading && !showMoreFollowingLoading&& 
        <>
        <p  style={{padding:'40px',textAlign:'center'}}> 
         Explore and follow people you like.
        
        </p>
        <div>
            <ButtonWithArrow name="Explore Channels" link='/profiledetails'/>
        </div>
        </>
        }
        {followers?.length ?                     <Headings type="heading5" content="Followers" />
 :'' }   

           {
               followers?
               <div className='profile-followers-container'>
               {
                   followers?.map((data,index)=>{
                       return<div key={index} className='profile-followers-container-wrapper'>
                              <FollowersAndFollowing data={data}/>

                       </div>
                   })
               }
               

           </div>
           :
           <div className='profile-followers-container-wrapper'>
           <FollowersPlaceholder/>
               
           </div>
           }
            {
            showLoadMoreFollowers && followers?.length>9 &&
            <div className='Profile-load-more-container' onClick={loadMoreFollowers}>
                 {
                    showMoreFollowersLoading &&
                    <Loading />
                }
                <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
               
            </div>
           }



          {following?.length ?                      <Headings type="heading5" content="Following" />
 : ''}
           {
               following?
               <div className='profile-followers-container'>
               {
                   following?.map((data,index)=>{
                       return<div key={index} className='profile-followers-container-wrapper'>
                              <FollowersAndFollowing data={data}/>

                       </div>
                   })
               }
              

           </div>
           :
           <div className='profile-followers-container-wrapper'>
               <FollowersPlaceholder/>
               
           </div>
           }
             {
            showLoadMoreFollowing && following?.length>9 &&
            <div className='Profile-load-more-container' onClick={loadMoreFollowing}>
                 {
                    showMoreFollowingLoading &&
                    <Loading />
                }
                <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
               
            </div>
           }
        </>
    )
}

export default React.memo(ProfileFollowers)
