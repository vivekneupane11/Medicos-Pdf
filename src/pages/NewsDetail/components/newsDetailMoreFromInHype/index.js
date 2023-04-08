import React from 'react'
import { Link } from 'react-router-dom'

import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_newsDetailMoreFromInHype.scss'
const NewsDetailMoreFromInHype = ({details,details1Source}) => {
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
             <div className="newsDetailMoreFromInHype-Container">
               
                <div  className="newsDetailMoreFromInHype-Container-wrapper">
                        {details?.filter((data,index)=>index<3).map((data,index) => (
                            <div key={index}  className="newsDetailMoreFromInHype-Container-wrapper-card">
                                 <Link
                        
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                <div onClick={()=>goTop()} className="newsDetailMoreFromInHype-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailMoreFromInHype-Container-wrapper-card-description">    
                                    
                                    <Link
                        
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                    <h3 onClick={()=>goTop()} className="newsDetailMoreFromInHype-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadingTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px'/>
                                </div>
                              
                            </div>
                        ))}

                </div>
            </div>
        </>
    )
}

export default NewsDetailMoreFromInHype
