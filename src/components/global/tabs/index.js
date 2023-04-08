import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';
// import "./_tab.scss";

const Tabs = ({ direction,label, tabs, labelColor, buttonColor, progress, activeIndicator, backgroundColor }) => {

    const [activeLabel, setActiveLabel] = useState(0);

    return (
        <div className={`tab-wrapper-${direction ? direction : "vertical"}`}>
            <div className={`tab-wrapper-${direction ? direction : "vertical"}-label-container`}>
                {tabs.map((tab, index) => {
                    return <div>
                        {
                            index == activeLabel ?
                                <div className={`tab-wrapper-${direction ? direction : "vertical"}-label-container-button-active-${buttonColor}`} onClick={() => setActiveLabel(index)}>
                                    <p className={`tab-wrapper-${direction ? direction : "vertical"}-label-container-button-text-white`}>{tab.label}</p>
                                </div>
                                :
                                <div className={`tab-wrapper-${direction ? direction : "vertical"}-label-container-button`} onClick={() => setActiveLabel(index)}>
                                    <p className={`tab-wrapper-${direction ? direction : "vertical"}-label-container-button-text-${buttonColor}`}>{tab.label}</p>
                                </div>
                        }
                    </div>
                })}
            </div>
            <div className={`tab-wrapper-${direction ? direction : "vertical"}-content-container`}>
                <div className={`tab-wrapper-${direction ? direction : "vertical"}-indicator-active-${activeIndicator}`} style={{ width: progress }}>
                    <p>{tabs[activeLabel].content}</p>
                </div>
            </div>
        </div>
    )
}

export default Tabs
