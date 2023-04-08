import React from 'react'
import './_topBackground.scss'
import NewsLinkTag from '../../../../components/global/newsLinkTag'
import AuthorDateRead from '../../../News/components/author-date-readTime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { newsDetailsTopBackground } from '../../../../components/constants/mock'
const TopBackground = ({details}) => {
// console.log("THIS IS ARTICLE ",details);
    const getReadingTime = (text) => {
        const wordsPerMinute = 120;
        const textLength = text?.split(" ")?.length;
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
    const newTab=(url)=>{
        window.open(
           url, "_blank");
    }
    return (
        <>
           <div className="newsDetailsTopBackground-wrapper">
              
               <div className="newsDetailsTopBackground-wrapper-leftBgImg" style={{backgroundImage:`url(${details?.image?.source_url})`}}>    
                    <div className="newsDetailsTopBackground-wrapper-leftBgImg-rating">
                        4
                    </div>
               </div>

               <div className="newsDetailsTopBackground-wrapper-right">
                   <div className="newsDetailsTopBackground-wrapper-right-tags">
                      
                        <div  className="newsDetailsTopBackground-wrapper-right-tags-tag">   
                           <NewsLinkTag color={getColorsByIndex(1)} tag={details?.slug} />
                        </div>
                      
                   </div>
                   <h3 className="newsDetailsTopBackground-wrapper-right-head">{details?.title?.rendered}</h3>
                   <AuthorDateRead date={new Date(details?.date).toDateString()} readTime={getReadingTime(details?.content?.rendered) + " min read"} color='#9f9f9f' fontSize='12px'/>
                   <div className="newsDetailsTopBackground-wrapper-right-bottom">
                       {/*
                        TODO LIKE
                        <div className="newsDetailsTopBackground-wrapper-right-bottom-col1">
                           {newsDetailsTopBackground.likesAndLove.map(data=>(
                               <div  key={data.id} className="newsDetailsTopBackground-wrapper-right-bottom-col1-item">
                                    <FontAwesomeIcon icon={data.img} className="newsDetailsTopBackground-wrapper-right-bottom-col1-item-icon"/>
                                    <div className="newsDetailsTopBackground-wrapper-right-bottom-col1-item-no">{data.likesAndloveNo}</div>
                               </div>
                           ))}
                          
                       </div> */}

                       <div className="newsDetailsTopBackground-wrapper-right-bottom-col2">
                           {newsDetailsTopBackground.socialBtn.map(data=>(
                               <div key={data.id} className="newsDetailsTopBackground-wrapper-right-bottom-col2-item" style={{backgroundColor:`${data.color}`}}>
                                   <a onClick={()=>newTab(data?.link)} className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a"><FontAwesomeIcon icon={data.img} className="newsDetailsTopBackground-wrapper-right-bottom-col2-item-a-icon"/></a>
                                </div> 
                           ))}
                     
                       </div>
                   </div>

               </div>
           </div>
            
        </>
    )
}

export default TopBackground
