import React from 'react'
import './_newsPlayBtn.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from '@fortawesome/free-solid-svg-icons'
const NewsPlayBtn = () => {
    return (
        <div className="newsPlayBtn-wrapper">
            <FontAwesomeIcon icon={faPlay} className="newsPlayBtn-wrapper-icon"/>
        </div>
    )
}

export default NewsPlayBtn
