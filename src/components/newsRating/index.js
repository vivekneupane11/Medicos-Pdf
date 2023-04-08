import React from 'react'
import './_newsRating.scss'

const NewsRating = ({bgColor,rating}) => {
    return (
            <div  className="newsRating-wrapper" style={{backgroundColor:`${bgColor}`}}>
              <p>{rating}</p>
            </div>
            
      
    )
}

export default NewsRating
