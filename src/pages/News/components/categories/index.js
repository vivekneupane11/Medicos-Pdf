import React from 'react'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import { logEventWithParams } from '../../../../functions/commonMethod'
import './_categories.scss'
import shortid from  "shortid";
const Categories = ({details}) => {

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
          <div className="newsCategories-wrapper">
             
              <div  className="newsCategories-wrapper-imgContainer">
                  {details?.filter((data,index)=>index>9 && index<14).map((data,index)=>(
                        <div key={shortid.generate()} className="newsCategories-wrapper-imgContainer-bgImg" style={{backgroundImage:`url(${data['media:content'].$?.url})`}} >
                           
                                <div className="newsCategories-wrapper-imgContainer-bgImg-mid">
                                    <div className="newsCategories-wrapper-imgContainer-bgImg-mid-postNo">5 posts</div>
                                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator} />
                                    <div className="newsCategories-wrapper-imgContainer-bgImg-mid-btn"><a onClick={()=>newTab(data?.link,data?.title)}>View posts</a></div>
                               </div>
                               <div className="overlay" style={{backgroundColor:`${getColorsByIndex(index)}`}}></div>
                         
                          
                       </div>  
                  ))}
              </div>
          </div>
            
        </>
    )
}

export default Categories
