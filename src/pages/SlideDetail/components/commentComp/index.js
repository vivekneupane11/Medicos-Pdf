import React, { useState, useEffect } from 'react';
import firebase from "firebase";


import { comment } from '../../../../components/constants/mock'
import './_commentComp.scss'

const CommentComponent = ({ title }) => {
    const [slideReviews, setSlideReviews] = useState([])
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            try {
                firebase.firestore().collection('Web-Slide-Reviews')
                    .doc(title)
                    .collection("Comments")
                    .orderBy('created_at', 'desc')
                    .limit(5)
                    .onSnapshot((querySnapshot) => {
                        if (querySnapshot) {
                            let slideReviewsData = [];
                            querySnapshot.forEach((doc) => {
                                slideReviewsData.push(doc?.data())
                                console.log(("This is comment", doc.data().created_at.toDate()));
                            })
                            setSlideReviews(slideReviewsData);
                        }
                    })
            } catch (error) {
                console.log("Error while fetching slide reviews", error);
            }
        }
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className='wholeCommentContainer'>
            <h3 className='commentComponent-head'>Reviews</h3>
            {slideReviews?.map((data, index) => {
                {/* console.log('====================================');
                console.log(typeof(data.created_at.toDate().toString()));
                console.log('===================================='); */}
                return <div key={index} className='commentComponent-container'>
                    <div className='commentComponent-container-wrapper'>
                        <div className='commentComponent-container-wrapper-col1'>
                            <img src={data.photoURL} alt='profile' className='commentComponent-container-wrapper-col1-profile' />
                        </div>

                        <div className='commentComponent-container-wrapper-desc'>
                            <div className="commentComponent-container-wrapper-desc-header">
                                <h5 className='commentComponent-container-wrapper-desc-name'>{data.displayName}</h5>
                                <p className='commentComponent-container-wrapper-desc-time'>{data?.created_at.toDate().toString()}</p>
                            </div>
                            <p className='commentComponent-container-wrapper-desc-comment'>{data.reviewComment}</p>

                        </div>
                    </div>



                </div>
            })}
        </div>
    )
}

export default CommentComponent
