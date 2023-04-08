import React from 'react'
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_recent.scss';
import shortid from  "shortid";
export const JournalRecent = ({recent}) => {
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
        <div>
            <div className="journalRecent-wrapper">
                <h1 className="journalRecent-wrapper-head">Recent Journals</h1>
                <div className="journalRecent-wrapper-description">
                    {recent?.filter((data,index)=>index<4).map((data,index)=>{
                        let time_to_read = getReadingTime(data?.content) + ' min read'
                        return <div key={shortid.generate()} className="journalRecent-wrapper-description-wrapper">
                                <h3 className="journalRecent-wrapper-description-wrapper-head" onClick={()=>newTab(data?.link,data?.title)}>{data.title}</h3>
                                <AuthorDateRead  author={data?.creator} authorColor='black' link={data.link} date={data.date} readTime={time_to_read} color='#9f9f9f' fontSize='12px'/>
                            </div>
              })}
                   

                </div>

           </div>
            
        </div>
    )
}
