// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import firebase from "firebase/compat/app";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../../../components/global/button';
import ConfirmationModal from '../../../../components/global/confirmationModal';
import { Avatar } from '../../../../components/global/images';
import Loading from '../../../../components/loading';
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';
import useLocalStorage from '../../../../customHooks/useLocalStorage';
import './_reviews.scss';

import Loadable from 'react-loadable';
// import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, limit, onSnapshot, orderBy, query,startAfter, updateDoc, where } from 'firebase/firestore';
import Delete from '../../../../components/global/icons/delete';
import EditIcon from '../../../../components/global/icons/edit';
import HoriZontalDots from '../../../../components/global/icons/dots_Horizontal';
import SendIcon from '../../../../components/global/icons/send';

const LoadableLoginModal =  Loadable({
    loader: () => import('../../../../components/global/loginModel').then(module => module.LoginModal),
    loading() {
      return <div style={{color:'gray'}}>Loading...</div>
    }
  });


export const Reviews = ({ data, profilePic, username }) => {
    let inputRef = useRef();
    //const firestoreDatabase = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [bookReviews, setBookReviews] = useState([])
    const [showFormModel, setShowFormModel] = useState(false)
    const [editData, setEditData] = useState(null)
    const [editState, setEditState] = useState(false)
    // const [selectedCommentData, setSelectedCommentData] = useState(null)
    const [editDataIndex, setEditDataIndex] = useState(null)
    const [checkOption, setCheckOption] = useState(false)
    const [height, setHeight] = useState(30)
    const editInputRef = useRef(null)
    const optionRef = useRef()
    const optionModalRef = useRef()
    const [confirmModalShowState,setConfirmModalShowState]=useState(false)
    const [confirmModalConfirmation,setConfirmModalConfirmation]=useState(false)
    const [deletingData,setDeletingData]=useState(null)
    const [showLoadMoreComments, setShowLoadMoreComments] = useState(false);
    const [showMoreCommentsLoading, setShowMoreCommentsLoading] = useState(false);
    const [lastComment, setLastComment] = useState();
    const [commentFound, setCommentFound] = useState(true);
    // const [commentLimit, setCommentLimit] = useState(5);
    const commentLimit =5;

    const [usernameLocalStorage, setUsernameLocalStorage] = useLocalStorage("username", null);
    // const db = getFirestore();
    const getFirebaseAll=()=>{
        return Promise.all([
          import('../../../../firebase/firestore')
        ])
        .then(([firestore])=>{
          return{firestore}
        })
      }

    useEffect(async() => {
        let isMounted = true;
        if (isMounted) {
            try {
                const {firestore:{db,query,collection,orderBy,limit,onSnapshot}}=await getFirebaseAll()

               
                // firestoreDatabase.collection('Web-Book-Reviews')
                //     .doc(data?.title)
                //     .collection("Comments")
                //     .orderBy('created_at', 'desc')
                //     .limit(commentLimit)
               
                const colRef= query(collection(db,"Web-Book-Reviews",data?.title,"Comments"),
                orderBy('created_at', 'desc')
                ,limit(commentLimit))

                onSnapshot(colRef,(querySnapshot) => {
                        if (querySnapshot) {
                            let bookReviewsData = [];
                            querySnapshot.forEach((doc) => {
                                bookReviewsData.push(doc?.data())
                            })
                            if (bookReviewsData.length === 0) {
                                setCommentFound(false)        
                            }
                            else{
                                setShowLoadMoreComments(true)
                            }
                            setShowMoreCommentsLoading(false);
                            setLastComment(bookReviewsData[bookReviewsData?.length - 1])
                            setBookReviews(bookReviewsData);

                        }

                    }
                  
                   )
               
                   
                   
            } catch (error) {
                console.log("Error while fetching book reviews", error);
            }
            
            
        }
        
        return () => {
            isMounted = false
        }
    }, [commentLimit,data?.title])

    useEffect(() => {
        function enterHandler(event) {
            if (event.key === "Enter") {

                if(user?.uid){
                    if (comment !== "") {
                        addComment()
                    }
                     else {
                        toast.error("Please enter some text", { theme: 'dark', hideProgressBar: true })
                    }

                }
                else{
                    setShowFormModel(true)
                }
               

                
            }
        }
        inputRef?.current?.addEventListener("keyup", enterHandler)
        return () => {
            inputRef?.current?.removeEventListener('keyup', enterHandler)
        }
    }, [comment, editData])

    async function addComment() {
        if(comment!=='' && user && usernameLocalStorage){
            try {
                const{firestore:{db,addDoc,collection}}=await getFirebaseAll()
                addDoc(collection(db,'Web-Book-Reviews',data?.title,"Comments"),
                {
                    userUID: user?.uid,
                    user: user?.email,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                    title: data?.title,
                    username: usernameLocalStorage,
                    subject: data?.subject,
                    reviewComment: comment,
                    created_at: new Date()
                }
                )

                // firestoreDatabase.collection('Web-Book-Reviews')
                //     .doc(data?.title)
                //     .collection("Comments")
                //     .add({
                //         userUID: user?.uid,
                //         user: user?.email,
                //         displayName: user?.displayName,
                //         photoURL: user?.photoURL,
                //         title: data?.title,
                //         username: usernameLocalStorage,
                //         subject: data?.subject,
                //         reviewComment: comment,
                //         created_at: new Date()
                //     })
                   
                        setComment("")
                        toast.success("Review successfully added", { theme: 'dark', hideProgressBar: true })
                    
            } catch (error) {
                toast.error("Error while adding review", { theme: 'dark', hideProgressBar: true })
    
            }

        }
        else{
            toast.error("Please Enter some text", { theme: 'dark', hideProgressBar: true })
        }
       
    }
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

    const handleEdit = (data, index) => {
        if (data?.reviewComment) {
            setEditData(data?.reviewComment)
            setCheckOption(false)
            setEditState(true)
            setEditDataIndex(index)
        }


    }

    const submitEditData = async(data) => {
        if (data) {
            try {
                const {firestore:{db,query,collection,where,getDocs,updateDoc,doc}}=await getFirebaseAll()
                const colRef= query(collection(db,'Web-Book-Reviews',data?.title,"Comments"),
                where('reviewComment', '==', data?.reviewComment),
                where('created_at', '==', data?.created_at))
                getDocs(colRef)

                // firestoreDatabase.collection('Web-Book-Reviews')
                //     .doc(data?.title)
                //     .collection("Comments")
                //     .where('reviewComment', '==', data?.reviewComment)
                //     .where('created_at', '==', data?.created_at)
                //     .get()
                    .then((res) => {

                        if (res && editData!=='') {
                            updateDoc(doc(db,'Web-Book-Reviews',data?.title,'Comments',res?.docs[0]?.id),
                            {
                                reviewComment: editData,
                                created_at: new Date()
                            })
                            // firestoreDatabase.collection('Web-Book-Reviews')
                            //     .doc(data?.title)
                            //     .collection("Comments")
                            //     .doc(res?.docs[0]?.id)
                            //     .update({
                            //         reviewComment: editData,
                            //         created_at: new Date()
                            //     })
                                .then((res) => {

                                    toast.success("Review successfully edited", { theme: 'dark', hideProgressBar: true })
                                    setEditState(false)
                                })
                        }
                        else{
                            toast.error("Review should not be empty", { theme: 'dark', hideProgressBar: true })
                        }
                    })

            } catch (error) {
                toast.error("Error while adding review", { theme: 'dark', hideProgressBar: true })

            }
        }

    }


  const confirmDelete=(data)=>{
      if(data){
        setDeletingData(data)
        setConfirmModalShowState(true)
      }

       
    }
    const handleDelete = async(data) => {
        if (data) {
            try {
                const {firestore:{db,query,collection,where,getDocs,deleteDoc,doc}}=await getFirebaseAll()

                const colRef= query(collection(db,'Web-Book-Reviews',data?.title,"Comments"),
                where('reviewComment', '==', data?.reviewComment),
                where('created_at', '==', data?.created_at))
                getDocs(colRef)
                // firestoreDatabase.collection('Web-Book-Reviews')
                //     .doc(data?.title)
                //     .collection("Comments")
                //     .where('reviewComment', '==', data?.reviewComment)
                //     .where('created_at', '==', data?.created_at)
                //     .get()
                    .then((res) => {

                        if (res) {
                            deleteDoc(doc(db,'Web-Book-Reviews',data?.title,"Comments",res?.docs[0]?.id))
                            // firestoreDatabase.collection('Web-Book-Reviews')
                            //     .doc(data?.title)
                            //     .collection("Comments")
                            //     .doc(res?.docs[0]?.id)
                            //     .delete()
                                .then((res) => {
                                    toast.success("Review successfully deleted", { theme: 'dark', hideProgressBar: true })
                                    setEditState(false)
                                    setCheckOption(false)
                                    setConfirmModalShowState(false)
                                    setConfirmModalConfirmation(false)
                                })
                        }
                    })
            } catch (error) {
                toast.error("Error while deleting review", { theme: 'dark', hideProgressBar: true })

            }
        }
    }

    const chooseOption = (index) => {
        setCheckOption(!checkOption)
        setEditDataIndex(index)
    }

    const increaseHeight = (e) => {
        setHeight(editInputRef.current.scrollHeight)

    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (checkOption && optionRef.current && !optionModalRef.current) {
                setCheckOption(false)
               
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [checkOption])



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
            const {firestore:{db,query,collection,startAfter,getDocs,limit,orderBy}}=await getFirebaseAll()

            setShowMoreCommentsLoading(true);
            const colRef=query(collection(db,'Web-Book-Reviews',data?.title,'Comments')
            ,orderBy('created_at', 'desc'),
            startAfter(lastComment?.created_at),
            limit(commentLimit))
            getDocs(colRef)
            // firebase.firestore()
            //     .collection('Web-Book-Reviews')
            //     .doc(data?.title)
            //     .collection('Comments')
            //     .orderBy('created_at', 'desc')
            //     .startAfter(lastComment?.created_at)
            //     .limit(commentLimit)
            //     .get()
                .then(querySnapshot => {
                    let allData = []
                    querySnapshot.forEach(ele => {
                        allData.push(ele.data());

                    })
                    setLastComment(allData[allData?.length - 1])
                    if (allData?.length === 0) {
                        setShowLoadMoreComments(false)
                    }
                    setShowMoreCommentsLoading(false);
                    setBookReviews((init) => [...init, ...allData])

                })
        } catch (error) {
            console.log('Error fetching more user comment', error)
        }
    }

    const clickhandleraddcomment = () => addComment()
    const clickhandlersend = () => setShowFormModel(true)
    return (
        <div className="review">
            <LoadableLoginModal show={showFormModel} formModel={FormModel} />
            <ConfirmationModal show={confirmModalShowState} cancel={cancelConfirmModal} confirm={ConfirmModalConfirmation}/>
            <div className="review-input-container">

                <Link
                    className='links'
                    to={{
                        pathname: `/profile/${usernameLocalStorage}`,
                    }}
                >
                    <div className="review-input-container-profile">
                        <Avatar Image={profilePic} text={usernameLocalStorage} />
                    </div>
                </Link>
                <div className="review-input-container-textarea">
                    <EditIcon className="edit" />
                    <input
                        ref={inputRef}
                        onChange={(e) => setComment(e?.target?.value)}
                        value={comment}
                        type="text"
                        placeholder="Write your Reviews"
                    />
                    {
                        user ?

                            <div onClick={clickhandleraddcomment} >
                                <SendIcon className="send" />
                            </div>
                            :
                            <div onClick={clickhandlersend} >
                                  <SendIcon className="send"/>
                            </div>
                    }
                </div>




            </div>
            {
                !bookReviews.length && <section className="review-section">
                    <p>Be the first one to review.</p>
                </section>
            }
            {
            bookReviews.map((review, index) => {
                    return <div key={index} className={`review-box`}>

                        <Link
                            className='links'
                            to={{
                                pathname: `/profile/${review?.username}`,
                            }}
                        >
                            <Avatar size={'38px'} Image={review?.photoURL} text={review?.username} />
                        </Link>


                        <div className={`reviewarea`}>
                            <div className='reviewarea-top' >
                                <Link
                                    className='links'
                                    to={{
                                        pathname: `/profile/${review?.username}`,
                                    }}
                                >
                                    <h5>{review?.displayName ? review?.displayName : review?.username}</h5>
                                </Link>
                                {
                                    user?.uid === review.userUID &&
                                    <div ref={optionRef} className='reviewarea-top-options' >
                                        <div onClick={() => chooseOption(index)}>

                                        <HoriZontalDots className='reviewarea-top-options-icon'  />
                                        </div>
                                        {

                                            <div ref={optionModalRef} className={`reviewarea-top-options-container ${checkOption && editDataIndex === index ? 'reviewarea-top-options-container-active' : ''}`} >

                                                <div className='reviewarea-top-options-container-edit' onClick={() => handleEdit(review, index)}>
                                                    <EditIcon className='reviewarea-top-options-container-edit-icon' />
                                                    <span className='reviewarea-top-options-container-edit-text'>Edit</span>
                                                </div>

                                                <div className='reviewarea-top-options-container-delete' onClick={() => confirmDelete(review)}>
                                                    <Delete className='reviewarea-top-options-container-delete-icon' />
                                                    <span className='reviewarea-top-options-container-delete-text'>Delete</span>
                                                </div>

                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <div className='reviewarea-bottom' >

                                {
                                    editState && editDataIndex === index ?
                                        <div className='reviewarea-top-editInput'>
                                            <textarea
                                                type='text'
                                                value={editData}
                                                onChange={(e) => setEditData(e?.target?.value)}
                                                ref={editInputRef}
                                                onKeyPress={increaseHeight}
                                                onKeyUp={increaseHeight}
                                                style={{ height: `${height}px` }}
                                                row='4'
                                                column='60'
                                            />
                                            <div className='reviewarea-top-editInput-btn'>
                                                <button className='reviewarea-top-editInput-btn-cancel' onClick={() => setEditState(false)}>Cancel</button>
                                                <button className='reviewarea-top-editInput-btn-update' onClick={() => submitEditData(review)}>Update</button>
                                            </div>
                                        </div>
                                        :
                                        <p>{review?.reviewComment}</p>
                                }


                            </div>

                        </div>
                    </div>
                
            })}
             {
                 showLoadMoreComments && bookReviews?.length>4 && commentFound &&
                <div className='reviews-load-more-container' onClick={loadMoreComments}>
                     {
                        showMoreCommentsLoading &&
                        <Loading />
                    }
                    <Button type="primary-outline-rounded" label="Load more comments" labelColor="black" />
                   
                </div>
                }
        </div>
    )
}

