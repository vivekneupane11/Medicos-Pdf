import React from 'react';
import TextClamp from 'react-string-clamp';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_latestJournal.scss';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
export const LatestJournal = ({ journalsData}) => {
   
    return (
        <div className="latestJournal-wrapper">
        <h3 className="latestJournal-wrapper-heading">Latest Journals</h3>
        <div className="latestJournal-wrapper-content">
        {
            journalsData?.filter((data,index)=>index<10).map((data,index)=>{
                let time_to_read = getReadTime(data.content) + ' min read'

                return  <div className="latestJournal-wrapper-content-item" key={shortid.generate()}>
                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator}  />
                    <div onClick={ ()=>newTab(data?.link,data?.title,'web_journals_detail_page_opened')}
                       className='links' >
                        <h3 className="latestJournal-wrapper-content-item-heading">{data?.title}</h3>
                        <TextClamp
                            text={data.contentSnippet}
                            lines={3}
                            element='p'
                            className="latestJournal-wrapper-content-item-para"
                            />
                     </div>   
                    <AuthorDateRead  date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px'/>


                    </div>
                 
            })
        }
</div>
            
        </div>
    )
}
