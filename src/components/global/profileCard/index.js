import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaseballBall, faCog, faCaretDown, faUserGraduate, faSmile, faListUl } from '@fortawesome/free-solid-svg-icons';

import {
    faFacebook, faTwitter, faGithub, faInstagram, faLinkedin, faPinterest, faYoutube, faSlack, faReddit, faDribbble, faVimeo, faTumblr
} from '@fortawesome/free-brands-svg-icons';
import "./_profileCard.scss";

const ProfileCard = ({profileImage,position, userName, skills, hobbies, level}) => {

    return (
        <div className="profile-card-container">
            <div className={`profile-card-container-wrapper`} style={{backgroundImage:`url(${profileImage.default})`}}>
                    <div className="profile-card-container-wrapper-content-button-container">
                        <FontAwesomeIcon className="icon" icon={faCog} />
                        <FontAwesomeIcon className="icon" icon={faCaretDown} />
                    </div>
                    <div className={`profile-card-container-wrapper-content`}>
                        <h5>{userName}</h5>
                        <p>{position}</p>
                        <div className="user-detail">
                            <div className="row1">
                                <div className="title">
                                    <FontAwesomeIcon className="icon" icon={faUserGraduate} />
                                    <p className="text">Skills</p>
                                </div>
                                <p className="text">{skills}</p>
                            </div>
                            <div className="row1">
                                <div className="title">
                                    <FontAwesomeIcon className="icon" icon={faSmile} />
                                    <p className="text">Hobbies</p>
                                </div>
                                <p className="text">{hobbies}</p>
                            </div>
                            <div className="row1">
                                <div className="title">
                                    <FontAwesomeIcon className="icon" icon={faListUl} />
                                    <p className="text">Level</p>
                                </div>
                                <p className="text">{level}</p>
                            </div>

                        </div>
                    </div>
                </div>

        </div>
    )
}

export default ProfileCard
