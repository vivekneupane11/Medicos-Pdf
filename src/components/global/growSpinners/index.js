import React from 'react'
import './_growSpinners.scss'
const GrowSpinners = ({type,text}) => {
    return (
        <div className={`container${type}`}>
           <div className="wrapper">
               <div className="circle"/>
               <div className="text">{text}</div>
           </div>

        </div>
    )
}

export default GrowSpinners
