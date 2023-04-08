import React, { useState } from 'react'
import './_leaveAReply.scss';
import firebase from "firebase";
import { ToastContainer, toast } from 'react-toastify';


const LeaveAReply = ({ data, user }) => {
    const [input, setInput] = useState("");
    function addComment() {
        if (input != "") {
            try {
                firebase.firestore().collection('Web-Slide-Reviews')
                    .doc(data?.SlideName)
                    .collection('Comments')
                    .add({
                        userUID: user?.uid,
                        user: user?.email,
                        displayName: user?.displayName,
                        photoURL: user?.photoURL,
                        SlideName: data?.SlideName,
                        slideCategory: data?.slideCategory,
                        slideSubCategory: data?.slideSubCategory,
                        reviewComment: input,
                        created_at: new Date()
                    })
                    .then((res) => {
                        setInput("");
                        toast.success("Comment added successfully")
                    })
            } catch (error) {
                toast.error("Error while adding comment")
              
            }
        }
        else {
            toast.error("Please enter some text")
        }
    }
    return (
        <>
            <div className="leaveAReply-container">
                <h3 className="leaveAReply-container-head">Leave a Reply</h3>

                <div className="leaveAReply-container-form-message">
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} name="message" as="textarea" />
                </div>
                <button type="submit" onClick={() => addComment()} className="leaveAReply-container-form-btn">Post comment</button>

            </div>
        </>
    )
}

export default LeaveAReply
