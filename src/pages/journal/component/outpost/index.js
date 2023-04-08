import React from 'react';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_outPost.scss';
import shortid from  "shortid";
export const OutPost = ({outPost}) => {
    const newTab=(url,title)=>{
        window.open(
           url, "_blank");
           logEventWithParams('web_journals_detail_page_opened', { journalTitle: title })
    }
    const getColorsByIndex = (index) => {
        let color = "yellow";
        if (index % 3 == 0) {
            color = 'red'
        } else if (index %2 == 0) {
            color = 'skyblue'
        } 
        return color;
    }

    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text.split(" ").length;
        let minutesToRead = Math.ceil(textLength / wordsPerMinute);
        return minutesToRead;

      };

    return (
        <div className="outPost-wrapper">
        <h3 className="outPost-wrapper-heading">Popular Ones</h3>
        <div className="outPost-wrapper-content">
        {
            outPost?.filter((data,index)=>index<4).map((data,index)=>{
                let time_to_read = getReadingTime(data.content) + ' min read'
                return  <div className="outPost-wrapper-content-item" key={shortid.generate()}>
                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator} />
                      
                        <h3 onClick={()=>newTab(data?.link,data?.title)} className="outPost-wrapper-content-item-heading" >{data.title}</h3>
                      
                        <AuthorDateRead  date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px'/>


                    </div>
                 
            })
        }
</div>
            
        </div>
    )
}
