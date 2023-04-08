import React from 'react'
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime'
import './_recent.scss';
import shortid from  "shortid";
import { newTab } from '../../../../functions/newTabMethod';
import { getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
export const JournalRecent = ({recent}) => {
  
      
    return (
        <div>
            <div className="journalRecent-wrapper">
                <h1 className="journalRecent-wrapper-head">Recent Journals</h1>
                <div className="journalRecent-wrapper-description">
                    {recent?.filter((data,index)=>index<4).map((data,index)=>{
                        let time_to_read = getReadTime(data?.content) + ' min read'
                        return <div key={shortid.generate()} className="journalRecent-wrapper-description-wrapper">
                                <h3 className="journalRecent-wrapper-description-wrapper-head" onClick={()=>newTab(data?.link,data?.title,'web_journals_detail_page_opened')}>{data.title}</h3>
                                <AuthorDateRead  author={data?.creator} authorColor='black' link={data.link} date={data.date} readTime={time_to_read} color='#9f9f9f' fontSize='12px'/>
                            </div>
              })}
                   

                </div>

           </div>
            
        </div>
    )
}
