import React from 'react';
import './_socialButton_link.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook,faTwitter,faGithub,faInstagram,faLinkedin,
    faPinterest,faYoutube,faSlack,faReddit,faDribbble,faVimeo,faTumblr} from '@fortawesome/free-brands-svg-icons'
import {faGlobe } from '@fortawesome/free-solid-svg-icons'




export const SocialButton_link = (props) => {
    const className = `SocialButtonlink ${props.type}`;
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
        case 'vimeo':
        return <FontAwesomeIcon  icon={faVimeo} />
      
    }
   }
    return <button className={className}>
    {render_icon()}
   
    </button>
}
