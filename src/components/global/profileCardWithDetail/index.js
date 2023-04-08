import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaseballBall, faCog, faCaretDown, faUserGraduate, faSmile, faListUl } from '@fortawesome/free-solid-svg-icons';

import {
    faFacebook, faTwitter, faGithub, faInstagram, faLinkedin, faPinterest, faYoutube, faSlack, faReddit, faDribbble, faVimeo, faTumblr
} from '@fortawesome/free-brands-svg-icons';
import "./_profileCardWithDetail.scss";
import NewsLinkTag from '../newsLinkTag';

const ProfileCardWithDetail = ({profileImage, userName, description, level,link}) => {
    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
    
    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index %2 == 0) {
            color = 'skyblue'
        } 
        return color;
    }
    return (
       <div className={`profile-card-with-detail-container`} >
            <div className={`profile-card-with-detail-container-wrapper`}>
            <div onClick={()=>newTab(link)}  className="profile-card-with-detail-container-wrapper-picture" style={{backgroundImage: `url(${profileImage})`}}>
                {/* <h5 className="text">{userName}</h5> */}
                <div className="text">
                  <NewsLinkTag color={getColorsByIndex(15)} tag={userName} />
                </div>
               
              
            </div>
            <div className={`profile-card-with-detail-container-wrapper-content`}>
                <h5 onClick={()=>newTab(link)} >{level}</h5>
               
                <p dangerouslySetInnerHTML={{__html: description} }></p>
                <div className={`profile-card-with-detail-container-wrapper-footer`}>
                    <FontAwesomeIcon className="profile-card-with-detail-container-wrapper-footer-icon1 icon" icon={faInstagram} onClick={()=>newTab('https://www.instagram.com/medicos.international/')}/>
                    <FontAwesomeIcon className="profile-card-with-detail-container-wrapper-footer-icon2 icon" icon={faTwitter} onClick={()=>newTab('https://twitter.com/medicosint7')}/>
                    <FontAwesomeIcon className="profile-card-with-detail-container-wrapper-footer-icon3 icon" icon={faFacebook} onClick={()=>newTab('https://www.facebook.com/Medicos.int7')}/>
                </div>

            </div>
        </div>
       </div>

    )
}

export default ProfileCardWithDetail
