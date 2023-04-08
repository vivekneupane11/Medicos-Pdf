import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons'
import "./_label.scss";

const Label = ({ label,type, backgroundColor, size }) => {

    return (
        <div className="label-wrapper">
            <div className={`label-wrapper-container-color-${backgroundColor ? backgroundColor : "default"}-size-${size ? size : "default"}-type-${type ? type : "default"}`}>
                <p className={`label-wrapper-container-text${backgroundColor ? "-white" : ""}`}>{label ? label : "DEFAULT"}</p>
            </div>
        </div>
    )
}

export default Label
