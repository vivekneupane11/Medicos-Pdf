import React from 'react'
import { SocialCard } from './socialIconCard'
import './_blogPost.scss';

export const BlogPosts = () => {
    return (
        <div >

        <div className="SocialCard">
            <div className="SocialCard-1">
            <SocialCard type="facebook" label="facebook" icon="facebook"/>

            </div>
            <div className="SocialCard-2">
            <SocialCard type="twitter" label="twitter" icon="twitter"/>

            </div>
            <div className="SocialCard-3">
            <SocialCard type="slack" label="Slack" icon="slack"/>

            </div>
            <div className="SocialCard-4">
            <SocialCard type="instagram" label="instagram" icon="instagram"/>

            </div>


        </div>
            
        </div>
    )
}
