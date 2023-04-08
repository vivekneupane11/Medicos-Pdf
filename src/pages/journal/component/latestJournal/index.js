import React from 'react';
import TextClamp from 'react-string-clamp';
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import AuthorDateRead from '../../../News/components/author-date-readTime';
import './_latestJournal.scss';
import shortid from  "shortid";
export const LatestJournal = ({latestJournal, journalsData}) => {
    const newTab=(url)=>{
        window.open(
           url, "_blank");
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
        <div className="latestJournal-wrapper">
        <h3 className="latestJournal-wrapper-heading">Latest Journals</h3>
        <div className="latestJournal-wrapper-content">
        {
            journalsData?.filter((data,index)=>index<10).map((data,index)=>{
                let time_to_read = getReadingTime(data.content) + ' min read'

                return  <div className="latestJournal-wrapper-content-item" key={shortid.generate()}>
                    <NewsLinkTag color={getColorsByIndex(index)} tag={data?.creator}  />
                    <div onClick={()=>newTab(data?.link)}
                       style={{textDecoration:'none'}} >
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
