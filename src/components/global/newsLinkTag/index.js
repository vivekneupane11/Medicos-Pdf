import React from 'react'
import TextClamp from 'react-string-clamp';
import './_newsLinkTag.scss'
const NewsLinkTag = ({color,tag}) => {

     const newTag=tag?.slice(0,15)

    return (
        <span className="newsLinkTag-container">
            <div className='newsLinkTag-link'>
                <div className="newsLinkTag-link-circle" style={{backgroundColor:`${color}`}}></div>
                <div className="newsLinkTag-link-text">
                    {/* <TextClamp
                        text={tag}
                        line={1}
                        element='p'
                        className="newsLinkTag-link-text-p"
                        /> */}
                        {newTag}
                </div>
            </div>
       </span>
    )
}

export default NewsLinkTag
