import React from 'react'
import { Headings } from '../../../components/global/headings'
import { Avatar } from '../../../components/global/images';
import { Paragraphs } from '../../../components/global/paragraphs';
import './_mymanager.scss';

export const MyManager = () => {
    return (
        <div className="myManager-wrapper">
            <div className="myManager-wrapper-heading">
                <Headings type="heading5" content="My Manager"/>

            </div>
            <div className="myManager-wrapper-details">
                <div className="myManager-wrapper-details-left">
                <Avatar Image={require("../../../assets/images/members.jpg")} size={50} text="this is avatar" />

                </div>
                <div className="myManager-wrapper-details-right">
                        <div className="myManager-wrapper-details-right-name">
                            <Headings type="heading6" content="Cm Pandey"/>
                        </div>
                        <div className="myManager-wrapper-details-right-position">
                        <Paragraphs type="muted-text" content="Executive Officer"/>

                        </div>
                        
                </div>

            </div>
            <div className="myManager-wrapper-details">
                <div className="myManager-wrapper-details-left">
                <Avatar Image={require("../../../assets/images/members.jpg")} size={50} text="this is avatar" />

                </div>
                <div className="myManager-wrapper-details-right">
                        <div className="myManager-wrapper-details-right-name">
                            <Headings type="heading6" content="Cm Pandey"/>
                        </div>
                        <div className="myManager-wrapper-details-right-position">
                        <Paragraphs type="muted-text" content="Executive Officer"/>

                        </div>
                        
                </div>

            </div>


            
        </div>
    )
}
