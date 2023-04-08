import React from 'react'
import { newTab } from '../../../../functions/newTabMethod'
import './_followUs.scss'
const FollowUs = ({details}) => {

    return (
        <>
        <div className="newsDetailFollowUs-container">
            <h3  className="newsDetailFollowUs-container-head">Follow us</h3>
            <div  className="newsDetailFollowUs-container-cards">
                {details.map(data => (
                    <div key={data.id} className="newsDetailFollowUs-container-cards-card" style={{ backgroundColor: `${data.bgColor}` }}>
                        <a className="newsDetailFollowUs-container-cards-card-link" onClick={()=>newTab(data.socialmedialink,data.socialmedianame,'social_media_visited')} >
                            <div className="newsDetailFollowUs-container-cards-card-link-wrapper">
                                <h5 className="newsDetailFollowUs-container-cards-card-link-wrapper-head">{data.socialmedianame}</h5>
                                <p className="newsDetailFollowUs-container-cards-card-link-wrapper-para">{data.likes}</p>
                            </div>

                            <div>
                            {data.logo}
                            </div>
                        </a>
                    </div>
                  
                ))}
            </div>
        </div>
            
        </>
    )
}

export default FollowUs
