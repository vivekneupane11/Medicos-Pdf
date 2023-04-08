import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './_followUs.scss'
const FollowUs = ({details}) => {
    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
    return (
        <>
        <div className="newsDetailFollowUs-container">
            <h3  className="newsDetailFollowUs-container-head">Follow us</h3>
            <div  className="newsDetailFollowUs-container-cards">
                {details.map(data => (
                    <div key={data.id} className="newsDetailFollowUs-container-cards-card" style={{ backgroundColor: `${data.bgColor}` }}>
                        <a className="newsDetailFollowUs-container-cards-card-link" onClick={()=>newTab(data.socialmedialink)} >
                            <div className="newsDetailFollowUs-container-cards-card-link-wrapper">
                                <h5 className="newsDetailFollowUs-container-cards-card-link-wrapper-head">{data.socialmedianame}</h5>
                                <p className="newsDetailFollowUs-container-cards-card-link-wrapper-para">{data.likes}</p>
                            </div>
                            <FontAwesomeIcon icon={data.logo} className="newsDetailFollowUs-container-cards-card-link-icon" />
                        </a>
                    </div>
                  
                ))}
            </div>
        </div>
            
        </>
    )
}

export default FollowUs
