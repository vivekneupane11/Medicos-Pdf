import React from 'react'
import { Avatar, Images } from '../../../../components/global/images'
import './_reviews.scss'
import HeartFill from '../../../../components/global/icons/heart_fill';
import EditIcon from '../../../../components/global/icons/edit';
import SendIcon from '../../../../components/global/icons/send';
import ShareIcon from '../../../../components/global/icons/share';

export const Reviews = ({ profilePic, reviews, username }) => {
    return (
        <div className="review">
            <div className="review-input-container">
                <div className="review-input-container-profile">
                    <Avatar Image={profilePic} text={username} />
                </div>
                <div className="review-input-container-textarea">
                    <EditIcon className="edit"  />
                    <input
                        type="textfield" placeholder="Write your Reviews" />
                    <div >
                        <SendIcon className="send"/>
                    </div>
                </div>




            </div>
            {reviews.map((review,index) => {
                return <div key={index} className={`review-box`}>
                    <Images Image={review.profilePic} type="rounded" />
                    <div className={`reviewarea`}>
                        <h5>{review.userDisplayName}</h5>
                        <p>{review.review}</p>
                        <div className="button-container">
                            <div className="like">
                                <HeartFill className="like-icon" />
                                <p>{review.likes} likes</p>
                            </div>
                            <div className="share">
                                <ShareIcon className="share-icon"  />
                                <p>{review.shares} shares</p>
                            </div>
                            <div className="time">
                                <p>{review.time} hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>

            })}
        </div>
    )
}
