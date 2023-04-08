import React from 'react'
import './_buttonWithArrow.scss'
import {HiArrowNarrowRight} from "react-icons/hi";

const ButtonWithArrow = ({name,link}) => {

    return (
        <div  className="homeButtonWithArrow-container">
            <a href={link}> <button className="homeButtonWithArrow-container-btn">
                <span>{name}</span>
                < HiArrowNarrowRight size={20} className="homeButtonWithArrow-container-btn-icon"/>  
            </button>
            </a>
        </div>
    )
}

export default ButtonWithArrow
