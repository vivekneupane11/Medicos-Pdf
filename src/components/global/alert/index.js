import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./_alert.scss";

const Alert = ({ type, message, backgroundColor }) => {

    const [close, setClose] = useState(false);

    return (
        <div className="alert-wrapper">
            {!close &&
                <div className={`alert-wrapper-container-${backgroundColor}`}>
                    <div className="alert-wrapper-container-text">
                        <FontAwesomeIcon className="alert-wrapper-container-icon" icon={faBell} />
                        <h5 className="alert-wrapper-container-text-type">{type + "!"}</h5>
                        <p className="alert-wrapper-container-text-message">{message}</p>
                    </div>
                    <FontAwesomeIcon className="alert-wrapper-container-close" onClick={()=>setClose(true)} icon={faTimes} />
                </div>
            }
        </div>
    )
}

export default Alert
