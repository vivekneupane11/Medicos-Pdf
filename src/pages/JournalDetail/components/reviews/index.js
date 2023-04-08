import React from 'react'
import { Avatar, Images } from '../../../../components/global/images'
import './_reviews.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Headings } from '../../../../components/global/headings'
import { DisplayTitle } from '../../../../components/global/Titles'
import { FiSend } from "react-icons/fi";

export const Reviews = ({ profilePic, reviews, username }) => {
    return (
        <div className="review">
            <div className="review-input-container">
                <div className="review-input-container-profile">
                    <Avatar Image={profilePic} text={username} />
                </div>
                <div className="review-input-container-textarea">
                    <FontAwesomeIcon className="edit" icon={faEdit} />
                    <input
                        type="textfield" placeholder="Write your Reviews" />
                    <div className="send">
                        <FiSend />
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
                                <FontAwesomeIcon className="like-icon" icon={faHeart} />
                                <p>{review.likes} likes</p>
                            </div>
                            <div className="share">
                                <FontAwesomeIcon className="share-icon" icon={faReply} />
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
