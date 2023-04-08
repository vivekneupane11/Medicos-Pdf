import React from 'react'
import './_newsDetailAlsoRead.scss'
import { Link } from 'react-router-dom'

import AuthorDateRead from '../../../News/components/author-date-readTime'
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'

const NewsDetailAlsoRead = ({details,details1Source}) => {
  
const goTop=()=>{
    window.scrollTo({top:0,behavior:'smooth'});
}
const clickhandlergotop = ()=>goTop()
const clickhandlergotop2 = ()=>goTop()
    return (
        <>
         <div className="newsDetailAlsoRead-Container">
                <h3 className="newsDetailAlsoRead-Container-head">Also Read</h3>
                <div  className="newsDetailAlsoRead-Container-wrapper">
                        {details?.filter((data,index)=>index>2 && index<7).map((data,index) => (
                            <div key={index}  className="newsDetailAlsoRead-Container-wrapper-card">
                                 <Link
                        
                                    className='links'
                                    to={{
                                        pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                    }}>
                                <div onClick={clickhandlergotop} className="newsDetailAlsoRead-Container-wrapper-card-img" style={{ backgroundImage: `url(${data?.image?.source_url})` }}>
                                   
                                </div>
                                </Link>
                                <div className="newsDetailAlsoRead-Container-wrapper-card-description">
                                   
                                     <Link
                        
                                        className='links'
                                        to={{
                                            pathname: `/articledetails/${data?.title?.rendered.replace(/\/|\[|\]/g, '')}/${details1Source}`
                                        }}>
                                    <h3 onClick={clickhandlergotop2} className="newsDetailAlsoRead-Container-wrapper-card-description-head">{data?.title?.rendered}</h3>
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

export default NewsDetailAlsoRead
