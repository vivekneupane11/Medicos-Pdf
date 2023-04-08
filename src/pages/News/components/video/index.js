import React from 'react'

import NewsLinkTag from '../../../../components/global/newsLinkTag'
// import { logEventWithParams } from '../../../../functions/commonMethod'
import AuthorDateRead from '../author-date-readTime'
import './_video.scss'
import shortid from  "shortid";
import { getColorByIndex, getReadTime } from '../../../../functions/tagColorAndReadTimeMethod'
import { newTab } from '../../../../functions/newTabMethod'
const Video = ({details}) => {


    const clickhandlerimghead = ()=>newTab(details[15]?.link,details[15].title,'web_article_detail_page_opened')

    return (
        <>

         <div className="newsVideo-wrapper">

             <h3 className="newsVideo-wrapper-head1">Medical Feeds</h3>
             <h6 className="newsVideo-wrapper-head2">SELECTED VIDEO POSTS</h6>
             <div  className="newsVideo-wrapper-imgContainer">
                {
                    details?
                    <div className="newsVideo-wrapper-imgContainer-left">
                    <div className="newsVideo-wrapper-imgContainer-left-img" style={{backgroundImage:`url(${details[15]['media:content'].$?.url})`}}>
                       <div className="newsVideo-wrapper-imgContainer-left-img-description">
                            <NewsLinkTag color={getColorByIndex(15)} tag={details[15]?.creator} />
                           <h3 className="newsVideo-wrapper-imgContainer-left-img-description-head" onClick={clickhandlerimghead}>{details[15].title}</h3>
                           <AuthorDateRead date={new Date(details[15]?.isoDate).toDateString()} readTime={getReadTime(details[15]?.content) + " min read"} color='#fff' fontSize='12px'/>
                        </div>
                    </div>

                </div>
                :
                ''
                }

                 <div className="newsVideo-wrapper-imgContainer-right">
                     {details?.filter((data,index)=>index>15 && index<18).map((data,index)=>(
                        <div key={shortid.generate()} className="newsVideo-wrapper-imgContainer-right-img" style={{backgroundImage:`url(${data['media:content'].$?.url})`}}>
                            <div className="newsVideo-wrapper-imgContainer-right-img-description">
                            <NewsLinkTag color={getColorByIndex(index)} tag={data?.creator} />
                                <h3 className="newsVideo-wrapper-imgContainer-right-img-description-head" onClick={ ()=>newTab(data?.link,data?.title,'web_article_detail_page_opened')}>{data?.title}</h3>
                                <AuthorDateRead date={new Date(data?.isoDate).toDateString()} readTime={getReadTime(data?.content) + " min read"} color='#fff' fontSize='12px'/>
                            </div>

                            <div className="newsVideo-wrapper-imgContainer-right-img-play">
                               {data.playbtn}
                            </div>

                        </div>
                     ))}
                    

                 </div>
             </div>
         </div>

            
        </>
    )
}

export default React.memo(Video)
