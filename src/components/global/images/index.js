import React from 'react'
import { DisplayTitle } from '../Titles'
import './_images.scss'

export const Images = ({ Image, type, height, width }) => {
    return (
        <div>
            <img className={`image ${type ? type : ""}`} src={Image} style={{ width, height }} alt='image'></img>
        </div>
    )
}
export const Avatar = ({ Image, size, text }) => {
    size = size || "50px"
    return (

        <div className="image-wrapper" style={{ width: size, height: size }}>
            {
                Image ?
                    <img className="avatar" src={Image} style={{ width: size, height: size }} alt='image'></img>
                    :
                    <div className="avatar-text" style={{ width: size, height: size }}>
                        <DisplayTitle title={text?.substring(0, 1)} color='white' type="display4" />
                    </div>
            }
        </div>
    )
}

export const AvatarPlaceholder=({size})=>{
    size = size || "50px"
    return(
        <div className="image-wrapper-placeholder" style={{ width: size, height: size }}>
      
                {/* <img className="avatarPlaceholder" style={{ width: size, height: size }} alt='image'></img> */}
                
        
    </div>
    )

    
}
