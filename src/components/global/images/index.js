import React from 'react'
import './_images.scss'

export const Images= ({Image,type,height,width}) => {
    return (
        <div>
        <img className={`image ${type?type:""}`} src={Image} style={{width,height}}></img> 
        </div>
    )
}
export const Avatar=({Image,size,text})=>{
    size=size||"50px"
    return(
        
        <div className="image-wrapper" style={{width:size,height:size}}>
        <div className="text_tooltip">{text}</div>
        <img className="avatar" src={Image?.default} style={{width:size,height:size}}></img>

        </div>
    )
}
