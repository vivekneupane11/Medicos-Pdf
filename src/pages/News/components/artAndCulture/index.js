import React from 'react'
import './_artAndCulture.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../author-date-readTime'
import { logEventWithParams } from '../../../../functions/commonMethod'
import shortid from  "shortid";

const ArtAndCulture = ({details}) => {

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

          <div className="ArtAndCulture-wrapper">
              <h3 className="ArtAndCulture-wrapper-head1">Science</h3>
              <h6 className="ArtAndCulture-wrapper-head2">FROM ALL OVER THE WORLD</h6>
              <div className="ArtAndCulture-wrapper-description">
                  {details?.filter((data,index)=>index>=11 && index<13).map((data,index)=>(
                    <div  key={shortid.generate()} className="ArtAndCulture-wrapper-description-img" style={{backgroundImage:`url(${data?.image?.url[0]})`}}>
                        <div className="ArtAndCulture-wrapper-description-img-inner">
                        <NewsLinkTag color={getColorsByIndex(index)} tag={data?.categories[0]} />
                            <h3 className="ArtAndCulture-wrapper-description-img-inner-heading" onClick={()=>newTab(data?.link,data?.title)}>{data?.title}</h3>
                            <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadingTime(data?.content) + " min read"} color='#fff' fontSize='12px'/>
                        </div>
                    </div>
                  ))}
                 
              </div>
            
          </div>
            
        </>
    )
}

export default ArtAndCulture
