import React from 'react'
import './_spTitle.scss'

export const SpecializedTitle = (props) => {
    return (
        <div className="Sp_Title">
        <p className={`${props.type} ${props.style}`}>{props.label}</p>
        <p className="heading-footer">{props.content}</p>
        </div>
    )
}
