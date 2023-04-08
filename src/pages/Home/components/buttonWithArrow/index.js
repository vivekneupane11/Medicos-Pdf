import React from 'react'
import {Link} from 'react-router-dom'
import './_buttonWithArrow.scss'
import ArrowRightLong from '../../../../components/global/icons/arrorRight_Long';

const ButtonWithArrow = ({name,link}) => {

    return (
        <div  className="homeButtonWithArrow-container">
            <Link to={link}> <button className="homeButtonWithArrow-container-btn">
                <span>{name}</span>
                <ArrowRightLong  className="homeButtonWithArrow-container-btn-icon"/>  
            </button>
            </Link>
        </div>
    )
}

export default ButtonWithArrow
