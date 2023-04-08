
// import firebase from 'firebase/compat';
// import { collection,  getDocs, getFirestore, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../../components/global/button';
import ShareModal from '../../../../components/global/shareModal';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import SlideCard from '../../../SlideDetail/components/slideCard';
import './_pinnedSlides.scss';

const PinnedSLides = ({datas}) => {
   
    const { user,username } = useContext(AuthContext);

    const [pinnedSlides,setPinnedSlides]=useState(null)
    const [showShare, setShowShare] = useState(false)
    const [callBackData, setCallBackData] = useState(null)
    const { userId } = useParams();

    const [pinnedSlideLimit] = useState(10);
    const [lastPinnedSlides, setLastPinnedSlides] = useState();
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
            return {firestore}
        })
    };
    const loadMorePinnedSlides = async() => {
        try {
            const {firestore:{db,collection,orderBy,limit,query,getDocs,startAfter}}=await getFirebaseAll()
            setShowMoreLoading(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(username)
            //     .collection('Pinned-Slide')
            //     .orderBy('SlideName')
            //     .startAfter(lastPinnedSlides?.SlideName)
            //     .limit(pinnedSlideLimit)
            //     .get()
                const colRef= query(collection(db,'Web-User-Data',username,'Pinned-Slide'),
                orderBy('SlideName'),
                startAfter(lastPinnedSlides?.SlideName),
                limit(pinnedSlideLimit))
                getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    console.log('pinnedslide',querySnapshot)
                    querySnapshot.forEach(ele => {
                        allData.push(ele?.data());


                    })
                    setLastPinnedSlides(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMore(false)
                    }
                    setShowMoreLoading(false);
                    setPinnedSlides((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user uploaded slides', error)
        }
    }

    useEffect(async() => {
        let isMounted=true

        try{
            const {firestore:{db,collection,orderBy,limit,query,onSnapshot}}=await getFirebaseAll()

        if(isMounted && username===userId){
            console.log('pinnedslide',username)
            
            // firebase.firestore().collection('Web-User-Data')
            // .doc(username)
            // .collection('Pinned-Slide')
            // .orderBy('SlideName')
            // .limit(pinnedSlideLimit)
            const colRef =query(collection(db,'Web-User-Data',username,'Pinned-Slide'),
            orderBy('SlideName'),
            limit(pinnedSlideLimit))
            onSnapshot(colRef,(querySnapShot) => {
                if (querySnapShot?.docs) {
                    let allPinnedSlides=[]
                    querySnapShot.forEach(element => {
                        allPinnedSlides.push(element?.data())    
                        console.log('pinnedslide',element?.data())
                    })
                    if (allPinnedSlides?.length > 0) {
                        setShowLoadMore(true)
                    }
                    setLoading(false);
                    setShowMoreLoading(false);
                    setLastPinnedSlides(allPinnedSlides[allPinnedSlides?.length - 1])
                    setPinnedSlides(allPinnedSlides)
                    
                }
                
            })
        }
        }
        catch(err){
            console.log('err',err)
        }
        return () => {
            isMounted=false
        }
    }, [username])
    
    const showShareModal=(show, data) => {

      if (show === true && data) {
        setShowShare(true)
        setCallBackData(data)

      }
    }
  const cancelShare = (show) => {

      if (show === false) {
        setShowShare(false)
      }
    }

    return (
       <>
         {
             pinnedSlides?.length>0 &&
            <div className='pinnedSlides-container'>
            <ShareModal
               url={encodeURI(`https://medicospdf.com/slidedetails/${callBackData?.SlideName}/${callBackData?.slideCategory}/${callBackData?.slideSubCategory.replace(/\s|\//g, "")}`)}
               appId={process.env.REACT_APP_ID}
               title={callBackData?.SlideName}
               image={callBackData?.slideImages[0]}
               show={showShare}
               cancel={cancelShare}
           />
            <h5>Pinned Slides</h5>

              <div className='pinnedSlides-container-wrapper'>
              {
                  pinnedSlides?.map((data,index)=>{
                      console.log('pinneded',data)
                      return<div key={index} className='pinnedSlides-container-wrapper-slide'>
                              <SlideCard
                                      title={data?.slideCategory}
                                      title2={data?.slideSubCategory}
                                      description={data?.SlideName}
                                      images={data?.slideImages}
                                      wholeDatas={pinnedSlides}
                                      datas={data}
                                      showShareModal={showShareModal}
                              />
                              
                          </div>
                  })

              }

           </div>
           {
                        showLoadMore && pinnedSlides.length>9 &&
                        <div className='pinnedSlides-loading' onClick={loadMorePinnedSlides}>
                            {
                                showMoreLoading &&
                                <Loading />
                            }
                            <Button type="primary-outline-rounded" label="Load More" labelColor="black" />
                        
                        </div>
                    }
          
           
       </div>
         }

       </>
    )
}

export default PinnedSLides
