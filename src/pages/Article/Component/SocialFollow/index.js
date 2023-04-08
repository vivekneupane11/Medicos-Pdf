import React from 'react'
import { SocialFollower } from '../../../../components/global/SocialFollower'
import './_socialfollow.scss';

export const SocialFollow = () => {

    return (
    <div className="socialfollow">
    <h3 className="socialfollow-heading"> Social Follow and Subscribe </h3>
         <SocialFollower type="facebook" label="Facebook" icon="facebook" followers="63k followers" link='https://www.facebook.com/Medicos.int7'/>
         <SocialFollower type="instagram" label="Instagram" icon="instagram" followers="12.2k followers" link='https://www.instagram.com/medicos.international/'/>
         <SocialFollower type="twitter" label="Twitter" icon="twitter" followers='' link="https://twitter.com/medicosint7"/>
         <SocialFollower type="youtube" label="Youtube" icon="youtube" followers='' link='https://www.youtube.com/channel/UCjPxl-Mpqkilfsmv9yT5ZvQ'/>
            
        </div>
    )
}
