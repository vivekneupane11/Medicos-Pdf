import React from 'react'
import './_newsDetailAlsoRead.scss'
import { Link } from 'react-router-dom'

import AuthorDateRead from '../../../News/components/author-date-readTime'

const NewsDetailAlsoRead = ({details,details1Source}) => {
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
         <div className="newsDetailAlsoRead-Container">
                <h3 className="newsDetailAlsoRead-Container-head">Also Read</h3>
                <div  className="newsDetailAlsoRead-Container-wrapper">
                        {details?.filter((data,index)=>index>2 && index<7).map((data,index) => (
                            <div key={index}  className="newsDetailAlsoRead-Container-wrapper-card">
                                 <Link
                        
                                    style={{ textDecoration: 'none' }}
                                    to={{
                                        pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                <div onClick={()=>goTop()} className="newsDetailAlsoRead-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailAlsoRead-Container-wrapper-card-description">
                                   
                                     <Link
                        
                                        style={{ textDecoration: 'none' }}
                                        to={{
                                            pathname: `/articleDetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                        }}>
                                    <h3 onClick={()=>goTop()} className="newsDetailAlsoRead-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
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

export default NewsDetailAlsoRead
