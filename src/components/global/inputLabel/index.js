import React from 'react'
import './_inputLabel.scss'

const InputLabel = ({text}) => {
    return (
        <>
         <label style={{fontSize:'10px',textTransform:'capitalize',color:'gray'}}>{text}</label>
            
        </>
    )
}

export default InputLabel
