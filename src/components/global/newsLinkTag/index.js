import React from 'react'
import { Link } from 'react-router-dom';
import TextClamp from 'react-string-clamp';
import './_newsLinkTag.scss'
const NewsLinkTag = ({ color, tag }) => {

    const newTag = tag?.slice(0, 15)

    return (
        <Link
            to={{
                pathname: `/search/searchtext/${tag}`,
                
            }}
            className="newsLinkTag-container">
            <div className='newsLinkTag-link'>
                <div className="newsLinkTag-link-circle" style={{ backgroundColor: `${color}` }}></div>
                <div className="newsLinkTag-link-text">
                   
                    {newTag}
                </div>
            </div>
        </Link>
    )
}

export default React.memo(NewsLinkTag)
