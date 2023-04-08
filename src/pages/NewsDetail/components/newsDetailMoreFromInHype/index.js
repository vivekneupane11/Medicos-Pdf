import React from 'react'
import { Link } from 'react-router-dom'
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'

import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_newsDetailMoreFromInHype.scss'
const NewsDetailMoreFromInHype = ({details,details1Source}) => {
  
    const goTop=()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    }
    const clickhandlergotop3 = ()=>goTop()
    const clickhandlergotop4 = ()=>goTop()
    return (
        <>
             <div className="newsDetailMoreFromInHype-Container">
               
                <div  className="newsDetailMoreFromInHype-Container-wrapper">
                        {details?.filter((data,index)=>index<3).map((data,index) => (
                            <div key={index}  className="newsDetailMoreFromInHype-Container-wrapper-card">
                                 <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                <div onClick={clickhandlergotop3} className="newsDetailMoreFromInHype-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailMoreFromInHype-Container-wrapper-card-description">    
                                    
                                    <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                    <h3 onClick={clickhandlergotop4} className="newsDetailMoreFromInHype-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
                                    </Link>
                                    <AuthorDateRead date={new Date(data?.date).toDateString()} readTime={getReadTime(data?.content?.rendered) + " min read"} color='#0f0e0e' fontSize='12px'/>
                                </div>
                              
                            </div>
                        ))}

                </div>
            </div>
        </>
    )
}

export default NewsDetailMoreFromInHype
