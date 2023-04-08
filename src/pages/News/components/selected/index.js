import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_selected.scss'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import { newTab } from '../../../../functions/newTabMethod'
const Selected = ({details}) => {


    return (
        <>
            <div className="newsSelected-wrapper">
                <h3 className="newsSelected-wrapper-head1">Daily News</h3>
                <h6 className="newsSelected-wrapper-head2">BEST FOR YOU</h6>
                <div className="newsSelected-wrapper-imageContainer">
                   {
                       details?
                       <div className="newsSelected-wrapper-imageContainer-left">  
                       <div onClick={()=>newTab(details[13].link,details[13].title,'web_article_detail_page_opened')} className="newsSelected-wrapper-imageContainer-left-img" style={{backgroundImage:`url(${details[13].image.url[0]})`}}>
                           
                       </div>
                       <NewsLinkTag color={getColorByIndex(1)} tag={details[13]?.categories[0]} />
                       <h3 className="newsSelected-wrapper-imageContainer-left-heading" onClick={()=>newTab(details[13].link,details[13].title,'web_article_detail_page_opened')}>{details[13].title}</h3>
                       <AuthorDateRead date={new Date(details[13]?.isoDate).toDateString()} readTime={getReadTime(details[13]?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                   </div>
                   :
                   ''
                   }

                    <div className="newsSelected-wrapper-imageContainer-right">
                        {details?.filter((data,index)=>index>13 && index<17).map((data,index)=>(
                            <div key={shortid.generate()} className="newsSelected-wrapper-imageContainer-right-imgWrapper">
                                <div onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')} style={{backgroundImage:`url(${data?.image?.url[0]})`}} className="newsSelected-wrapper-imageContainer-right-imgWrapper-img">
                                   
                                </div>
                                <h3 className="newsSelected-wrapper-imageContainer-right-imgWrapper-head" onClick={()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                           </div>
                        ))}

                    </div>
                </div>
                
            </div>
            <hr className="selected-borderbottom"></hr>
            
            
        </>
    )
}

export default React.memo(Selected)
