// import firebase from 'firebase/compat'
// import {getFirestore,getDocs, query, collection, orderBy, limit, startAfter} from 'firebase/firestore'
import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/global/button'
import Loading from '../../components/loading'
import FollowersAndFollowing from '../Profile/components/followersAndFollowing'
import './_profileDetails.scss'

const ProfileDetails = () => {
    const [usernameData,setUsernameData]=useState(null)
    const [showMoreData, setShowMoreData] = useState(false);
    const [showLoadMoreData, setShowLoadMoreData] = useState(false);
    // const [slideLimit, setSlideLimit] = useState(10);
    const slideLimit =10;
    const [loading, setLoading] = useState(true);
    const [lastData, setLastData] = useState();
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    }
    useEffect(async() => {
        let isMounted=true;
        if(isMounted){
            try {
                const {firestore:{db,query,collection,orderBy,limit,getDocs}}=await getFirebaseAll()
                //  firebase.firestore()
                //  .collection('Web-Uid-To-Username')
                //  .orderBy('username')
                //  .limit(slideLimit)
                //  .get()
                 const colRef =query(collection(db,'Web-Uid-To-Username'),
                 orderBy('username'),
                 limit(slideLimit))
                 getDocs(colRef)
                 .then((res)=>{
                     if(res){ 
                         let allData=[]
                         res.forEach(element => {
                             allData.push(element.data())
                         })
                         if (allData?.length > 0) {
                            setShowLoadMoreData(true)
                        }
                        setLoading(false);
                        setShowMoreData(false);
                        setLastData(allData[allData?.length - 1])
                        setUsernameData(allData)
                     }
                 })
            } catch (error) {
                console.log('error fetching data',error)
                
            }
        }
        return () => {
            isMounted=false
        }
    }, [])

    const loadMoreFollowing = async() => {
        try {
            const {firestore:{db,query,orderBy,startAfter,limit,getDocs,collection}}=await getFirebaseAll()
            setShowMoreData(true);
            // firebase.firestore()
            //     .collection('Web-Uid-To-Username')
            //     .orderBy('username')
            //     .startAfter(lastData?.username)
            //     .limit(slideLimit)
            //     .get()
                const colRef =query(collection(db,'Web-Uid-To-Username'),
                 orderBy('username'),
                 startAfter(lastData?.username),
                 limit(slideLimit))
                 getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        // console.log("This is data", ele.data())
                        allData.push(ele.data());

                    })
                    setLastData(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreData(false)
                    }
                    setShowMoreData(false);
                    setUsernameData((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }

    return (
        <div className="profileDetails-container">
           <div className="profileDetails-container-top">

               <h2>View Profiles And Follow</h2>

           </div>

           <h3>Profiles</h3>

          {
              usernameData?
              <div className="profileDetails-container-profileContainer">
               
              {
                  usernameData?.map((data,index)=>{
                      console.log('data',data)

                      return<div key={index} className="profileDetails-container-profileContainer-profile">
                             <FollowersAndFollowing data={data}/>
                       </div>
                  })
              }
          </div>
          :
          <Loading/> 
          }

          {
            showLoadMoreData && usernameData?.length>9 &&
            <div className='profileDetails-loadMore' onClick={loadMoreFollowing}>
                 {
                    showMoreData &&
                    <Loading />
                }
                <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
               
            </div>
           }
        </div>
    )
}

// ProfileDetails.whyDidYouRender=true;
export default ProfileDetails
