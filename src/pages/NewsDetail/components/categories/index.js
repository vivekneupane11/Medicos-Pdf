import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_newsDetailCategories.scss'

const NewsDetailCategories = ({details}) => {
    return (
        <>

        <div className="newsDetailCategories-wrapper">
              <h3  className="newsDetailCategories-wrapper-head1">Categories</h3>
            
              <div  className="newsDetailCategories-wrapper-imgContainer">
                  {details.map(data=>(
                   
                        <div key={data.id} className="newsDetailCategories-wrapper-imgContainer-bgImg" style={{backgroundImage:`url(${data.bgImg})`}} >
                           
                                <div className="newsDetailCategories-wrapper-imgContainer-bgImg-desc">
                                   <div className="newsDetailCategories-wrapper-imgContainer-bgImg-desc-tag">
                                      <NewsLinkTag color={data.tag.color} tag={data.tag.tag} link={data.tag.link} />
                                   </div>
                                   <div className="newsDetailCategories-wrapper-imgContainer-bgImg-desc-postNo">{data.postsNo}</div>  
                               </div>
                               <div className="newsDetailCategories-wrapper-imgContainer-bgImg-overlay" style={{backgroundColor:`${data.tag.color}`}}></div>
            
                       </div>  
                  ))}
              </div>
          </div>
            
        </>
    )
}

export default NewsDetailCategories
