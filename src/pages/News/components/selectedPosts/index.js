import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_selectedPosts.scss'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import { newTab } from '../../../../functions/newTabMethod'
const SelectedPosts = ({details}) => {


    const clickhandlercoll = ()=>newTab(details[0]?.link,details[0]?.title,'web_article_detail_page_opened') 
    const clickhandlercontainer = ()=>newTab(details[7]?.link,details[7]?.title,'web_article_detail_page_opened')
    const clickhandlerdeschead =()=>newTab(details[7]?.link,details[7]?.title,'web_article_detail_page_opened')
    return (
        <>
          <div className="newsSelectedPosts-wrapper">
              <h3 className="newsSelectedPosts-wrapper-head1">Medical Highlights</h3>
              <h6 className="newsSelectedPosts-wrapper-head2">EDITOR'S PICKS</h6>
             {
                 details?
                 <div className="newsSelectedPosts-wrapper-infoContainer">
                 <div className="newsSelectedPosts-wrapper-infoContainer-col1">
                     <div  className="newsSelectedPosts-wrapper-infoContainer-col1-tag">
                        <NewsLinkTag color={getColorByIndex(0)} tag={details[0]?.categories[0]} />
                     </div>   
                    <h3 className="newsSelectedPosts-wrapper-infoContainer-col1-head" onClick={clickhandlercoll}>{details[0]?.title}</h3>
                    <div  className="newsSelectedPosts-wrapper-infoContainer-col1-authordateread">
                       <AuthorDateRead date={new Date(details[0].isoDate).toDateString()} readTime={getReadTime(details[0]?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                    </div>
                    <p className="newsSelectedPosts-wrapper-infoContainer-col1-para">{details[0]?.contentSnippet}</p>

                    <div className="newsSelectedPosts-wrapper-infoContainer-col1-bottom">
                        {details?.filter((data,index)=>index>0 && index<3).map((data,index)=>(
                            <div key={index} className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description">
                                <div onClick={()=>newTab(data?.link, data?.title,'web_article_detail_page_opened')} className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description-img"  style={{backgroundImage:`url(${data['media:content'].$?.url})`}} >                    
                                </div>
                                <h3 className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description-head" onClick={()=>newTab(data?.link, data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                            </div>
                        ))}
                        
                    </div>

                 </div>

                 <div className="newsSelectedPosts-wrapper-infoContainer-col2">
                     {details?.filter((data,index)=>index>2 && index<7).map((data,index)=>(
                       <div key={shortid.generate()} className="newsSelectedPosts-wrapper-infoContainer-col2-description">
                          <NewsLinkTag color={getColorByIndex(index)} tag={data?.categories[0]} />
                           <h3 className="newsSelectedPosts-wrapper-infoContainer-col2-description-head" onClick={()=>newTab(data?.link, data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                           <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                       </div>
                     ))}
                    

                 </div>

                 <div className="newsSelectedPosts-wrapper-infoContainer-col3">
                     <div onClick={clickhandlercontainer} className="newsSelectedPosts-wrapper-infoContainer-col3-img" style={{backgroundImage:`url(${details[7]['media:content'].$?.url})`}} >                    
                     </div>
                     <div className="newsSelectedPosts-wrapper-infoContainer-col3-desc">
                       <div className="newsSelectedPosts-wrapper-infoContainer-col3-desc-tag">
                           <NewsLinkTag color={getColorByIndex(7)} tag={details[7]?.creator} />
                       </div>
                       <h3 className="newsSelectedPosts-wrapper-infoContainer-col3-desc-head" onClick={clickhandlerdeschead}>{details[7].title}</h3>
                       <AuthorDateRead date={new Date(details[7]?.isoDate).toDateString()} readTime={getReadTime(details[7]?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                     </div>
                    
                 </div>
             </div>
             :
             ''
             }
          </div>
            
        </>
    )
}

export default React.memo(SelectedPosts)
