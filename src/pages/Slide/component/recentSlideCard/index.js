// import firebase from 'firebase/compat';
import React, {  useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import { logEventWithParams } from '../../../../functions/commonMethod';
import useTotalViews from '../../../../components/customHooks/totalViews';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import './_recentSlideCard.scss';
// import { doc,  getFirestore, onSnapshot,setDoc,deleteDoc } from 'firebase/firestore';
import HeartFill from '../../../../components/global/icons/heart_fill';
import HeartOutline from '../../../../components/global/icons/heart_outline';
import Eye from '../../../../components/global/icons/eye';
import ShareIcon from '../../../../components/global/icons/share';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { async } from '@firebase/util';

const RecentSlideCard = ({data,showModal,showShareModal}) => {

    const { user,username } = useContext(AuthContext)
    const [showFormModel, setShowFormModel] = useState(false)
    const [toggleLike, setToggleLike] = useState(false);
    const [likeCount, setLikeCount] = useState(null)
    const totalViewsCount = useTotalViews('slidedetails', data?.SlideName)
    // const db =getFirestore();
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };
    const removeUnderscore = (str) => {
        str = str.split("-",1)[0]
        var i, frags = str.split('_');
        for (i = 0; i < frags.length; i++) {
          frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
      }

        //FETCHING Slide LIKE COUNT
    useEffect(async() => {
        let isMounted = true;
        try{
            const {firestore:{db,doc, onSnapshot}}= await getFirebaseAll()

            if (isMounted) {
                // firebase.firestore().collection('Web-Slide-Reviews')
                //     .doc(data?.SlideName)
                //     .collection("Likes")
                //     .doc('Like-Count')
                    const docRef=doc(db,'Web-Slide-Reviews',data?.SlideName,"Likes",'Like-Count')
                    onSnapshot(docRef,(querySnapshot) => {
                        if (querySnapshot.data()) {
                            setLikeCount(querySnapshot?.data()?.like_count);
                        }
                    })
    
                if (username) {
                    // firebase.firestore().collection('Web-User-Data')
                    //     .doc(username)
                    //     .collection('LikedSlides')
                    //     .doc(data?.SlideName)
                        const docRef=doc(db,'Web-User-Data',username,'LikedSlides',data?.SlideName)
                        onSnapshot(docRef,(querySnapShot) => {
                            if (querySnapShot?.data()) {
                                setToggleLike(true)
                            }
    
                        })
                }
    
            }
        }
        catch(err){
            console.log(err,'err')
        }
        return () => {
            isMounted = false
        }
    }, [data?.SlideName, toggleLike,username])

    //like slide for unique users only once


    // console.log('user check in recentslide',username)
    async function likeSlide() {

        try {
            const {firestore:{db,doc,setDoc}}= await getFirebaseAll()
            
            setToggleLike(true);
            // firebase.firestore()
            //     .collection('Web-Slide-Reviews')
            //     .doc(data?.SlideName)
            //     .collection('Likes')
            //     .doc('Like-Count')
            //     .set({
            //         like_count: likeCount ? likeCount + 1 : 1,
            //     })
                setDoc(doc(db,'Web-Slide-Reviews',data?.SlideName,'Likes','Like-Count'),
                {
                    like_count: likeCount ? likeCount + 1 : 1,
                })
            if (username) {
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(username)
                //     .collection('LikedSlides')
                //     .doc(data?.SlideName)
                //     .set({
                //         SlideName: data?.SlideName,
                //         slideCategory: data?.slideCategory,
                //         slideImages: data?.slideImages,
                //         slideSubCategory: data?.slideSubCategory
                //     })

                    setDoc(doc(db,'Web-User-Data',username,'LikedSlides',data?.SlideName),
                    {
                        SlideName: data?.SlideName,
                        slideCategory: data?.slideCategory,
                        slideImages: data?.slideImages,
                        slideSubCategory: data?.slideSubCategory
                    }
                    )
            }



        } catch (error) {
            console.log('Error liking slide', error)
        }
    }
    //dislike slide for unique users only once
   async function dislikeSlide() {
        try {
            const {firestore:{db,doc,setDoc,deleteDoc}}= await getFirebaseAll()
            
            setToggleLike(false);

            // firebase.firestore()
            //     .collection('Web-Slide-Reviews')
            //     .doc(data?.SlideName)
            //     .collection('Likes')
            //     .doc('Like-Count')
            //     .set({
            //         like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
            //     })
                setDoc(doc(db,'Web-Slide-Reviews',data?.SlideName,'Likes','Like-Count'),
                {
                    like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
                })


            if (username) {
                // firebase.firestore().collection('Web-User-Data')
                //     .doc(username)
                //     .collection('LikedSlides')
                //     .doc(data?.SlideName)
                //     .delete()
                    deleteDoc(doc(db,'Web-User-Data',username,'LikedSlides',data?.SlideName))
            }


        } catch (error) {
            console.log('Error disliking slide', error)
        }
    }


    useEffect(() => {
        let isMounted=true
        if (isMounted && user?.uid) {
            setShowFormModel(false)

        }
        return()=>{
            isMounted=false
            
        }
   },[user?.uid])
   const handelshowShareModal=()=>showShareModal(true,data)
   const handelshowmodal=()=>showShareModal(true,data)
   const handelmodal=() => showModal(true)
   
    return (
        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg" style={{ backgroundImage: `url(${data.slideImages[0]})` }}>

        <Link
          onClick={() => logEventWithParams("web_slide_opened", {
            slideTitle: data?.SlideName,
            slideCategory: data?.slideCategory,
            slideSubCategory: data?.slideSubCategory,
          })}
          className='links'
          to={{
            pathname: `/slidedetails/${data?.SlideName}/${data?.slideCategory}/${filterSlideSubCategory(data?.slideSubCategory)}`,
            state: {
              slideCategory: data?.slideCategory,
              slideSubCategory: data?.slideSubCategory,
              slideName: data?.SlideName,

            }
          }}>
         
        </Link>
        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-tag">
            <NewsLinkTag color='orange' tag={data?.slideSubCategory} />
          </div>

        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc">
          <Link
            onClick={() => logEventWithParams("web_slide_opened", {
              slideTitle: data?.SlideName,
              slideCategory: data?.slideCategory,
              slideSubCategory: data?.slideSubCategory,
            })}
            className='links'
            to={{
              pathname: `/slidedetails/${data?.SlideName}/${data?.slideCategory}/${filterSlideSubCategory(data?.slideSubCategory)}`,
            }}>
            <h3 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-head1">{removeUnderscore(data.SlideName)}</h3>
          </Link>
          <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-head2">{data.slideCategory}</h6>
        <div className='like-view-container'>
        {
                    likeCount > 0 &&
                    <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-like">{likeCount} likes</h6>
                }
             
              {
                        totalViewsCount > 0 &&
                        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-views">
                            <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-views-count">{totalViewsCount}</h6>
                            <Eye className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-views-icon"/>
                        </div>
                         } 
        </div>  
          <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom">
            <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile">

          {
              user?
              <Link
              className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-link"
               to={{
                   pathname: `${data.username? `/profile/${data?.username}`:'/profile/medicos.int7'}`,
               }}>
                   <LazyLoadImage effect='blur' src={data?.userAvatar? data?.userAvatar: require('../../../../assets/images/slide/medicos.webp').default} alt='profile' className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-img" />
               {/* <img loading="lazy" src={data?.userAvatar? data?.userAvatar: require('../../../../assets/images/slide/medicos.webp').default} alt='profile' className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-img" /> */}
               <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-head">{data?.username ? data?.username : "Medicos Int'l"}</h6>
           </Link>
           :
           <div onClick={handelmodal} className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-link">
                   <LazyLoadImage effect='blur' src={data?.userAvatar? data?.userAvatar: require('../../../../assets/images/slide/medicos.webp').default} alt='profile' className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-img" />
               
            {/* <img loading="lazy" src={data?.userAvatar? data?.userAvatar: require('../../../../assets/images/slide/medicos.webp').default} alt='profile' className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-img" /> */}
            <h6 className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-profile-head">{data?.username ? data?.username : "Medicos Int'l"}</h6>
        </div>
          }
            
             
        
                         
            </div>

           <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right">
           {
                user ?
                    <>
                        {
                            toggleLike ?
                                <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer" onClick={() => dislikeSlide()}>
                                    <HeartFill  className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer-icon" />
                                </div>
                                :
                                <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer"onClick={() => likeSlide()}>
                                    <HeartOutline  className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer-icon" />
                                </div>
                        }

                    </>
                    :
                    <>
                        {
                            toggleLike ?
                                <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer"onClick={() => showModal(true)}>
                                    <HeartFill  className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer-icon"/>
                                </div>
                                :
                                <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainer"onClick={() => showModal(true)}>
                                    <HeartOutline  className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-likeDislikeContainericon"/>
                                </div>
                        }

                    </>

             }

                    {
                    user ?
                        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-shareContainer">
                            <div onClick={handelshowShareModal}>

                        <ShareIcon className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-shareContainer-icon"  />
                            </div>
                        
                        
                       
                        </div>
                        :
                        <div className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-shareContainer"  onClick={handelshowmodal}>
                        <ShareIcon className="slideRecentSlide-container-swiperContainer-slide-bgImg-desc-bottom-right-shareContainer-icon" 
                      
                        />
                        </div>
                    }
           </div>


          </div>
        </div>

      </div>
    )
}

export default React.memo(RecentSlideCard)
