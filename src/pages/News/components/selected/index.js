import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_selected.scss'
import shortid from  "shortid";
const Selected = ({details}) => {

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
            <div className="newsSelected-wrapper">
                <h3 className="newsSelected-wrapper-head1">Daily News</h3>
                <h6 className="newsSelected-wrapper-head2">BEST FOR YOU</h6>
                <div className="newsSelected-wrapper-imageContainer">
                   {
                       details?
                       <div className="newsSelected-wrapper-imageContainer-left">  
                       <div onClick={()=>newTab(details[13].link,details[13].title)} className="newsSelected-wrapper-imageContainer-left-img" style={{backgroundImage:`url(${details[13].image.url[0]})`}}>
                           
                       </div>
                       <NewsLinkTag color={getColorsByIndex(1)} tag={details[13]?.categories[0]} />
                       <h3 className="newsSelected-wrapper-imageContainer-left-heading" onClick={()=>newTab(details[13].link,details[13].title)}>{details[13].title}</h3>
                       <AuthorDateRead date={new Date(details[13]?.isoDate).toDateString()} readTime={getReadingTime(details[13]?.content) + " min read"} color='#9f9f9f' fontSize='12px'/>
                   </div>
                   :
                   ''
                   }

                    <div className="newsSelected-wrapper-imageContainer-right">
                        {details?.filter((data,index)=>index>13 && index<17).map((data,index)=>(
                            <div key={shortid.generate()} className="newsSelected-wrapper-imageContainer-right-imgWrapper">
                                <div onClick={()=>newTab(data?.link,data?.title)} style={{backgroundImage:`url(${data?.image?.url[0]})`}} className="newsSelected-wrapper-imageContainer-right-imgWrapper-img">
                                   
                                </div>
                                <h3 className="newsSelected-wrapper-imageContainer-right-imgWrapper-head" onClick={()=>newTab(data?.link,data?.title)}>{data?.title}</h3>
                           </div>
                        ))}

                    </div>
                </div>
                
            </div>
            <hr className="selected-borderbottom"></hr>
            
            
        </>
    )
}

export default Selected
