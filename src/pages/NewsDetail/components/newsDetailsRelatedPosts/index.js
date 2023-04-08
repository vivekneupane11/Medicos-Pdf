import React from 'react'
import './_newsDetailRelatedPosts.scss'
import { Link } from 'react-router-dom'

import AuthorDateRead from '../../../News/components/author-date-readTime'

const NewsDetailRelatedPosts = ({details,articleSource}) => {
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

      };
      const newTab=(url)=>{
        window.open(
           url, "_blank");
    }

    const goTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }
    return (
        <>

            <div className="newsDetailRelatedPosts-Container">
                <h3 className="newsDetailRelatedPosts-Container-head">Related Posts</h3>
                <div  className="newsDetailRelatedPosts-Container-wrapper">
                        {details?.filter((data,index)=>index<3).map((data,index) => (
                            <div key={index}  className="newsDetailRelatedPosts-Container-wrapper-card">
                                <Link
                        
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${articleSource}`
                                    }}>
                                <div onClick={()=>goTop()}  className="newsDetailRelatedPosts-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailRelatedPosts-Container-wrapper-card-description">
                                   
                                    <Link
                        
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${articleSource}`
                                    }}>
                                    <h3 onClick={()=>goTop()} className="newsDetailRelatedPosts-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px'/>
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
