import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes, faThumbsUp, faShare, faPlus, faComment } from '@fortawesome/free-solid-svg-icons'
import "./_comment.scss";

const Comment = ({ comments }) => {

    return (
        <div className="comment-container">
            <div className={`comment-container-wrapper`}>
                <h5 className={`comment-container-wrapper-header-title`}>Activity feed</h5>
                <div className="post-container">
                    <div className="post-container-header">
                        <div className="post-container-header-user-info">
                            <img className="post-container-header-user-picture" src={require("../../assets/images/profile1.png")?.default} />
                            <div className="post-container-header-user-text">
                                <h5>John Snow</h5>
                                <p>3 days ago</p>
                            </div>
                        </div>
                        <div className="post-container-header-button">
                            <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                            <h5>FOLLOW</h5>
                        </div>
                    </div>
                    <div className="post">
                        <p className="post-caption">Personal profiles are the perfect way for you to grab their attention and persuade recruiters to continue reading your CV because you’re telling them from the off exactly why they should hire you.</p>
                        <img className="post-image" src={require("../../assets/images/post.png")?.default} />
                        <div className="post-bottom-container">
                            <div className="post-button-container">
                                <div className="post-button-container-like">
                                    <FontAwesomeIcon className="post-button-container-like-icon" icon={faThumbsUp} />
                                    <p>152</p>
                                </div>
                                <div className="post-button-container-comment">
                                    <FontAwesomeIcon className="post-button-container-icon" icon={faComment} />
                                    <p>15</p>
                                </div>
                                <div className="post-button-container-share">
                                    <FontAwesomeIcon className="post-button-container-icon" icon={faShare} />
                                    <p>15</p>
                                </div>
                            </div>
                            <div className="post-follower">
                                <div className="post-follower-image-container">
                                    <img className="post-follower-image-container-one" src={require("../../assets/images/profile2.png")?.default} />
                                    <img className="post-follower-image-container-two" src={require("../../assets/images/profile3.png")?.default} />
                                    <img className="post-follower-image-container-three" src={require("../../assets/images/profile1.png")?.default} />
                                </div>
                                <p>and 30+ more</p>
                            </div>
                        </div>
                    </div>
                </div>
                {comments.map((comment,index) => {
                    return <div className={`comment-box`} key={index}>
                        <img className="comment-profile-picture" src={comment?.userImage?.default} />
                        <div className={`comment`}>
                            <h5>{comment.userDisplayName}</h5>
                            <p>{comment.comment}</p>
                            <div className="button-container">
                                <div className="like">
                                    <FontAwesomeIcon className="like-icon" icon={faThumbsUp} />
                                    <p>{comment.likes} likes</p>
                                </div>
                                <div className="share">
                                    <FontAwesomeIcon className="share-icon" icon={faShare} />
                                    <p>{comment.shares} shares</p>
                                </div>
                            </div>
                        </div>
                    </div>

                })}
                <div className="comment-input-container">
                    <img className="comment-input-container-picture" src={require("../../assets/images/profile3.png").default} />
                    <textarea className="comment-input-container-textarea" placeholder="Write your comment" rows="1"  />
                </div>
            </div>
        </div>
    )
}

export default Comment
