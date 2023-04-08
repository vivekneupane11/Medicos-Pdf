import React from 'react';
import './_socialFollower.scss'
import { newTab } from '../../../functions/newTabMethod';
import FacebookIcon from '../icons/SocialIcon/facebook';
import Globe from '../icons/globe';
import GithubIcon from '../icons/SocialIcon/github';
import PiIntrestIcon from '../icons/SocialIcon/piIntrest';
import LinkedinIcon from '../icons/SocialIcon/linkedin';
import InstagramIcon from '../icons/SocialIcon/instagram';
import TwitterIcon from '../icons/SocialIcon/twitter';


export const SocialFollower = (props) => {
    const className = `Social__follower ${props.type}`;

   const render_icon =()=>{
    switch (props.icon) {
        case 'facebook':
            return <FacebookIcon className="icon"  />
        case 'twitter':
            return <TwitterIcon className="icon" />
        case 'globe':
            return <Globe className="icon"  />
        case 'git':
            return <GithubIcon className="icon"   />
   
        // case 'tumblr':
        //     return <FontAwesomeIcon className="icon"  />
        // case 'slack':
        //     return <FontAwesomeIcon className="icon" />
        case 'pintrest':
            return <PiIntrestIcon className="icon"  />
        // case 'reddit':
        //     return <FontAwesomeIcon className="icon"  />
        case 'linkedin':
            return <LinkedinIcon className="icon"   />
        case 'instagram':
            return <InstagramIcon className="icon"  />
        // case 'vimeo':
        // return <FontAwesomeIcon className="icon" />
      
    }
   }
   const clickhandlernewtablink = ()=>newTab(props.link,props.icon,'social_media_visited')
       return <a onClick={clickhandlernewtablink} className='socialFollower-link'>
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
