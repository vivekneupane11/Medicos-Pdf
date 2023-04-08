// import { collection, deleteDoc, doc, getFirestore, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import background from '../../../assets/images/art1.webp';
import { Headings } from '../../../components/global/headings';
import { Images } from '../../../components/global/images';
import { Paragraphs } from '../../../components/global/paragraphs';
import { DisplayTitle } from '../../../components/global/Titles';
// import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from "firebase/storage";
import './_topCard.scss';
import { AuthContext } from '../../../components/signUp/authMethods/authentication';
import CameraIcon from '../../../components/global/icons/camera';
import CheckCircle from '../../../components/global/icons/check_Circle';
import { async } from '@firebase/util';

 const TopCard = ({ user,edit,e }) => {
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [userDisplayName,setUserDisplayName]=useState(null)
    const [userPhotoUrl,setUserPhotoUrl]=useState(null)
    const [userEmail,setUserEmail]=useState(null)
    const [username,setUserName]=useState(null)
    const [checkVerified,setCheckVerified]=useState(false)
    const { userId } = useParams();

    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [updatedCoverImage,setUpdatedCoverImage]=useState(null)
    const [istrue,setIstrue]=useState(true);

    const [toggleFollow, setToggleFollow] = useState(false);
    const {  username:usernameauth } = useContext(AuthContext)

    const [followerCount,setFollowerCount]=useState(null)
    const [followingCount,setFollowingCount]=useState(null)
    // const db =getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
            import('../../../firebase/firestore'),
            import('../../../firebase/storage')
        ])
        .then(([firestore,storage])=>{
            return {firestore,storage}
        })
    };
    // const storage= getStorage();

   
     
    useEffect(async() => {
      
        let isMounted = true;
        if (isMounted) {
            try {
                const{firestore:{db,doc,onSnapshot}}=await getFirebaseAll()

              if(userId){
                    // firebase.firestore().collection('Web-User-Data')
                    // .doc(userId)
                    // .collection('Additional-Details')
                    // .doc(userId)
                    const docRef=doc(db,'Web-User-Data',userId,'Additional-Details',userId)
                    onSnapshot(docRef,(res) => {
                        if (res.data()) {
                            let data = res.data();
                            setFacebook(data?.facebook);
                            setInstagram(data?.instagram);
                            setTwitter(data?.twitter);
                            setUpdatedCoverImage(data?.coverImageUrl)
                            setUserDisplayName(data?.displayName)
                            setUserPhotoUrl(data?.photoURL)
                            setUserEmail(data?.email)
                            setUserName(data?.username)

                            if(res.data().verified){
                                setCheckVerified(true)
                            }
                            
                        }
                        console.log('imageurl',coverImageUrl)
                    })
              }
            } catch (error) {
                console.log("Error while fetching user's additional information")
            }
        }
        return () => {
            isMounted = false;
        }
    }, [userId,coverImageUrl])

    // const file =e?.target?.files[0]
    const uploadImageToFirebase=async(file,e)=>{
        
       try{
        if(!file) return
        // const uploadTask=firebase.storage()
        // .ref(`Web-User-Cover-Images/${userId}`)
        // .child(e?.target?.files[0]?.name)
        // .put(e?.target?.files[0]);
        const{storage:{storage, getDownloadURL, ref, uploadBytesResumable}}=await getFirebaseAll()
        const StorageRef = ref(storage,`Web-User-Cover-Images/${userId}`,e?.target?.files[0]?.name)
        const uploadTask = uploadBytesResumable(StorageRef,file);
        uploadTask.on("state_changed", snapshot => {
            //for upload percentage
            // const progress = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // setProgress(progress);
          },
          error => {
            console.log(error);
          },
        
         () => {
          
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async(url)=> {
                  try{
                    const{firestore:{db,updateDoc,doc}}=await getFirebaseAll()
               
                    if(url){
                      updateDoc(doc(db,"Web-User-Data",userId,'Additional-Details',userId),
                      {
                        coverImageUrl:url,
                      })
                      .then(()=>{
                         setCoverImageUrl(url);
                         console.log('image ' ,url)
                         
                      })
                    }
                  }
                  catch(err){
                      console.log(err,'err')
                  }
                  
              });
          }
        );

       }
       catch(err){
           console.log(err)
       }
    }


    const handleImgUpload = async(e) => { 
        try {
            // firebase.storage().ref(`Web-User-Cover-Images/${userId}`)
            // .listAll()
            const {storage:{storage,listAll,ref,deleteObject}}=await getFirebaseAll()
            listAll(ref(storage,`Web-User-Cover-Images/${userId}`))
            .then((res)=>{
                if(res?.items[0]?.fullPath){
                    // firebase.storage().
                    // ref(res?.items[0]?.fullPath)
                    // .delete()
                    deleteObject(ref(storage,res?.items[0]?.fullPath))
                    .then((res)=>{
                      uploadImageToFirebase(e)
                    })
                    .catch((err)=>{
                        console.log('err',err)
                    })
                    
                }
                else if(res.items.length===0){
                    uploadImageToFirebase(e)
                    console.log('image upload',e)
                }
              })
            
        } catch (error) {
            console.log('err',error)
            
        }
      }
  
   //cheking whether followed or not 
   useEffect(async() => {
    let isMounted = true;
   try{
       const{firestore:{db,doc,onSnapshot,deleteDoc}}=await getFirebaseAll()
    if (isMounted && userId && usernameauth) {
        // firebase.firestore()
        //     .collection('Web-User-Data')
        //     .doc(usernameauth)
        //     .collection('Following')
        //     .doc(userId)
        const docRef = doc(db,'Web-User-Data',usernameauth,'Following',userId)
            onSnapshot(docRef,(querySnapshot) => {
                if (querySnapshot.data() ) {
                  

                    if(querySnapshot.data().username===userId){
                        setToggleFollow(true)
                    }
                }
            })

    }
   }
   catch(err){
       console.log(err)
   }
    return () => {
        isMounted = false
    }
}, [userId,usernameauth])

 //Followers data
 useEffect(async() => {
    let isMounted = true;
   try{
       const {firestore:{db,collection,onSnapshot,}}=await getFirebaseAll()
    if (isMounted && userId ) {
        // firebase.firestore()
        //     .collection('Web-User-Data')
        //     .doc(userId)
        //     .collection('Followers')
        const colRef =collection(db,'Web-User-Data',userId,'Followers')
            onSnapshot(colRef,(res) => {
                if (res) {
           
                    let allFollowers=[]
                    res.forEach(element => {
                        allFollowers.push(element.data())
                        
                    })    
                     setFollowerCount(allFollowers.length)
                 
                }
            })
            // firebase.firestore()
            // .collection('Web-User-Data')
            // .doc(userId)
            // .collection('Following')
            const colRef2 = collection(db,'Web-User-Data',userId,'Following')
            onSnapshot(colRef2,(res) => {
                if (res) {
                   
                    let allFollowing=[]
                    res.forEach(element => {
                        allFollowing.push(element.data())
                        
                    })    
                   setFollowingCount(allFollowing.length)
            
                }
            })

    }
   }
   catch(err){
       console.log(err)
   }
    return () => {
        isMounted = false
    }
}, [userId])



 //follow
      const follow=async()=>{
        try {
            const {firestore:{db,setDoc,doc}}=await getFirebaseAll()
            setToggleFollow(true);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(usernameauth)
            //     .collection('Following')
            //     .doc(userId)
            //     .set({
            //         username:userId
            //     })
            setDoc(doc(db,'Web-User-Data',usernameauth,'Following',userId),
            {
                username:userId
            })
                  
                // firebase.firestore()
                //     .collection('Web-User-Data')
                //     .doc(userId)
                //     .collection('Followers')
                //     .doc(usernameauth)
                //     .set({
                //         username:usernameauth
                //     })
                setDoc(doc(db,'Web-User-Data',userId,'Followers',usernameauth),
                {
                    username:usernameauth
                })

        } catch (error) {
            console.log('Error following', error)
        }
    }
    
     //unFollow
    const unFollow=async()=> {

        try {
            const {firestore:{db,deleteDoc,doc}}=await getFirebaseAll()
            setToggleFollow(false);
            // firebase.firestore()
            //     .collection('Web-User-Data')
            //     .doc(usernameauth)
            //     .collection('Following')
            //     .doc(userId)
            //     .delete()
               
            deleteDoc(doc(db,'Web-User-Data',usernameauth,'Following',userId))

            // firebase.firestore()
            // .collection('Web-User-Data')
            // .doc(userId)
            // .collection('Followers')
            // .doc('Followers')
            // .delete()

            deleteDoc(doc(db,'Web-User-Data',userId,'Followers','Followers'))

        } catch (error) {
            console.log('Error unfollowing', error)
        }
    }

   const Facebook =facebook.split('/')
   const Instagram =instagram.split('/',4)
   
   const Twitter =twitter.split('/')
   const handelfollow=()=>follow()
   const handelunfollow=()=>unFollow()

    return (
        <div className="topcard-wrapper">
            <div className="topcard-wrapper-top" style={{ backgroundImage: `url(${updatedCoverImage? `'${updatedCoverImage}'` : background})` }}>
               
               {
                   edit &&
                   <div className="topcard-wrapper-top-container">
                   <label className="custom-file-upload" onMouseOver={()=>setIstrue(!istrue)}  onMouseOut={()=> setIstrue(!istrue)}>
                       <input type="file" onChange={(e)=>handleImgUpload(e)}/>
                       <CameraIcon className='cameraIcon' />
                   </label>
                   {!istrue &&
                     <p className={`top-card-additionalDetails-tooltips-tip-top ${istrue?'':`top-card-additionalDetails-tooltips-tipS-top`}`}>Edit</p> 
                   }
               </div>
               }

            </div>
            <div className="topcard-wrapper-bottom">
                <div className="topcard-wrapper-bottom-image">
                    {
                        userPhotoUrl!==undefined?
                            <Images type="circle" 
                                Image={userPhotoUrl}
                                width={140} height={140} />
                            :
                            <div className='avatar'>
                                <DisplayTitle title={userEmail?.substring(0, 1)} color='white' type="display1" />
                            </div>
                    }
                </div>

                <div className="topcard-wrapper-bottom-right">
                    <div className="topcard-wrapper-bottom-right-top">
                        <div className="topcard-wrapper-bottom-right-top-profileDetails">
                           <div className="topcard-wrapper-bottom-right-top-profileDetails-container">
                                <div  className="topcard-wrapper-bottom-right-top-profileDetails-container-userName">
                                    
                                    <Headings type="heading4" content={username ? username : '...' } />
                                    {
                                    checkVerified &&  
                                    <div className="topcard-wrapper-bottom-right-top-profileDetails-container-userName-verified">
                                        <CheckCircle className="topcard-wrapper-bottom-right-top-profileDetails-container-userName-verified-icon"/>
                                        <p className="topcard-wrapper-bottom-right-top-profileDetails-container-userName-verified-text">Verified</p>
                                    </div>
                                    }
                                
                                    </div>
                                    <div className="address">
                                        <Paragraphs type="heading-text" content={userEmail} />
                                    </div>
                           </div>

                            {
                                    userId!==usernameauth &&
                                    <div className="topcard-wrapper-bottom-right-followContainer">
                                    
                                    {
                                        toggleFollow ?
                                        <button onClick={handelunfollow} className={`topcard-wrapper-bottom-right-followContainer-unFollowBtn ${toggleFollow? 'topcard-wrapper-bottom-right-followContainer-unFollowBtnActive':''}`}>
                                            Following
                                        </button>
                                        :
                                        <button onClick={handelfollow} className={`topcard-wrapper-bottom-right-followContainer-followBtn ${toggleFollow? 'topcard-wrapper-bottom-right-followContainer-followBtnActive':''}`}>
                                        Follow
                                        </button>

                                    }

                                    </div>
                                }

                        </div>
                       
                    </div>
                    {/* <div className="topcard-wrapper-bottom-right-bottom">
                        <div className='biodata' contenteditable="true" placeholder='edit bio'></div>
                    </div> */}
                    <div className="topcard-wrapper-bottom-right-followerDetails">
                    <Link to ={`/profile/${userId}/followers`} className="topcard-wrapper-bottom-right-followerDetails-followers">
                         <span>{followerCount}</span><p>Followers</p> 
                        </Link>

                         <Link to ={`/profile/${userId}/followers`} className="topcard-wrapper-bottom-right-followerDetails-following">
                       <span>{followingCount}</span><p>Following</p> 
                        </Link>
                    </div>    
                 

                </div>


            </div>

        </div>
    )
}

export default React.memo(TopCard)