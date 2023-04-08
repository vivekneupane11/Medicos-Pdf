import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import './_catagories.scss'
import shortid from  "shortid";
const  ArticleCategories = ({details}) => {
    return (
        <>
          <div className="articleCategories-wrapper">
          <h3 className="articleCategories-wrapper-heading">Explore</h3>
              <div className="articleCategories-wrapper-imgContainer">
                  {details.map((data,index)=>(
                        <a  key={shortid.generate()}  href={data.tag.link} style={{textDecoration:'none'}}>
                        <div className="articleCategories-wrapper-imgContainer-bgImg" style={{backgroundImage:`url(${data.bgImg})`}} >
                           
                                <div className="articleCategories-wrapper-imgContainer-bgImg-mid">
                                    <NewsLinkTag color={data.tag.color} tag={data.tag.tag} />
                                    <div className="articleCategories-wrapper-imgContainer-bgImg-mid-postNo">{data.postsNo}</div>
                                </div>
                                <div className="overlay" style={{ backgroundColor: `${data.tag.color}` }}></div>


                            </div>
                        </a>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ArticleCategories
