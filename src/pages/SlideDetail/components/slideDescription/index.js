// import firebase from 'firebase/compat';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TextClamp from 'react-string-clamp';
// import useSlideLikeCount from '../../../../components/customHooks/SlideLikes';
//local imports
// import { Headings } from '../../../../components/global/headings';

import NewsLinkTag from '../../../../components/global/newsLinkTag';
import ShareModal from '../../../../components/global/shareModal';
import { DisplayTitle } from '../../../../components/global/Titles';
import filterSlideSubCategory from '../../../../functions/filterSlideSubCategory';
import { getColorByIndex } from '../../../../functions/tagColorAndReadTimeMethod';
import LeaveAReply from '../../../NewsDetail/components/leaveAReply';
import CommentComponent from '../commentComp';
import "./index.scss";

import Loadable from 'react-loadable';
// import {  doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import ArrowRight from '../../../../components/global/icons/arrow_right';
import FolderIcon from '../../../../components/global/icons/folder';


const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div>Loading...</div>
    }
  });

const SlideDescription = ({ data,playlist=false, user }) => {
    // const {likeCount} = useSlideLikeCount(data?.SlideName);
    let shareUrl = encodeURI(`https://medicospdf.com/slidedetails/${data?.SlideName}/${data?.slideCategory}/${filterSlideSubCategory(data?.slideSubCategory)}`);
    let shareTitle = data?.SlideName
    const [showFormModel, setShowFormModel] = useState(false)
    const [showLongModal, setShowLongModal] = useState(false)
    const [checkShare, setCheckShare] = useState(false);
    const { username} = useContext(AuthContext);

    const [toggleFollow, setToggleFollow] = useState(null);
    const [showFollowButton,setShowFollowButton]=useState(false)
    // const db =getFirestore();
    const getFirebaseAll = () => {
        return Promise.all([
          import('../../../../firebase/firestore'),
        ]).then(([ firestore]) => {
          return { firestore };
        });
      };
 

    const showModal = () => {
        setShowLongModal(true)
    }


    // const close = (signal) => {
    //     if (signal === false) {
    //         setShowLongModal(false)
    //     }
    // }


    const FormModel = useCallback(
        (dontShow) => {

            if (dontShow === false) {
                setShowFormModel(false)

            }
        },
        [],
    )

    useEffect(() => {
        if (user?.uid) {
            setShowFormModel(false)

        }
    }, [user?.uid])



    const cancelShare = useCallback(
        (show) => {

            if (show === false) {
                setCheckShare(false)

            }
        },
        [],
    )

//like slide for unique users only once
// function likeSlide(slideName) {

//     try {
//         setDoc(doc(db,'Web-Slide-Reviews',slideName,'Likes','Like-Count'),
//         {
//             like_count: likeCount ? likeCount + 1 : 1,
//         })
//         // firebase.firestore()
//         //     .collection('Web-Slide-Reviews')
//         //     .doc(slideName)
//         //     .collection('Likes')
//         //     .doc('Like-Count')
//         //     .set({
//         //         like_count: likeCount ? likeCount + 1 : 1,
//         //     })

//         if (username) {
//             setDoc(doc(db,'Web-User-Data',username,'LikedSlides',slideName),
//             {
//                 SlideName: data?.SlideName,
//                 slideCategory: data?.slideCategory,
//                 slideImages: data?.slideImages,
//                 slideSubCategory: data?.slideSubCategory
//             })
//             // firebase.firestore()
//             //     .collection('Web-User-Data')
//             //     .doc(username)
//             //     .collection('LikedSlides')
//             //     .doc(slideName)
//             //     .set({
//             //         SlideName: data?.SlideName,
//             //         slideCategory: data?.slideCategory,
//             //         slideImages: data?.slideImages,
//             //         slideSubCategory: data?.slideSubCategory
//             //     })
//         }

//     } catch (error) {
//         console.log('Error liking slide', error)
//     }
// }

//dislike slide for unique users only once
// function dislikeSlide(slideName) {
//     try {
//         setDoc(doc(db,'Web-Slide-Reviews',slideName,'Likes','Like-Count'),
//         {
//             like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0, 
//         })

//         // firebase.firestore()
//         //     .collection('Web-Slide-Reviews')
//         //     .doc(slideName)
//         //     .collection('Likes')
//         //     .doc('Like-Count')
//         //     .set({
//         //         like_count: likeCount && likeCount > 0 ? likeCount - 1 : 0,
//         //     })

//         if (username) {
//             deleteDoc(doc(db,'Web-User-Data',username,'LikedSlides',slideName))
//             // firebase.firestore().collection('Web-User-Data')
//             //     .doc(username)
//             //     .collection('LikedSlides')
//             //     .doc(slideName)
//             //     .delete()
//         }

//     } catch (error) {
//         console.log('Error disliking slide', error)
//     }
// }


    //cheking whether followed or not 
    useEffect(async() => {
    let isMounted = true;
   try{
    const { firestore: { db, doc, onSnapshot } } = await getFirebaseAll()
    if (isMounted && username) {

        if(data?.username){
                const docRef=doc(db,'Web-User-Data',username,'Following',data?.username)
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(username)
                // .collection('Following')
                // .doc(data?.username)
                onSnapshot(docRef,(querySnapshot) => {
                    if (querySnapshot.data() ) {
                        
                        if(querySnapshot.data().username===data?.username){
                            setToggleFollow(true)
                        }
                    }
                })
        }
        else{
                const docRef =doc(db,'Web-User-Data',username,'Following','medicos.int7')
                // firebase.firestore()
                // .collection('Web-User-Data')
                // .doc(username)
                // .collection('Following')
                // .doc('medicos.int7')
                onSnapshot(docRef,(querySnapshot) => {
                
                    if (querySnapshot.data() ) {
                        if(querySnapshot.data().username==='medicos.int7'){
                            setToggleFollow(true)
                        }
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
    }, [toggleFollow,data?.username,username])


//follow
    // const follow=()=>{
    // try {
    //     setToggleFollow(true);

    //     if(data?.username){
    //         setDoc(doc(db,'Web-User-Data',username,'Following',data?.username),
    //         {
    //             username:data?.username
    //         })
    //         // firebase.firestore()
    //         // .collection('Web-User-Data')
    //         // .doc(username)
    //         // .collection('Following')
    //         // .doc(data?.username)
    //         // .set({
    //         //     username:data?.username
    //         // })
        
    //         setDoc(doc(db,'Web-User-Data',data?.username,'Followers',username),
    //         {
    //             username:username
    //         })
    //         // firebase.firestore()
    //         //     .collection('Web-User-Data')
    //         //     .doc(data?.username)
    //         //     .collection('Followers')
    //         //     .doc(username)
    //         //     .set({
    //         //         username:username
    //         //     })
        
    //     }
    //     else{
    //         setDoc(doc(db,'Web-User-Data',username,'Following','medicos.int7'),
    //         {
    //             username:'medicos.int7'
    //         })
    //         // firebase.firestore()
    //         // .collection('Web-User-Data')
    //         // .doc(username)
    //         // .collection('Following')
    //         // .doc('medicos.int7')
    //         // .set({
    //         //     username:'medicos.int7'
    //         // })
        
    //         setDoc(doc(db,'Web-User-Data','medicos.int7','Followers',username),
    //         {
    //             username:username
    //         })
    //         // firebase.firestore()
    //         //     .collection('Web-User-Data')
    //         //     .doc('medicos.int7')
    //         //     .collection('Followers')
    //         //     .doc(username)
    //         //     .set({
    //         //         username:username
    //         //     })
        
    //     }

                
    // } catch (error) {
    //     console.log('Error following', error)
    // }
    // }

    // //unFollow
    // const unFollow=()=> {

    // try {
    //     setToggleFollow(false);
    //     if(data?.username){
    //         deleteDoc(doc(db,'Web-User-Data',username,'Following',data?.username))
    //         // firebase.firestore()
    //         // .collection('Web-User-Data')
    //         // .doc(username)
    //         // .collection('Following')
    //         // .doc(data?.username)
    //         // .delete()
        
    //         deleteDoc(doc(db,'Web-User-Data',data?.username,'Followers',username))
    //         // firebase.firestore()
    //         // .collection('Web-User-Data')
    //         // .doc(data?.username)
    //         // .collection('Followers')
    //         // .doc(username)
    //         // .delete()
    //     }

    //     else{
    //         deleteDoc(doc(db,'Web-User-Data',username,'Follpwing','medicos.int7'))
    //             // firebase.firestore()
    //             // .collection('Web-User-Data')
    //             // .doc(username)
    //             // .collection('Following')
    //             // .doc('medicos.int7')
    //             // .delete()
            
    //             deleteDoc(doc(db,'Web-User-Data','medicos.int7','Followers',username))
    //             // firebase.firestore()
    //             // .collection('Web-User-Data')
    //             // .doc('medicos.int7')
    //             // .collection('Followers')
    //             // .doc(username)
    //             // .delete()
    //     }


    // } catch (error) {
    //     console.log('Error unfollowing', error)
    // }
    // }

    //show follow button or not
    useEffect(() => {
    let isMounted=true
    if(data?.username){
        console.log('follow botton',data?.username,'username',username)
        if( username!==data?.username){
        setShowFollowButton(true)
    }
    }
    else{
    if(isMounted && username!=='medicos.int7'){
        setShowFollowButton(true)
    }
    }
    return () => {
    isMounted=false
    }
    }, [username])


    const clickhandlerbutton = () => showModal()
    // const clickhandlerbutton2 = () => setCheckShare(true)
    // const clickhandlerbutton3 = () => setShowFormModel(true)

    return (
        <div className="slide-description">
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            {/* <LongModalDescription show={showLongModal} close={close} data={data} /> */}
            <ShareModal
                url={shareUrl}
                appId={process.env.REACT_APP_ID}
                title={shareTitle}
                image={data?.slideImages[0]}
                show={checkShare}
                cancel={cancelShare}
            />
            <div className="slide-description-container">
                <DisplayTitle type="display3" title={data?.SlideName.split("-", 1)[0]} />
               
                <div className='slideDescription-categoryAndViewsContainer'>
                     <Link
                            className='links'
                            to={{
                                pathname: `/slidesubcategory/${data?.slideCategory}/${data?.slideSubCategory.replace(/\s|\//g, "")}`,
                            }}>
                    <div className='slideDescription-categoryAndViewsContainer-cat'>
                       <FolderIcon className='slideDescription-categoryAndViewsContainer-cat-icon'/>
                       <p className='slideDescription-categoryAndViewsContainer-cat-para'>{data?.slideCategory}</p>
                       <ArrowRight className='slideDescription-categoryAndViewsContainer-cat-icon'/>
                       <p className='slideDescription-categoryAndViewsContainer-cat-para'>{data?.slideSubCategory}</p>
                    </div>
                    </Link>
                    {/* {
                            user ?
                                <>
                                    {
                                        slideLiked ?
                                            <div onClick={() => dislikeSlide(data?.SlideName)} className='slideDescription-likeCount'>
                                                <AiFillHeart className='slideDescription-likeCount-likedIcon' />
                                                <p>{likeCount > 0 && likeCount}</p>
                                            </div>
                                            :
                                            <div onClick={()=>likeSlide(data?.SlideName)} className='slideDescription-likeCount'>
                                                <AiOutlineHeart className='slideDescription-likeCount-unLikedIcon' />
                                                <p>{likeCount > 0 && likeCount}</p>
                                            </div>

                                    }
                                </>
                                :
                                <div onClick={clickhandlerbutton3} className='slideDescription-likeCount'>
                                    <AiOutlineHeart className='slideDescription-likeCount-unLikedIcon' />
                                    <p>{likeCount > 0 && likeCount}</p>
                                </div>

                        } */}
                    {/* <div className='slideDescription-categoryAndViewsContainer-count'>
                        <AiFillEye className='slideDescription-categoryAndViewsContainer-count-icon'/>
                        <p className='slideDescription-categoryAndViewsContainer-count-para'>{viewCount}</p>
                    </div> */}
                   
                </div>

                <div className='slideDescription-descriptionContainer'>
                    {
                        showLongModal?
                        <>
                          <h3 className='slideDescription-descriptionContainer-head'>Description</h3>
                          <p className='paragraph'>{data?.slideDescription ? data?.slideDescription : `This is a slide about ${data?.SlideName}. It falls into ${data?.slideSubCategory} of ${data?.slideCategory}. `}</p> 
                        </>
                       
                        :
                        <>
                        {
                            data?.slideDescription &&
                            <h3 className='slideDescription-descriptionContainer-head'>Description</h3>
                        }
                         
                         <TextClamp
                            text={data?.slideDescription}
                            lines={3}
                            element='p'
                            className="paragraph"
                        />
                        </>
                       
                    }
                   {
                       data?.slideDescription?.length > 100  &&
                        <div className={`${showLongModal?'':'slideDescription-descriptionContainer-textFade'}`}></div>
                   }
                </div>
               
                {data?.slideDescription?.length > 100 && !showLongModal &&
                    <button onClick={clickhandlerbutton} className='slideDetail-longModalButton'>Read More</button>
                }

                {
                    data?.slideTags && 
                    <div className="slideDetailPage-tagsContainer">
                    {
                        
                        data?.slideTags.split(',').map((data, index) => {
                            return <div key={index} className="slideDetailPage-tagsContainer-tag"> <NewsLinkTag color={getColorByIndex(index)} tag={data?.replace(/\s/g, '')} /></div>
                            //  <p className="slideDetailPage-tagsContainer-tag">#{data.replace(/\s/g, '')}</p>
                        })
                    }
                </div>

                }
               




                {/* <p className='paragraph'>{data?.slideDescription ? data?.slideDescription : `This is a slide about ${data?.SlideName}. It falls into ${data?.slideSubCategory} of ${data?.slideCategory}. `}</p> */}
                <Link to='/uploadslide' className='slideDescription-uploadNote ' dangerouslySetInnerHTML={{ __html: `If you want to contribute you can upload your own slide from <a href='/uploadslide'>here</a>` }}></Link>
                
                <div className="slide-description-container-bottom-container">
                    {/* <div className="row1">
                        {
                            user?
                            <div className="userInfo">
                                <img className="profilePic" src={data?.userAvatar ? data?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt={data?.username? data?.username: "Medicos Int'l"}/>
                                <div className="name">
                                   <Link
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `${data.username ? `/profile/${data?.username}` : '/profile/medicos.int7'}`,
                                        }}>
                                    <Headings type="heading5" content={data?.username? data?.username: "Medicos Int'l"} />
                                    </Link>
                                    {
                                    user &&  showFollowButton &&
                                            <>
                                                {
                                                !toggleFollow ?
                                                <button onClick={()=>follow()} className='slideDetails-description-followButton'>Follow</button>
                                                :
                                                <button onClick={()=>unFollow()} className='slideDetails-description-followButton'>Following</button>
                                                }
                                            </>
                                    
                                    }
                                </div>
                            </div>
                          
                            :
                            <div className="userInfo">
                                <img className="profilePic" src={data?.userAvatar ? data?.userAvatar : require("../../../../assets/images/slide/medicos.webp")} alt={data?.username? data?.username : "Medicos Int'l"}/>
                                <div className="name">
                                    <Headings type="heading5" content={data?.username? data?.username : "Medicos Int'l"} />
                                </div>
                            </div>
                        }
                       

                        
                       
                      
                    </div> */}
                        {
                            !playlist && <CommentComponent title={data?.SlideName} />
                        }
                        {
                            !playlist && <LeaveAReply data={data} user={user} title={data?.SlideName} />
                        }
                </div>
            </div>
        </div>
    )
}
export default React.memo(SlideDescription)
