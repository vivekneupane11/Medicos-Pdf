import React, { useState, useContext, useRef, useEffect, useReducer } from 'react'
import { Avatar, Images } from '../../../../components/global/images'
import './_reviews.scss';
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';

import { FiSend } from "react-icons/fi";
import { AuthContext } from '../../../../components/signUp/authMethods/authentication';


export const Reviews = ({ data, profilePic, reviews, username }) => {
    let inputRef = useRef();
    const firestoreDatabase = firebase.firestore();
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [bookReviews, setBookReviews] = useState([])
    // console.log("This is review ", data);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firestoreDatabase.collection('Web-Book-Reviews')
                    .doc(data?.title)
                    .collection("Comments")
                    .orderBy('created_at', 'desc')
                    .limit(5)
                    .onSnapshot((querySnapshot) => {
                        if (querySnapshot) {
                            let bookReviewsData = [];
                            querySnapshot.forEach((doc) => {
                                bookReviewsData.push(doc?.data())
                                // console.log(("This is comment", doc));
                            })
                            setBookReviews(bookReviewsData);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching book reviews", error);
            }
        }
        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        function enterHandler(event) {
            if (event.key == "Enter") {
         
                if (comment != "") {
                    addComment()
                } else {
                    toast.error("Please enter some text")
                }
            }
        }
        inputRef?.current?.addEventListener("keyup", enterHandler)
        return () => {
            inputRef?.current?.removeEventListener('keyup', enterHandler)
        }
    }, [comment])

    function addComment() {
     
        try {
            firestoreDatabase.collection('Web-Book-Reviews')
                .doc(data?.title)
                .collection("Comments")
                .add({
                    userUID: user?.uid,
                    user: user?.email,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                    title: data?.title,
                    subject: data?.subject,
                    reviewComment: comment,
                    created_at: new Date()
                })
                .then((res) => {
                    setComment("")
                    toast.success("Review successfully added")
                })
        } catch (error) {
            toast.error("Error while adding review")
        
        }
    }

    return (
        <div className="review">
       
            <div className="review-input-container">
                <div className="review-input-container-profile">
                    <Avatar Image={profilePic} text={username} />
                </div>
                <div className="review-input-container-textarea">
                    <FontAwesomeIcon className="edit" icon={faEdit} />
                    <input
                        ref={inputRef}
                        onChange={(e) => setComment(e?.target?.value)}
                        type="textfield" value={comment} placeholder="Write your Reviews" />
                    <div onClick={() => addComment()} className="send">
                        <FiSend />
                    </div>
                </div>




            </div>
            {bookReviews.reverse().map((review, index) => {
                if (index <= 5) {
                    return <div key={index} className={`review-box`}>
                        <Images Image={review?.photoURL} type="rounded" />
                        <div className={`reviewarea`}>
                            <h5 >{review?.displayName}</h5>
                            <p>{review?.reviewComment}</p>
                            
                        </div>
                    </div>
                }
            })}
        </div>
    )
}
