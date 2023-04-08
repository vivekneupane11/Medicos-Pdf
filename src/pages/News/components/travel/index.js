import React from 'react';
import shortid from "shortid";
import NewsLinkTag from '../../../../components/global/newsLinkTag';
import { newTab } from '../../../../functions/newTabMethod';
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod';
import AuthorDateRead from '../author-date-readTime';
import './_travel.scss';

const Travel = ({newsData}) => {


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
                                <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
                                <h3 className="newsTravel-wrapper-imagesContainer-bgImg-description-heading" onClick={ ()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#fff' fontSize='12px'/>
                           </div>
                        </div>
                    ))}
                </div>
                
            </div>

     
            
        </>
    )
}

export default React.memo(Travel)
