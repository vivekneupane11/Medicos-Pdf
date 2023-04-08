import React from 'react';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { logEventWithParams } from '../../../../functions/commonMethod';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_outPost.scss';
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import { newTab } from '../../../../functions/newTabMethod';
export const OutPost = ({outPost}) => {
  
      
    return (
        <div className="outPost-wrapper">
        <h3 className="outPost-wrapper-heading">Popular Ones</h3>
        <div className="outPost-wrapper-content">
        {
            outPost?.filter((data,index)=>index<4).map((data,index)=>{
                let time_to_read = getReadTime(data.content) + ' min read'
                return  <div className="outPost-wrapper-content-item" key={shortid.generate()}>
                    <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
                      
                        <h3 onClick={ ()=>newTab(data?.link,data?.title,'web_journals_detail_page_opened')} className="outPost-wrapper-content-item-heading" >{data.title}</h3>
                      
                        <AuthorDateRead  date={new Date(data.isoDate).toDateString()} readTime={time_to_read} color='#9f9f9f' fontSize='12px'/>


                    </div>
                 
            })
        }
</div>
            
        </div>
    )
}
