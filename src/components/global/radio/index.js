import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaseballBall, faCog, faCaretDown, faUserGraduate, faSmile, faListUl } from '@fortawesome/free-solid-svg-icons';

import "./_radio.scss";

const Radio = ({ options, disabled, checked }) => {
    const [activeRadio, setActiveRadio] = useState(() => checked);

    return (
        <div className="radio-container">
            <div className={`radio-container-wrapper`}>
                {disabled ?
                    <div className="disabled-radio">
                        {
                            options.map((radioOption) => {
                                return <div className="radio-container-wrapper-option">
                                    <div className={`radio-option${activeRadio == radioOption.option ? "-active" : ""}`}>
                                        {activeRadio == radioOption.option ?
                                            <div className="dot"></div>
                                            :
                                            null
                                        }
                                    </div>
                                    <label>{radioOption.option}</label>
                                </div>
                            })
                        }
                    </div>
                    :
                    <div>
                        {
                            options.map((radioOption) => {
                                return <div className="radio-container-wrapper-option">
                                    <div className={`radio-option${activeRadio == radioOption.option ? "-active" : ""}`} onClick={() => { setActiveRadio(radioOption.option) }} >
                                        {activeRadio == radioOption.option ?
                                            <div className="dot"></div>
                                            :
                                            null
                                        }
                                    </div>
                                    <label>{radioOption.option}</label>
                                </div>
                            })
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default Radio
