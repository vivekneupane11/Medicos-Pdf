import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./_toast.scss";

const Toast = ({ user, message, userImage, time, backgroundColor }) => {
    const [close, setClose] = useState(false);

    return (
        <div className="toast-wrapper">
            {!close &&
                <div className={`toast-wrapper-container-${backgroundColor ? backgroundColor : "default"}`}>
                    <div className="toast-wrapper-container-header">

                        <div className="toast-wrapper-container-header-profile">
                            <div className="toast-wrapper-container-header-profile-picture">
                                <img src={userImage?.default} />
                            </div>
                            <h5 className={`toast-wrapper-container-header-profile-text${backgroundColor ? "-white" : ""}`}>{user}</h5>

                        </div>
                        <div className="toast-wrapper-container-header-close" >
                            <p className={`toast-wrapper-container-header-close-text${backgroundColor ? "-white" : ""}`}>{time + " mins ago"}</p>
                            <FontAwesomeIcon className="toast-wrapper-container-header-close-icon" onClick={() => setClose(true)} icon={faTimes} />
                        </div>

                    </div>
                    <div className="toast-wrapper-container-message">
                        <p className={`toast-wrapper-container-message-text${backgroundColor ? "-white" : ""}`}>{message}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Toast
