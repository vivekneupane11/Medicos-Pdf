import React from 'react'
import './_newsDetailRelatedPosts.scss'
import { Link } from 'react-router-dom'

import AuthorDateRead from '../../../News/components/author-date-readTime'
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'

const NewsDetailRelatedPosts = ({details,articleSource}) => {
 
    const goTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }
    const clickhandlergotop5 = ()=>goTop()
    const clickhandlergotop6 = ()=>goTop()
    return (
        <>

            <div className="newsDetailRelatedPosts-Container">
                <h3 className="newsDetailRelatedPosts-Container-head">Related Posts</h3>
                <div  className="newsDetailRelatedPosts-Container-wrapper">
                        {details?.filter((data,index)=>index<3).map((data,index) => (
                            <div key={index}  className="newsDetailRelatedPosts-Container-wrapper-card">
                                <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${articleSource}`
                                    }}>
                                <div onClick={clickhandlergotop5}  className="newsDetailRelatedPosts-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailRelatedPosts-Container-wrapper-card-description">
                                   
                                    <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${articleSource}`
                                    }}>
                                    <h3 onClick={clickhandlergotop6} className="newsDetailRelatedPosts-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px'/>
                                    <p className="newsDetailRelatedPosts-Container-wrapper-card-description-para">{data?.excerpt?.rendered.replace(/<p[^>]*>/g && /<\/?p[^>]*>/g, "") }</p>
                                </div>
                              
                            </div>
                        ))}

                </div>
            </div>
            
        </>
    )
}

export default NewsDetailRelatedPosts
