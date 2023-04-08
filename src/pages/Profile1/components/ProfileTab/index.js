import React from 'react'
import './_profileTab.scss';
import { Summary } from '../Summary';
import { useState } from 'react';
import LikedSlidesAndBooks from '../LikedSlidesAndBooks';
import UserUploads from '../UserUploads';
import ProfilePreference from '../../profilePreference';

export const ProfileTab = ({ profileNav, user }) => {
    const [active, setActive] = useState(profileNav[0]);
    const renderBody = () => {
        switch (active) {
            case 'Liked':
                return <LikedSlidesAndBooks user={user} />
            case 'Uploads':
                return <UserUploads user={user} />
            case 'Preference':
                return <ProfilePreference user={user} />    
            default:
                return <Summary user={user} />
        }
    }
    return (
        <>
            <div className="profileTab-wrapper" >
                {
                    profileNav.map((item) => {
                        return <div key={item} className={active === item ? "profileTab-wrapper-item-active" : "profileTab-wrapper-item"} onClick={() => setActive(item)}>
                            <p >{item}</p>
                        </div>
                    })
                }
            </div>
            <div className="profileTab-body-wrapper">
                {renderBody()}
            </div>

        </>
    )
}
