import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
// import "./_progressBar.scss";


const ProgressBar = ({ label, labelColor, progress, activeIndicator, backgroundColor }) => {

    return (
        <div className="progressBar-wrapper">
            <div className={`progressBar-wrapper-label-container`}>
                <h5 className={`progressBar-wrapper-label-container-text-${labelColor}`}>{label}</h5>
                <h5 className={`progressBar-wrapper-label-container-text-${labelColor}`}>{progress}</h5>
            </div>
            <div className={`progressBar-wrapper-indicator`}>
                <div className={`progressBar-wrapper-indicator-active-${activeIndicator}`} style={{ width: progress }}>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar
