import React from 'react';
import './_social_icons.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faGithub,faInstagram,faLinkedin,
    faPinterest,faYoutube,faSlack,faReddit,faDribbble,faVimeo,faTumblr} from '@fortawesome/free-brands-svg-icons'
import {faGlobe } from '@fortawesome/free-solid-svg-icons'




export const SocialIcons = (props) => {
    const className = `Icons__button ${props.type} ${props.styles}`;
   const render_icon =()=>{
    switch (props.icon) {
        case 'facebook':
            return <FontAwesomeIcon  icon={faFacebook} /> 
        case 'twitter':
            return <FontAwesomeIcon icon={faTwitter} />
        case 'globe':
            return <FontAwesomeIcon  icon={faGlobe} />
        case 'git':
            return <FontAwesomeIcon  icon={faGithub} />
        case 'youtube':
            return <FontAwesomeIcon  icon={faYoutube} />
        case 'tumblr':
            return <FontAwesomeIcon  icon={faTumblr} />
        case 'slack':
            return <FontAwesomeIcon  icon={faSlack} />
        case 'pintrest':
            return <FontAwesomeIcon  icon={faPinterest} />
        case 'reddit':
            return <FontAwesomeIcon  icon={faReddit} />
        case 'linkedin':
            return <FontAwesomeIcon  icon={faLinkedin} />
        case 'instagram':
            return <FontAwesomeIcon  icon={faInstagram} />
      
    }
   }
    return <button className={className}>
    {render_icon()}
   
    </button>

    

    
    
}
