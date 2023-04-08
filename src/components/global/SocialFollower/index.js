import React from 'react';
import './_socialFollower.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faGithub,faInstagram,faLinkedin,
    faPinterest,faYoutube,faSlack,faReddit,faDribbble,faVimeo,faTumblr} from '@fortawesome/free-brands-svg-icons'
import {faGlobe } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';


export const SocialFollower = (props) => {
    const className = `Social__follower ${props.type}`;

    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
   const render_icon =()=>{
    switch (props.icon) {
        case 'facebook':
            return <FontAwesomeIcon className="icon" icon={faFacebook} />
        case 'twitter':
            return <FontAwesomeIcon className="icon" icon={faTwitter} />
        case 'globe':
            return <FontAwesomeIcon className="icon"  icon={faGlobe} />
        case 'git':
            return <FontAwesomeIcon className="icon"  icon={faGithub} />
        case 'youtube':
            return <FontAwesomeIcon className="icon"  icon={faYoutube} />
        case 'tumblr':
            return <FontAwesomeIcon className="icon" icon={faTumblr} />
        case 'slack':
            return <FontAwesomeIcon className="icon" icon={faSlack} />
        case 'pintrest':
            return <FontAwesomeIcon className="icon" icon={faPinterest} />
        case 'reddit':
            return <FontAwesomeIcon className="icon" icon={faReddit} />
        case 'linkedin':
            return <FontAwesomeIcon className="icon"  icon={faLinkedin} />
        case 'instagram':
            return <FontAwesomeIcon className="icon" icon={faInstagram} />
        case 'vimeo':
        return <FontAwesomeIcon className="icon" icon={faVimeo} />
      
    }
   }
    return <a onClick={()=>newTab(props.link)} className='socialFollower-link'>
        <div className={className}>
        
        <div className="label">
        <h5 className="name">{props.label}</h5> 
            <h6 className="follower">{props.followers}</h6>
        </div> 
        <div className="icon">
            {render_icon()} 

        </div>
        </div>
    </a>
   
   
}
