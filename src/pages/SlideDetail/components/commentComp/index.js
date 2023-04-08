import React, { useCallback, useContext, useEffect, useRef, useState} from 'react';
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import {RiEditLine} from 'react-icons/ri';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../../components/global/button";
import ConfirmationModal from "../../../../components/global/confirmationModal";
import Loading from "../../../../components/loading";
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import './_commentComp.scss';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { collection, deleteDoc, doc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import Delete from '../../../../components/global/icons/delete';
import EditIcon from '../../../../components/global/icons/edit';
import HoriZontalDots from '../../../../components/global/icons/dots_Horizontal';
import { LazyLoadImage } from 'react-lazy-load-image-component';



const CommentComponent = ({ title }) => {

    const { user } = useContext(AuthContext)
    // const firestoreDatabase = firebase.firestore();
    const [slideReviews, setSlideReviews] = useState([])
    const [editData,setEditData]=useState(null)
    const [editState,setEditState]=useState(false)
    const [editDataIndex,setEditDataIndex]=useState(null)
    const [optionCheck,setOptionCheck]=useState(false)
    const [height,setHeight]=useState(30)
   const inputRef=useRef(null)
   const optionRef=useRef()
   const optionModalRef=useRef()
   const [confirmModalShowState,setConfirmModalShowState]=useState(false)
   const [confirmModalConfirmation,setConfirmModalConfirmation]=useState(false)
   const [deletingData,setDeletingData]=useState(null)
   const [showLoadMoreComments, setShowLoadMoreComments] = useState(false);
   const [showMoreCommentsLoading, setShowMoreCommentsLoading] = useState(false);
   const [lastComment, setLastComment] = useState();
   const [commentFound, setCommentFound] = useState(true);
   const [commentLimit] = useState(5);
//    const db =getFirestore();
const getFirebaseAll = () => {
    return Promise.all([
      import('../../../../firebase/firestore'),
    ]).then(([ firestore]) => {
      return { firestore };
    });
  };


    useEffect(async() => {
        let isMounted = true;
        if (isMounted) {
            try {
                const { firestore: { db, onSnapshot,orderBy,query,collection,limit } } = await getFirebaseAll()

                const colRef = query(collection(db,'Web-Slide-Reviews',title,"Comments"),
                orderBy('created_at', 'desc'),
                limit(commentLimit))
                // firebase.firestore().collection('Web-Slide-Reviews')
                //     .doc(title)
                //     .collection("Comments")
                //     .orderBy('created_at', 'desc')
                //     .limit(commentLimit)
                    onSnapshot(colRef,(querySnapshot) => {
                        if (querySnapshot) {
                            let slideReviewsData = [];
                            querySnapshot.forEach((doc) => {
                                slideReviewsData.push(doc?.data())
                               
                            })
                            if (slideReviewsData?.length === 0) {
                                setCommentFound(false)
                               
                            }
                            else{
                                setShowLoadMoreComments(true)
                            }
                            setShowMoreCommentsLoading(false);
                            setLastComment(slideReviewsData[slideReviewsData?.length - 1])
                            setSlideReviews(slideReviewsData);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching slide reviews", error);
            }
        }
        return () => {
            isMounted = false;
        }
    }, [commentLimit,title])

 
    const  
    handleEdit=(data,index)=>{
        setOptionCheck(false)
        setEditData(data?.reviewComment)
        setEditState(true)
        setEditDataIndex(index)
    }

    const submitEditData=async(data)=>{

        if(data){
            try {
                // firestoreDatabase.collection('Web-Slide-Reviews')
                //     .doc(data?.SlideName)
                //     .collection("Comments")
                //     .where('reviewComment','==',data?.reviewComment)
                //     .where('created_at','==',data?.created_at)
                //     .get()
         const { firestore: { db, doc,getDocs,where,updateDoc,query,collection } } = await getFirebaseAll()

                getDocs(query(collection(db,'Web-Slide-Reviews',data?.SlideName,"Comments"),
                where('reviewComment','==',data?.reviewComment),
                where('created_at','==',data?.created_at)))
                .then((res)=>{
                    
                    // firestoreDatabase.collection('Web-Slide-Reviews')
                    // .doc(data?.SlideName)
                    // .collection("Comments")
                    // .doc(res?.docs[0]?.id)
                    // .update({
                    //         reviewComment: editData,
                    //         created_at: new Date()
                    //     })
                    if(res && editData!==''){
                            updateDoc(doc(db,'Web-Slide-Reviews',data?.SlideName,"Comments",res?.docs[0]?.id),
                            {
                                reviewComment: editData,
                                    created_at: new Date()

                            })
                            .then((res) => {
                                   
                                    toast.success("Review successfully edited",{theme:'dark',hideProgressBar:true})
                                    setEditState(false)
                            })
                        }
                        else{
                            toast.error("Review Should not be empty",{theme:'dark',hideProgressBar:true})
                        }
                    })
                  
            } catch (error) {
                toast.error("Error while adding review",{theme:'dark',hideProgressBar:true})
            
            }
         }
    }

    const handleDelete=async(data)=>{

        if(data?.SlideName){
            try {
                // firestoreDatabase.collection('Web-Slide-Reviews')
                // .doc(data?.SlideName)
                // .collection("Comments")
                // .where('reviewComment','==',data?.reviewComment)
                // .where('created_at','==',data?.created_at)
                // .get()
         const { firestore: { db, doc,getDocs,where,deleteDoc,query,collection } } = await getFirebaseAll()

                getDocs(query(collection(db,'Web-Slide-Reviews',data?.SlideName,"Comments"),
                where('reviewComment','==',data?.reviewComment),
                where('created_at','==',data?.created_at)))
                .then((res)=>{
                  
                    if(res){
                        deleteDoc(doc(db,'Web-Slide-Reviews',data?.SlideName,"Comments",res?.docs[0]?.id))
                        .then((res) => {
                            toast.success("Review successfully deleted",{theme:'dark',hideProgressBar:true})
                            setEditState(false)
                            setOptionCheck(false)
                            setConfirmModalShowState(false)
                            setConfirmModalConfirmation(false)
                        })
                    }
                    // firestoreDatabase.collection('Web-Slide-Reviews')
                    // .doc(data?.SlideName)
                    // .collection("Comments")
                    // .doc(res?.docs[0]?.id)
                    // .delete()
                })
            } catch (error) {
                toast.error("Error while deleting review")
            
            }
         }
    }

    const chooseOption=(index)=>{
        setOptionCheck(!optionCheck)
        setEditDataIndex(index)
    }
 
    const increaseHeight=(e)=>{
        setHeight(inputRef.current.scrollHeight)

    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (optionCheck && optionRef.current && !optionModalRef.current) {
                setOptionCheck(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [optionCheck])


    const confirmDelete=(data)=>{
        if(data){
          setDeletingData(data)
          setConfirmModalShowState(true)
        }
  
         
      }

    const cancelConfirmModal = useCallback(
        (show) => {
    
            if (show === false) {
                setConfirmModalShowState(false)
            }
        },[]
    )
    
    const ConfirmModalConfirmation = useCallback(
        (show) => {
    
            if (show === true) {
                setConfirmModalConfirmation(true)
            }
        },[]
    )
    
    useEffect(() => {
        let isMounted=true;
 
        if(isMounted && confirmModalConfirmation && deletingData ){
            handleDelete(deletingData)
        }
        return () => {
            isMounted=false
        }
    }, [confirmModalConfirmation,deletingData])

    const loadMoreComments = async() => {
        try {
            setShowMoreCommentsLoading(true);
            // firebase.firestore()
            //     .collection('Web-Slide-Reviews')
            //     .doc(title)
            //     .collection('Comments')
            //     .orderBy('created_at', 'desc')
            //     .startAfter(lastComment?.created_at)
            //     .limit(commentLimit)
            //     .get()
         const { firestore: { db, startAfter,getDocs,orderBy,limit,query,collection } } = await getFirebaseAll()

            const colRef =query(collection(db,'Web-Slide-Reviews',title,'Comments'),
            orderBy('created_at', 'desc'),
            startAfter(lastComment?.created_at),
            limit(commentLimit))
            getDocs(colRef)
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        allData.push(ele?.data());

                    })
                    setLastComment(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreComments(false)
                    }
                    setShowMoreCommentsLoading(false);
                    setSlideReviews((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user comment', error)
        }
    }
const handeledit=()=>setEditState(false)

    return (
        
        <div className='wholeCommentContainer'>
              <ConfirmationModal show={confirmModalShowState} cancel={cancelConfirmModal} confirm={ConfirmModalConfirmation}/>
            <h3 className='commentComponent-head'>Reviews</h3>
            {
                !slideReviews.length && <section className="slideDetailsComment-review-section">
                    <p>Be the first one to review.</p>
                </section>
            }
            
            {
            slideReviews?.map((data, index) => {
                return <>
                
           
            <div key={index} className='commentComponent-container'>
           
            
                            <div className='commentComponent-container-wrapper'>
                            <Link
                                className='links'
                                to={{
                                    pathname:`/profile/${data?.username}`,
                                }}
                                >
                                <div className='commentComponent-container-wrapper-col1'>
                                    <LazyLoadImage src={data?.photoURL} alt='profile' className='commentComponent-container-wrapper-col1-profile' effect='blur'/>
                                    {/* <img loading="lazy" src={data?.photoURL} alt='profile' className='commentComponent-container-wrapper-col1-profile' /> */}
                                </div>
                                </Link>

                                <div className='commentComponent-container-wrapper-desc'>
                                    <div className="commentComponent-container-wrapper-desc-header">
                                    <Link
                                        className='links'
                                        to={{
                                            pathname:`/profile/${data?.username}`,
                                        }}
                                        >
                                        <h5 className='commentComponent-container-wrapper-desc-header-name'>{data?.displayName}</h5>
                                        </Link>
                                        <p className='commentComponent-container-wrapper-desc-header-time'>{data?.created_at.toDate().toString()}</p>
                                    </div>
                                    <div className='commentComponent-container-wrapper-desc-bottom'>
                                        {
                                            editState && editDataIndex===index ?
                                            <div className='commentComponent-container-wrapper-desc-bottom-editInput'>
                                                <textarea
                                                type='text'
                                                value={editData}
                                                onChange={(e)=>setEditData(e?.target?.value)}
                                                ref={inputRef}
                                                onKeyPress={increaseHeight}
                                                onKeyUp={increaseHeight}
                                                style={{height:`${height}px`}}
                                                row='4'
                                                column='60'
                                                />
                                                <div className='commentComponent-container-wrapper-desc-bottom-editInput-btn'>
                                                    <button className='commentComponent-container-wrapper-desc-bottom-editInput-btn-cancel' onClick={handeledit}>Cancel</button>
                                                    <button className='commentComponent-container-wrapper-desc-bottom-editInput-btn-update' onClick={()=>submitEditData(data)}>Update</button>
                                                   
                                                </div>    
                                            </div>
                                            :
                                            <p className='commentComponent-container-wrapper-desc-bottom-comment'>{data?.reviewComment}</p>
                                        }
                                         
                                         {
                                           user?.uid === data?.userUID && !editState &&
                                            <div ref={optionRef} className='commentComponent-container-wrapper-desc-bottom-options'>
                                                <div onClick={()=>chooseOption(index)}>

                                                  <HoriZontalDots className='commentComponent-container-wrapper-desc-bottom-options-icon' />
                                                </div>
                                                  <div ref={optionModalRef} className={`commentComponent-container-wrapper-desc-bottom-options-editAndDelete ${optionCheck && editDataIndex===index?'commentComponent-container-wrapper-desc-bottom-options-editAndDelete-active':''}`}>
                                                    <div className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-edit' onClick={()=>handleEdit(data,index)} >
                                                       <EditIcon  className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-edit-icon' />
                                                       <span className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-edit-text'>Edit</span>
                                                     </div>
                                                     
                                                     <div className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-delete' onClick={()=>confirmDelete(data)}>
                                                       <Delete className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-delete-icon' />
                                                       <span className='commentComponent-container-wrapper-desc-bottom-options-editAndDelete-delete-text'>Delete</span>
                                                     </div>
                                                  </div>    
                                            </div>    
                                         }
                                         
                                      
                                    </div>

                                </div>
                            </div>
                            
                
                </div>
            
            
                     
                </>
              
            })}
            
            {
                 showLoadMoreComments && slideReviews?.length>4 && commentFound &&
                <div className='slideComments-load-more-container' onClick={loadMoreComments}>
                     {
                        showMoreCommentsLoading &&
                        <Loading />
                    }
                    <Button type="primary-outline-rounded" label="Load More comments" labelColor="black" />
                   
                </div>
                }
        </div>
        
    )
}
export default React.memo(CommentComponent)
