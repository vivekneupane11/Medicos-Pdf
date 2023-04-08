import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_selectedPosts.scss'
import shortid from  "shortid";
const SelectedPosts = ({details}) => {

    const newTab=(url,title)=>{
        window.open(
           url, "_blank");
           logEventWithParams('web_news_detail_page_opened', { newsTitle: title })
    }
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

      };

      const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index %2 == 0) {
            color = 'skyblue'
        } 
        return color;
    }
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
                        <NewsLinkTag color={getColorsByIndex(0)} tag={details[0]?.categories[0]} />
                     </div>   
                    <h3 className="newsSelectedPosts-wrapper-infoContainer-col1-head" onClick={()=>newTab(details[0]?.link,details[0]?.title)}>{details[0]?.title}</h3>
                    <div  className="newsSelectedPosts-wrapper-infoContainer-col1-authordateread">
                       <AuthorDateRead date={new Date(details[0].isoDate).toDateString()} readTime={getReadingTime(details[0]?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                    </div>
                    <p className="newsSelectedPosts-wrapper-infoContainer-col1-para">{details[0]?.contentSnippet}</p>

                    <div className="newsSelectedPosts-wrapper-infoContainer-col1-bottom">
                        {details?.filter((data,index)=>index>0 && index<3).map((data,index)=>(
                            <div key={index} className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description">
                                <div onClick={()=>newTab(data?.link, data?.title)} className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description-img"  style={{backgroundImage:`url(${data['media:content'].$?.url})`}} >                    
                                </div>
                                <h3 className="newsSelectedPosts-wrapper-infoContainer-col1-bottom-description-head" onClick={()=>newTab(data?.link, data?.title)}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                            </div>
                        ))}
                        
                    </div>

                 </div>

                 <div className="newsSelectedPosts-wrapper-infoContainer-col2">
                     {details?.filter((data,index)=>index>2 && index<7).map((data,index)=>(
                       <div key={shortid.generate()} className="newsSelectedPosts-wrapper-infoContainer-col2-description">
                          <NewsLinkTag color={getColorsByIndex(index)} tag={data?.categories[0]} />
                           <h3 className="newsSelectedPosts-wrapper-infoContainer-col2-description-head" onClick={()=>newTab(data?.link, data?.title)}>{data?.title}</h3>
                           <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
                       </div>
                     ))}
                    

                 </div>

                 <div className="newsSelectedPosts-wrapper-infoContainer-col3">
                     <div onClick={()=>newTab(details[7]?.link,details[7]?.title)} className="newsSelectedPosts-wrapper-infoContainer-col3-img" style={{backgroundImage:`url(${details[7]['media:content'].$?.url})`}} >                    
                     </div>
                     <div className="newsSelectedPosts-wrapper-infoContainer-col3-desc">
                       <div className="newsSelectedPosts-wrapper-infoContainer-col3-desc-tag">
                           <NewsLinkTag color={getColorsByIndex(7)} tag={details[7]?.creator} />
                       </div>
                       <h3 className="newsSelectedPosts-wrapper-infoContainer-col3-desc-head" onClick={()=>newTab(details[7]?.link,details[7]?.title)}>{details[7].title}</h3>
                       <AuthorDateRead date={new Date(details[7]?.isoDate).toDateString()} readTime={getReadingTime(details[7]?.contentSnippet) + " min read"} color='#9f9f9f' fontSize='12px'/>
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

export default SelectedPosts
