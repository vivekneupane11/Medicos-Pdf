import React, { useState } from 'react'
import './_longCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons'


const LongCard = ({ }) => {
    return (
        <>
           <div className="longCard-container">
           <div className={`longCard-container-wrapper`}>
                    <img className="longCard-container-wrapper-picture" src={require("../../../assets/images/card3.png")?.default} />
                    <div className={`longCard-container-wrapper-topic`}>
                        <FontAwesomeIcon className="icon" icon={faGift} />
                        <p>Features</p>
                    </div>
                    <div className={`longCard-container-wrapper-content`}>
                        <h5>FiftyThree Files For Paper</h5>
                        <p>Yesterday, as Facebook launched its news reader app Paper, design-focused startup FiftyThree called out Facebook...</p>
                    </div>
                </div>
 
           </div>    
        </>
    )
}

export default LongCard