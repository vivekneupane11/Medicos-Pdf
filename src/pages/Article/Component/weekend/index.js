import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_weekend.scss';

export const Weekend = ({weekend}) => {
  
    return (
        <div className="weekend-wrapper">
            <h3 className="weekend-wrapper-heading">Weekends</h3>
                {
                    weekend.map((data,index)=>(
                         <div key={index} className="weekend-wrapper-content">
                    <div className="weekend-wrapper-content-col1">
                    <div className="weekend-wrapper-content-col1-image" style={{backgroundImage:`url(${data.backgroundImage})`}}>

                    </div>
                    <NewsLinkTag key={data.tag.id} color={data.tag.color} tag={data.tag.tag} link={data.tag.link} />
                    <h3 className="weekend-wrapper-content-col1-heading">{data.heading}</h3>
                    <AuthorDateRead  author={data.dateAndTime.author} link={data.dateAndTime.link} date={data.dateAndTime.date} readTime={data.dateAndTime.readTime} color={data.dateAndTime.color} fontSize={data.dateAndTime.fontSize}  />
                        <p>{data.paragraph}</p>
                </div>
                <div className="weekend-wrapper-content-col2">
                
                {
                    data.col2.map((details,index)=>(
                        
                    <div key={index}  className="weekend-wrapper-content-col2-content" >
                    <NewsLinkTag key={details.col2tag.id} color={details.col2tag.color} tag={details.col2tag.tag} link={details.col2tag.link} />
                    <h3 className="weekend-wrapper-content-col2-content-heading">{details.col2heading}</h3>
                    <AuthorDateRead  author={details.col2dateAndTime.author} link={details.col2dateAndTime.link} date={details.col2dateAndTime.date} readTime={details.col2dateAndTime.readTime} color={details.col2dateAndTime.color} fontSize={details.col2dateAndTime.fontSize}  />
                    </div>

               


                    )

                )
                }
                </div>
               
            </div>
                    ))
                }
                  
           
            
        </div>
    )
}
