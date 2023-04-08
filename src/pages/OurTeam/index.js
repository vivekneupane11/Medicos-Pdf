import React from 'react'
import { Images } from '../../components/global/images'
import './_ourTeam.scss'
import {MdArrowDropDownCircle} from 'react-icons/md';

export const OurTeam = ({ourTeam}) => {
    return (
        <div className="ourteam-wrapper">
         
           
            <div className="ourteam-heading">
            
                <h4>Our Team</h4>
                <MdArrowDropDownCircle className="dropdown"/>

            </div>
            <div className="ourteam">
                {
                    ourTeam.map((team)=>{
                        return<div className="ourteam-row">
                <div className="ourteam-row-row1">
                   <div className="image">
                    <Images Image={team.memberImage}  />
                   </div>
                   <div className="image2">
                    <Images Image={team.memberImage2} />
                   </div>

                </div>
                <div className="ourteam-row-row2">
                    <div className="details">
                        <h6>{team.memberName}</h6>
                        <p>{team.position}</p>

                    </div>

                </div>

                </div>
                    })
                }
            </div>
            
        </div>
    )
}
