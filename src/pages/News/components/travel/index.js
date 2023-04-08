import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
import './_travel.scss'

import { logEventWithParams } from '../../../../functions/commonMethod';
import shortid from  "shortid";
const Travel = ({details, newsData}) => {

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
            <div className="newsTravel-wrapper">
                <h3 className="newsTravel-wrapper-head1">Science</h3>
                <h6 className="newsTravel-wrapper-head2">Where are we going</h6>
                <div className="newsTravel-wrapper-imagesContainer">
                    {newsData?.filter((data,index)=>index<9).map((data,index)=>(
                        <div key={shortid.generate()} 
                        className="newsTravel-wrapper-imagesContainer-bgImg" 
                        style={{backgroundImage:`url(${data['media:content'].$?.url})`}}>
                           <div className="newsTravel-wrapper-imagesContainer-bgImg-description">
                                <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator} />
                                <h3 className="newsTravel-wrapper-imagesContainer-bgImg-description-heading" onClick={()=>newTab(data?.link,data?.title)}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#fff' fontSize='12px'/>
                           </div>
                        </div>
                    ))}
                </div>
                
            </div>

     
            
        </>
    )
}

export default Travel
